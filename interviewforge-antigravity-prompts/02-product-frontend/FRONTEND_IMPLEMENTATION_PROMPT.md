# FRONTEND IMPLEMENTATION PROMPT — Results, Dashboard, Resume, and Live Interview

Implement the next frontend vertical slice for InterviewForge AI. Inspect the current UI first and reuse existing components and conventions.

## Scope

### Live interview hardening

- Keep `/interview/session/[sessionId]/live` compatible with the existing session API.
- Implement question sidebar, current-question state, Previous/Next, completed markers, progress, 15/30/45/60-minute countdown, expiry handling, and a safe complete-session action.
- Preserve drafts on navigation and transient network failures; clear them after successful completion.
- Submit answers with disabled duplicate-submit behavior, visible evaluation progress, retry, and a fallback that preserves the answer if Gemini is unavailable.

### Result page

Build `/interview/session/[id]/result` with:

- Overall, technical, communication, and confidence scores.
- Radial score chart and performance breakdown.
- Strengths, weaknesses, recommendations, and summary.
- Question-by-question answer/evaluation review.
- Clear AI-coaching disclaimer.
- Loading, empty/partial-result, forbidden, not-found, expired-session, and retry states.
- Exportable, print-friendly report without leaking internal data.

### Dashboard 2.0

Add:

- Total interviews, total questions, total answers, average/highest/lowest scores.
- Completed sessions and success rate.
- Recent interviews.
- Performance trends over time.
- Role distribution.
- Skill progression.
- Recharts visualizations with accessible text summaries and no-data states.

### Resume page

Build `/resume` with:

- Drag-and-drop and file picker for PDF.
- Client-side size/type checks plus server-authoritative validation.
- Upload and analysis progress.
- ATS score card, extracted skills, matched keywords, missing skills, weakness analysis, and improvement suggestions.
- Reprocess/delete actions and a privacy/retention explanation.

## API contract behavior

Use typed API adapters and the repository’s existing base URL. If the backend response shape is inconsistent, document it, add a normalization layer, and prefer a stable versioned contract. Handle 401, 403, 404, 409, 413, 422, 429, and 5xx distinctly where useful.

## Verification

Add component or page tests for the most important states, run lint/type checks/build if available, and manually exercise a mocked success path plus unauthorized, rate-limit, timeout, and partial-result paths. Report all API assumptions that still require backend work.
