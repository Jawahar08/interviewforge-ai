"use client";

import { useState } from "react";
import {
  Brain,
  Sliders,
  Bell,
  Trash2,
  Loader2,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  Zap,
  CheckCircle2,
  Flame,
  Gauge,
  FileText,
  Layers,
  Activity,
  ArrowRight,
} from "lucide-react";

import { useSettings } from "../hooks/use-settings";
import { Button } from "@/shared/components/ui/button";

export function SettingsForm() {
  const {
    settings,
    loading,
    clearingHistory,
    clearingResumes,
    saveSettings,
    clearHistory,
    clearResumes,
  } = useSettings();

  const [activeTab, setActiveTab] = useState<"ai" | "notifications" | "danger">("ai");

  if (loading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-3xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
          <p className="text-xs text-slate-400 animate-pulse">Loading system configuration...</p>
        </div>
      </div>
    );
  }

  const getTempDescription = (temp: number) => {
    if (temp <= 0.3) {
      return {
        label: "Exact & Factual",
        badgeColor: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
        desc: "Best for strict coding questions, standard technical algorithms, and accurate definitions.",
      };
    }
    if (temp <= 0.7) {
      return {
        label: "Balanced & Realistic",
        badgeColor: "border-violet-500/30 bg-violet-500/10 text-violet-300",
        desc: "Optimal balance for realistic mock interviews, adaptive follow-ups, and constructive feedback.",
      };
    }
    return {
      label: "Creative & Scenario-based",
      badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-300",
      desc: "Great for open-ended system design problems, behavioral interviews, and creative scenario challenges.",
    };
  };

  const tempInfo = getTempDescription(settings.aiTemperature);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Navigation Dock Sidebar (3 Cols) */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="rounded-3xl border border-white/[0.08] bg-[#0b0f19]/80 p-2 backdrop-blur-xl shadow-xl shadow-black/40">
          <nav className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("ai")}
              className={`group relative flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-left transition-all duration-200 ${
                activeTab === "ai"
                  ? "bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white shadow-lg shadow-violet-500/25 border border-violet-400/30"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  activeTab === "ai"
                    ? "bg-white/20 text-white"
                    : "bg-white/[0.05] text-slate-400 group-hover:text-white"
                }`}
              >
                <Sliders className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">AI Intelligence</span>
                <span className={`text-[11px] ${activeTab === "ai" ? "text-violet-200" : "text-slate-500"}`}>
                  Model tuning & parameters
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("notifications")}
              className={`group relative flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-left transition-all duration-200 ${
                activeTab === "notifications"
                  ? "bg-gradient-to-r from-violet-600/90 to-indigo-600/90 text-white shadow-lg shadow-violet-500/25 border border-violet-400/30"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  activeTab === "notifications"
                    ? "bg-white/20 text-white"
                    : "bg-white/[0.05] text-slate-400 group-hover:text-white"
                }`}
              >
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Notifications</span>
                <span className={`text-[11px] ${activeTab === "notifications" ? "text-violet-200" : "text-slate-500"}`}>
                  Alerts & email updates
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("danger")}
              className={`group relative flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-left transition-all duration-200 ${
                activeTab === "danger"
                  ? "bg-gradient-to-r from-red-600/90 to-rose-700/90 text-white shadow-lg shadow-red-500/25 border border-red-400/30"
                  : "text-slate-400 hover:bg-red-500/10 hover:text-red-300"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                  activeTab === "danger"
                    ? "bg-white/20 text-white"
                    : "bg-white/[0.05] text-red-400 group-hover:text-red-300"
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Danger Zone</span>
                <span className={`text-[11px] ${activeTab === "danger" ? "text-red-200" : "text-slate-500"}`}>
                  Clear interview data
                </span>
              </div>
            </button>
          </nav>
        </div>

        {/* Quick Helper Card */}
        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-violet-950/20 via-white/[0.01] to-transparent p-5 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-violet-300 mb-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span>AI Optimization Tip</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Temperature values automatically persist to your local workspace state and customize the live Gemini generation pipeline.
          </p>
        </div>
      </div>

      {/* Main Content Area (8 Cols) */}
      <div className="lg:col-span-8 space-y-6">
        {activeTab === "ai" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* AI Temperature Section */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#0c101d]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/50 space-y-6">
              <div className="flex items-start justify-between border-b border-white/[0.06] pb-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                    <Flame className="h-5 w-5 text-amber-400" />
                    AI Creativity (Temperature)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Controls randomness and response variability during interview evaluation.
                  </p>
                </div>
                <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-sm font-extrabold text-violet-300 font-mono">
                  {settings.aiTemperature}
                </span>
              </div>

              <div className="space-y-5">
                {/* Active Mode Banner */}
                <div className={`rounded-2xl border p-4 backdrop-blur-md transition-all ${tempInfo.badgeColor}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider">Active Mode</span>
                    <span className="text-xs font-bold">{tempInfo.label}</span>
                  </div>
                  <p className="text-xs text-slate-300/90 leading-relaxed">{tempInfo.desc}</p>
                </div>

                {/* Range Slider */}
                <div className="space-y-3 pt-2">
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={settings.aiTemperature}
                    onChange={(e) => saveSettings({ aiTemperature: parseFloat(e.target.value) })}
                    className="w-full h-2.5 rounded-lg appearance-none cursor-pointer bg-slate-800 accent-violet-500 transition"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium px-1">
                    <span>Precise (0.1)</span>
                    <span>Balanced (0.5)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>

                {/* Temperature Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { val: 0.2, label: "0.2 Factual" },
                    { val: 0.7, label: "0.7 Balanced" },
                    { val: 0.95, label: "0.95 Creative" },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => saveSettings({ aiTemperature: preset.val })}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                        settings.aiTemperature === preset.val
                          ? "border-violet-500 bg-violet-500/20 text-white"
                          : "border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/[0.05]"
                      }`}
                    >
                      Preset: {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Model Selection */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#0c101d]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/50 space-y-6">
              <div className="space-y-1 border-b border-white/[0.06] pb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <Brain className="h-5 w-5 text-violet-400" />
                  Active AI Generation Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Select the underlying LLM intelligence model powering session evaluation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: "gemini-flash",
                    name: "Gemini 2.5 Flash",
                    badge: "Ultra Fast",
                    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                    desc: "Sub-second speed & concise assessment.",
                    speed: "⚡⚡⚡",
                  },
                  {
                    id: "gemini-pro",
                    name: "Gemini 2.5 Pro",
                    badge: "Deep Reasoner",
                    badgeColor: "bg-violet-500/10 text-violet-400 border-violet-500/30",
                    desc: "Complex logic analysis & in-depth scoring.",
                    speed: "🧠🧠🧠",
                  },
                  {
                    id: "mock-dev",
                    name: "Mock Dev Engine",
                    badge: "Local Test",
                    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
                    desc: "Simulated response engine for dev sandbox.",
                    speed: "🛠️ Local",
                  },
                ].map((model) => {
                  const isSelected = settings.aiModel === model.id;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => saveSettings({ aiModel: model.id as any })}
                      className={`relative flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-violet-500 bg-gradient-to-b from-violet-500/15 via-violet-500/5 to-transparent shadow-xl shadow-violet-500/10 ring-1 ring-violet-500/50"
                          : "border-white/[0.08] bg-white/[0.015] hover:border-white/[0.18] hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${model.badgeColor}`}
                          >
                            {model.badge}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-violet-400 shrink-0" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{model.name}</h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{model.desc}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                        <span>Capacity</span>
                        <span className="text-slate-300 font-semibold">{model.speed}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evaluation Verbosity */}
            <div className="rounded-3xl border border-white/[0.08] bg-[#0c101d]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/50 space-y-6">
              <div className="space-y-1 border-b border-white/[0.06] pb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <FileText className="h-5 w-5 text-indigo-400" />
                  Evaluation Feedback Verbosity
                </h3>
                <p className="text-xs text-slate-400">
                  Choose detail depth for post-interview feedback reports.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    id: "detailed",
                    title: "Detailed Breakdown",
                    subtitle: "Comprehensive Analysis",
                    desc: "Includes line-by-line answer corrections, code optimizations, key strengths, and specific study recommendations.",
                    icon: Layers,
                  },
                  {
                    id: "concise",
                    title: "Concise Summary",
                    subtitle: "Fast Actionable Bullet Points",
                    desc: "Delivers quick percentage scores, immediate pros/cons, and essential takeaways for fast reviews.",
                    icon: Zap,
                  },
                ].map((v) => {
                  const isSelected = settings.verbosity === v.id;
                  const Icon = v.icon;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => saveSettings({ verbosity: v.id as any })}
                      className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/40"
                          : "border-white/[0.08] bg-white/[0.015] hover:border-white/[0.18] hover:bg-white/[0.03]"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isSelected ? "bg-violet-600 text-white" : "bg-white/[0.05] text-slate-400"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{v.title}</h4>
                          {isSelected && <span className="h-2 w-2 rounded-full bg-violet-400"></span>}
                        </div>
                        <span className="text-[11px] font-medium text-violet-300 block">{v.subtitle}</span>
                        <p className="text-xs text-slate-400 leading-relaxed pt-1">{v.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="rounded-3xl border border-white/[0.08] bg-[#0c101d]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/50 space-y-6">
              <div className="space-y-1 border-b border-white/[0.06] pb-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <Bell className="h-5 w-5 text-violet-400" />
                  Notification Preferences
                </h3>
                <p className="text-xs text-slate-400">
                  Control alert frequencies and automated email reports.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    id: "emailOnResume",
                    title: "Resume Evaluation Reports",
                    desc: "Receive automated email summaries whenever your resume is parsed or evaluated by ATS scanner.",
                    tag: "Email Alert",
                  },
                  {
                    id: "weeklyRoadmapReminders",
                    title: "Weekly Career Study Reminders",
                    desc: "Get scheduled weekly progress check-ins based on your active career roadmap milestones.",
                    tag: "Schedule",
                  },
                  {
                    id: "pushNotifications",
                    title: "Real-time Web Browser Alerts",
                    desc: "Enable instant browser desktop push notifications for active interview timers.",
                    tag: "Push Alert",
                  },
                ].map((item) => {
                  const active = (settings as any)[item.id];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 hover:border-white/[0.12] transition"
                    >
                      <div className="space-y-1.5 pr-6">
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                          <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-semibold text-slate-300">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 max-w-lg leading-relaxed">{item.desc}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => saveSettings({ [item.id]: !active })}
                        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                          active ? "bg-violet-600" : "bg-white/[0.1]"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            active ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "danger" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="rounded-3xl border border-red-500/30 bg-[#160b0e]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/50 space-y-6">
              <div className="space-y-1 border-b border-red-500/20 pb-5">
                <h3 className="text-lg font-bold text-red-400 flex items-center gap-2.5">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Irreversible Actions
                </h3>
                <p className="text-xs text-red-300/70">
                  Deleting history or resume files will permanently purge associated data from the platform.
                </p>
              </div>

              <div className="space-y-4">
                {/* Reset History */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Reset Mock Interview History</h4>
                    <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                      Permanently wipe all past mock interview sessions, audio transcript records, and overall performance stats.
                    </p>
                  </div>
                  <Button
                    onClick={clearHistory}
                    disabled={clearingHistory}
                    className="h-11 rounded-xl bg-red-600/15 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition shrink-0 font-semibold px-5"
                  >
                    {clearingHistory ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Reset History
                      </>
                    )}
                  </Button>
                </div>

                {/* Reset Resumes */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Clear Resume Database</h4>
                    <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                      Purge uploaded resume documents and all generated ATS keyword gap ratings.
                    </p>
                  </div>
                  <Button
                    onClick={clearResumes}
                    disabled={clearingResumes}
                    className="h-11 rounded-xl bg-red-600/15 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition shrink-0 font-semibold px-5"
                  >
                    {clearingResumes ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      <>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Reset Resumes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
