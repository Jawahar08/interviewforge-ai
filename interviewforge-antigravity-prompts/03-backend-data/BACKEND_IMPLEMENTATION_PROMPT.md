# BACKEND IMPLEMENTATION PROMPT — Spring Boot Platform

Audit and incrementally complete the InterviewForge AI backend using Java 23, Spring Boot 3.5, Spring Security, JWT, PostgreSQL, Spring Data JPA, Hibernate, and Maven.

## Modules to inspect and preserve

`auth`, `security`, `user`, `interview`, `session`, `question`, `answer`, `result`, `dashboard`, `history`, `statistics`, `resume`, `ai`, and `common`.

## API surface

Verify and normalize a versioned `/api/v1` API, retaining compatibility adapters where existing frontend calls differ:

- `POST /auth/register`
- `POST /auth/login`
- `GET/POST/PUT/DELETE /interviews` and `/interviews/{id}`
- `POST /sessions/start`
- `POST /sessions/{id}/complete`
- `GET /sessions/{id}/questions`
- `POST /answers/evaluate`
- `POST /results/generate/{sessionId}`
- Dashboard, history, and statistics read endpoints.
- Resume upload, analysis, retrieval, reprocess, and delete endpoints.

Use DTOs rather than exposing JPA entities. Document request/response schemas, status codes, pagination, sort/filter rules, and stable error codes.

## Security and ownership

- Verify password hashing, JWT signing/expiry, filter ordering, CORS/CSRF policy appropriate to the token transport, and secure headers.
- Validate every resource owner at the service boundary and at the repository query where practical.
- Return 404 or a deliberately documented non-leaking response for resources the caller cannot access.
- Add role/permission checks for admin/enterprise operations without weakening normal-user isolation.
- Validate and sanitize strings, enum values, lengths, page sizes, duration, and uploaded file metadata.

## Persistence and transaction rules

- Add migrations for schema changes; do not rely on ad-hoc production schema mutation.
- Use `@Transactional` around session completion, answer evaluation persistence, result generation persistence, resume analysis persistence, and subscription/usage mutations.
- Add unique constraints or idempotency records to prevent duplicate session completion, answer evaluation, result generation, resume processing, and payment webhook handling.
- Add indexes for user ownership, session status, created time, role, and common dashboard/history queries.
- Use optimistic locking or a documented concurrency strategy where users or retries can update the same session.
- Define deletion/retention behavior for resumes, answers, sessions, and account deletion.

## Reliability and errors

Create a central exception handler returning a consistent envelope such as:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "The AI service is busy. Please try again shortly.",
    "requestId": "...",
    "fieldErrors": []
  }
}
```

Handle validation, not-found, forbidden, conflict, unsupported media, payload-too-large, rate-limit, AI timeout, AI malformed output, database, and unexpected errors separately. Never expose stack traces or provider secrets.

## Read models and scalability

Prefer efficient projections/aggregates for dashboard, statistics, history, and trends instead of loading all answers into memory. Paginate unbounded lists. Add a cache abstraction for stable aggregates, with invalidation on session/result changes and a no-Redis local implementation if needed.

## Observability

Add request correlation IDs, structured logs, health/readiness endpoints, and metrics for API latency, status codes, database errors, AI calls, retries, token usage if available, upload processing, and rate limits. Redact authorization headers, passwords, full resumes, and raw answer content from logs.

## Acceptance criteria

- Resource ownership is enforced for every user-scoped endpoint.
- All changed endpoints have DTO validation, predictable errors, tests, and documented contracts.
- Retries cannot duplicate business records.
- Transactions and migrations are present where needed.
- Dashboard/history queries remain bounded and efficient.
- Existing frontend calls continue to work or receive an explicit compatibility update.

Start with a repository audit and contract matrix. Implement the smallest missing backend slice needed for the current product phase, then run Maven tests and any integration checks available.

## v2 platform requirements

- Complete the account lifecycle where absent: current-user profile, refresh/revocation, password reset, email verification, session/device management, consent versioning, export, and deletion.
- Add workspace/tenant context and membership/RBAC checks behind a feature flag or safe migration path so enterprise capabilities cannot bypass user-level ownership.
- Define explicit state machines for sessions, AI jobs, resume processing, reports, subscriptions, and webhook events; reject invalid transitions.
- Add OpenAPI/Swagger generation or an equivalent checked-in contract and contract tests against the frontend client.
- Add async job boundaries for long AI/file/report work and an outbox or reliable event mechanism for usage, billing, notifications, and audit events when a database transaction succeeds.
