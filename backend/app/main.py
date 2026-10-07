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
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
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
