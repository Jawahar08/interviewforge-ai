import { Metadata } from "next";
import { SettingsForm } from "@/features/settings/components/SettingsForm";
import { Cpu, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings - InterviewForge AI",
  description: "Configure AI preferences, toggles, and mock parameters.",
};

export default function SettingsPage() {
  return (
    <div className="relative min-h-screen w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-10 space-y-8">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-10 top-1/3 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute left-1/3 bottom-10 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      {/* Header Banner */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            SYSTEM PREFERENCES & TUNING
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Control <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Center</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Customize your AI mock evaluation parameters, notification triggers, and platform data persistence.
          </p>
        </div>

        {/* System Telemetry Chips */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 backdrop-blur-md shadow-inner">
            <Cpu className="h-4 w-4 text-violet-400" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-400">AI Engine</span>
              <span className="text-xs font-bold text-white">Gemini 2.5 Flash</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 backdrop-blur-md shadow-inner">
            <Zap className="h-4 w-4 text-emerald-400" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Latency</span>
              <span className="text-xs font-bold text-emerald-400">~95ms</span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 backdrop-blur-md shadow-inner">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Security</span>
              <span className="text-xs font-bold text-white">Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Settings Component */}
      <div className="relative">
        <SettingsForm />
      </div>
    </div>
  );
}
