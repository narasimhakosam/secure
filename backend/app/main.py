"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.api.v1.analyze import router as analyze_router
from app.api.v1.health import router as health_router
from app.api.v1.education import router as education_router


def create_app() -> FastAPI:
    """Application factory."""
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description=(
            "An explainable AI assistant that helps students identify "
            "potentially fraudulent job, internship, scholarship, training, "
            "and placement opportunities."
        ),
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # ── CORS ─────────────────────────────────────────────
    raw_origins = settings.CORS_ORIGINS
    if isinstance(raw_origins, str):
        cors_origins = [o.strip() for o in raw_origins.split(",") if o.strip()]
    else:
        cors_origins = list(raw_origins)

    has_wildcard = "*" in cors_origins

    app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_origins,
        allow_origin_regex=r"https://.*\.vercel\.app" if not has_wildcard else None,
        allow_credentials=not has_wildcard,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # ── Routers ──────────────────────────────────────────
    app.include_router(analyze_router, prefix="/api/v1")
    app.include_router(health_router, prefix="/api/v1")
    app.include_router(education_router, prefix="/api/v1")

    @app.get("/", tags=["Root"])
    async def root():
        return {
            "name": settings.APP_NAME,
            "version": settings.APP_VERSION,
            "docs": "/docs",
        }

    return app


app = create_app()
