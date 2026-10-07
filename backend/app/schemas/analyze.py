"""Pydantic schemas for API request/response contracts (LLD §2)."""

from __future__ import annotations

from typing import Optional
from uuid import uuid4

from pydantic import BaseModel, Field, model_validator

from app.domain.enums import (
    AnalysisContext,
    IndicatorCode,
    RiskClassification,
    ScamCategory,
    Severity,
    DetectionSource,
)


# ── Request schemas ──────────────────────────────────────────


class AnalysisRequest(BaseModel):
    """Combined analysis request. At least one of text or url is required."""
    text: Optional[str] = Field(None, max_length=2000, description="Message text to analyze")
    url: Optional[str] = Field(None, max_length=2048, description="URL to analyze")
    context: AnalysisContext = Field(AnalysisContext.UNKNOWN, description="Offer category context")

    @model_validator(mode="after")
    def at_least_one_input(self):
        if not self.text and not self.url:
            raise ValueError("At least one of 'text' or 'url' must be provided.")
        return self


class TextAnalysisRequest(BaseModel):
    """Text-only analysis request."""
    text: str = Field(..., min_length=1, max_length=2000)
    context: AnalysisContext = Field(AnalysisContext.UNKNOWN)


class URLAnalysisRequest(BaseModel):
    """URL-only analysis request."""
    url: str = Field(..., min_length=1, max_length=2048)


# ── Response schemas ─────────────────────────────────────────


class IndicatorResponse(BaseModel):
    """Serializable indicator for the API response."""
    code: IndicatorCode
    severity: Severity
    source: DetectionSource
    evidence: str
    weight: int


class URLDetailsResponse(BaseModel):
    """URL analysis details in the API response."""
    url: str
    is_https: bool
    hostname_length: int
    subdomain_count: int
    has_ip_literal: bool
    has_punycode: bool
    suspicious_tokens: list[str]
    is_shortener: bool
    risk_score: int
    indicators: list[IndicatorResponse]


class AnalysisResponse(BaseModel):
    """Full analysis API response per LLD §2."""
    analysis_id: str = Field(default_factory=lambda: str(uuid4()))
    model_version: str
    ruleset_version: str
    risk_score: int = Field(ge=0, le=100)
    classification: RiskClassification
    scam_category: Optional[ScamCategory] = None
    confidence: float = Field(ge=0.0, le=1.0)
    indicators: list[IndicatorResponse]
    reasons: list[str]
    recommended_actions: list[str]
    url_details: Optional[URLDetailsResponse] = None
    disclaimer: str = "Risk assessment only; independently verify important opportunities."


class HealthResponse(BaseModel):
    """Health endpoint response."""
    status: str = "ok"
    version: str
    model_version: str
    ruleset_version: str


class ErrorResponse(BaseModel):
    """Standard error response."""
    detail: str


class ScamTypeInfo(BaseModel):
    """Education content for a single scam type."""
    id: str
    title: str
    description: str
    warning_signs: list[str]
    example: str
    risk_weight: int
    category: str


class EducationResponse(BaseModel):
    """Education endpoint response."""
    scam_types: list[ScamTypeInfo]
