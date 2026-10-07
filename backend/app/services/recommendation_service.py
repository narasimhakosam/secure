"""Safety action recommender — maps risk types to actionable guidance (Architecture §3, PRD FR-07)."""

from app.domain.enums import IndicatorCode, RiskClassification
from app.domain.models import Indicator


# ── Action map per indicator ─────────────────────────────────

_ACTION_MAP: dict[IndicatorCode, list[str]] = {
    IndicatorCode.PAYMENT_REQUEST: [
        "Do not pay any registration fee, security deposit, or processing charge.",
        "Verify the organization using an independently found official website or contact.",
    ],
    IndicatorCode.OTP_REQUEST: [
        "Do not share your OTP, PIN, or verification code with anyone.",
        "If you have already shared an OTP, change your passwords immediately.",
        "Enable two-factor authentication on all important accounts.",
    ],
    IndicatorCode.PASSWORD_REQUEST: [
        "Do not share your passwords, PINs, CVVs, or recovery codes.",
        "If credentials were shared, change them immediately on all accounts.",
        "Report the incident to the platform where you received the message.",
    ],
    IndicatorCode.URGENCY: [
        "Take your time — legitimate opportunities do not impose unreasonable deadlines.",
        "Research the organization before responding to any time-pressured request.",
    ],
    IndicatorCode.GUARANTEED_SELECTION: [
        "Be skeptical of offers that guarantee selection without any evaluation.",
        "Verify the company through official channels like LinkedIn, the company website, or your placement cell.",
    ],
    IndicatorCode.UNREALISTIC_REWARD: [
        "Research typical compensation for similar roles and experience levels.",
        "If something sounds too good to be true, it probably is.",
    ],
    IndicatorCode.SUSPICIOUS_DOMAIN: [
        "Do not click the link or enter any information on this website.",
        "If you must check, verify the domain independently by searching for the organization.",
    ],
    IndicatorCode.KNOWN_PHISHING_URL: [
        "Do not visit this URL under any circumstances.",
        "Report this URL to your university or local cyber crime cell.",
    ],
    IndicatorCode.IMPERSONATED_BRAND: [
        "Visit the official website of the brand by typing it directly in your browser.",
        "Do not trust the link provided — it may be impersonating a known brand.",
    ],
    IndicatorCode.PERSONAL_DOCUMENT_REQUEST: [
        "Do not upload identity documents (Aadhaar, PAN, passport) to unverified platforms.",
        "Verify the organization through official channels before sharing any documents.",
    ],
}

# General safe-result actions
_SAFE_ACTIONS = [
    "No major risk indicators were detected, but always exercise caution.",
    "Verify the organization independently before sharing personal information or making payments.",
    "If something feels off, trust your instincts and seek advice from your placement cell or a trusted mentor.",
]


def recommend_actions(
    indicators: list[Indicator],
    classification: RiskClassification,
) -> list[str]:
    """Generate a deduplicated list of recommended safety actions."""
    if not indicators or classification == RiskClassification.SAFE:
        return _SAFE_ACTIONS.copy()

    actions: list[str] = []
    seen: set[str] = set()

    for indicator in indicators:
        indicator_actions = _ACTION_MAP.get(indicator.code, [])
        for action in indicator_actions:
            if action not in seen:
                seen.add(action)
                actions.append(action)

    # Always add a verification reminder
    verify_action = "Verify the organization using an independently found official website or contact."
    if verify_action not in seen:
        actions.append(verify_action)

    return actions
