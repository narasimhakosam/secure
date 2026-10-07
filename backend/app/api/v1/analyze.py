"""Analysis API endpoints (HLD §3).

POST /api/v1/analyze       — Combined text + URL analysis
POST /api/v1/analyze/text  — Text-only analysis
POST /api/v1/analyze/url   — URL-only analysis
"""

from fastapi import APIRouter, HTTPException

from app.config import settings
from app.domain.enums import AnalysisContext
from app.schemas.analyze import (
    AnalysisRequest,
    AnalysisResponse,
    ErrorResponse,
    IndicatorResponse,
    TextAnalysisRequest,
    URLAnalysisRequest,
    URLDetailsResponse,
)
from app.services.orchestrator import analyze

router = APIRouter(prefix="/analyze", tags=["Analysis"])


def _result_to_response(result) -> AnalysisResponse:
    """Convert domain AnalysisResult to API response schema."""
    indicators = [
        IndicatorResponse(
            code=ind.code,
            severity=ind.severity,
            source=ind.source,
            evidence=ind.evidence,
            weight=ind.weight,
        )
        for ind in result.indicators
    ]

    url_details = None
    if result.url_details:
        ud = result.url_details
        url_details = URLDetailsResponse(
            url=ud.url,
            is_https=ud.is_https,
            hostname_length=ud.hostname_length,
            subdomain_count=ud.subdomain_count,
            has_ip_literal=ud.has_ip_literal,
            has_punycode=ud.has_punycode,
            suspicious_tokens=ud.suspicious_tokens,
            is_shortener=ud.is_shortener,
            risk_score=ud.risk_score,
            indicators=[
                IndicatorResponse(
                    code=i.code,
                    severity=i.severity,
                    source=i.source,
                    evidence=i.evidence,
                    weight=i.weight,
                )
                for i in ud.indicators
            ],
        )

    return AnalysisResponse(
        model_version=settings.MODEL_VERSION,
        ruleset_version=settings.RULESET_VERSION,
        risk_score=result.risk_score,
        classification=result.classification,
        scam_category=result.scam_category,
        confidence=result.confidence,
        indicators=indicators,
        reasons=result.reasons,
        recommended_actions=result.recommended_actions,
        url_details=url_details,
        disclaimer=result.disclaimer,
    )


@router.post(
    "",
    response_model=AnalysisResponse,
    responses={400: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
    summary="Combined analysis of text and/or URL",
)
async def analyze_combined(request: AnalysisRequest):
    """Analyze a message and/or URL for scam indicators."""
    result = analyze(
        text=request.text,
        url=request.url,
        context=request.context,
    )
    return _result_to_response(result)


@router.post(
    "/text",
    response_model=AnalysisResponse,
    responses={400: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
    summary="Analyze text message only",
)
async def analyze_text(request: TextAnalysisRequest):
    """Analyze a text message for scam indicators."""
    result = analyze(
        text=request.text,
        context=request.context,
    )
    return _result_to_response(result)


@router.post(
    "/url",
    response_model=AnalysisResponse,
    responses={400: {"model": ErrorResponse}, 422: {"model": ErrorResponse}},
    summary="Analyze URL only",
)
async def analyze_url_endpoint(request: URLAnalysisRequest):
    """Analyze a URL for suspicious characteristics."""
    result = analyze(url=request.url)
    return _result_to_response(result)
