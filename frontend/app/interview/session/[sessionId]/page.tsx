"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BrainCircuit,
  Clock3,
  Loader2,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import { useInterviewStore } from "@/features/interview/store/interview.store";

const roleLabels: Record<string, string> = {
  FULL_STACK_DEVELOPER: "Full Stack Developer",
  BACKEND_DEVELOPER: "Backend Developer",
  FRONTEND_DEVELOPER: "Frontend Developer",
  JAVA_DEVELOPER: "Java Developer",
  SOFTWARE_ENGINEER: "Software Engineer",
  DEVOPS_ENGINEER: "DevOps Engineer",
};

const typeLabels: Record<string, string> = {
  TECHNICAL: "Technical",
  BEHAVIORAL: "Behavioral",
  MIXED: "Mixed",
};

const difficultyLabels: Record<string, string> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

export default function InterviewSessionPage() {
  const params = useParams<{
    sessionId: string;
  }>();

  const router = useRouter();

  const [hasHydrated, setHasHydrated] =
    useState(false);

  const interviewConfig = useInterviewStore(
    (state) => state.interviewConfig
  );

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816]">
        <div className="flex items-center gap-3 text-sm text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
          Loading interview session...
        </div>
      </main>
    );
  }

  if (
    !interviewConfig ||
    interviewConfig.sessionId !== params.sessionId
  ) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] px-4">
        <div className="w-full max-w-lg rounded-3xl border border-white/[0.07] bg-white/[0.025] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
            <BrainCircuit className="h-7 w-7 text-violet-300" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            Session not available
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            This interview configuration could not be
            found. Create a new session to continue.
          </p>

          <button
            type="button"
            onClick={() => router.push("/interview")}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to setup
          </button>
        </div>
      </main>
    );
  }

  const {
    role,
    type,
    difficulty,
    duration,
  } = interviewConfig;

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-violet-600/10 blur-[130px]" />

        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/interview")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit session
          </button>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Session ready
          </div>
        </header>

        <section className="flex flex-1 items-center justify-center py-12">
          <div className="w-full">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 shadow-[0_0_40px_rgba(139,92,246,0.12)]">
                <BrainCircuit className="h-8 w-8 text-violet-300" />
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                InterviewForge AI
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your interview is
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  ready to begin
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Review your configuration before
                entering the live interview experience.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SessionDetailCard
                icon={Target}
                label="Target role"
                value={
                  roleLabels[role] ?? role
                }
              />

              <SessionDetailCard
                icon={MessageSquareText}
                label="Interview type"
                value={
                  typeLabels[type] ?? type
                }
              />

              <SessionDetailCard
                icon={BrainCircuit}
                label="Difficulty"
                value={
                  difficultyLabels[difficulty] ??
                  difficulty
                }
              />

              <SessionDetailCard
                icon={Clock3}
                label="Duration"
                value={`${duration} minutes`}
              />
            </div>

            <div className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <ShieldCheck className="h-5 w-5 text-violet-300" />
                    Before you begin
                  </div>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    The live AI question engine will be
                    connected in the backend integration
                    phase. Your session configuration and
                    routing flow are now ready.
                  </p>
                </div>

                <button
                  type="button"
                  disabled
                  className="inline-flex min-h-12 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white opacity-60"
                >
                  <BrainCircuit className="h-4 w-4" />
                  Begin AI Interview
                </button>
              </div>
            </div>

            <p className="mt-5 text-center text-xs text-slate-600">
              Session ID: {params.sessionId}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

interface SessionDetailCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function SessionDetailCard({
  icon: Icon,
  label,
  value,
}: SessionDetailCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10">
        <Icon className="h-4 w-4 text-violet-300" />
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold leading-5 text-slate-200">
        {value}
      </p>
    </div>
  );
}