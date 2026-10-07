"""Domain enumerations per LLD §3 and PRD FR-04/FR-06."""

from enum import Enum


class RiskClassification(str, Enum):
    """Risk labels mapped from score ranges."""
    SAFE = "safe"
    SUSPICIOUS = "suspicious"
    HIGH_RISK = "high_risk"


class ScamCategory(str, Enum):
    """Supported scam categories for MVP (PRD FR-06)."""
    FAKE_INTERNSHIP = "fake_internship"
    FAKE_JOB = "fake_job"
    FAKE_SCHOLARSHIP = "fake_scholarship"
    FAKE_TRAINING = "fake_training"
    PAYMENT_SCAM = "payment_scam"
    OTP_CREDENTIAL_THEFT = "otp_credential_theft"
    PHISHING = "phishing"
    PRIZE_REWARD_SCAM = "prize_reward_scam"
    OTHER = "other"


class IndicatorCode(str, Enum):
    """Stable indicator codes per LLD §3."""
    PAYMENT_REQUEST = "PAYMENT_REQUEST"
    OTP_REQUEST = "OTP_REQUEST"
    PASSWORD_REQUEST = "PASSWORD_REQUEST"
    URGENCY = "URGENCY"
    GUARANTEED_SELECTION = "GUARANTEED_SELECTION"
    UNREALISTIC_REWARD = "UNREALISTIC_REWARD"
    SUSPICIOUS_DOMAIN = "SUSPICIOUS_DOMAIN"
    KNOWN_PHISHING_URL = "KNOWN_PHISHING_URL"
    IMPERSONATED_BRAND = "IMPERSONATED_BRAND"
    PERSONAL_DOCUMENT_REQUEST = "PERSONAL_DOCUMENT_REQUEST"


class Severity(str, Enum):
    """Indicator severity levels."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class DetectionSource(str, Enum):
    """Where the indicator was detected."""
    RULE = "rule"
    MODEL = "model"
    REPUTATION = "reputation"


class AnalysisContext(str, Enum):
    """Context/category selector for analysis request."""
    INTERNSHIP = "internship"
    JOB = "job"
    SCHOLARSHIP = "scholarship"
    TRAINING = "training"
    PLACEMENT = "placement"
    UNKNOWN = "unknown"
