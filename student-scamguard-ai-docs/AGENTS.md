# AGENTS.md — Coding Agent Instructions

## Project
**Student ScamGuard AI** is an explainable AI risk-assessment system for suspicious student-oriented opportunities.

## Source of Truth
Before changing code, read:
1. `PROBLEM_STATEMENT.md`
2. `PRD.md`
3. `ARCHITECTURE.md`
4. `HLD.md`
5. `LLD.md`
6. `UI_UX_SPEC.md`

When implementing a feature, preserve consistency with these documents. If code and documentation conflict, do not silently rewrite architecture; update the relevant document after confirming the intended behavior from existing requirements.

## Agent Operating Rules
- Inspect the repository before creating files.
- Reuse existing utilities/components when appropriate.
- Do not modify unrelated files.
- Do not invent external APIs or credentials.
- Never hardcode secrets, tokens, API keys, or database passwords.
- Use environment variables for configuration.
- Keep business rules out of the frontend.
- Keep model inference behind a service/interface.
- Keep risk scoring configuration-driven and testable.
- Every risk result must have traceable evidence.
- Do not fabricate explanations.
- Treat “Safe” as “no major risk indicators detected,” never as proof of legitimacy.
- Validate all user-controlled input.
- Add automated tests for new behavior.
- Update documentation for new public APIs, data contracts, or architectural behavior.

## Security Rules
- Never log raw messages, OTPs, passwords, access tokens, or sensitive identity data.
- Do not fetch arbitrary URLs server-side without SSRF protections.
- Allow only `http`/`https` schemes for URL analysis.
- Apply input-size and request-rate limits.
- Avoid storing user content unless explicitly required.
- Sanitize content rendered in the UI.

## ML Rules
- Preserve model and dataset version metadata.
- Do not evaluate on training data only.
- Report precision, recall, F1, and confusion matrix for classification.
- Prefer a simple baseline before a complex model.
- Keep the fallback baseline operational for demos.
- Use deterministic seeds where practical.

## UX Rules
- Follow `UI_UX_SPEC.md`.
- Present score, classification, reasons, and actions together.
- Use simple student-friendly language.
- Do not shame or scare the user unnecessarily.

## Definition of Done
A task is done only when:
1. Implementation is complete.
2. Relevant tests pass.
3. No new lint/type errors are introduced.
4. Public contracts/docs are updated when needed.
5. Security/privacy implications are considered.
6. The feature works in the local development path described by the README.

## Commit Guidance
Use small, focused commits. Suggested format:
`feat: add message risk analysis endpoint`
`test: add risk scoring boundary cases`
`docs: update API contract`

## Agent Response Format
When reporting completed work, provide:
- What changed
- Files changed
- Tests run and results
- Known limitations
- Suggested next task, if one exists
