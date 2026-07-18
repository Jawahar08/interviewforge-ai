# SAAS AND PRODUCTION PROMPT — Billing, Usage, Operations, and Scale

Prepare InterviewForge AI for a production SaaS rollout while keeping billing and provider integrations replaceable.

## Subscription system

Implement a payment-provider abstraction supporting Stripe first and Razorpay where required. Support:

- Free, Pro, and Enterprise plans.
- Feature entitlements and limits for interviews, AI evaluations, resume analyses, voice minutes, exports, and storage.
- Subscription status, trial/cancel/reactivate, payment failure, invoices, and customer-portal handoff.
- Secure webhook verification, replay protection, idempotent event handling, and reconciliation.
- Server-authoritative entitlement checks; frontend plan labels are informational only.
- Usage ledger with period boundaries, timezone-safe timestamps, and clear overage/blocked behavior.

Do not put provider IDs or plan logic in every feature. Centralize product catalog, entitlements, and usage decisions.

## Production platform

Add or document:

- Dockerfiles and Docker Compose for local frontend/backend/PostgreSQL, plus Redis when enabled.
- Environment validation at startup with safe defaults only for local development.
- Database migrations, backup/restore procedure, retention, and disaster-recovery notes.
- Redis caching for safe aggregates/short-lived coordination with invalidation rules; retain an in-memory/local fallback.
- Background-job abstraction for resume parsing, report generation, email, and retries so long AI tasks do not block requests.
- Rate limiting and concurrency controls at API and AI-provider boundaries.
- Health/readiness endpoints, structured logs, request IDs, metrics, traces where practical, and alert thresholds.
- GitHub Actions or the repository’s CI system for lint, typecheck, build, unit/integration tests, migration validation, security scan, and deploy gates.
- Deployment runbooks for Vercel plus Render/Railway/AWS and managed PostgreSQL/Neon.

## Scale and multi-tenant readiness

- Use tenant/user ownership boundaries in the domain model even if the first release is single-tenant per user.
- Avoid N+1 queries and unbounded dashboard/history loads.
- Queue expensive AI and file work; make jobs retryable and idempotent.
- Add pagination, indexes, caching, and backpressure.
- Define data retention, account deletion, export, and privacy request workflows.

## Acceptance criteria

- A local developer can start the required services from documented commands.
- CI catches contract, security, build, and migration regressions.
- A failed or replayed payment webhook cannot grant duplicate entitlements.
- AI usage is metered and cannot bypass limits through retries or alternate endpoints.
- Operators can identify failing AI calls, uploads, payments, and APIs using correlation IDs and metrics.

## v2 enterprise and operations additions

- Add workspace creation, invitations, membership roles, organization settings, tenant-safe audit events, and enterprise administration behind feature flags or migrations that do not weaken personal accounts.
- Add email/notification provider boundaries for verification, password reset, report-ready, usage-limit, and billing messages with retry-safe jobs and unsubscribe preferences.
- Document incident response, rollback, backup restore testing, vendor/provider outage behavior, and a responsible disclosure/security contact flow.
