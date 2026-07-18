# RELEASE CHECKLIST PROMPT — Final Antigravity Review

Perform a release-readiness audit of InterviewForge AI against the master prompt. Do not make broad speculative changes; report evidence and implement only clearly scoped fixes.

## Product checklist

- Registration/login/logout and protected routes work.
- User ownership is enforced for all private resources.
- Interview CRUD, question generation, session lifecycle, timer, answer evaluation, result generation, dashboard, statistics, and history work.
- Resume upload/analysis/delete work with safe file handling.
- Result page and Dashboard 2.0 are responsive and accessible.
- Voice is feature-flagged with a complete typed fallback.
- Resume-driven interviews avoid invented facts.
- Billing/usage is disabled safely when not configured and enforced server-side when enabled.

## Engineering checklist

- Frontend/backend paths and response types match.
- Errors have stable codes and request IDs.
- 401/403/404/409/413/422/429/5xx behavior is deliberate.
- AI 429/timeouts/malformed output have bounded retry or safe fallback.
- `@Transactional`, idempotency, constraints, indexes, and migrations cover critical writes.
- No secrets, raw resumes, raw transcripts, full answers, or authorization headers are logged.
- Data export, deletion, retention, consent, and AI disclaimer paths are documented.
- Lint, typecheck, build, unit, integration, accessibility, and critical E2E checks pass.
- Docker/local setup, environment variables, CI, backups, health checks, metrics, and deployment runbooks are documented.

## Required output

Return:

1. a red/amber/green matrix for each checklist item;
2. evidence: file, test, command, or endpoint for each green item;
3. exact blockers for each red/amber item;
4. prioritized remediation tasks with risk and estimated effort;
5. a final recommendation: ready for internal beta, ready for public beta, or not ready.

Never label the product production-ready merely because the frontend builds. Use real API/test evidence and call out unverified third-party integrations.
