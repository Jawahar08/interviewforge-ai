# API AND DATA MODEL PROMPT — Resume, Results, Analytics, and Usage

Design or refine the PostgreSQL/JPA model and API contracts needed for the next InterviewForge AI milestone. Inspect existing entities before adding tables.

## Core entities and relationships

Preserve existing user, interview, session, question, answer, and result concepts. Model ownership explicitly. Add only fields needed by the product:

- `User`: identity, roles, status, timestamps, consent/version markers.
- `Interview`: owner, title, role, difficulty, target skills, source resume when used, timestamps, status.
- `InterviewSession`: owner/interview, duration, started/completed times, status, current question if needed, idempotency/version fields.
- `Question`: session/interview, text, type, difficulty, skill tags, source, order, prompt version.
- `Answer`: owner/session/question, answer text or safe reference, score, feedback, evaluation dimensions, status, model metadata, idempotency key.
- `InterviewResult`: owner/session, aggregate scores, strengths, weaknesses, recommendations, summary, generated time, report version.
- `Resume`: owner, private storage key, file metadata, processing status, extracted text reference, hash, timestamps, retention/deletion state.
- `ResumeAnalysis`: resume, ATS score, extracted skills, matched keywords, missing skills, weaknesses, suggestions, parser/prompt versions.
- Optional `UsageLedger`/`Entitlement`: owner/tenant, plan, feature, units, period, source, idempotency key.
- Optional `AuditEvent`: actor, tenant, action, resource type/id, request ID, timestamp, redacted metadata.

Do not store duplicate or unbounded AI blobs when normalized fields or private object storage references are sufficient. Encrypt or restrict sensitive data according to the deployment environment.

## Contract requirements

- Use stable UUIDs or the repository’s established identifier strategy.
- Use ISO-8601 timestamps with explicit timezone semantics.
- Validate enums, scores, durations, text lengths, file metadata, and pagination inputs.
- Return only fields authorized for the caller.
- Define partial-result semantics for AI workflows: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED_RETRYABLE`, `FAILED_FINAL`.
- Add list filters and pagination for history, interviews, resumes, and reports.

## Required workflows

1. Start session: validate ownership, create one session for an idempotency key, obtain questions or queue generation safely.
2. Evaluate answer: validate session state and question ownership, enforce one active evaluation per answer attempt, persist the result transactionally, and allow safe retry.
3. Generate result: aggregate only completed evaluations, make the operation idempotent, and support partial/failure status.
4. Analyze resume: validate private upload, process asynchronously if needed, persist status and versioned output, and support retry/delete.
5. Meter AI usage: reserve/check quota before expensive work, reconcile success/failure, and prevent bypass through retries.

## Deliverables

- Entity/relationship diagram in text or Mermaid.
- Migration plan with indexes and constraints.
- Endpoint request/response examples.
- Error/status model.
- Tests for ownership, idempotency, concurrency, and migration compatibility.

Do not implement billing or provider-specific behavior in the domain entities. Use interfaces and provider adapters.

## v2 entities and workflows

Consider these only after inspecting existing entities and migrations:

- `RefreshToken` or session record: hashed token reference, device metadata, expiry, revocation, and last-used time.
- `Workspace`/`Tenant` and `Membership`: owner, plan, status, member role, invitation status, and isolation boundary.
- `JobDescription`: owner/workspace, source, parsed role/skills/keywords, version, and retention state.
- `CoachingPlan`/`ReadinessSnapshot`: owner/workspace, rubric version, skill evidence, gaps, goals, recommendations, confidence, and generated time.
- `Notification`/`EmailJob`: recipient, type, status, idempotency key, retry state, and safe payload reference.

Add contract tests for account lifecycle, cross-tenant access, job-description matching, insufficient coaching data, async state transitions, and webhook replay.
