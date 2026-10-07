"""Tests for the rule engine and risk scoring (AGENTS.md Definition of Done)."""

import pytest

from app.services.rule_engine import detect_indicators, infer_scam_category
from app.services.risk_engine import calculate_score, classify
from app.domain.enums import IndicatorCode, RiskClassification, ScamCategory


class TestRuleEngine:
    """Test deterministic rule detection."""

    def test_payment_request_detected(self):
        text = "Pay Rs. 1,999 registration fee via GooglePay within 2 hours to confirm your seat."
        indicators = detect_indicators(text)
        codes = {i.code for i in indicators}
        assert IndicatorCode.PAYMENT_REQUEST in codes

    def test_otp_request_detected(self):
        text = "Please forward the 6-digit verification code received on SMS immediately."
        indicators = detect_indicators(text)
        codes = {i.code for i in indicators}
        assert IndicatorCode.OTP_REQUEST in codes

    def test_urgency_detected(self):
        text = "Offer expires in 2 hours. Only 3 seats remaining. Hurry!"
        indicators = detect_indicators(text)
        codes = {i.code for i in indicators}
        assert IndicatorCode.URGENCY in codes

    def test_guaranteed_selection_detected(self):
        text = "100% Guaranteed Placement at Tier-1 Companies! Direct appointment letter without tech interview."
        indicators = detect_indicators(text)
        codes = {i.code for i in indicators}
        assert IndicatorCode.GUARANTEED_SELECTION in codes

    def test_password_request_detected(self):
        text = "Please share your login credentials to verify your account."
        indicators = detect_indicators(text)
        codes = {i.code for i in indicators}
        assert IndicatorCode.PASSWORD_REQUEST in codes

    def test_personal_doc_request_detected(self):
        text = "Please upload your Aadhaar card and PAN card for KYC verification."
        indicators = detect_indicators(text)
        codes = {i.code for i in indicators}
        assert IndicatorCode.PERSONAL_DOCUMENT_REQUEST in codes

    def test_clean_text_no_indicators(self):
        text = "We have an open position for a software engineer. Apply through our official career portal."
        indicators = detect_indicators(text)
        assert len(indicators) == 0

    def test_multiple_indicators_detected(self):
        text = (
            "Congratulations! You are selected. No interview required. "
            "Pay Rs. 1,500 registration fee within 2 hours to confirm. "
            "Hurry, only 3 seats left!"
        )
        indicators = detect_indicators(text)
        codes = {i.code for i in indicators}
        assert IndicatorCode.PAYMENT_REQUEST in codes
        assert IndicatorCode.URGENCY in codes
        assert IndicatorCode.GUARANTEED_SELECTION in codes


class TestRiskScoring:
    """Test risk scoring boundaries."""

    def test_zero_score_no_indicators(self):
        score = calculate_score([], url_score=0, model_score=0)
        assert score == 0

    def test_score_clamped_to_100(self):
        from app.domain.enums import Severity, DetectionSource
        from app.domain.models import Indicator
        # Create many high-weight indicators
        indicators = [
            Indicator(
                code=IndicatorCode.PAYMENT_REQUEST,
                severity=Severity.HIGH,
                source=DetectionSource.RULE,
                evidence="test",
                weight=50,
            ),
            Indicator(
                code=IndicatorCode.OTP_REQUEST,
                severity=Severity.CRITICAL,
                source=DetectionSource.RULE,
                evidence="test",
                weight=50,
            ),
            Indicator(
                code=IndicatorCode.PASSWORD_REQUEST,
                severity=Severity.CRITICAL,
                source=DetectionSource.RULE,
                evidence="test",
                weight=50,
            ),
        ]
        score = calculate_score(indicators, url_score=20)
        assert score == 100

    def test_classify_safe(self):
        assert classify(0) == RiskClassification.SAFE
        assert classify(15) == RiskClassification.SAFE
        assert classify(29) == RiskClassification.SAFE

    def test_classify_suspicious(self):
        assert classify(30) == RiskClassification.SUSPICIOUS
        assert classify(45) == RiskClassification.SUSPICIOUS
        assert classify(59) == RiskClassification.SUSPICIOUS

    def test_classify_high_risk(self):
        assert classify(60) == RiskClassification.HIGH_RISK
        assert classify(85) == RiskClassification.HIGH_RISK
        assert classify(100) == RiskClassification.HIGH_RISK


class TestScamCategoryInference:
    """Test scam category inference."""

    def test_otp_theft_category(self):
        text = "Share the 6-digit OTP received on your phone to verify your candidature."
        indicators = detect_indicators(text)
        category = infer_scam_category(indicators)
        assert category == ScamCategory.OTP_CREDENTIAL_THEFT

    def test_payment_scam_category(self):
        text = "Pay Rs. 2,000 registration fee to confirm your internship."
        indicators = detect_indicators(text)
        category = infer_scam_category(indicators, context="internship")
        assert category == ScamCategory.PAYMENT_SCAM

    def test_no_category_for_clean_text(self):
        indicators = []
        category = infer_scam_category(indicators)
        assert category is None
