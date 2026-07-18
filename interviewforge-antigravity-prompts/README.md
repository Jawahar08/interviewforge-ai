# InterviewForge AI — Antigravity Prompt Pack

This pack turns the InterviewForge AI blueprint into five ordered prompt folders for Antigravity.

## Recommended execution order

1. `01-master-control/MASTER_PROMPT.md` — paste this first. It establishes the product context, engineering rules, scope, and delivery protocol.
2. `02-product-frontend/` — implement the user journeys, frontend shell, live interview UI, results page, dashboard, and resume UI.
3. `03-backend-data/` — audit and complete the Spring Boot APIs, persistence model, security, transactions, and API contracts.
4. `04-ai-resume-voice/` — complete resume intelligence, resilient Gemini orchestration, resume-driven interviews, and voice as a progressive enhancement.
5. `05-quality-production-saas/` — harden the system with tests, security, observability, billing, usage limits, deployment, and release gates.

## How to use these prompts

- Give Antigravity the master prompt before any implementation prompt.
- Run one implementation prompt at a time. Ask it to inspect the repository first and then implement only the requested phase.
- If the repository already contains a working feature, preserve it and improve it in place. Do not replace the entire application with a demo.
- After each prompt, review the changed files, run the requested tests, and commit the phase before moving on.
- Replace any example environment variable values with real secret-manager references. Never paste secrets into prompts or source files.

## Definition of done for every phase

- Existing functionality remains working.
- Frontend and backend contracts agree on paths, payloads, status codes, and error shapes.
- Loading, empty, error, retry, unauthorized, expired-session, and rate-limit states are handled.
- Unit/integration tests cover the changed behavior.
- Database changes are migration-safe and backward compatible where practical.
- The implementation is accessible, responsive, observable, and documented.
- Antigravity reports files changed, commands run, test results, unresolved risks, and the next safe step.

## Master prompt v2 additions

The upgraded master prompt also covers:

- Full account lifecycle: current-user profile, refresh/revocation, password reset, email verification, consent, export, and deletion.
- Target-role and job-description matching, resume versioning, structured evidence, and transparent ATS limitations.
- Career coaching, readiness scoring, competency progression, goals, and practice recommendations.
- Multi-role interview plans, question categories, follow-up questions, and safe coding-challenge boundaries.
- Workspace/tenant model, invitations, RBAC, enterprise administration, audit events, and organization usage reporting.
- OpenAPI contract discipline, explicit state machines, async jobs, outbox/event boundaries, and performance budgets.
- AI quality evaluation harness, safety/prompt-injection controls, uncertainty handling, and provider observability.
- Privacy/compliance readiness, WCAG 2.2 AA target, incident/rollback planning, backup-restore tests, and deployment gates.
