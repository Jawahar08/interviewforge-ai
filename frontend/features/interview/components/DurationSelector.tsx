"use client";

import { Clock3 } from "lucide-react";

import type { InterviewDuration } from "@/features/interview/types/interview.types";

interface DurationSelectorProps {
  value: InterviewDuration;
  onChange: (
    duration: InterviewDuration
  ) => void;
  error?: string;
}

const durationOptions: {
  value: InterviewDuration;
  label: string;
  description: string;
}[] = [
  {
    value: 15,
    label: "15 min",
    description: "Quick practice",
  },
  {
    value: 30,
    label: "30 min",
    description: "Focused session",
  },
  {
    value: 45,
    label: "45 min",
    description: "Standard interview",
  },
  {
    value: 60,
    label: "60 min",
    description: "Deep simulation",
  },
];

export function DurationSelector({
  value,
  onChange,
  error,
}: DurationSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Duration
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Choose how long you want the practice session to run.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {durationOptions.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={[
                "rounded-2xl border p-4 text-left",
                "transition-all duration-200",
                "focus:outline-none focus-visible:ring-2",
                "focus-visible:ring-violet-500/70",
                isSelected
                  ? "border-violet-500/60 bg-violet-500/10"
                  : "border-white/[0.07] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.045]",
              ].join(" ")}
            >
              <Clock3
                className={[
                  "mb-3 h-5 w-5",
                  isSelected
                    ? "text-violet-300"
                    : "text-slate-500",
                ].join(" ")}
              />

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

              <p className="mt-1 text-xs text-slate-500">
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