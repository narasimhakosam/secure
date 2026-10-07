"""Deterministic rule engine for explainable scam indicator detection (LLD §5).

Rules are independently testable and use multilingual/variant phrase sets
to avoid false positives from single-word matches.
"""

import re
from typing import Optional

from app.config import settings
from app.domain.enums import (
    DetectionSource,
    IndicatorCode,
    ScamCategory,
    Severity,
)
from app.domain.models import Indicator


# ── Phrase sets ──────────────────────────────────────────────

_PAYMENT_PHRASES = [
    r"registration\s+fee",
    r"processing\s+fee",
    r"security\s+deposit",
    r"training\s+fee",
    r"kit\s+(?:fee|charge|payment|cost)",
    r"pay\s*(?:rs|₹|inr)?\s*\.?\s*\d",
    r"transfer\s+(?:rs|₹|inr)\s*\.?\s*\d",
    r"(?:rs|₹|inr)\s*\.?\s*[\d,]+\s*(?:fee|charge|deposit|payment)",
    r"upfront\s+(?:fee|payment|charge)",
    r"refundable\s+(?:deposit|fee)",
    r"non[- ]?refundable\s+(?:deposit|fee)",
    r"upi\s+id",
    r"googlepay|phonepe|paytm",
    r"bank\s+(?:transfer|account|details)",
    r"pay\s+(?:now|today|immediately|before|within)",
]

_OTP_PHRASES = [
    r"(?:send|share|forward|provide)\s+(?:the\s+)?(?:otp|verification\s+code|pin)",
    r"(?:6|4)[- ]?digit\s+(?:code|otp|verification|pin)",
    r"otp\s+(?:received|sent|on\s+sms)",
    r"forward\s+(?:the\s+)?(?:code|sms|message)",
    r"verification\s+code\s+(?:received|sent)",
]

_PASSWORD_PHRASES = [
    r"(?:share|send|provide|enter)\s+(?:your\s+)?password",
    r"(?:share|send|provide|enter)\s+(?:your\s+)?(?:login|account)\s+(?:credentials|details)",
    r"recovery\s+code",
    r"(?:share|send)\s+(?:your\s+)?(?:pin|cvv|card\s+number)",
]

_URGENCY_PHRASES = [
    r"(?:limited|only)\s+\d+\s+(?:seats?|spots?|slots?|positions?)\s+(?:left|remaining|available)",
    r"offer\s+(?:expires|ends|valid)\s+(?:in|within)\s+\d+\s+(?:hours?|minutes?|mins?)",
    r"(?:today|now|immediately|within\s+\d+\s+(?:hours?|minutes?|mins?))\s+(?:only|deadline|last\s+date)",
    r"(?:hurry|urgent|rush|act\s+now|don't\s+delay|don'?t\s+miss)",
    r"last\s+(?:date|chance|opportunity)",
    r"deadline\s+(?:today|tomorrow|approaching)",
    r"failing\s+to\s+(?:do|respond|confirm|pay)\s+(?:so\s+)?(?:in|within)",
]

_GUARANTEED_SELECTION_PHRASES = [
    r"(?:100|guaranteed|assured|confirmed|direct)\s*%?\s*(?:placement|selection|offer|job|appointment)",
    r"no\s+(?:interview|test|screening|assessment)\s+(?:required|needed)",
    r"(?:direct|instant|immediate)\s+(?:appointment|offer|selection)\s+letter",
    r"you\s+(?:are|have\s+been)\s+(?:selected|shortlisted|chosen)\s*\.?\s*(?:no\s+interview)?",
    r"congratulations\s*!?\s*you\s+(?:are|have\s+been)\s+selected",
]

_UNREALISTIC_REWARD_PHRASES = [
    r"(?:earn|make|get|receive)\s+(?:rs|₹|inr)?\s*\.?\s*[\d,]+\s*(?:per|/)\s*(?:day|hour|week)",
    r"(?:stipend|salary|income)\s*:?\s*(?:rs|₹|inr)?\s*\.?\s*[\d,]+\s*(?:000|k)\s*(?:per|/)\s*(?:month|day)",
    r"(?:work\s+from\s+home|wfh)\s+(?:earn|income|salary)\s+(?:rs|₹|inr)?\s*\.?\s*[\d,]+",
    r"(?:unlimited|huge|massive)\s+(?:earning|income|money)",
    r"(?:double|triple|10x)\s+(?:your\s+)?(?:money|income|investment)",
]

_PERSONAL_DOC_PHRASES = [
    r"(?:upload|share|send|provide)\s+(?:your\s+)?(?:aadhaar|aadhar|pan\s+card|passport|id\s+proof|identity\s+(?:card|proof|document))",
    r"(?:upload|share|send|provide)\s+(?:your\s+)?(?:marksheet|certificate|resume|cv)\s+(?:with|along\s+with)\s+(?:aadhaar|aadhar|pan|id)",
    r"kyc\s+(?:verification|documents?|details?|update)",
]


def _match_any(text: str, patterns: list[str]) -> list[str]:
    """Return matched phrases from a pattern list."""
    text_lower = text.lower()
    matches = []
    for pattern in patterns:
        match = re.search(pattern, text_lower)
        if match:
            matches.append(match.group())
    return matches


def detect_indicators(text: str) -> list[Indicator]:
    """Run all deterministic rules against the input text.

    Returns a list of Indicator objects with traceable evidence.
    """
    indicators: list[Indicator] = []

    # PAYMENT_REQUEST
    matches = _match_any(text, _PAYMENT_PHRASES)
    if matches:
        indicators.append(Indicator(
            code=IndicatorCode.PAYMENT_REQUEST,
            severity=Severity.HIGH,
            source=DetectionSource.RULE,
            evidence=f"Payment language detected: {', '.join(matches[:3])}",
            weight=settings.RULE_WEIGHT_PAYMENT_REQUEST,
            explanation_key="payment_request",
        ))

    # OTP_REQUEST
    matches = _match_any(text, _OTP_PHRASES)
    if matches:
        indicators.append(Indicator(
            code=IndicatorCode.OTP_REQUEST,
            severity=Severity.CRITICAL,
            source=DetectionSource.RULE,
            evidence=f"OTP/verification code request detected: {', '.join(matches[:3])}",
            weight=settings.RULE_WEIGHT_OTP_REQUEST,
            explanation_key="otp_request",
        ))

    # PASSWORD_REQUEST
    matches = _match_any(text, _PASSWORD_PHRASES)
    if matches:
        indicators.append(Indicator(
            code=IndicatorCode.PASSWORD_REQUEST,
            severity=Severity.CRITICAL,
            source=DetectionSource.RULE,
            evidence=f"Password/credential request detected: {', '.join(matches[:3])}",
            weight=settings.RULE_WEIGHT_PASSWORD_REQUEST,
            explanation_key="password_request",
        ))

    # URGENCY
    matches = _match_any(text, _URGENCY_PHRASES)
    if matches:
        indicators.append(Indicator(
            code=IndicatorCode.URGENCY,
            severity=Severity.MEDIUM,
            source=DetectionSource.RULE,
            evidence=f"Urgency/pressure language detected: {', '.join(matches[:3])}",
            weight=settings.RULE_WEIGHT_URGENCY,
            explanation_key="urgency",
        ))

    # GUARANTEED_SELECTION
    matches = _match_any(text, _GUARANTEED_SELECTION_PHRASES)
    if matches:
        indicators.append(Indicator(
            code=IndicatorCode.GUARANTEED_SELECTION,
            severity=Severity.HIGH,
            source=DetectionSource.RULE,
            evidence=f"Guaranteed selection claim: {', '.join(matches[:3])}",
            weight=settings.RULE_WEIGHT_GUARANTEED_SELECTION,
            explanation_key="guaranteed_selection",
        ))

    # UNREALISTIC_REWARD
    matches = _match_any(text, _UNREALISTIC_REWARD_PHRASES)
    if matches:
        indicators.append(Indicator(
            code=IndicatorCode.UNREALISTIC_REWARD,
            severity=Severity.MEDIUM,
            source=DetectionSource.RULE,
            evidence=f"Unrealistic reward promise: {', '.join(matches[:3])}",
            weight=settings.RULE_WEIGHT_UNREALISTIC_REWARD,
            explanation_key="unrealistic_reward",
        ))

    # PERSONAL_DOCUMENT_REQUEST
    matches = _match_any(text, _PERSONAL_DOC_PHRASES)
    if matches:
        indicators.append(Indicator(
            code=IndicatorCode.PERSONAL_DOCUMENT_REQUEST,
            severity=Severity.MEDIUM,
            source=DetectionSource.RULE,
            evidence=f"Personal document request: {', '.join(matches[:3])}",
            weight=settings.RULE_WEIGHT_PERSONAL_DOCUMENT_REQUEST,
            explanation_key="personal_document_request",
        ))

    return indicators


def infer_scam_category(indicators: list[Indicator], context: Optional[str] = None) -> Optional[ScamCategory]:
    """Infer the most likely scam category from indicators and context."""
    codes = {i.code for i in indicators}

    if IndicatorCode.OTP_REQUEST in codes or IndicatorCode.PASSWORD_REQUEST in codes:
        return ScamCategory.OTP_CREDENTIAL_THEFT

    if IndicatorCode.PAYMENT_REQUEST in codes:
        return ScamCategory.PAYMENT_SCAM

    if IndicatorCode.GUARANTEED_SELECTION in codes:
        if context in ("internship",):
            return ScamCategory.FAKE_INTERNSHIP
        if context in ("job", "placement"):
            return ScamCategory.FAKE_JOB
        return ScamCategory.FAKE_JOB

    if IndicatorCode.UNREALISTIC_REWARD in codes:
        return ScamCategory.PRIZE_REWARD_SCAM

    # Context-based fallback
    if context == "internship" and indicators:
        return ScamCategory.FAKE_INTERNSHIP
    if context == "job" and indicators:
        return ScamCategory.FAKE_JOB
    if context == "scholarship" and indicators:
        return ScamCategory.FAKE_SCHOLARSHIP
    if context == "training" and indicators:
        return ScamCategory.FAKE_TRAINING

    if indicators:
        return ScamCategory.OTHER

    return None
