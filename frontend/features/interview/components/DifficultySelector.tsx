"use client";

import type { InterviewDifficulty } from "@/features/interview/types/interview.types";

interface DifficultySelectorProps {
  value: InterviewDifficulty;
  onChange: (
    difficulty: InterviewDifficulty
  ) => void;
  error?: string;
}

interface DifficultyOption {
  value: InterviewDifficulty;
  label: string;
  description: string;
  level: number;
}

const difficultyOptions: DifficultyOption[] = [
  {
    value: "EASY",
    label: "Easy",
    description: "Core concepts and foundational questions",
    level: 1,
  },
  {
    value: "MEDIUM",
    label: "Medium",
    description: "Applied knowledge and deeper reasoning",
    level: 2,
  },
  {
    value: "HARD",
    label: "Hard",
    description: "Advanced scenarios and system-level depth",
    level: 3,
  },
];

export function DifficultySelector({
  value,
  onChange,
  error,
}: DifficultySelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Difficulty
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Control how challenging the interview should be.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {difficultyOptions.map((option) => {
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
              <div className="mb-4 flex items-end gap-1">
                {[1, 2, 3].map((bar) => (
                  <span
                    key={bar}
                    className={[
                      "w-1.5 rounded-full transition-colors",
                      bar <= option.level
                        ? isSelected
                          ? "bg-violet-400"
                          : "bg-slate-500"
                        : "bg-white/10",
                    ].join(" ")}
                    style={{
                      height: `${8 + bar * 4}px`,
                    }}
                  />
                ))}
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