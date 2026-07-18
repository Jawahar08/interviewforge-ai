"use client";

import {
  BrainCircuit,
  MessagesSquare,
  Sparkles,
  Search,
  AlertTriangle,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { InterviewType } from "@/features/interview/types/interview.types";

interface InterviewTypeSelectorProps {
  value: InterviewType;
  onChange: (type: InterviewType) => void;
  error?: string;
}

interface InterviewTypeOption {
  value: InterviewType;
  label: string;
  description: string;
  icon: LucideIcon;
}

const interviewTypeOptions: InterviewTypeOption[] = [
  {
    value: "TECHNICAL",
    label: "Technical",
    description:
      "Role-specific concepts, technical methods, core tools, and problem solving.",
    icon: BrainCircuit,
  },
  {
    value: "BEHAVIORAL",
    label: "Behavioral",
    description:
      "Communication, teamwork, adaptability, conflict, and core leadership.",
    icon: MessagesSquare,
  },
  {
    value: "CASE_STUDY",
    label: "Case Study & Analysis",
    description:
      "Hypothetical business cases, diagnostics, or design scenarios to analyze.",
    icon: Search,
  },
  {
    value: "STRESS_ETHICS",
    label: "Stress & Ethical Scenario",
    description:
      "High-pressure escalation handling, conflict resolution, and ethical dilemmas.",
    icon: AlertTriangle,
  },
  {
    value: "SYSTEM_PROCESS",
    label: "System & Process Design",
    description:
      "Designing complex systems, workflows, or organizational structures.",
    icon: Workflow,
  },
  {
    value: "MIXED",
    label: "Mixed",
    description:
      "A balanced, comprehensive session combining multiple question styles.",
    icon: Sparkles,
  },
];

export function InterviewTypeSelector({
  value,
  onChange,
  error,
}: InterviewTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Interview type
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Select the style of interview you want to simulate.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {interviewTypeOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={[
                "group rounded-2xl border p-4 text-left",
                "transition-all duration-200",
                "focus:outline-none focus-visible:ring-2",
                "focus-visible:ring-violet-500/70",
                isSelected
                  ? "border-violet-500/60 bg-violet-500/10"
                  : "border-white/[0.07] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.045]",
              ].join(" ")}
            >
              <div
                className={[
                  "mb-4 flex h-10 w-10 items-center justify-center rounded-xl border",
                  isSelected
                    ? "border-violet-400/30 bg-violet-500/15 text-violet-300"
                    : "border-white/[0.07] bg-white/[0.04] text-slate-500 group-hover:text-slate-300",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />
              </div>

              <p
                className={[
                  "text-sm font-semibold",
                  isSelected
                    ? "text-white"
                    : "text-slate-300",
                ].join(" ")}
              >
                {option.label}
              </p>

              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}