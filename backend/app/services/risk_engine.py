"""Risk scoring engine — combines all signals (LLD §4).

Implements the scoring formula from the LLD with configuration-driven weights,
duplicate-indicator suppression, and clamping to [0, 100].
"""

from app.config import settings
from app.domain.enums import RiskClassification
from app.domain.models import Indicator


def calculate_score(
    indicators: list[Indicator],
    url_score: int = 0,
    model_score: int = 0,
) -> int:
    """Combine model score, rule indicators, and URL score.

    - Deduplicates indicators by code
    - Applies per-indicator weights
    - Adds URL contribution
    - Clamps to [0, 100]
    """
    # Deduplicate indicators by code, keeping the highest-weight one
    seen: dict[str, int] = {}
    for indicator in indicators:
        code = indicator.code.value
        if code not in seen or indicator.weight > seen[code]:
            seen[code] = indicator.weight

    rule_score = sum(seen.values())
    raw = model_score + rule_score + url_score
    return max(0, min(100, raw))


def classify(score: int) -> RiskClassification:
    """Map a risk score to a classification using configured thresholds."""
    if score < settings.SAFE_THRESHOLD:
        return RiskClassification.SAFE
    elif score < settings.SUSPICIOUS_THRESHOLD:
        return RiskClassification.SUSPICIOUS
    else:
        return RiskClassification.HIGH_RISK


def calculate_confidence(
    indicators: list[Indicator],
    url_score: int = 0,
) -> float:
    """Estimate confidence based on the number and severity of signals."""
    if not indicators and url_score == 0:
        return 0.5  # No signals, neutral confidence

    signal_count = len(indicators)
    high_severity_count = sum(
        1 for i in indicators
        if i.severity.value in ("high", "critical")
    )

    # More signals and higher severities → higher confidence
    base = 0.5
    signal_boost = min(0.3, signal_count * 0.06)
    severity_boost = min(0.15, high_severity_count * 0.05)
    url_boost = min(0.05, url_score * 0.001)

    return min(0.99, base + signal_boost + severity_boost + url_boost)
