# Student ScamGuard AI — Project Documents

This folder contains the design documents used as the source of truth for building Student ScamGuard AI with AI coding agents such as Codex, Claude Code, and other repository-aware agents.

## Documents
- `PROBLEM_STATEMENT.md` — concise problem, users, scope, and success criteria
- `PRD.md` — product requirements and acceptance criteria
- `ARCHITECTURE.md` — architecture principles, Mermaid diagram, components, and data flow
- `HLD.md` — high-level modules, APIs, deployment, security and observability
- `LLD.md` — package structure, schemas, risk calculations, model and rule contracts
- `UI_UX_SPEC.md` — screens, user flows, states, accessibility, and visual direction
- `AGENTS.md` — coding-agent rules and definition of done

## Recommended Agent Workflow
1. Ask the agent to read `AGENTS.md` and all design documents.
2. Create a repository plan from `PRD.md`.
3. Implement the backend contracts from `HLD.md` and `LLD.md`.
4. Implement the UI from `UI_UX_SPEC.md`.
5. Build the baseline ML pipeline before the transformer upgrade.
6. Add rule-based indicators and explainability.
7. Add URL intelligence adapters behind interfaces.
8. Run tests and update documentation.

## MVP Principle
Prioritize a reliable end-to-end demo over a large feature count:
**Input → Analyze → Risk Score → Explain → Recommend Action**.
