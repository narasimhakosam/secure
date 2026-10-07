"""Explanation generator — converts structured evidence into student-friendly reasons (Architecture §3).

Contract: Must not fabricate reasons. Every reason maps to detected evidence.
Format: Signal → Why it matters → Suggested action (LLD §9).
"""

from app.domain.enums import IndicatorCode
from app.domain.models import Indicator


# ── Explanation templates per indicator code ─────────────────
# Format: (Signal, Why it matters, Suggested action)

_EXPLANATION_TEMPLATES: dict[IndicatorCode, tuple[str, str, str]] = {
    IndicatorCode.PAYMENT_REQUEST: (
        "An upfront payment or fee is requested.",
        "Legitimate employers and educational institutions do not ask candidates to pay registration fees, security deposits, or training charges before onboarding.",
        "Do not make any payment until you have independently verified the organization.",
    ),
    IndicatorCode.OTP_REQUEST: (
        "You are asked to share an OTP or verification code.",
        "Sharing OTPs can give scammers access to your bank accounts, WhatsApp, or email. No legitimate recruiter will ever ask for your verification codes.",
        "Never share OTPs, PINs, or verification codes with anyone.",
    ),
    IndicatorCode.PASSWORD_REQUEST: (
        "You are asked to share login credentials or passwords.",
        "Sharing passwords gives attackers direct access to your accounts. Legitimate organizations never request your personal passwords.",
        "Never share passwords, PINs, CVVs, or recovery codes.",
    ),
    IndicatorCode.URGENCY: (
        "The message uses pressure tactics or artificial deadlines.",
        "Scammers create urgency to prevent you from researching or verifying the offer. Genuine opportunities allow reasonable time for decision-making.",
        "Take your time. Research the organization before responding.",
    ),
    IndicatorCode.GUARANTEED_SELECTION: (
        "The offer claims guaranteed selection or placement without a proper screening process.",
        "No legitimate employer can guarantee placement without evaluating your skills. This is a common tactic used in fake job and internship scams.",
        "Be skeptical of guaranteed offers. Verify through official channels.",
    ),
    IndicatorCode.UNREALISTIC_REWARD: (
        "The promised reward or compensation appears unrealistically high.",
        "Exaggerated income promises are a hallmark of scam schemes designed to lure victims with the prospect of easy money.",
        "Research typical compensation for similar roles before engaging.",
    ),
    IndicatorCode.SUSPICIOUS_DOMAIN: (
        "The URL shows suspicious characteristics.",
        "The domain has features commonly associated with phishing or scam websites, such as unusual hosting, misleading subdomains, or suspicious path structure.",
        "Do not click the link or enter any information. Verify the URL independently.",
    ),
    IndicatorCode.KNOWN_PHISHING_URL: (
        "The URL matches a known phishing or malicious address.",
        "This URL has been flagged by threat intelligence services as associated with phishing, malware, or fraud.",
        "Do not visit this URL. Report it if possible.",
    ),
    IndicatorCode.IMPERSONATED_BRAND: (
        "The domain appears to impersonate a well-known brand.",
        "The URL contains a brand name but is not hosted on the brand's official domain. This is a common impersonation technique used in phishing.",
        "Visit the official website of the brand directly by typing it in your browser.",
    ),
    IndicatorCode.PERSONAL_DOCUMENT_REQUEST: (
        "You are asked to upload personal identity documents.",
        "Sharing identity documents like Aadhaar, PAN card, or passport with unverified entities can lead to identity theft.",
        "Do not upload identity documents until you have verified the organization is legitimate.",
    ),
}


def generate_explanations(indicators: list[Indicator]) -> list[str]:
    """Generate human-readable explanations from indicators.

    Each explanation follows: Signal → Why it matters → Suggested action.
    Only uses evidence from the indicators; never fabricates reasons.
    """
    reasons: list[str] = []
    seen_codes: set[IndicatorCode] = set()

    for indicator in indicators:
        if indicator.code in seen_codes:
            continue
        seen_codes.add(indicator.code)

        template = _EXPLANATION_TEMPLATES.get(indicator.code)
        if template:
            signal, why, action = template
            reason = f"{signal} {why} {action}"
            reasons.append(reason)
        else:
            # Fallback: use the indicator's own evidence
            reasons.append(indicator.evidence)

    return reasons
