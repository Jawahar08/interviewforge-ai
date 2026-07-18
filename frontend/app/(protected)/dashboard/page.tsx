"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDashboard } from "@/features/dashboard/hooks/use-dashboard";
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
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data, loading, fetchAnalytics } = useDashboard();

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const statCards = [
    {
      label: "Interviews Completed",
      value: data?.totalInterviews !== undefined ? String(data.totalInterviews) : "0",
      description: data?.totalInterviews ? "Deliberate practice sessions completed" : "Start your first practice session",
      icon: MessageSquareText,
    },
    {
      label: "Average Score",
      value: data?.averageInterviewScore ? `${data.averageInterviewScore.toFixed(0)}%` : "--",
      description: data?.averageInterviewScore ? "Overall mock interview score" : "Available after your first interview",
      icon: BarChart3,
    },
    {
      label: "Practice Questions",
      value: data?.totalQuestions !== undefined ? String(data.totalQuestions) : "0",
      description: data?.totalQuestions ? "Total practice questions answered" : "Questions compiled for review",
      icon: Clock3,
    },
    {
      label: "Latest ATS Score",
      value: data?.resumeAtsScore ? `${data.resumeAtsScore}%` : "--",
      description: data?.resumeAtsScore ? "Resume compatibility assessment" : "Upload your resume to calculate score",
      icon: TrendingUp,
    },
  ];

  const quickActions = [
    {
      title: "Start Mock Interview",
      description: "Practice with adaptive AI-generated questions.",
      href: "/interview",
      icon: Play,
    },
    {
      title: "Analyze Resume",
      description: "Discover strengths, gaps, and interview risks.",
      href: "/resume",
      icon: FileSearch,
    },
    {
      title: "View Roadmap",
      description: "Follow your personalized preparation plan.",
      href: "/roadmap",
      icon: Target,
    },
  ];

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] bg-black text-white gap-3">
        <RefreshCw className="w-8 h-8 text-violet-400 animate-spin" />
        <span className="text-zinc-500 text-sm">Restoring workspace dashboard...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-10 text-zinc-100">
      
      {/* Banner Intro */}
      <section className="relative overflow-hidden rounded-3xl border border-zinc-900 bg-gradient-to-br from-violet-600/10 via-zinc-950 to-zinc-950/20 p-8 sm:p-10 mb-10">
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 bg-violet-600/10 rounded-full blur-[100px]" />

        <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-3 py-1.5 text-xs font-semibold text-violet-400">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              Your preparation workspace
            </div>

            <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to sharpen your
              <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {" "}
                interview performance?
              </span>
            </h1>

            <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400 text-sm">
              Practice deliberately, review multi-dimensional AI feedback, upload resumes to scan ATS scores, and map out a structured path toward job readiness.
            </p>
          </div>

          <Link
            href="/interview"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-violet-600/20 transition hover:scale-[1.02]"
          >
            Start Interview
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* AI Insight Card */}
      {data?.aiInsight && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl border border-violet-500/10 bg-violet-500/5 backdrop-blur-xl mb-10 flex gap-4 items-start"
        >
          <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-400 flex-shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-violet-400 uppercase tracking-widest mb-1">AI Career Assistant Insights</h4>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">{data.aiInsight}</p>
          </div>
        </motion.div>
      )}

      {/* Stat Cards grid */}
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-xl p-5 hover:border-zinc-800 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-violet-400">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Metrics</span>
              </div>

              <p className="mt-5 text-3xl font-extrabold tracking-tight font-mono text-white">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-300">
                {stat.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500 font-sans">
                {stat.description}
              </p>
            </motion.div>
          );
        })}
      </section>

      {/* Detail dashboard rows */}
      <section className="mt-10 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        
        {/* Recent Interviews list */}
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-xl p-6 flex flex-col justify-between min-h-[350px]">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Recent Interviews</h2>
                <p className="mt-1 text-xs text-zinc-500 font-sans">
                  Your latest practice sessions. Click on any record to view details.
                </p>
              </div>
              <Link
                href="/history"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
              >
                View History Log
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* In Dashboard page we show a quick review of the latest session or empty */}
            {data?.totalInterviews && data.totalInterviews > 0 ? (
              <div className="p-8 bg-zinc-900/10 border border-zinc-900 rounded-2xl flex flex-col items-center justify-center text-center max-w-lg mx-auto">
                <BrainCircuit className="w-10 h-10 mb-3 text-violet-400 opacity-80" />
                <h4 className="font-bold text-white mb-1">Performance Records Available</h4>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans mb-4">
                  You have successfully completed mock interview sessions. Dive into your performance history to inspect feedback questions and improvement roadmaps.
                </p>
                <Link
                  href="/history"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-850"
                >
                  Explore Reports
                </Link>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center py-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-900 bg-zinc-900/30 text-zinc-400 mb-4">
                  <BrainCircuit className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-zinc-200">No mock sessions completed</h3>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-zinc-500 font-sans">
                  Run your first adaptive AI mock session to begin building performance benchmarks.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions sidebar */}
        <div className="rounded-3xl border border-zinc-900 bg-zinc-950/60 backdrop-blur-xl p-6">
          <h2 className="text-lg font-bold text-white mb-1">Quick Actions</h2>
          <p className="text-xs text-zinc-500 font-sans">Continue your preparation workflows.</p>

          <div className="mt-6 space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-4 rounded-2xl border border-zinc-900 bg-zinc-950/40 p-4 hover:border-zinc-800 hover:bg-zinc-900/10 transition duration-200"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-850 text-violet-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-200 group-hover:text-white transition">
                      {action.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-zinc-500 font-sans">
                      {action.description}
                    </p>
                  </div>

                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-violet-400" />
                </Link>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
}