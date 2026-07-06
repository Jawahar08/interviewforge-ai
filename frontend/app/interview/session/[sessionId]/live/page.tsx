"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Lightbulb,
  Mic,
  Send,
  Sparkles,
} from "lucide-react";

const questions = [
  {
    title: "Explain the difference between REST and GraphQL.",
    hint: "Consider data fetching, endpoints, over-fetching, and client flexibility.",
  },
  {
    title: "How would you design authentication for a production SaaS application?",
    hint: "Think about access tokens, refresh tokens, password hashing, roles, and session security.",
  },
  {
    title: "What happens when a React component re-renders?",
    hint: "Discuss state changes, reconciliation, virtual DOM comparison, and child rendering.",
  },
];

export default function LiveInterviewPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();

  const sessionId = params.sessionId;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submittedAnswers, setSubmittedAnswers] = useState<string[]>([]);

  const question = questions[currentQuestion];

  const progress = useMemo(
    () => ((currentQuestion + 1) / questions.length) * 100,
    [currentQuestion]
  );

  const submitAnswer = () => {
    if (!answer.trim()) return;

    setSubmittedAnswers((previous) => [...previous, answer.trim()]);
    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <header className="border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            type="button"
            onClick={() => router.push(`/interview/session/${sessionId}`)}
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Leave interview
          </button>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Interview live
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-400">
              <Clock3 className="h-4 w-4 text-violet-400" />
              30:00
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[1fr_340px]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-300">
                  <Sparkles className="h-3.5 w-3.5" />
                  AI Interviewer
                </div>

                <p className="mt-4 text-sm text-slate-500">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
                <BrainCircuit className="h-6 w-6" />
              </div>
            </div>

            <h1 className="mt-8 max-w-3xl text-2xl font-semibold leading-relaxed sm:text-3xl">
              {question.title}
            </h1>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Your answer</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Explain your reasoning clearly and structure your response.
                </p>
              </div>

              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-violet-500/30 hover:text-violet-300"
                aria-label="Use microphone"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>

            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your interview answer here..."
              className="mt-6 min-h-64 w-full resize-none rounded-2xl border border-white/10 bg-[#080b18] p-5 text-sm leading-7 text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-violet-500/50"
            />

            <div className="mt-5 flex items-center justify-between">
              <span className="text-xs text-slate-600">
                {answer.length} characters
              </span>

              <button
                type="button"
                onClick={submitAnswer}
                disabled={!answer.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Interview"
                  : "Submit Answer"}

                {currentQuestion === questions.length - 1 ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="font-semibold">Session progress</h2>

            <div className="mt-6 space-y-4">
              {questions.map((_, index) => {
                const completed = index < currentQuestion;
                const active = index === currentQuestion;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold ${
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

                    <div>
                      <p
                        className={`text-sm ${
                          active ? "text-white" : "text-slate-500"
                        }`}
                      >
                        Question {index + 1}
                      </p>

                      <p className="text-xs text-slate-700">
                        {completed
                          ? "Completed"
                          : active
                            ? "In progress"
                            : "Upcoming"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-violet-500/20 bg-violet-500/[0.06] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <Lightbulb className="h-5 w-5 text-violet-300" />
            </div>

            <h2 className="mt-5 font-semibold">Interview hint</h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {question.hint}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <Code2 className="h-5 w-5 text-blue-400" />

              <div>
                <p className="text-sm font-medium">Technical Interview</p>
                <p className="text-xs text-slate-600">
                  Session {sessionId.slice(0, 8)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
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