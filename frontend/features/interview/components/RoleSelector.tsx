"use client";

import {
  Braces,
  Code2,
  Coffee,
  Layers3,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import type { InterviewRole } from "@/features/interview/types/interview.types";

interface RoleSelectorProps {
  value: InterviewRole;
  onChange: (role: InterviewRole) => void;
  error?: string;
}

interface RoleOption {
  value: InterviewRole;
  label: string;
  description: string;
  icon: LucideIcon;
}

const roleOptions: RoleOption[] = [
  {
    value: "FULL_STACK_DEVELOPER",
    label: "Full Stack Developer",
    description: "Frontend, backend, APIs, databases",
    icon: Layers3,
  },
  {
    value: "BACKEND_DEVELOPER",
    label: "Backend Developer",
    description: "APIs, databases, security, systems",
    icon: Server,
  },
  {
    value: "FRONTEND_DEVELOPER",
    label: "Frontend Developer",
    description: "React, UI architecture, performance",
    icon: Code2,
  },
  {
    value: "JAVA_DEVELOPER",
    label: "Java Developer",
    description: "Java, Spring Boot, backend engineering",
    icon: Coffee,
  },
  {
    value: "SOFTWARE_ENGINEER",
    label: "Software Engineer",
    description: "DSA, design, engineering fundamentals",
    icon: Braces,
  },
  {
    value: "DEVOPS_ENGINEER",
    label: "DevOps Engineer",
    description: "Cloud, CI/CD, containers, operations",
    icon: Workflow,
  },
];

export function RoleSelector({
  value,
  onChange,
  error,
}: RoleSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-white">
          Target role
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Choose the position you want to practice for.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {roleOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={[
                "group relative rounded-2xl border p-4 text-left",
                "transition-all duration-200",
                "focus:outline-none focus-visible:ring-2",
                "focus-visible:ring-violet-500/70",
                isSelected
                  ? "border-violet-500/60 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.10)]"
                  : "border-white/[0.07] bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.045]",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <div
                  className={[
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                    isSelected
                      ? "border-violet-400/30 bg-violet-500/15 text-violet-300"
                      : "border-white/[0.07] bg-white/[0.04] text-slate-500 group-hover:text-slate-300",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
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

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {option.description}
                  </p>
                </div>
              </div>

              {isSelected && (
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
              )}
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