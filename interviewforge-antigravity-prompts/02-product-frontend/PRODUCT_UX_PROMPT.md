# PRODUCT AND UX PROMPT — InterviewForge AI

Design and implement a cohesive, accessible product experience for InterviewForge AI using the existing Next.js, React, TypeScript, Tailwind, shadcn/ui, Framer Motion, Zustand, Axios, Lucide, and Recharts stack.

## Primary user journeys

1. New user registers, signs in, sees a clear dashboard, and understands the AI-coaching disclaimer.
2. User creates an interview by choosing title, target role, difficulty, optional focus skills, and duration of 15, 30, 45, or 60 minutes.
3. User starts a session, sees generated questions, navigates with Next/Previous and a sidebar, answers by text first, and sees timer/progress state.
4. User submits an answer and receives a score plus useful feedback without losing the draft if evaluation fails.
5. User completes the session and views a result page with overall, technical, communication, and confidence scores, strengths, weaknesses, recommendations, summary, and charts.
6. User returns to history, compares past attempts, sees trends and skill progression, and can export a report.
7. User uploads a PDF resume at `/resume`, sees progress and safe failure states, then receives ATS score, detected skills, matched keywords, missing skills, weaknesses, and improvement suggestions.
8. User can turn resume intelligence into a targeted interview and understand which resume evidence led to each question.
9. Voice is an optional progressive enhancement: users can grant microphone permission, see a clear fallback to typed answers, and understand audio processing status.

## Required pages and states

- Auth: register, login, logout, expired-token recovery, invalid-credentials, validation, and server-error states.
- Dashboard: totals, average/highest/lowest score, completed sessions, success rate, recent interviews, performance trend, role distribution, and skill progression.
- Interview list/create/edit: user-owned records, pagination or sensible limits, empty state, delete confirmation, and optimistic UI only where rollback is safe.
- Session setup: role, difficulty, duration, optional skills/resume source, confirmation, and clear estimated AI usage.
- Live session route `/interview/session/[sessionId]/live`: question navigation, question numbering, progress bar, countdown, pause/resume policy, draft persistence, submit state, evaluation result, retry, network recovery, and session-expiry handling.
- Result route `/interview/session/[id]/result`: score cards, radial score chart, performance breakdown, strengths, weaknesses, recommendations, summary, question-by-question review, and export/share controls with privacy-safe defaults.
- History: filters by role/difficulty/date/status, score summaries, empty state, and comparison-friendly rows/cards.
- Resume route `/resume`: drag/drop and file picker, PDF validation, upload progress, extraction progress, ATS score card, skill analysis, keyword match, missing skills, improvement suggestions, delete/reprocess action, and privacy/retention notice.
- Settings: profile, password/session management, notification preferences if present, data export, delete account, AI/voice consent, and subscription state.
- Billing when enabled: plan comparison, entitlements, usage meter, checkout, payment failure, invoice/history, cancel/reactivate, and customer-portal handoff.

## Interaction and visual requirements

- Establish reusable tokens for spacing, typography, radius, color, score severity, and dark/light themes.
- Use restrained motion for transitions, progress, and feedback; respect `prefers-reduced-motion`.
- Make all interactive controls keyboard accessible with visible focus styles and semantic labels.
- Provide responsive layouts for mobile, tablet, and desktop; the live interview must remain usable on a narrow viewport.
- Use skeletons for known loading layouts, explicit empty states, inline field errors, toasts for recoverable actions, and full-page error recovery only when necessary.
- Never display raw stack traces, model output dumps, internal IDs, or secrets to users.
- Use color plus text/icons for score severity; do not rely on color alone.
- Ensure charts have accessible summaries or data tables and do not block the primary insight.

## Frontend architecture requirements

- Keep server data fetching separate from local UI/session state. Use the existing Axios client and Zustand conventions.
- Centralize auth token handling, refresh/expiry behavior if supported, request IDs, and API error normalization.
- Define TypeScript types for every API request/response. Do not use `any` for API contracts.
- Persist only the minimum needed session state. Draft answers may be stored locally with a clear expiration and must be cleared on completion/logout.
- Handle duplicate clicks and retries with disabled/loading states and idempotency keys where the backend supports them.
- Gate voice, billing, and beta features behind feature flags and server-provided entitlements.
- Never put authorization decisions only in route guards; the backend remains authoritative.

## Acceptance criteria

- A user can move from sign-in to create interview to live session to result without dead ends.
- Refreshing the live session does not unexpectedly erase a draft or create a duplicate session.
- Every major screen handles loading, success, empty, validation, unauthorized, expired, network, rate-limit, and server-error states.
- The UI works at mobile width, supports keyboard navigation, and passes the project’s available lint/type/test checks.
- The UI clearly explains AI limitations, resume privacy, voice consent, and what happens to user data.

Start by inspecting the existing routes, components, state, API client, and design system. Create a page/state matrix, then implement the smallest cohesive slice requested by the current phase.

## v2 additions to include when the related features are enabled

- Onboarding: target role, experience level, preferred interview categories, optional resume/job description, timezone, language, and consent choices.
- Job-description matching: paste/upload a job description, show explicit keywords versus inferred skills, and explain that ATS scores are estimates.
- Coaching/readiness: skill-gap plan, goals, next recommended practice, readiness rubric, insufficient-data state, and progress history.
- Workspace administration: workspace switcher, invite/member management, role permissions, audit activity, and organization usage.
- Account lifecycle: email verification, password reset, active sessions/devices, data export, account deletion, and notification preferences.
- Do not present ATS, confidence, readiness, streak, or recommendation outputs as objective hiring truth. Show evidence, rubric, uncertainty, and limitations.
