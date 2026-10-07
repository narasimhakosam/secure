# Product Requirements Document (PRD)

## 1. Product Overview
**Product:** Student ScamGuard AI  
**Type:** Web-based AI security assistant  
**Primary Goal:** Help students make safer decisions about digital opportunities.

## 2. Product Goals
- Detect common scam indicators in student-oriented opportunity messages.
- Assess URLs for suspicious characteristics and known phishing signals.
- Produce a transparent 0–100 risk score.
- Explain findings in simple language.
- Recommend specific actions such as verify, avoid payment, or do not share OTP/passwords.
- Provide educational examples of common scams.

## 3. Non-Goals for MVP
- Automatic blocking of WhatsApp/Telegram/email messages.
- Guaranteeing that a company or URL is legitimate.
- Automatic reporting to law-enforcement agencies.
- Fully autonomous web browsing or credential submission.
- Real-time malware sandboxing of downloaded files.

## 4. Functional Requirements

### FR-01 Message Analysis
The user can paste plain text into the analyzer.

**Input:** message text, optional context/category.

**Output:** risk score, classification, scam category, indicators, explanation, recommended actions.

### FR-02 URL Analysis
The user can submit a URL.

**Output:** URL risk result, suspicious URL features, reputation result when available, and recommended action.

### FR-03 Combined Analysis
The system may analyze a message and extracted URL together. Message findings and URL findings contribute to one combined result without double-counting identical indicators.

### FR-04 Risk Classification
Default thresholds:
- **0–29:** Safe / Low concern
- **30–59:** Suspicious / Review carefully
- **60–100:** High Risk / Avoid until independently verified

Thresholds must be configuration-driven, not hardcoded across the codebase.

### FR-05 Explainability
Every non-trivial risk result must contain at least one human-readable reason. Reasons should map to detected evidence.

### FR-06 Scam Categories
Supported categories for MVP:
- Fake internship
- Fake job/placement
- Fake scholarship
- Fake training/certification
- Payment/registration fee scam
- OTP/credential theft
- Phishing/login impersonation
- Prize/reward scam
- Other suspicious opportunity

### FR-07 Safety Actions
Recommended actions should include relevant guidance, for example:
- Do not pay upfront fees.
- Do not share OTP, PIN, passwords, or recovery codes.
- Verify the organization using an independently found official website/contact.
- Avoid opening suspicious links.
- Do not upload identity documents until the organization is verified.

### FR-08 History
Optional MVP+ feature: retain recent user analyses locally or in an authenticated account. Do not retain raw sensitive content by default.

### FR-09 Education
Provide a scam-awareness page with common student scam examples and warning signs.

## 5. Non-Functional Requirements
- **Latency:** target < 3 seconds for text-only analysis excluding slow third-party services.
- **Availability:** graceful degradation when external URL reputation services are unavailable.
- **Security:** never log API keys, passwords, OTPs, or full sensitive user content.
- **Privacy:** minimize retention; make retention explicit.
- **Accessibility:** keyboard navigable and readable on mobile and desktop.
- **Explainability:** score and reasons must be traceable to evidence.

## 6. MVP User Journey
1. User opens home page.
2. User pastes suspicious message or URL.
3. User clicks Analyze.
4. Frontend validates input.
5. Backend normalizes content and extracts URLs.
6. NLP/rule engine and URL engine generate features.
7. Risk engine combines signals.
8. API returns score, label, explanations, and actions.
9. UI presents result with clear visual severity.
10. User can view “Why?” and “What should I do?” sections.

## 7. Acceptance Criteria
- A valid message can be analyzed successfully.
- A valid URL can be analyzed successfully.
- Invalid/empty input is rejected with a clear message.
- Every high-risk result contains evidence and recommended actions.
- The API does not expose secrets.
- External reputation service failure does not crash the analyzer.
- Automated tests cover scoring and core API behavior.

## 8. Suggested Default Stack
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Python + FastAPI
- ML/NLP: scikit-learn baseline; Transformers/DistilBERT as an upgrade path
- Database: PostgreSQL (optional for MVP; SQLite is acceptable for local demo)
- Validation: Pydantic
- Testing: Pytest + Vitest
- Packaging: Docker / Docker Compose
