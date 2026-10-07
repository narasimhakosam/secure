# Low-Level Design (LLD)

## 1. Backend Package Structure

```text
backend/
  app/
    main.py
    api/
      v1/
        analyze.py
        education.py
        health.py
    schemas/
      analyze.py
      common.py
    services/
      orchestrator.py
      preprocessing.py
      nlp_service.py
      url_service.py
      rule_engine.py
      risk_engine.py
      explanation_service.py
      recommendation_service.py
    domain/
      models.py
      enums.py
    adapters/
      reputation.py
      model_repository.py
    config.py
  tests/
```

## 2. Core Data Models

### AnalysisRequest
```json
{
  "text": "string|null",
  "url": "string|null",
  "context": "internship|job|scholarship|training|placement|unknown"
}
```

Validation:
- at least one of `text` or `url` is required
- maximum text length should be configured
- URL must be syntactically valid when supplied

### AnalysisResponse
```json
{
  "analysis_id": "uuid",
  "model_version": "string",
  "ruleset_version": "string",
  "risk_score": 0,
  "classification": "safe",
  "scam_category": "fake_internship",
  "confidence": 0.91,
  "indicators": [
    {
      "code": "PAYMENT_REQUEST",
      "severity": "high",
      "evidence": "registration fee requested",
      "weight": 25
    }
  ],
  "reasons": ["Upfront payment is requested."],
  "recommended_actions": ["Do not make the payment."],
  "url_details": null,
  "disclaimer": "Risk assessment only; independently verify important opportunities."
}
```

## 3. Indicator Model
Each indicator must have:
- stable code
- severity
- detection source (`rule`, `model`, `reputation`)
- human-readable explanation key
- scoring contribution
- optional evidence

Example indicator codes:
- `PAYMENT_REQUEST`
- `OTP_REQUEST`
- `PASSWORD_REQUEST`
- `URGENCY`
- `GUARANTEED_SELECTION`
- `UNREALISTIC_REWARD`
- `SUSPICIOUS_DOMAIN`
- `KNOWN_PHISHING_URL`
- `IMPERSONATED_BRAND`
- `PERSONAL_DOCUMENT_REQUEST`

## 4. Risk Calculation

Recommended sequence:
1. Compute model probability `p_model`.
2. Convert probability to a base model score.
3. Sum weighted rule indicators.
4. Add URL/reputation contribution.
5. Apply caps and duplicate-indicator suppression.
6. Clamp final score to [0,100].
7. Map score to configured classification.

Pseudo-code:
```python
def calculate_score(model_score, indicators, url_score):
    raw = model_score + sum(i.weight for i in unique(indicators)) + url_score
    return max(0, min(100, raw))
```

The real implementation must keep weights in configuration and include unit tests for boundary conditions.

## 5. Rule Engine
Rules should be deterministic and independently testable.

Examples:
```text
IF text contains payment + registration/application fee language
THEN PAYMENT_REQUEST

IF text requests OTP/PIN/password/recovery code
THEN OTP_REQUEST or PASSWORD_REQUEST

IF text contains guaranteed placement/selection + little/no screening
THEN GUARANTEED_SELECTION

IF strong urgency phrases + deadline + payment/action request
THEN URGENCY
```

Use multilingual/variant phrase sets and avoid one-word rules that create excessive false positives.

## 6. URL Analyzer
Extract features without assuming a URL is malicious merely because one feature is unusual.

Suggested features:
- URL length
- hostname length
- number of subdomains
- presence of IP literal
- punycode indicator
- suspicious tokens in hostname/path
- excessive special characters
- redirect/shortener pattern
- HTTPS scheme
- known reputation match
- brand/domain similarity signal when implemented

## 7. ML Pipeline
### Baseline
- text cleaning
- TF-IDF word + character n-grams
- Logistic Regression or Linear SVM

### Upgrade
- DistilBERT/other compact transformer classifier
- calibrated probability output
- optional category classifier

Keep the baseline available for offline/demo fallback.

## 8. Model Artifact Contract
The model artifact must store:
- model version
- tokenizer/vectorizer version
- label mapping
- training dataset version/hash
- evaluation metrics
- training date

## 9. Explanation Contract
The explanation service can only use structured evidence produced by analyzers. It must not fabricate reasons.

Every reason should follow:
**Signal → Why it matters → Suggested action**

Example:
“An upfront registration fee is requested. Legitimate opportunities may have fees, but unexpected payment demands are a common fraud signal. Verify the organization independently before paying.”
