"""Analysis orchestrator — coordinates all analysis components (HLD §2).

Implements the data flow from Architecture §4:
1. Normalize input
2. Extract URLs
3. Run rule engine + URL analyzer
4. Calculate risk score
5. Classify
6. Generate explanations and actions
7. Return structured result
"""

from typing import Optional

from app.config import settings
from app.domain.enums import AnalysisContext
from app.domain.models import AnalysisResult, URLDetails
from app.services.preprocessing import (
    extract_urls,
    normalize_text,
    truncate_text,
    validate_url_scheme,
)
from app.services.rule_engine import detect_indicators, infer_scam_category
from app.services.url_service import analyze_url
from app.services.risk_engine import calculate_score, classify, calculate_confidence
from app.services.explanation_service import generate_explanations
from app.services.recommendation_service import recommend_actions


def analyze(
    text: Optional[str] = None,
    url: Optional[str] = None,
    context: AnalysisContext = AnalysisContext.UNKNOWN,
) -> AnalysisResult:
    """Run the full analysis pipeline.

    Orchestrates: preprocess → rules → URL analysis → scoring → explain → recommend.
    """
    result = AnalysisResult()
    all_indicators = []
    url_score = 0

    # ── Step 1: Normalize and preprocess text ────────────
    if text:
        text = normalize_text(text)
        text = truncate_text(text, settings.MAX_TEXT_LENGTH)

        # Step 2: Extract URLs from text
        embedded_urls = extract_urls(text)

        # Step 3a: Run rule engine on text
        text_indicators = detect_indicators(text)
        all_indicators.extend(text_indicators)

        # Step 3b: Analyze extracted URLs
        for extracted_url in embedded_urls:
            if validate_url_scheme(extracted_url):
                url_details = analyze_url(extracted_url)
                all_indicators.extend(url_details.indicators)
                url_score = max(url_score, url_details.risk_score)
                if result.url_details is None:
                    result.url_details = url_details

    # ── Step 4: Analyze explicit URL ─────────────────────
    if url:
        if validate_url_scheme(url):
            url_details = analyze_url(url)
            all_indicators.extend(url_details.indicators)
            url_score = max(url_score, url_details.risk_score)
            # Prefer explicit URL details over extracted ones
            result.url_details = url_details

    # ── Step 5: Deduplicate indicators ───────────────────
    seen_codes = set()
    unique_indicators = []
    for indicator in all_indicators:
        if indicator.code not in seen_codes:
            seen_codes.add(indicator.code)
            unique_indicators.append(indicator)

    # ── Step 6: Calculate risk score ─────────────────────
    risk_score = calculate_score(unique_indicators, url_score=url_score)
    classification = classify(risk_score)
    confidence = calculate_confidence(unique_indicators, url_score)

    # ── Step 7: Generate explanations and actions ────────
    reasons = generate_explanations(unique_indicators)
    actions = recommend_actions(unique_indicators, classification)

    # ── Step 8: Infer scam category ──────────────────────
    scam_category = infer_scam_category(unique_indicators, context.value if context else None)

    # ── Build result ─────────────────────────────────────
    result.risk_score = risk_score
    result.classification = classification
    result.scam_category = scam_category
    result.confidence = round(confidence, 2)
    result.indicators = unique_indicators
    result.reasons = reasons
    result.recommended_actions = actions

    return result
