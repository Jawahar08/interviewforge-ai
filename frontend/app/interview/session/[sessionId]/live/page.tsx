"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Lightbulb,
  LoaderCircle,
  Mic,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";
import { useInterviewTimer } from "@/features/interview/hooks/use-interview-timer";
import { useSessionQuestions } from
  "@/features/interview/hooks/use-session-questions";
import { answerApi } from
  "@/features/interview/api/answer.api";

import type { AnswerResponse } from
  "@/features/interview/types/answer.types";

import { sessionApi } from
  "@/features/interview/api/interview-session.api";
export default function LiveInterviewPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();

  const sessionId = params.sessionId;

 const [answer, setAnswer] = useState("");

const [
  isSubmittingAnswer,
  setIsSubmittingAnswer,
] = useState(false);

const [
  submissionError,
  setSubmissionError,
] = useState<string | null>(null);

const [
  evaluation,
  setEvaluation,
] = useState<AnswerResponse | null>(null);

const {
  questions,
  currentQuestion,
  currentQuestionIndex,
  isLoading,
  error,
  hasPrevious,
  isLastQuestion,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  retry,
} = useSessionQuestions(sessionId || null);

const timer = useInterviewTimer(30);

const minutes = String(timer.minutes).padStart(2, "0");
const seconds = String(timer.seconds).padStart(2, "0");

const timerColor =
  timer.minutes <= 1
    ? "text-red-400"
    : timer.minutes <= 5
    ? "text-yellow-400"
    : "text-emerald-400";

  const progress = useMemo(() => {
    
    if (questions.length === 0) {
      return 0;
    }

    return (
      ((currentQuestionIndex + 1) /
        questions.length) *
      100
    );
  }, [
    currentQuestionIndex,
    questions.length,
  ]);

  const submitAnswer = async () => {
  const trimmedAnswer = answer.trim();

  if (
    !trimmedAnswer ||
    !currentQuestion ||
    isSubmittingAnswer
  ) {
    return;
  }

  const numericSessionId =
    Number(sessionId);

  const numericQuestionId =
    Number(currentQuestion.id);

  if (
    !Number.isInteger(numericSessionId) ||
    numericSessionId <= 0
  ) {
    setSubmissionError(
      "Invalid interview session ID."
    );
    return;
  }

  if (
    !Number.isInteger(numericQuestionId) ||
    numericQuestionId <= 0
  ) {
    setSubmissionError(
      "Invalid interview question ID."
    );
    return;
  }

  try {
    setIsSubmittingAnswer(true);
    setSubmissionError(null);
    setEvaluation(null);

    const evaluatedAnswer =
      await answerApi.submitAndEvaluate({
        questionId: numericQuestionId,
        sessionId: numericSessionId,
        userAnswer: trimmedAnswer,
      });

    setEvaluation(evaluatedAnswer);
  } catch (error) {
    console.error(
      "Failed to submit and evaluate answer:",
      error
    );

    setSubmissionError(
      "Unable to submit and evaluate your answer. Please try again."
    );
  } finally {
    setIsSubmittingAnswer(false);
  }
};
useEffect(() => {
    if (!timer.isExpired) return;

    if (!evaluation) return;

    void handleContinueAfterEvaluation();
}, [timer.isExpired, evaluation]);
const handleContinueAfterEvaluation =
  async () => {
    if (!evaluation) {
      return;
    }

    if (!isLastQuestion) {
      setAnswer("");
      setEvaluation(null);
      setSubmissionError(null);

      nextQuestion();
      return;
    }

    const numericSessionId =
      Number(sessionId);

    if (
      !Number.isInteger(numericSessionId) ||
      numericSessionId <= 0
    ) {
      setSubmissionError(
        "Invalid interview session ID."
      );
      return;
    }

    try {
      setIsSubmittingAnswer(true);
      setSubmissionError(null);

      await sessionApi.completeSession(
        numericSessionId
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Failed to complete interview session:",
        error
      );

      setSubmissionError(
        "Your answer was evaluated, but the interview could not be completed."
      );
    } finally {
      setIsSubmittingAnswer(false);
    }
  };
  const handlePreviousQuestion = () => {
  if (
    !hasPrevious ||
    isSubmittingAnswer
  ) {
    return;
  }

  setAnswer("");
  setEvaluation(null);
  setSubmissionError(null);

  previousQuestion();
};

  // const handlePreviousQuestion = () => {
  //   if (!hasPrevious) {
  //     return;
  //   }

  //   setAnswer("");
  //   previousQuestion();
  // };

  const handleQuestionSelection = (
    index: number
  ) => {
    if (index > currentQuestionIndex) {
      return;
    }

    setAnswer("");
    goToQuestion(index);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
            <LoaderCircle className="h-8 w-8 animate-spin text-violet-300" />
          </div>

          <h1 className="mt-6 text-xl font-semibold">
            Preparing your AI interview
          </h1>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Loading your session and preparing
            interview questions.
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
            <AlertCircle className="h-7 w-7 text-red-300" />
          </div>

          <h1 className="mt-6 text-xl font-semibold">
            Unable to load interview
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {error}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => {
                void retry();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>

            <button
              type="button"
              onClick={() =>
                router.push("/interview")
              }
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-slate-300 transition hover:border-white/20 hover:text-white"
            >
              Back to interviews
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10">
            <BrainCircuit className="h-7 w-7 text-violet-300" />
          </div>

          <h1 className="mt-6 text-xl font-semibold">
            No interview questions available
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            This interview session does not
            currently contain any questions.
          </p>

          <button
            type="button"
            onClick={() => {
              void retry();
            }}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <header className="border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() =>
              router.push(
                `/interview/session/${sessionId}`
              )
            }
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Leave interview
          </button>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs">

    <Clock3 className={`h-4 w-4 ${timerColor}`} />

    <span className={timerColor}>
        {minutes}:{seconds}
    </span>

</div>

           
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1fr_340px]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Interviewer
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <p className="text-sm text-slate-500">
                    Question{" "}
                    {currentQuestion.questionNumber}{" "}
                    of{" "}
                    {currentQuestion.totalQuestions}
                  </p>

                  {currentQuestion.category && (
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[11px] font-medium text-blue-300">
                      {currentQuestion.category}
                    </span>
                  )}

                  {currentQuestion.difficulty && (
                    <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
                      {currentQuestion.difficulty}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
                <BrainCircuit className="h-6 w-6" />
              </div>
            </div>

            <h1 className="mt-8 max-w-3xl text-2xl font-semibold leading-relaxed sm:text-3xl">
              {currentQuestion.questionText}
            </h1>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Your answer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Explain your reasoning clearly and
                  structure your response.
                </p>
              </div>

              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-violet-500/30 hover:text-violet-300"
                aria-label="Use microphone"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>

            <textarea
  value={answer}
  disabled={
    isSubmittingAnswer ||
    evaluation !== null ||
    timer.isExpired
}
              onChange={(event) =>
                setAnswer(event.target.value)
              }
              placeholder="Type your interview answer here..."
              className="mt-6 min-h-64 w-full resize-none rounded-2xl border border-white/10 bg-[#080b18] p-5 text-sm leading-7 text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-violet-500/50"
            />
            {isSubmittingAnswer && (
<div className="mt-4 rounded-xl border border-violet-500/20 bg-violet-500/10 p-4 text-center">

    <LoaderCircle className="mx-auto h-6 w-6 animate-spin text-violet-300" />

    <p className="mt-2 text-sm text-slate-300">
        AI is evaluating your answer...
    </p>

</div>
)}
            <div className="mt-3 flex gap-2">

    <span className="rounded-lg bg-white/5 px-3 py-1 text-xs">
        Words:
        {answer.trim().split(/\s+/).filter(Boolean).length}
    </span>

    <span
        className={`rounded-lg px-3 py-1 text-xs ${
            answer.length > 250
                ? "bg-emerald-500/20 text-emerald-300"
                : answer.length > 100
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-red-500/20 text-red-300"
        }`}
    >
        {answer.length > 250
            ? "Detailed"
            : answer.length > 100
            ? "Average"
            : "Too Short"}
    </span>

</div>
            {submissionError && (
  <div
    role="alert"
    className="mt-5 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/[0.08] p-4"
  >
    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />

    <div>
      <p className="text-sm font-medium text-red-200">
        Answer submission failed
      </p>

      <p className="mt-1 text-sm leading-6 text-red-300/70">
        {submissionError}
      </p>
    </div>
  </div>
)}

{evaluation && (
  <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06]">
    <div className="flex items-center justify-between gap-4 border-b border-emerald-500/10 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
          <CheckCircle2 className="h-5 w-5 text-emerald-300" />
        </div>

        <div>
          <p className="text-sm font-semibold text-white">
            AI Evaluation Complete
          </p>

          <p className="text-xs text-slate-500">
            Your answer has been saved and reviewed
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-center">
        <p className="text-xl font-bold text-emerald-300">
          {evaluation.score !== null
            ? Math.round(evaluation.score)
            : 0}
        </p>

        <p className="text-[10px] uppercase tracking-wider text-emerald-400/60">
          Score
        </p>
      </div>
    </div>

    <div className="p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
        <BrainCircuit className="h-4 w-4" />
        Interviewer Feedback
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">
        {evaluation.feedback}
      </p>
    </div>
  </div>
)}

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-600">
                  {answer.trim().split(/\s+/).filter(Boolean).length} words • {answer.length} characters
                </span>

                {hasPrevious && (
                  <button
                    type="button"
                    onClick={
                      handlePreviousQuestion
                    }
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-400 transition hover:border-white/20 hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous
                  </button>
                )}
              </div>

              {evaluation ? (
  <button
    type="button"
    onClick={() => {
      void handleContinueAfterEvaluation();
    }}
    disabled={isSubmittingAnswer}
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
  >
    {isSubmittingAnswer ? (
      <>
        <LoaderCircle className="h-4 w-4 animate-spin" />
        Completing...
      </>
    ) : isLastQuestion ? (
      <>
        Complete Interview
        <CheckCircle2 className="h-4 w-4" />
      </>
    ) : (
      <>
        Next Question
        <ArrowRight className="h-4 w-4" />
      </>
    )}
  </button>
) : (
  <button
    type="button"
    onClick={() => {
      void submitAnswer();
    }}
    disabled={
    !answer.trim() ||
    isSubmittingAnswer ||
    timer.isExpired
}
    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
  >
    {isSubmittingAnswer ? (
      <>
        <LoaderCircle className="h-4 w-4 animate-spin" />
        Evaluating...
      </>
    ) : (
      <>
        {isLastQuestion
          ? "Submit Final Answer"
          : "Submit Answer"}

        <Send className="h-4 w-4" />
      </>
    )}
  </button>
)}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">
                Session progress
              </h2>

              <span className="text-xs text-slate-600">
                {currentQuestionIndex + 1}/
                {questions.length}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {questions.map(
                (questionItem, index) => {
                  const completed =
                    index < currentQuestionIndex;

                  const active =
                    index === currentQuestionIndex;

                  const canNavigate =
                    index <= currentQuestionIndex;

                  return (
                    <button
                      key={questionItem.id}
                      type="button"
                      disabled={!canNavigate || evaluation !== null}
                      onClick={() =>
                        handleQuestionSelection(index)
                      }
                      className={`flex w-full items-center gap-3 rounded-xl p-2 text-left transition ${
                        canNavigate
                          ? "hover:bg-white/[0.03]"
                          : "cursor-default"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold ${
                          completed
                            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                            : active
                              ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                              : "border-white/10 bg-white/[0.03] text-slate-600"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div className="min-w-0">
                        <p
                          className={`text-sm ${
                            active
                              ? "text-white"
                              : "text-slate-500"
                          }`}
                        >
                          Question {index + 1}
                        </p>

                        <p className="truncate text-xs text-slate-700">
                          {completed
                            ? "Completed"
                            : active
                              ? "In progress"
                              : "Upcoming"}
                        </p>
                      </div>
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-500/20 bg-violet-500/[0.06] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <Lightbulb className="h-5 w-5 text-violet-300" />
            </div>

            <h2 className="mt-5 font-semibold">
              Interview guidance
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Structure your answer clearly. Explain
              assumptions, trade-offs, implementation
              choices, and practical examples where
              relevant.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <Code2 className="h-5 w-5 text-blue-400" />

              <div className="min-w-0">
                <p className="text-sm font-medium">
                  {currentQuestion.category ??
                    "Technical Interview"}
                </p>

                <p className="truncate text-xs text-slate-600">
                  Session {sessionId}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/5 bg-black/10 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  Status
                </span>

                <span className="text-emerald-400">
                  Active
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  Questions
                </span>

                <span className="text-slate-300">
                  {questions.length}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                router.push("/dashboard")
              }
              className="mt-6 inline-flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400 transition hover:border-violet-500/30 hover:text-white"
            >
              End session
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}