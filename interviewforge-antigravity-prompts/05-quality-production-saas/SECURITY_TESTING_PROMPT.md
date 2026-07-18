# SECURITY AND TESTING PROMPT — InterviewForge AI

Harden the existing product without changing intended user behavior. Inspect the current test setup first and add coverage in its established style.

## Security review

Verify and test:

- Password hashing and credential validation.
- JWT signature, expiry, issuer/audience where configured, refresh/revocation strategy, and secure storage/transport.
- CORS, CSRF policy, security headers, HTTPS assumptions, and safe error messages.
- Ownership checks for interviews, sessions, questions, answers, results, resumes, reports, usage, and billing.
- Input validation, output encoding, SQL injection protections, SSRF/file-upload risks, path traversal, malicious PDF handling, and prompt injection defenses.
- Rate limits for auth, AI calls, uploads, exports, and expensive endpoints.
- Abuse controls for duplicate requests, oversized prompts, repeated evaluation, and quota bypass.
- Secret scanning and log redaction.

## Test pyramid

Add or strengthen:

- Backend unit tests for services, validators, scoring, state transitions, retry classification, and entitlement checks.
- Repository/API integration tests for ownership, transactions, migrations, pagination, filters, and concurrency/idempotency.
- AI contract tests with deterministic fake providers for valid/malformed/timeout/429/5xx responses.
- Frontend tests for auth, live-session navigation/timer, draft preservation, result rendering, resume upload states, charts’ no-data states, and feature flags.
- End-to-end tests for register → create interview → start session → answer → complete → result, plus resume upload → analysis.
- Accessibility checks for keyboard flow, labels, focus, contrast, reduced motion, and chart alternatives.
- Load/smoke tests for high-value read endpoints and safe AI queue behavior.

## Failure matrix

Explicitly test behavior for:

401 expired/invalid token, 403 wrong owner, 404 missing resource, 409 duplicate/idempotency conflict, 413 oversized upload, 422 validation, 429 provider/app rate limit, timeout, malformed AI JSON, partial result, database failure, browser voice unsupported, microphone denied, and payment webhook replay.

## Release gate

Do not call a phase production-ready until tests pass, migrations are reviewed, secrets/configuration are documented, critical endpoints have rate limits, and known risks are written down with owners or follow-up tasks.

## v2 security and quality additions

- Test registration abuse controls, email verification, password reset, refresh-token rotation/revocation, account lockout/throttling, and session/device invalidation.
- Test workspace/tenant isolation, invitations, member roles, admin permissions, and cross-tenant access attempts.
- Add AI quality checks for unsupported resume facts, ATS overclaiming, protected-attribute inference, confidence-score overreach, prompt injection, and regressions across prompt versions.
