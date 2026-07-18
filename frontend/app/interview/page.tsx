import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  Clock3,
  Sparkles,
  Target,
} from "lucide-react";

import { InterviewSetupForm } from "@/features/interview/components/InterviewSetupForm";

export default function InterviewPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-400 transition hover:border-violet-500/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <header className="mb-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered practice
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Build your next
                <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  interview session
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Configure a focused mock interview
                around the role you are targeting and
                the skills you want to strengthen.
              </p>
            </div>

            <div className="hidden gap-3 lg:flex">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <BrainCircuit className="h-4 w-4 text-violet-300" />
                  AI guided
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Target className="h-4 w-4 text-blue-300" />
                  Role focused
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock3 className="h-4 w-4 text-cyan-300" />
                  Flexible
                </div>
              </div>
            </div>
          </div>
        </header>

        <InterviewSetupForm />
      </div>
    </main>
  );
}