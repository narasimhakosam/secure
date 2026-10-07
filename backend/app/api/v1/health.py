"""Health endpoint (HLD §3)."""

from fastapi import APIRouter

from app.config import settings
from app.schemas.analyze import HealthResponse

router = APIRouter(tags=["Health"])


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health/readiness check",
)
async def health_check():
    """Check service health and report version metadata."""
    return HealthResponse(
        status="ok",
        version=settings.APP_VERSION,
        model_version=settings.MODEL_VERSION,
        ruleset_version=settings.RULESET_VERSION,
    )
