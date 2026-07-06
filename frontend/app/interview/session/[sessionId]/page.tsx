"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BrainCircuit,
  Clock3,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

type SessionConfig = {
  role?: string;
  interviewType?: string;
  difficulty?: string;
  duration?: number;
};

export default function InterviewSessionPage() {
  const params = useParams<{ sessionId: string }>();
  const router = useRouter();

  const sessionId = params.sessionId;

  let config: SessionConfig = {};

  if (typeof window !== "undefined") {
    try {
      const storedConfig = sessionStorage.getItem(
        `interview-session-${sessionId}`
      );

      if (storedConfig) {
        config = JSON.parse(storedConfig) as SessionConfig;
      }
    } catch {
      config = {};
    }
  }

  const role = config.role ?? "Full Stack Developer";
  const interviewType = config.interviewType ?? "Technical";
  const difficulty = config.difficulty ?? "Medium";
  const duration = config.duration ?? 30;

  const startLiveInterview = () => {
    router.push(`/interview/session/${sessionId}/live`);
  };

  const sessionDetails = [
    {
      label: "Target Role",
      value: role,
      icon: Target,
    },
    {
      label: "Interview Type",
      value: interviewType,
      icon: MessageSquareText,
    },
    {
      label: "Difficulty",
      value: difficulty,
      icon: BrainCircuit,
    },
    {
      label: "Duration",
      value: `${duration} minutes`,
      icon: Clock3,
    },
  ];

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <Link
            href="/interview"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400 transition hover:border-violet-500/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit session
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Session ready
          </div>
        </div>

        <section className="mx-auto mt-16 max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 shadow-2xl shadow-violet-500/10">
            <BrainCircuit className="h-8 w-8 text-violet-300" />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-400">
            <Sparkles className="h-4 w-4 text-violet-400" />
            InterviewForge AI
          </div>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Your interview is{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              ready to begin
            </span>
          </h1>

          <p className="mt-5 text-base text-slate-400">
            Review your configuration before entering the live interview
            experience.
          </p>
        </section>

        <section className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sessionDetails.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
                  <Icon className="h-5 w-5 text-violet-300" />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {item.label}
                </p>

                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {item.value}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mx-auto mt-8 flex max-w-4xl flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-4">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-violet-300" />

            <div>
              <h2 className="font-semibold text-white">Before you begin</h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Your live AI interview workspace is ready. Questions, answer
                capture, progress tracking, and evaluation will run inside the
                live session.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={startLiveInterview}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02]"
          >
            <BrainCircuit className="h-5 w-5" />
            Begin AI Interview
          </button>
        </section>

        <p className="mt-6 text-center text-xs text-slate-600">
          Session ID: {sessionId}
        </p>
      </div>
    </main>
  );
}