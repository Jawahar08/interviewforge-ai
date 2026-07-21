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
} from "lucide-react";

import { useSettings } from "../hooks/use-settings";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

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

  const [activeTab, setActiveTab] = useState("ai");

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full max-w-md grid grid-cols-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-1">
          <TabsTrigger
            value="ai"
            className="py-2 text-xs sm:text-sm font-medium rounded-lg transition-all data-[state=active]:bg-violet-600 data-[state=active]:text-white"
          >
            <Sliders className="mr-2 h-4 w-4" />
            AI Config
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="py-2 text-xs sm:text-sm font-medium rounded-lg transition-all data-[state=active]:bg-violet-600 data-[state=active]:text-white"
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="danger"
            className="py-2 text-xs sm:text-sm font-medium rounded-lg transition-all data-[state=active]:bg-red-600/80 data-[state=active]:text-white"
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Danger Zone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai">
          <Card className="border border-white/[0.07] bg-white/[0.015] p-6 backdrop-blur-xl rounded-3xl">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-violet-400" />
                AI Model & Generation Tuning
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Configure the Google Gemini intelligence behavior for simulated mock sessions.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
              {/* Temp Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-slate-200">AI Creativity (Temperature)</label>
                    <div className="group relative">
                      <HelpCircle className="h-3.5 w-3.5 text-slate-500 cursor-help" />
                      <div className="absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 rounded-lg bg-[#0c1120] p-2 text-center text-[10px] text-slate-300 opacity-0 transition-opacity border border-white/[0.08] shadow-lg group-hover:opacity-100 pointer-events-none">
                        Lower temperature is highly precise. Higher temperature allows creative scenario-based questions.
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-violet-400">{settings.aiTemperature}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={settings.aiTemperature}
                  onChange={(e) => saveSettings({ aiTemperature: parseFloat(e.target.value) })}
                  className="w-full accent-violet-500 cursor-pointer bg-white/[0.08] h-1.5 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Precise (0.1)</span>
                  <span>Creative (1.0)</span>
                </div>
              </div>

              {/* Model Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Active AI Model</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { id: "gemini-flash", name: "Gemini 2.5 Flash", desc: "Balanced & ultra fast" },
                    { id: "gemini-pro", name: "Gemini 2.5 Pro", desc: "Detailed reasoning" },
                    { id: "mock-dev", name: "Mock Dev Engine", desc: "Local sandbox testing" },
                  ].map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => saveSettings({ aiModel: model.id as any })}
                      className={`flex flex-col items-start gap-1.5 rounded-2xl border p-4 text-left transition-all ${
                        settings.aiModel === model.id
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-white/[0.07] bg-white/[0.01] hover:border-white/[0.15] hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">{model.name}</span>
                      <span className="text-xs text-slate-400">{model.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Verbosity Select */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200">Evaluation Verbosity</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "detailed", name: "Detailed Breakdown", desc: "In-depth review with direct correction and resources" },
                    { id: "concise", name: "Concise Summary", desc: "Actionable points and scores only" },
                  ].map((verbosity) => (
                    <button
                      key={verbosity.id}
                      type="button"
                      onClick={() => saveSettings({ verbosity: verbosity.id as any })}
                      className={`flex flex-col items-start gap-1.5 rounded-2xl border p-4 text-left transition-all ${
                        settings.verbosity === verbosity.id
                          ? "border-violet-500 bg-violet-500/10"
                          : "border-white/[0.07] bg-white/[0.01] hover:border-white/[0.15] hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">{verbosity.name}</span>
                      <span className="text-xs text-slate-400">{verbosity.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border border-white/[0.07] bg-white/[0.015] p-6 backdrop-blur-xl rounded-3xl">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-violet-400" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Choose how and when you want to receive alerts and roadmap study updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {[
                {
                  id: "emailOnResume",
                  title: "Resume Evaluation Reports",
                  desc: "Send detailed ATS score breakdown to your registered email when analysis completes.",
                },
                {
                  id: "weeklyRoadmapReminders",
                  title: "Weekly Career Reminders",
                  desc: "Receive weekly check-ins to stay on track with your study roadmap tasks.",
                },
                {
                  id: "pushNotifications",
                  title: "Real-time Browser Updates",
                  desc: "Enable system-level alerts for active mock interview updates.",
                },
              ].map((item) => {
                const value = (settings as any)[item.id];
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl border border-white/[0.05] bg-white/[0.01] p-4"
                  >
                    <div className="space-y-1 pr-4">
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 max-w-lg">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => saveSettings({ [item.id]: !value })}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                        value ? "bg-violet-600" : "bg-white/[0.08]"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          value ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="danger">
          <Card className="border border-red-500/20 bg-red-500/[0.01] p-6 backdrop-blur-xl rounded-3xl">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-semibold text-red-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-xs text-red-300/60">
                Irreversible actions to clear your user profile records and mock statistics.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              {/* Reset History */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-white/[0.05] bg-white/[0.01] rounded-2xl p-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Reset Mock Interview History</h4>
                  <p className="text-xs text-slate-400 max-w-lg">
                    Permanently delete all custom mock sessions, saved answers, and historical ratings.
                  </p>
                </div>
                <Button
                  onClick={clearHistory}
                  disabled={clearingHistory}
                  className="h-10 rounded-xl bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white transition shrink-0"
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-white/[0.05] bg-white/[0.01] rounded-2xl p-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-white">Clear Resume Database</h4>
                  <p className="text-xs text-slate-400 max-w-lg">
                    Purge all uploaded resume files (PDF format) and associated ATS gap-analysis scoring.
                  </p>
                </div>
                <Button
                  onClick={clearResumes}
                  disabled={clearingResumes}
                  className="h-10 rounded-xl bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white transition shrink-0"
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
