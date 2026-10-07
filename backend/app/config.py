"""Application configuration using Pydantic settings."""

from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Global application configuration.

    All values can be overridden via environment variables or a .env file.
    """

    # ── App ──────────────────────────────────────────────
    APP_NAME: str = "Student ScamGuard AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # ── Server ───────────────────────────────────────────
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # ── CORS ─────────────────────────────────────────────
    # Environment variable can be "*", comma-separated string, or JSON array string
    CORS_ORIGINS: str = "*"

    @property
    def cors_origins_list(self) -> list[str]:
        raw = (self.CORS_ORIGINS or "").strip()
        if not raw or raw == "*":
            return ["*"]
        if raw.startswith("[") and raw.endswith("]"):
            try:
                import json
                parsed = json.loads(raw)
                if isinstance(parsed, list):
                    return [str(x).strip() for x in parsed]
            except Exception:
                pass
        return [o.strip() for o in raw.split(",") if o.strip()]

    # ── Input limits ─────────────────────────────────────
    MAX_TEXT_LENGTH: int = 2000
    MAX_URL_LENGTH: int = 2048

    # ── Risk thresholds (configuration-driven per PRD FR-04) ─
    SAFE_THRESHOLD: int = 30
    SUSPICIOUS_THRESHOLD: int = 60

    # ── Scoring weights ──────────────────────────────────
    RULE_WEIGHT_PAYMENT_REQUEST: int = 25
    RULE_WEIGHT_OTP_REQUEST: int = 30
    RULE_WEIGHT_PASSWORD_REQUEST: int = 30
    RULE_WEIGHT_URGENCY: int = 15
    RULE_WEIGHT_GUARANTEED_SELECTION: int = 20
    RULE_WEIGHT_UNREALISTIC_REWARD: int = 15
    RULE_WEIGHT_PERSONAL_DOCUMENT_REQUEST: int = 20
    RULE_WEIGHT_SUSPICIOUS_DOMAIN: int = 20
    RULE_WEIGHT_KNOWN_PHISHING_URL: int = 35
    RULE_WEIGHT_IMPERSONATED_BRAND: int = 25

    # ── Model ────────────────────────────────────────────
    MODEL_VERSION: str = "baseline-rules-v1"
    RULESET_VERSION: str = "1.0.0"

    # ── External services (optional enrichment) ──────────
    VIRUSTOTAL_API_KEY: Optional[str] = None
    GOOGLE_SAFEBROWSING_API_KEY: Optional[str] = None

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": True,
    }


settings = Settings()
