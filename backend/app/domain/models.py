"""Domain data models per LLD §2."""

from dataclasses import dataclass, field
from typing import Optional

from app.domain.enums import (
    IndicatorCode,
    Severity,
    DetectionSource,
    ScamCategory,
    RiskClassification,
)


@dataclass
class Indicator:
    """A single scam indicator with traceable evidence (LLD §3)."""
    code: IndicatorCode
    severity: Severity
    source: DetectionSource
    evidence: str
    weight: int
    explanation_key: Optional[str] = None


@dataclass
class URLDetails:
    """URL analysis findings."""
    url: str
    is_https: bool = False
    hostname_length: int = 0
    subdomain_count: int = 0
    has_ip_literal: bool = False
    has_punycode: bool = False
    suspicious_tokens: list[str] = field(default_factory=list)
    is_shortener: bool = False
    risk_score: int = 0
    indicators: list[Indicator] = field(default_factory=list)


@dataclass
class AnalysisResult:
    """Complete analysis result returned by the orchestrator."""
    risk_score: int = 0
    classification: RiskClassification = RiskClassification.SAFE
    scam_category: Optional[ScamCategory] = None
    confidence: float = 0.0
    indicators: list[Indicator] = field(default_factory=list)
    reasons: list[str] = field(default_factory=list)
    recommended_actions: list[str] = field(default_factory=list)
    url_details: Optional[URLDetails] = None
    disclaimer: str = "Risk assessment only; independently verify important opportunities."
