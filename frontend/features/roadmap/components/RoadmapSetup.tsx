"use client";

import { useState } from "react";
import { Briefcase, GraduationCap, FileText, Sparkles, Loader2 } from "lucide-react";
import type { LearningRoadmapRequest } from "../types/roadmap.types";

interface RoadmapSetupProps {
  onSubmit: (data: LearningRoadmapRequest) => void;
  isLoading: boolean;
}

const SUGGESTED_ROLES = [
  "Full Stack Developer",
  "Product Manager",
  "Clinical Psychologist",
  "HR Specialist",
  "Data Scientist",
  "Financial Analyst",
];

export function RoadmapSetup({ onSubmit, isLoading }: RoadmapSetupProps) {
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("Mid Level");
  const [resumeText, setResumeText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetRole.trim()) {
      setError("Target role is required.");
      return;
    }
    setError("");
    onSubmit({
      targetRole: targetRole.trim(),
      experience,
      resumeText: resumeText.trim(),
    });
  };

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 shadow-2xl backdrop-blur-md sm:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
          <Sparkles className="h-6 w-6 text-violet-300" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Generate Career Roadmap
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Tell us about your target role and experience to build a personalized study timeline and identify skill gaps.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Target Role */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Briefcase className="h-4 w-4 text-violet-400" />
            Target Role
          </label>
          <input
            type="text"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Clinical Neuropsychologist, Full Stack Developer, Project Manager..."
            className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-violet-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-500/60"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}

          {/* Role suggestions */}
          <div className="flex flex-wrap gap-2 pt-1">
            {SUGGESTED_ROLES.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setTargetRole(role)}
                className="rounded-full border border-white/[0.05] bg-white/[0.02] px-3 py-1 text-xs text-slate-400 hover:border-violet-500/30 hover:bg-violet-500/5 hover:text-violet-300 transition-all duration-200 cursor-pointer"
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <GraduationCap className="h-4 w-4 text-violet-400" />
            Experience Level
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["Fresher", "Junior", "Mid Level", "Senior"].map((level) => {
              const isActive = experience === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setExperience(level)}
                  className={[
                    "rounded-xl border py-3 text-sm font-semibold text-center transition-all duration-200 cursor-pointer",
                    isActive
                      ? "border-violet-500/50 bg-violet-500/10 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-white/15 hover:text-white",
                  ].join(" ")}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Resume Text */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <FileText className="h-4 w-4 text-violet-400" />
            Resume or Skills Context (Optional)
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={5}
            placeholder="Paste your resume details, highlights of your career, or skills you already know so our AI can perform a skill-gap analysis..."
            className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-violet-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-500/60 resize-y"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing skill gaps & building roadmap...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Build AI Roadmap
            </>
          )}
        </button>
      </form>
    </div>
  );
}
