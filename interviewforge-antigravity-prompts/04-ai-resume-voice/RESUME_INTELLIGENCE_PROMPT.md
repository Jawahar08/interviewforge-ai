# RESUME INTELLIGENCE PROMPT — Upload, ATS Analysis, and Resume-Driven Interviews

Implement the Resume Intelligence Engine end to end, building on the existing InterviewForge AI conventions.

## Backend scope

Implement or complete:

- `ResumeController`
- `ResumeService`
- `ResumeEntity`
- `ResumeRepository`
- Private file-storage abstraction
- PDF text extraction abstraction
- Versioned AI resume-analysis provider

Support PDF upload with a safe maximum size, MIME sniffing, extension-independent validation, extraction timeout, page/text limits, and a malware-scan integration point. Store files privately and expose only authorized metadata or signed downloads. Never put resume contents in public URLs.

## Analysis output

Return/persist:

- ATS score with a documented rubric and confidence/limitations.
- Extracted skills with evidence where possible.
- Matched keywords against a selected target role or job description when supplied.
- Missing skills and likely skill gaps, clearly marked as suggestions rather than facts.
- Weakness analysis.
- Actionable improvement suggestions.
- Processing status, parser version, prompt version, model/provider, generated time, and retryable/final failure state.

If a target job description is not provided, do not pretend keyword matching is job-specific; provide role-based matching only when a role taxonomy exists.

## Frontend scope

Create `/resume` with drag/drop, file picker, progress, analysis cards, matched/missing keywords, skill list, suggestions, reprocess, delete, and empty/error/unauthorized/rate-limit states. Explain privacy, retention, and AI limitations in plain language.

## Resume-driven interview flow

Add an explicit workflow:

```text
Upload resume → extract and confirm skills → choose role/difficulty/duration → generate grounded questions → conduct session → evaluate answers → report with resume evidence and gaps
```

Questions must cite the resume section/skill they are testing when evidence exists. If evidence is missing or ambiguous, ask a general question instead of inventing a project, employer, technology, or accomplishment.

## Security and privacy

- Enforce ownership at every resume and analysis endpoint.
- Defend against prompt injection in resume text.
- Redact sensitive values from logs.
- Add delete and retention behavior for original files, extracted text, derived analyses, and related interview metadata.
- Provide account export/delete hooks and explicit consent/version tracking.

## Acceptance criteria

- A valid PDF can be uploaded, processed, retried, viewed, deleted, and turned into a targeted interview.
- Invalid, oversized, corrupted, password-protected, empty, or malicious-looking files fail safely.
- Partial AI results are clearly labeled and do not block access to other product features.
- All changed code has tests for ownership, file validation, status transitions, deletion, and AI failure.
