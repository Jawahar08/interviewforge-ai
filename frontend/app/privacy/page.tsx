"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BrainCircuit,
  Database,
  Eye,
  FileCheck,
  Lock,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-12 lg:px-8">
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-400 transition hover:border-violet-500/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white">
              InterviewForge AI
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs text-blue-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Data Protection & Transparency
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-400">
            Last Updated: July 26, 2026 • Your Privacy & Data Integrity Are Our Highest Priority
          </p>
        </motion.div>

        {/* Content Body */}
        <div className="mt-12 space-y-8 text-slate-300 leading-relaxed">
          {/* Quick Summary Banner */}
          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/[0.07] p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <Lock className="mt-1 h-6 w-6 shrink-0 text-blue-400" />
              <div>
                <h3 className="font-semibold text-white">
                  Clear Data Privacy Commitments
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  InterviewForge AI stores your profile information, interview responses, and performance evaluations solely to deliver your personal AI interview experience. We do not sell your personal information or interview voice/text recordings to third-party data brokers.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <FileCheck className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                1. Information We Collect
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              When you use InterviewForge AI, we collect information necessary to generate mock interviews and evaluate your performance:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-400 pl-4">
              <li><strong>Account Credentials:</strong> Name, Email Address, and encrypted password hash.</li>
              <li><strong>Interview Content:</strong> Voice audio recordings, text transcriptions, code sandbox inputs, and system design answers.</li>
              <li><strong>Uploaded Resumes:</strong> Resume text uploaded for ATS scoring and tailored interview question generation.</li>
              <li><strong>Technical Metadata:</strong> Access timestamps, device platform, and session identifiers.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Database className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                2. How We Store & Protect Your Data
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              All application activities (sessions, answers, evaluations, and roadmaps) are stored in secure cloud database infrastructure hosted on Neon PostgreSQL. Password hashes use BCrypt (strength 10), and all API communications are enforced over SSL/TLS (HTTPS).
            </p>
          </section>

          {/* Section 3 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                3. Third-Party AI Processors (Google Gemini)
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              To evaluate your interview answers and compute score breakdowns, relevant prompt text is transmitted to Google AI APIs (Gemini 2.5 Flash). No personal identifiers are sold, and AI processing is governed strictly by Google API privacy standards.
            </p>
          </section>

          {/* Section 4 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                4. Your Rights & Data Deletion
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              You own your data. You may review your complete session history, update profile preferences, or request permanent account and database record deletion at any time.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} InterviewForge AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="hover:text-violet-400 transition">
              Terms of Service
            </Link>
            <Link href="/auth/register" className="hover:text-violet-400 transition">
              Sign Up
            </Link>
            <Link href="/auth/login" className="hover:text-violet-400 transition">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
