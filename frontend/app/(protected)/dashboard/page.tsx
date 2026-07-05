import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Clock3,
  FileSearch,
  MessageSquareText,
  Play,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const statCards = [
  {
    label: "Interviews Completed",
    value: "0",
    description: "Start your first practice session",
    icon: MessageSquareText,
  },
  {
    label: "Average Score",
    value: "--",
    description: "Available after your first interview",
    icon: BarChart3,
  },
  {
    label: "Practice Time",
    value: "0m",
    description: "Your preparation time will appear here",
    icon: Clock3,
  },
  {
    label: "Readiness",
    value: "--",
    description: "Build your performance profile",
    icon: TrendingUp,
  },
];

const quickActions = [
  {
    title: "Start Mock Interview",
    description:
      "Practice with adaptive AI-generated questions.",
    href: "/interview",
    icon: Play,
  },
  {
    title: "Analyze Resume",
    description:
      "Discover strengths, gaps, and interview risks.",
    href: "/resume",
    icon: FileSearch,
  },
  {
    title: "View Roadmap",
    description:
      "Follow your personalized preparation plan.",
    href: "/roadmap",
    icon: Target,
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-violet-600/15 via-[#0b1020] to-blue-600/10 p-6 sm:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-600/15 blur-[100px]" />

        <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
              <Sparkles className="h-3.5 w-3.5" />
              Your preparation workspace
            </div>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to sharpen your
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                interview performance?
              </span>
            </h1>

            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              Practice deliberately, review AI feedback, and build a
              measurable path toward interview readiness.
            </p>
          </div>

          <Link
            href="/interview"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:scale-[1.02]"
          >
            Start Interview
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-violet-400/15 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <Icon className="h-5 w-5" />
                </div>

                <span className="text-xs text-slate-600">
                  Overview
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold tracking-tight">
                {stat.value}
              </p>

              <p className="mt-1 text-sm font-medium text-slate-300">
                {stat.label}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-600">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Recent Interviews
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest practice sessions will appear here.
              </p>
            </div>

            <Link
              href="/history"
              className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
            >
              View history
            </Link>
          </div>

          <div className="flex min-h-72 flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/10 bg-violet-500/[0.07]">
              <BrainCircuit className="h-7 w-7 text-violet-400" />
            </div>

            <h3 className="mt-5 font-semibold">
              No interviews yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Complete your first mock interview to begin building
              your performance history.
            </p>

            <Link
              href="/interview"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-400"
            >
              Start practicing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6">
          <h2 className="text-lg font-semibold">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Continue your preparation.
          </p>

          <div className="mt-6 space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 transition hover:border-violet-400/20 hover:bg-violet-500/[0.05]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-200 transition group-hover:text-white">
                      {action.title}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      {action.description}
                    </p>
                  </div>

                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-700 transition group-hover:translate-x-1 group-hover:text-violet-400" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}