# VOICE AND CONVERSATION PROMPT — Progressive Voice Interviews

Implement voice interviews as an optional, feature-flagged enhancement after typed interviews remain fully usable.

## Architecture

Define provider interfaces for:

- speech-to-text;
- text-to-speech;
- real-time conversation/session transport;
- transcript persistence and redaction.

Use Web Speech API as the first local/browser capability where supported. Keep Deepgram, ElevenLabs, and Gemini Live API integrations behind adapters so they can be configured or replaced independently.

## User experience

- Request microphone permission only after clear user action and explain why.
- Show listening, transcribing, thinking, speaking, paused, reconnecting, failed, and fallback states.
- Allow users to stop, skip, retry, or switch to typed mode at any time.
- Never submit audio silently or without consent.
- Display transcript confidence or an uncertainty indicator where available.
- Make keyboard controls and typed fallback first-class; support reduced motion and no-audio environments.

## Reliability and privacy

- Set timeouts, reconnect limits, bounded retries, and maximum turn duration.
- Handle browser incompatibility, denied permissions, network interruption, provider rate limits, and partial transcripts.
- Store only the minimum transcript/audio data needed; make retention configurable and provide deletion behavior.
- Redact sensitive logs and do not expose provider credentials to the browser.
- Mark voice-generated evaluations as based on transcript and explain limitations around accent, audio quality, and confidence inference.

## Acceptance criteria

- Voice is disabled cleanly when the feature flag or entitlement is off.
- A user can complete an entire interview in typed mode if voice fails.
- Permission, failure, reconnect, transcript, and completion paths are tested.
- Provider-specific code is isolated from session, evaluation, and result domain logic.
