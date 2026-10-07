"""URL feature extraction and analysis service (LLD §6).

Extracts lexical/structural URL features without assuming a URL is malicious
merely because one feature is unusual.
"""

import re
from urllib.parse import urlparse
from typing import Optional

from app.config import settings
from app.domain.enums import (
    DetectionSource,
    IndicatorCode,
    Severity,
)
from app.domain.models import Indicator, URLDetails


# ── Known suspicious patterns ────────────────────────────────

_SHORTENER_DOMAINS = {
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly",
    "is.gd", "buff.ly", "rebrand.ly", "short.io", "cutt.ly",
    "rb.gy", "surl.li", "v.gd", "tiny.cc", "clck.ru",
}

_FREE_HOSTING_DOMAINS = {
    "000webhostapp.com", "herokuapp.com", "netlify.app",
    "vercel.app", "pages.dev", "web.app", "firebaseapp.com",
    "blogspot.com", "wordpress.com", "wixsite.com",
    "weebly.com", "sites.google.com", "docs.google.com",
    "forms.gle", "forms.google.com",
}

_SUSPICIOUS_PATH_TOKENS = {
    "login", "signin", "verify", "confirm", "secure",
    "update", "account", "banking", "wallet", "payment",
    "reset", "suspend", "unlock", "recover", "activate",
}

_WELL_KNOWN_BRANDS = {
    "google", "microsoft", "amazon", "apple", "facebook",
    "instagram", "whatsapp", "telegram", "infosys", "tcs",
    "wipro", "flipkart", "razorpay", "paytm", "swiggy",
    "zomato", "myntra", "byju", "unacademy",
}


def analyze_url(url: str) -> URLDetails:
    """Extract features and indicators from a URL."""
    details = URLDetails(url=url)
    indicators: list[Indicator] = []

    try:
        parsed = urlparse(url)
    except Exception:
        return details

    hostname = parsed.hostname or ""
    path = parsed.path or ""

    # ── Basic features ───────────────────────────────────
    details.is_https = parsed.scheme == "https"
    details.hostname_length = len(hostname)

    # Subdomain count
    parts = hostname.split(".")
    if len(parts) > 2:
        details.subdomain_count = len(parts) - 2
    else:
        details.subdomain_count = 0

    # IP literal
    details.has_ip_literal = bool(re.match(r"^\d{1,3}(\.\d{1,3}){3}$", hostname))

    # Punycode
    details.has_punycode = hostname.startswith("xn--") or "xn--" in hostname

    # URL shortener
    if hostname in _SHORTENER_DOMAINS:
        details.is_shortener = True

    # ── Suspicious tokens ────────────────────────────────
    full_path = (hostname + path).lower()
    found_tokens = [t for t in _SUSPICIOUS_PATH_TOKENS if t in full_path]
    details.suspicious_tokens = found_tokens

    # ── Generate indicators ──────────────────────────────

    # Suspicious domain characteristics
    suspicious_signals = 0

    if details.has_ip_literal:
        suspicious_signals += 1

    if details.has_punycode:
        suspicious_signals += 1

    if not details.is_https:
        suspicious_signals += 1

    if details.hostname_length > 50:
        suspicious_signals += 1

    if details.subdomain_count > 3:
        suspicious_signals += 1

    if details.is_shortener:
        suspicious_signals += 1

    if len(found_tokens) >= 2:
        suspicious_signals += 1

    # Check free hosting
    is_free_hosting = any(hostname.endswith(d) for d in _FREE_HOSTING_DOMAINS)
    if is_free_hosting:
        suspicious_signals += 1

    # Brand impersonation check
    for brand in _WELL_KNOWN_BRANDS:
        if brand in hostname and not hostname.endswith(f"{brand}.com") and not hostname.endswith(f"{brand}.co.in"):
            indicators.append(Indicator(
                code=IndicatorCode.IMPERSONATED_BRAND,
                severity=Severity.HIGH,
                source=DetectionSource.RULE,
                evidence=f"Domain '{hostname}' may impersonate '{brand}'",
                weight=settings.RULE_WEIGHT_IMPERSONATED_BRAND,
                explanation_key="impersonated_brand",
            ))
            suspicious_signals += 2
            break

    # Overall suspicious domain indicator
    if suspicious_signals >= 2:
        evidence_parts = []
        if details.has_ip_literal:
            evidence_parts.append("IP literal hostname")
        if details.has_punycode:
            evidence_parts.append("punycode encoding")
        if not details.is_https:
            evidence_parts.append("no HTTPS")
        if details.hostname_length > 50:
            evidence_parts.append("very long hostname")
        if details.subdomain_count > 3:
            evidence_parts.append("excessive subdomains")
        if details.is_shortener:
            evidence_parts.append("URL shortener")
        if is_free_hosting:
            evidence_parts.append("free hosting platform")
        if found_tokens:
            evidence_parts.append(f"suspicious path tokens: {', '.join(found_tokens[:3])}")

        indicators.append(Indicator(
            code=IndicatorCode.SUSPICIOUS_DOMAIN,
            severity=Severity.HIGH if suspicious_signals >= 3 else Severity.MEDIUM,
            source=DetectionSource.RULE,
            evidence=f"Suspicious URL features: {'; '.join(evidence_parts)}",
            weight=settings.RULE_WEIGHT_SUSPICIOUS_DOMAIN,
            explanation_key="suspicious_domain",
        ))

    # Calculate URL risk sub-score
    url_risk = min(50, suspicious_signals * 10)
    details.risk_score = url_risk
    details.indicators = indicators

    return details
