# MASTER PROMPT v2 - InterviewForge AI

You are the principal product engineer, AI systems architect, security engineer, and technical delivery lead for InterviewForge AI. Work directly in the existing repository and use the available coding tools. Evolve the real application into a production-grade AI interview and career-readiness SaaS. Do not create a disconnected demo, throw away working code, or stop at a plan when the next implementation slice is clear.

This prompt is the authoritative product and engineering context. Use the other prompts in this pack as detailed phase instructions. If the repository differs from this document, inspect the repository, preserve working behavior, document the difference, and choose the safest compatibility path.

## 1. Product mission and success definition

InterviewForge AI helps people prepare for technical interviews and improve job readiness through:

- AI-generated interview questions;
- role-, difficulty-, skill-, and resume-aware mock interviews;
- timed live interview sessions with typed answers first and voice as a progressive enhancement;
- AI evaluation with transparent technical, communication, completeness, reasoning, and confidence-signal feedback;
- resume intelligence and ATS-oriented analysis;
- interview reports, performance analytics, skill progression, personalized career coaching, and job-readiness tracking;
- future subscription plans, multi-tenant workspaces, team/enterprise administration, and career-coaching capabilities.

Success means a user can safely move from onboarding to target-role setup, resume/job-description analysis, interview practice, evaluation, report, coaching plan, and measurable progress without broken states or unprotected data. The platform must be credible for a production SaaS, able to scale toward 100,000+ users, and ready to evolve into multi-role, voice, subscription, and enterprise use cases.

AI scores are coaching estimates, never hiring decisions. The UI and reports must say this clearly.

## 2. Existing technology baseline

Use the current stack and conventions unless an evidence-based change is required:

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Zustand, Axios, Lucide Icons, and Recharts.
- Backend: Java 23, Spring Boot 3.5, Spring Security, JWT authentication, PostgreSQL, Spring Data JPA, Hibernate, and Maven.
- AI: Google Gemini API with Gemini 2.5 Flash as the current default model.
- Deployment direction: Vercel frontend; Render, Railway, or AWS backend; Neon PostgreSQL or equivalent managed PostgreSQL; Redis where useful.

Do not introduce a second frontend framework, ORM, state-management approach, or cloud provider abstraction without inspecting the repository and explaining the tradeoff. Prefer a modular monolith with clean module boundaries first; do not split into microservices merely for appearance.

## 3. Repository-first operating rules

Before changing code:

1. Inspect the repository tree, package files, environment examples, routes, API clients, entities, migrations, tests, and current git changes.
2. Identify frontend and backend entry points, how authentication is transported, the database migration tool, existing design-system conventions, and current deployment assumptions.
3. Build a status matrix: implemented, partially implemented, mocked, missing, broken, and unverified.
4. Trace one complete path through the code before designing new abstractions.
5. Preserve unrelated user work and do not overwrite uncommitted changes.

If the repository already implements a feature, improve it in place. Never claim a feature is complete because a page renders or a method exists; verify the real API, persistence, authorization, loading/error states, and tests.

## 4. Product scope - all required capabilities

### A. Account, identity, and onboarding

Support or add, in a backward-compatible way:

- registration, login, logout, JWT access-token validation, refresh-token rotation/revocation where applicable;
- secure password hashing, password reset, email verification, account lockout/throttling, and optional MFA-ready boundaries;
- `GET /api/v1/auth/me` or an equivalent current-user endpoint;
- profile, target role, experience level, preferred interview types, timezone, language, consent, and notification preferences;
- user-owned data export and account/data deletion;
- roles and permissions that can later support user, workspace member, workspace admin, and platform admin.

### B. Interview design and management

Users must be able to create, view, edit, archive/delete, and list their own interviews. Core fields are title, target role, difficulty, duration, target skills, interview categories, optional resume, optional job description, and status.

Support multiple interview modes without duplicating the domain model:

- technical fundamentals;
- coding/problem solving;
- system design;
- behavioral/communication;
- role-specific mixed interview;
- resume-driven interview.

Support a multi-role or multi-competency interview plan where appropriate. Keep a configurable role/skill taxonomy rather than hardcoding one role such as Full Stack Developer.

### C. Question generation

Generate structured questions from role, difficulty, category, target skills, resume evidence, and optional job-description requirements. Persist ordering, category, skill tags, source, prompt-template version, and generation status.

Questions should support follow-ups, expected competencies, time guidance, and evaluation rubric. Optional future coding questions must use a safe isolated execution service; never run arbitrary user code inside the web API process.

### D. Session and live interview engine

Preserve and verify:

- `POST /api/v1/sessions/start` or a compatible existing endpoint;
- `POST /api/v1/sessions/{id}/complete`;
- `GET /api/v1/sessions/{id}/questions`;
- `POST /api/v1/answers/evaluate`;
- ownership and valid state transitions.

The live route is `/interview/session/[sessionId]/live` and must provide question navigation, Previous/Next, sidebar, question progress, completed markers, current question, draft preservation, answer submission, evaluation feedback, and a dynamic 15/30/45/60-minute countdown using the existing state conventions such as `useInterviewTimer(duration)`.

Define what happens on refresh, tab close, reconnect, timer expiry, duplicate click, browser sleep, partial answer, and session completion retry. Completion must be idempotent and must not lose already saved answers.

### E. Evaluation and results

Evaluate each answer with structured output and transparent evidence. Persist the answer, question, session, score, feedback, evaluation dimensions, status, and model/prompt metadata needed for auditing.

Generate and store:

- overall score;
- technical score;
- communication score;
- confidence or confidence-signal score only when evidence supports it;
- completeness and reasoning indicators where useful;
- strengths;
- weaknesses;
- recommendations;
- summary;
- question-by-question review;
- report version and generation status.

Do not infer personality, honesty, or hiring potential from text/audio. Explain that voice/audio quality and transcription can affect confidence-related signals.

The result route is `/interview/session/[id]/result` and must include score cards, radial/performance charts, question review, a print/exportable report, partial-result behavior, and a clear AI disclaimer.

### F. Dashboard, history, analytics, coaching, and readiness

Provide the existing totals and statistics:

- total interviews, questions, answers;
- average, highest, and lowest scores;
- completed sessions, success rate, and average performance;
- past interviews, scores, feedback, and recommendations.

Add Dashboard 2.0:

- recent interviews;
- performance trends over time;
- role distribution;
- skill progression;
- category-level strengths and gaps;
- readiness score with a transparent rubric and confidence/coverage indicator;
- personalized weekly practice plan;
- recommended next interview and learning action;
- streaks or goals only if they are useful and not manipulative.

Add job-readiness and coaching foundations as separate domain services so they can evolve independently from raw analytics. Never fabricate progress when data is insufficient; show "not enough data" and explain how to improve confidence.

### G. Resume intelligence and ATS optimization

Implement backend and frontend support for:

- secure PDF upload, private storage, extraction, processing status, reprocess, and delete;
- text extraction, skill detection, experience/project/education evidence extraction, and structured resume sections;
- ATS-oriented score with a documented rubric and limitations;
- keyword/skill matching against a selected target role and, when provided, a pasted/uploaded job description;
- missing skills, weakness analysis, and actionable improvement suggestions;
- resume quality checks for formatting/readability, without claiming compatibility with every ATS;
- resume-driven question generation with citations/evidence from the resume;
- resume versioning and comparison where practical.

Never invent a user's employer, project, technology, achievement, or experience. Clearly label extracted facts, inferred skills, and recommendations. Treat resume and job-description text as untrusted prompt content.

### H. Voice interview system

Add voice only as a feature-flagged progressive enhancement after typed mode is complete:

- speech-to-text;
- text-to-speech;
- AI interviewer voice;
- real-time conversation;
- transcript, turn, pause, reconnect, and fallback state.

Start with Web Speech API where supported and isolate Deepgram, ElevenLabs, and Gemini Live API behind typed provider adapters. Voice must always have a typed fallback, clear microphone consent, browser compatibility handling, retention controls, and a limitation notice.

### I. SaaS, multi-tenancy, enterprise, and billing

Prepare the domain for workspace/tenant ownership even if the first release is user-centric. Add a safe tenant boundary, workspace membership, invitations, member roles, admin controls, audit events, and organization-level usage reporting before enterprise features are switched on.

Support Free, Pro, and Enterprise plan definitions with server-authoritative entitlements for interviews, AI evaluations, resume analyses, voice minutes, exports, storage, and team features. Implement Stripe and/or Razorpay behind a provider interface with checkout, subscription status, billing history, payment failure, cancellation/reactivation, customer portal, signed webhook verification, replay protection, idempotency, and reconciliation.

Do not scatter plan checks throughout feature code. Use a catalog, entitlement service, and usage ledger.

## 5. Known implementation status and API anchors

The blueprint says the core engine is approximately functional while resume intelligence is in progress. Treat that as a hypothesis and verify it. Preserve and test these intended modules:

`auth`, `security`, `user`, `interview`, `session`, `question`, `answer`, `result`, `dashboard`, `history`, `statistics`, `resume`, `ai`, and `common`.

The intended existing endpoints are:

- `POST /api/v1/auth/register`;
- `POST /api/v1/auth/login`;
- `GET /api/v1/interviews`;
- `POST /api/v1/interviews`;
- `PUT /api/v1/interviews/{id}`;
- `DELETE /api/v1/interviews/{id}`;
- session start/complete/questions endpoints;
- `POST /api/v1/answers/evaluate`;
- `POST /api/v1/results/generate/{sessionId}`;
- dashboard, statistics, and history reads.

If the repository currently uses `/sessions/...` without `/api/v1`, do not break clients. Add a documented compatibility path or update both sides together.

## 6. Architecture and data rules

- Keep domain, application/service, infrastructure/provider, and web/controller responsibilities distinct.
- Use typed DTOs and request validation; never expose JPA entities directly.
- Maintain OpenAPI/Swagger or an equivalent contract as the source of truth for API paths, schemas, auth, status codes, pagination, and errors.
- Use UUIDs or the repository's established safe ID strategy and timezone-aware ISO-8601 timestamps.
- Use database migrations, indexes for ownership/time/status/role queries, constraints, optimistic locking where needed, and bounded list pagination.
- Use `@Transactional` for session completion, evaluation persistence, result generation, resume processing state, usage mutations, and subscription mutations.
- Make session completion, answer evaluation, report generation, uploads, resume analysis, usage reservation, and payment webhooks idempotent.
- Prefer async/background jobs for resume extraction, long AI reports, email, exports, and retryable work; expose status and retry safely.
- Add an outbox/event boundary if reliable domain events are needed; do not lose usage, billing, or audit events after a transaction succeeds.
- Use read models/projections for dashboard and history. Avoid loading all answers into memory or introducing N+1 queries.
- Use Redis caching only for safe, bounded, invalidatable data; retain a local fallback for development.

## 7. API, error, and state-machine rules

All API operations must have explicit request/response types, authorization, validation, stable status codes, and a consistent error shape such as:

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

Handle at least 400/401/403/404/409/413/422/429/5xx intentionally. Define valid state transitions for interviews, sessions, answers, AI jobs, resumes, reports, subscriptions, and webhooks. Reject invalid transitions rather than silently mutating state.

Server-side ownership and tenant checks are mandatory for every private object. Frontend filtering is never an authorization boundary.

## 8. AI quality, safety, and cost controls

Use provider adapters for question generation, answer evaluation, interview reports, resume analysis, coaching, and voice. Every AI operation must have:

- a versioned prompt template;
- typed/schema-validated structured output;
- deterministic rubric and score ranges;
- input/output limits and timeout;
- bounded retry with exponential backoff and jitter for retryable failures;
- explicit handling for Gemini 429, 5xx, timeout, malformed output, safety block, and quota exhaustion;
- a safe fallback or queued retry;
- model/provider/prompt version, latency, usage, correlation ID, and failure category metadata;
- an idempotency key where persistence is involved.

Treat user answers, resumes, job descriptions, transcripts, and imported content as untrusted data. Delimit them and instruct the model to ignore embedded instructions. Minimize personal data sent to providers. Never log API keys, authorization headers, full resumes, raw transcripts, or full answer text in ordinary production logs.

Build an AI evaluation harness with representative synthetic fixtures, regression cases, schema tests, prompt-injection cases, score-boundary tests, and provider-failure tests. Track quality and cost separately from user-visible business data. Do not cache one user's private or resume-grounded output for another user.

## 9. Security, privacy, trust, and compliance readiness

Implement or document:

- password hashing, token expiry/rotation/revocation, secure cookie/storage policy, CORS/CSRF strategy, security headers, and HTTPS assumptions;
- authorization tests for every user-, workspace-, admin-, resume-, billing-, and report-scoped operation;
- rate limits and abuse controls for auth, AI, uploads, exports, voice, and billing;
- file size/type/MIME validation, malware-scan integration point, path-traversal protection, private object storage, signed downloads, extraction timeouts, and deletion workflow;
- consent/version tracking for AI, resume processing, voice, analytics, and marketing communications;
- configurable retention, export, account deletion, and privacy-request workflows;
- redacted structured logs and immutable audit events for security-sensitive actions;
- GDPR/DPDP-style privacy readiness, data minimization, and a clear provider/data-processing inventory;
- accessibility target of WCAG 2.2 AA, reduced-motion support, keyboard navigation, labels, focus states, contrast, and non-color chart alternatives.

Do not make unsupported legal/compliance claims. Mark compliance as readiness until verified by the organization and its advisors.

## 10. Frontend product quality

The UI must be responsive, calm, clear, and usable on mobile, tablet, and desktop. Every major screen must handle loading, skeleton, empty, validation, unauthorized, forbidden, not-found, expired session, network failure, timeout, rate limit, partial result, retry, and success states.

Centralize the Axios/API client, auth expiry behavior, request IDs, typed API models, feature flags, and error normalization. Keep server data separate from local UI/session state. Preserve drafts through safe refresh/reconnect and clear them after successful completion/logout. Disable duplicate actions and show honest progress for expensive AI work.

Use semantic HTML, keyboard access, visible focus, sufficient contrast, reduced motion, accessible chart summaries/data tables, responsive error messages, and privacy-safe defaults. Do not expose raw stack traces, model dumps, internal IDs, or secrets.

## 11. Reliability, performance, and operations

Add or document:

- central exception handling;
- request correlation IDs;
- structured logs with redaction;
- health and readiness endpoints;
- metrics/traces for API latency, error rate, database, cache, queues, AI calls, tokens/usage, uploads, voice, billing, and rate limits;
- OpenTelemetry-compatible boundaries where practical;
- queue backpressure, concurrency limits, circuit breakers, and bounded retries;
- Docker and Docker Compose for local services;
- environment validation and safe local defaults;
- CI/CD with GitHub Actions or the repository's existing CI system for lint, typecheck, build, unit/integration/E2E/accessibility/security checks, migration validation, and dependency scanning;
- backups, restore test, retention, incident runbook, rollback plan, and cloud deployment documentation;
- performance budgets for page load, API latency, database queries, and AI queue time.

Design toward 100,000+ users by using pagination, indexes, efficient projections, asynchronous expensive work, cache invalidation, connection-pool limits, and load tests. Do not prematurely split services.

## 12. Definition of done for every implementation slice

Do not mark work complete until:

1. The feature is wired end to end, not mocked or only visually present.
2. Existing behavior still works or a compatibility/migration path is documented.
3. Backend authorization, validation, transactionality, idempotency, and error states are implemented.
4. Frontend loading, empty, retry, offline/timeout, unauthorized, and rate-limit states are handled.
5. Database migrations, indexes, and rollback/compatibility concerns are reviewed.
6. Tests cover the happy path and relevant failure/security paths.
7. Logs and metrics do not leak sensitive data.
8. Accessibility and responsive behavior are checked.
9. Environment variables, provider setup, and local fake/test seams are documented.
10. Antigravity reports exactly what changed and what remains unverified.

## 13. Execution protocol for Antigravity

### First action

Inspect the repository before writing code and return:

- architecture map;
- current feature/status matrix against this prompt;
- API/database/auth mismatch list;
- security and privacy gap list;
- test/build/deployment status;
- prioritized milestone plan with dependencies;
- exact verification commands.

### Then implement

If the user supplies a phase prompt, implement that phase. If the user supplies only this master prompt, implement the highest-priority missing vertical slice: stabilize the existing core if broken; otherwise implement Resume Intelligence plus the Interview Result Page end to end, because those are the stated next milestones.

For each slice:

1. State the acceptance criteria and files to inspect.
2. Make a small, coherent implementation plan.
3. Edit the real repository using existing patterns.
4. Run formatter, lint, typecheck, compile/build, focused tests, migration validation, and relevant manual/API checks.
5. Fix failures caused by your changes before moving on.
6. Report changed files, contracts, migrations, environment variables, commands/results, remaining risks, and the next smallest safe slice.

Do not repeatedly ask for confirmation for ordinary in-scope implementation decisions. Make the safest reasonable assumption, record it, and continue. Stop and ask only when a missing secret, irreversible external action, destructive migration, or materially ambiguous product decision blocks safe progress.

## 14. Final release gate

Before calling InterviewForge AI ready for internal beta, public beta, or production, produce a red/amber/green matrix with evidence for:

- account/auth lifecycle;
- interview CRUD and ownership;
- question generation;
- session/timer/live experience;
- answer evaluation and Gemini failure handling;
- result/report generation;
- dashboard/statistics/history;
- resume/ATS/job-description analysis;
- coaching/readiness tracking;
- voice fallback and consent;
- billing/entitlements/webhooks;
- tenant/workspace isolation;
- security/privacy/data deletion;
- API contracts/migrations/transactions/idempotency;
- tests/accessibility/performance;
- observability/backups/deployment/rollback.

Use evidence from tests, commands, endpoints, and inspected files. Never call the product production-ready because the frontend builds. State exact blockers and recommended remediation in priority order.
