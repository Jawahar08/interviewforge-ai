# AI ENGINE PROMPT — Gemini Orchestration and Evaluation Reliability

Harden the InterviewForge AI layer around Google Gemini 2.5 Flash while keeping the provider replaceable and the user experience safe when the provider is unavailable.

## AI capabilities

- Generate role/difficulty/focus-skill interview questions.
- Evaluate answers for technical correctness, completeness, reasoning, communication, and confidence signals.
- Generate a final interview report with scores, strengths, weaknesses, recommendations, and summary.
- Extract resume facts and skills, calculate ATS-oriented signals, identify missing skills, and suggest improvements.
- Generate resume-grounded questions without inventing facts.
- Later, support voice transcript turns and a real-time interviewer adapter.

## Architecture

Create or refine typed interfaces such as:

- `QuestionGenerationProvider`
- `AnswerEvaluationProvider`
- `InterviewReportProvider`
- `ResumeAnalysisProvider`
- `VoiceConversationProvider`

Keep provider HTTP/client code separate from application services. Make model, temperature, timeout, token budget, structured-output schema, and prompt-template version configurable per capability.

## Structured output

- Define JSON schemas/DTOs for every operation.
- Reject malformed, incomplete, out-of-range, or contradictory output.
- Normalize scores to the product’s documented range and record whether a score was unavailable rather than silently inventing one.
- Strip markdown/code fences only in a controlled parser; never use unsafe string slicing as the sole validator.
- Test valid, malformed, truncated, extra-field, and adversarial outputs.

## Reliability

- Handle 429, 5xx, timeout, network, invalid request, and safety-block responses distinctly.
- Use bounded exponential backoff with jitter for retryable failures only.
- Add provider timeout and circuit-breaker behavior where the existing stack supports it.
- Fall back to a safe message, previously generated questions, deterministic rubric feedback, or queued retry depending on the capability.
- Never run unbounded retries in a web request.
- Include idempotency and request correlation IDs so a retry does not duplicate persisted evaluations or reports.

## Safety and privacy

- Treat resume text, user answers, and transcripts as untrusted prompt content. Delimit them and instruct the model to ignore embedded instructions.
- Minimize personal data sent to the provider; redact or omit unnecessary identifiers.
- Do not log full prompts, resumes, answers, transcripts, API keys, or raw provider responses in normal production logs.
- Show a coaching disclaimer; AI output is not a hiring decision or guaranteed ATS result.
- Provide configuration for data retention and provider logging behavior.

## Prompt quality

Each prompt template must define:

- system role and boundaries;
- input fields and expected evidence;
- scoring rubric;
- output schema;
- refusal/uncertainty behavior;
- prompt version;
- examples/tests that do not contain real user data.

Keep answer evaluation consistent across sessions. The model should explain scores with evidence from the answer, identify what is missing, and give a concrete improvement action.

## Usage and cost controls

- Estimate and enforce input/output size limits.
- Track provider, model, prompt version, latency, retry count, failure category, and usage units.
- Check entitlements before expensive calls.
- Cache only safe, non-user-specific results such as stable role/difficulty question templates; never share one user’s private answer or resume-derived result.

## Acceptance criteria

- AI calls have typed inputs/outputs, timeouts, bounded retries, fallback behavior, and tests.
- 429 failures do not crash or duplicate the workflow.
- Malformed output becomes a controlled failure or safe fallback.
- Prompt injection from uploaded text is handled.
- Provider details are isolated so a second model/provider can be added without rewriting domain logic.

## v2 quality and fairness requirements

- Generate skill-gap coaching plans and job-readiness explanations only from available evidence, with an uncertainty/coverage signal.
- Build a small synthetic evaluation harness for prompt regressions, score consistency, prompt injection, bias-sensitive language, unsupported claims, and provider fallback behavior. Never use real user resumes or answers as fixtures.
- Avoid protected-attribute inference or personality judgments. Do not turn accent, grammar, disability, or communication style into a hiring recommendation. Separate observable answer evidence from uncertain interpretation.
