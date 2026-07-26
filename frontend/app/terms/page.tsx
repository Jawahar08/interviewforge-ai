"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BrainCircuit,
  Database,
  FileText,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

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
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300">
            <Scale className="h-3.5 w-3.5" />
            Legal Agreement
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Terms of Service
          </h1>

          <p className="mt-4 text-sm text-slate-400">
            Last Updated: July 26, 2026 • Effective Immediately Upon Account Registration
          </p>
        </motion.div>

        {/* Content Body */}
        <div className="mt-12 space-y-8 text-slate-300 leading-relaxed">
          {/* Quick Notice Banner */}
          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/[0.07] p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-violet-400" />
              <div>
                <h3 className="font-semibold text-white">
                  Important Notice Regarding Data & AI Usage
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  By registering an account on InterviewForge AI, you explicitly consent to the secure storage of your profile data, mock interview audio transcriptions, code submissions, and performance metrics in our cloud database (Neon PostgreSQL), as well as processing via Google Gemini AI for automated interview evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                1. Acceptance of Terms & Account Registration
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              By creating an account or accessing InterviewForge AI, you agree to be bound by these Terms of Service and our Privacy Policy. You must provide accurate registration details (Full Name, Email Address, and Password). You are solely responsible for maintaining the confidentiality of your account credentials.
            </p>
          </section>

          {/* Section 2 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Database className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                2. Data Collection, Activity Logging & Storage
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              To provide personalized mock interview feedback, progress tracking, and historical performance analytics, InterviewForge AI securely stores the following activity data in encrypted PostgreSQL database storage (Neon Cloud):
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-400 pl-4">
              <li>User Account Profiles (Name, Email, Role preferences, Account Tier).</li>
              <li>Mock Interview Records (Session history, selected difficulty, interview categories).</li>
              <li>Answer Submissions (Written answers, voice recordings/transcripts, code sandbox inputs).</li>
              <li>AI Evaluation Reports (Score metrics, strengths, weaknesses, and improvement roadmaps).</li>
              <li>Uploaded Resume Text & ATS Optimization Analysis.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                3. Artificial Intelligence (AI) Services
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              InterviewForge AI integrates Google Gemini AI models to generate interview questions, analyze candidate responses, calculate ATS resume match scores, and produce personalized study plans. You acknowledge that AI output is provided for educational and interview preparation purposes and does not guarantee employment outcomes.
            </p>
          </section>

          {/* Section 4 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                4. Data Security & User Rights
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              We employ industry-standard security safeguards including BCrypt password hashing, JSON Web Token (JWT) session security, and SSL/TLS encrypted transport. Users retain full rights to request deletion of their account and associated interview data at any time through account settings or by contacting support.
            </p>
          </section>

          {/* Section 5 */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                5. Modifications & Contact Information
              </h2>
            </div>
            <p className="mt-4 text-slate-400">
              InterviewForge AI reserves the right to update these Terms of Service periodically. Continued use of the platform constitutes acceptance of any modified terms. For inquiries regarding data practices or legal terms, please reach out via our official support channels.
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} InterviewForge AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-violet-400 transition">
              Privacy Policy
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
