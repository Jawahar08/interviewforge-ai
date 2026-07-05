"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  MessageSquareText,
  Mic,
  Play,
  Route,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import Navbar from "@/shared/components/layout/Navbar";

const capabilities = [
  "Adaptive AI Questions",
  "Instant Feedback",
  "Resume Intelligence",
  "Progress Tracking",
];

const features = [
  {
    icon: BrainCircuit,
    title: "AI Mock Interviews",
    description:
      "Practice realistic technical and behavioral interviews tailored to your role, experience, and goals.",
    className: "md:col-span-2",
  },
  {
    icon: FileSearch,
    title: "Resume Intelligence",
    description:
      "Analyze your resume, uncover skill gaps, and prepare for questions based on your actual experience.",
    className: "",
  },
  {
    icon: MessageSquareText,
    title: "Actionable Feedback",
    description:
      "Get structured insights on technical depth, communication, clarity, and confidence after every answer.",
    className: "",
  },
  {
    icon: Route,
    title: "Personalized Roadmaps",
    description:
      "Turn weak areas into a focused preparation plan with clear milestones and measurable improvement.",
    className: "md:col-span-2",
  },
];

const steps = [
  {
    number: "01",
    title: "Choose your target",
    description:
      "Select a role, interview type, difficulty level, and the skills you want to practice.",
  },
  {
    number: "02",
    title: "Practice realistically",
    description:
      "Answer adaptive interview questions designed around your goals and performance.",
  },
  {
    number: "03",
    title: "Improve with evidence",
    description:
      "Review AI feedback, identify weak areas, and track progress across every session.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen pt-24">
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Background glows */}
        <div className="pointer-events-none absolute -left-40 top-28 h-[520px] w-[520px] rounded-full bg-violet-700/20 blur-[140px]" />
        <div className="pointer-events-none absolute -right-40 top-40 h-[560px] w-[560px] rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          {/* Left */}
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200">
              <Sparkles className="h-4 w-4" />
              AI-powered interview preparation
            </div>

            <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Turn every interview into
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                an unfair advantage.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              Practice realistic interviews, get actionable AI feedback,
              analyze your resume, and build a personalized roadmap toward
              your next role.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/auth/register"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.28)] transition duration-300 hover:scale-[1.02]"
              >
                Start Free Interview
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/resume"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-semibold text-slate-200 backdrop-blur-xl transition hover:border-violet-400/30 hover:bg-white/[0.07]"
              >
                <FileSearch className="h-4 w-4" />
                Analyze My Resume
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              {[
                "Personalized questions",
                "Instant AI feedback",
                "Progress tracking",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-violet-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right AI Interview Card */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-r from-violet-600/20 to-blue-600/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1020]/90 shadow-2xl backdrop-blur-2xl">
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
                    <BrainCircuit className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold">Live Mock Interview</p>
                    <p className="text-xs text-slate-500">
                      Senior Backend Engineer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  AI Active
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Question 04 / 10</span>
                  <span className="text-violet-300">System Design</span>
                </div>

                <h3 className="text-xl font-semibold leading-8 text-white">
                  How would you design a scalable notification system for
                  millions of users?
                </h3>

                {/* Audio visualizer */}
                <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                  <div className="flex h-20 items-center justify-center gap-1.5">
                    {[
                      18, 32, 48, 28, 58, 72, 44, 64, 36, 76, 52, 30, 68, 42,
                      24, 54, 34, 20,
                    ].map((height, index) => (
                      <div
                        key={index}
                        className="w-1.5 rounded-full bg-gradient-to-t from-violet-600 to-blue-400"
                        style={{ height }}
                      />
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400">
                    <Mic className="h-4 w-4 text-violet-400" />
                    Listening to your answer...
                  </div>
                </div>

                {/* Analysis */}
                <div className="mt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-violet-400" />
                      <span className="font-medium">Live AI Analysis</span>
                    </div>

                    <span className="text-xs text-slate-500">
                      Updated now
                    </span>
                  </div>

                  <div className="space-y-4">
                    {[
                      ["Technical Depth", 84],
                      ["Communication", 91],
                      ["Confidence", 78],
                    ].map(([label, score]) => (
                      <div key={String(label)}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-slate-400">{label}</span>
                          <span className="font-medium text-white">
                            {score}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-500"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating score */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-white/10 bg-[#101629]/90 p-4 shadow-xl backdrop-blur-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>

                <div>
                  <p className="text-xs text-slate-500">Performance</p>
                  <p className="font-semibold text-white">+18% this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITY STRIP */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-5 px-6 py-6">
          {capabilities.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm font-medium text-slate-400"
            >
              <Sparkles className="h-4 w-4 text-violet-400" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Everything you need
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Prepare with intelligence,
              <span className="text-slate-500"> not guesswork.</span>
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-400">
              One preparation system that learns from your performance and
              helps you focus where improvement matters most.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-white/[0.055] ${feature.className}`}
                >
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl transition group-hover:bg-violet-600/20" />

                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
                      <Icon className="h-5 w-5 text-violet-400" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-3 max-w-xl leading-7 text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-y border-white/[0.06] bg-white/[0.018] py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              From uncertainty to
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                measurable progress.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-white/[0.08] bg-[#0b1020]/70 p-7"
              >
                <span className="text-sm font-bold tracking-[0.2em] text-violet-400">
                  {step.number}
                </span>

                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFORMANCE SHOWCASE */}
      <section className="py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
              Performance intelligence
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              See exactly where
              <span className="block text-slate-500">
                you are improving.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              InterviewForge turns every practice session into useful data.
              Track strengths, identify recurring weaknesses, and build a
              preparation strategy backed by evidence.
            </p>

            <Link
              href="/auth/register"
              className="mt-8 inline-flex items-center gap-2 font-semibold text-violet-400 transition hover:text-violet-300"
            >
              Start tracking your progress
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-white/[0.08] bg-[#0b1020] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Overall Readiness</p>
                <p className="mt-1 text-3xl font-bold">86%</p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
                <BarChart3 className="h-6 w-6 text-violet-400" />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["Technical", "88%"],
                ["Communication", "92%"],
                ["Problem Solving", "81%"],
                ["Confidence", "84%"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-5"
                >
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-28">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-violet-400/20 bg-gradient-to-br from-violet-600/20 via-[#10152a] to-blue-600/20 px-6 py-16 text-center sm:px-12">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative">
            <Target className="mx-auto h-10 w-10 text-violet-400" />

            <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Your next interview deserves better preparation.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Practice deliberately, understand your weaknesses, and walk
              into interviews knowing exactly how far you have improved.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-7 py-4 font-semibold shadow-lg shadow-violet-600/20 transition hover:scale-[1.02]"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold text-slate-200 transition hover:bg-white/[0.08]"
              >
                <Play className="h-4 w-4" />
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
              <BrainCircuit className="h-4 w-4" />
            </div>

            <span className="font-semibold">InterviewForge AI</span>
          </div>

          <p className="text-sm text-slate-500">
            AI-powered interview preparation for ambitious developers.
          </p>

          <p className="text-sm text-slate-600">
            © 2026 InterviewForge AI
          </p>
        </div>
      </footer>
    </main>
  );
}