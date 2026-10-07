"""Tests for API endpoints."""

import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


class TestHealthEndpoint:
    def test_health_returns_ok(self):
        response = client.get("/api/v1/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert "version" in data
        assert "model_version" in data


class TestAnalyzeEndpoint:
    def test_analyze_text_success(self):
        response = client.post(
            "/api/v1/analyze/text",
            json={
                "text": "Pay Rs. 1,999 registration fee for internship.",
                "context": "internship",
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert "risk_score" in data
        assert "classification" in data
        assert "indicators" in data
        assert "reasons" in data
        assert "recommended_actions" in data
        assert data["risk_score"] > 0

    def test_analyze_combined_success(self):
        response = client.post(
            "/api/v1/analyze",
            json={
                "text": "Send your OTP now to verify. Pay Rs. 2,000.",
                "url": "https://fake-google-careers.xyz/apply",
                "context": "job",
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert data["risk_score"] > 0
        assert len(data["indicators"]) > 0

    def test_analyze_empty_input_rejected(self):
        response = client.post(
            "/api/v1/analyze",
            json={},
        )
        assert response.status_code == 422

    def test_analyze_url_only(self):
        response = client.post(
            "/api/v1/analyze/url",
            json={"url": "https://suspicious-site.xyz/login/verify"},
        )
        assert response.status_code == 200
        data = response.json()
        assert "risk_score" in data

    def test_clean_text_low_risk(self):
        response = client.post(
            "/api/v1/analyze/text",
            json={
                "text": "We have a software engineering position open. Apply on our careers page.",
            },
        )
        assert response.status_code == 200
        data = response.json()
        assert data["risk_score"] < 30


class TestEducationEndpoint:
    def test_get_scam_types(self):
        response = client.get("/api/v1/education/scam-types")
        assert response.status_code == 200
        data = response.json()
        assert "scam_types" in data
        assert len(data["scam_types"]) > 0
        for scam in data["scam_types"]:
            assert "title" in scam
            assert "warning_signs" in scam
            assert "example" in scam
