"""Input preprocessor — normalizes text and extracts URLs (Architecture §3)."""

import re
import unicodedata
from typing import Optional
from urllib.parse import urlparse


# Regex to extract URLs from text
_URL_PATTERN = re.compile(
    r"https?://[^\s<>\"']+|www\.[^\s<>\"']+",
    re.IGNORECASE,
)

# Common confusable Unicode characters
_CONFUSABLE_MAP = {
    "\u0430": "a",  # Cyrillic а → Latin a
    "\u0435": "e",  # Cyrillic е → Latin e
    "\u043e": "o",  # Cyrillic о → Latin o
    "\u0440": "p",  # Cyrillic р → Latin p
    "\u0441": "c",  # Cyrillic с → Latin c
    "\u0443": "y",  # Cyrillic у → Latin y
    "\u0445": "x",  # Cyrillic х → Latin x
}


def normalize_text(text: str) -> str:
    """Normalize whitespace, Unicode, and basic formatting.

    - NFC normalization
    - Collapse multiple spaces/newlines
    - Strip leading/trailing whitespace
    - Replace confusable Unicode characters
    """
    # NFC normalize
    text = unicodedata.normalize("NFC", text)

    # Replace confusable characters
    for confusable, replacement in _CONFUSABLE_MAP.items():
        text = text.replace(confusable, replacement)

    # Collapse whitespace
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()


def extract_urls(text: str) -> list[str]:
    """Extract all URLs from text content."""
    urls = _URL_PATTERN.findall(text)
    cleaned: list[str] = []
    for url in urls:
        # Ensure scheme
        if url.startswith("www."):
            url = f"https://{url}"
        # Remove trailing punctuation
        url = url.rstrip(".,;:!?)")
        cleaned.append(url)
    return list(dict.fromkeys(cleaned))  # deduplicate preserving order


def validate_url_scheme(url: str) -> bool:
    """Validate URL scheme is http or https only (Security: HLD §5)."""
    try:
        parsed = urlparse(url)
        return parsed.scheme in ("http", "https")
    except Exception:
        return False


def redact_sensitive(text: str) -> str:
    """Redact potential sensitive data for logging (Security: never log OTPs, passwords, etc.)."""
    # Redact phone numbers
    redacted = re.sub(r"\b\d{10,13}\b", "[PHONE_REDACTED]", text)
    # Redact email addresses
    redacted = re.sub(r"\b[\w.+-]+@[\w-]+\.[\w.]+\b", "[EMAIL_REDACTED]", redacted)
    # Redact UPI IDs
    redacted = re.sub(r"\b[\w.]+@[a-z]+\b", "[UPI_REDACTED]", redacted)
    # Redact 4-8 digit OTP-like numbers
    redacted = re.sub(r"\b\d{4,8}\b", "[OTP_REDACTED]", redacted)
    return redacted


def truncate_text(text: str, max_length: int = 2000) -> str:
    """Truncate text to maximum allowed length."""
    if len(text) > max_length:
        return text[:max_length]
    return text
