"use client";

import { useState, useEffect } from "react";
import {
  Braces,
  Code2,
  Layers3,
  Server,
  Workflow,
  Cpu,
  ShieldAlert,
  Target,
  Briefcase,
  BarChart3,
  LineChart,
  Heart,
  UserCheck,
  Users,
  Compass,
  Stethoscope,
  Activity,
  HelpCircle,
  FlaskConical,
  Coins,
  Megaphone,
  Search,
  TrendingUp,
  GraduationCap,
  PenTool,
  BookOpen,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import type { InterviewRole } from "@/features/interview/types/interview.types";

interface RoleSelectorProps {
  value: InterviewRole;
  onChange: (role: InterviewRole) => void;
  error?: string;
}

interface RoleOption {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  domain: string;
}

const DOMAIN_TABS = [
  { id: "TECH", label: "Tech & CS" },
  { id: "BUSINESS", label: "Business" },
  { id: "PSYCH_HR", label: "Psychology & HR" },
  { id: "HEALTH_SCIENCE", label: "Healthcare & Science" },
  { id: "FINANCE_MARKETING", label: "Finance & Marketing" },
  { id: "EDUCATION", label: "Education & Writing" },
  { id: "CUSTOM", label: "Custom / Other" },
];

const roleOptions: RoleOption[] = [
  // Tech & Engineering
  {
    value: "FULL_STACK_DEVELOPER",
    label: "Full Stack Developer",
    description: "Frontend, backend, APIs, databases",
    icon: Layers3,
    domain: "TECH",
  },
  {
    value: "BACKEND_DEVELOPER",
    label: "Backend Developer",
    description: "APIs, databases, security, systems",
    icon: Server,
    domain: "TECH",
  },
  {
    value: "FRONTEND_DEVELOPER",
    label: "Frontend Developer",
    description: "React, UI architecture, performance",
    icon: Code2,
    domain: "TECH",
  },
  {
    value: "SOFTWARE_ENGINEER",
    label: "Software Engineer",
    description: "DSA, design, engineering fundamentals",
    icon: Braces,
    domain: "TECH",
  },
  {
    value: "DEVOPS_ENGINEER",
    label: "DevOps Engineer",
    description: "Cloud, CI/CD, containers, operations",
    icon: Workflow,
    domain: "TECH",
  },
  {
    value: "DATA_SCIENTIST",
    label: "Data Scientist",
    description: "Machine learning, Python, data analysis",
    icon: Cpu,
    domain: "TECH",
  },
  {
    value: "CYBERSECURITY_ANALYST",
    label: "Cybersecurity Analyst",
    description: "Network security, threat analysis, auditing",
    icon: ShieldAlert,
    domain: "TECH",
  },

  // Business & Management
  {
    value: "PRODUCT_MANAGER",
    label: "Product Manager",
    description: "Roadmaps, requirements, user strategy",
    icon: Target,
    domain: "BUSINESS",
  },
  {
    value: "PROJECT_MANAGER",
    label: "Project Manager",
    description: "Agile, scrum, delivery, sprint timelines",
    icon: Briefcase,
    domain: "BUSINESS",
  },
  {
    value: "BUSINESS_ANALYST",
    label: "Business Analyst",
    description: "Requirements, SQL, data modeling, workflows",
    icon: BarChart3,
    domain: "BUSINESS",
  },
  {
    value: "MANAGEMENT_CONSULTANT",
    label: "Management Consultant",
    description: "Strategy, operations, frameworks",
    icon: LineChart,
    domain: "BUSINESS",
  },

  // Psychology & HR
  {
    value: "CLINICAL_PSYCHOLOGIST",
    label: "Clinical Psychologist",
    description: "Diagnostics, therapy, case ethics",
    icon: Heart,
    domain: "PSYCH_HR",
  },
  {
    value: "HR_MANAGER",
    label: "HR / Talent Acquisition",
    description: "Recruiting, employee relations, onboarding",
    icon: UserCheck,
    domain: "PSYCH_HR",
  },
  {
    value: "UX_RESEARCHER",
    label: "UX Researcher",
    description: "User interviews, usability, behavioral testing",
    icon: Users,
    domain: "PSYCH_HR",
  },
  {
    value: "CAREER_COUNSELOR",
    label: "Career Counselor",
    description: "Career advice, resume feedback, coaching",
    icon: Compass,
    domain: "PSYCH_HR",
  },

  // Healthcare & Science
  {
    value: "MEDICAL_DOCTOR",
    label: "Medical Doctor / Physician",
    description: "Diagnostics, clinical treatment, pharmacology",
    icon: Stethoscope,
    domain: "HEALTH_SCIENCE",
  },
  {
    value: "REGISTERED_NURSE",
    label: "Registered Nurse (RN)",
    description: "Patient monitoring, care plans, emergencies",
    icon: Activity,
    domain: "HEALTH_SCIENCE",
  },
  {
    value: "PHYSIOTHERAPIST",
    label: "Physiotherapist",
    description: "Movement therapy, orthopedics, recovery",
    icon: HelpCircle,
    domain: "HEALTH_SCIENCE",
  },
  {
    value: "RESEARCH_SCIENTIST",
    label: "Research Scientist",
    description: "Lab procedures, academic papers, datasets",
    icon: FlaskConical,
    domain: "HEALTH_SCIENCE",
  },

  // Finance & Marketing
  {
    value: "FINANCIAL_ANALYST",
    label: "Financial Analyst",
    description: "Modeling, forecasting, equity analysis",
    icon: Coins,
    domain: "FINANCE_MARKETING",
  },
  {
    value: "MARKETING_MANAGER",
    label: "Marketing Manager",
    description: "Campaign strategy, growth, analytics",
    icon: Megaphone,
    domain: "FINANCE_MARKETING",
  },
  {
    value: "ACCOUNTANT",
    label: "Accountant / Auditor",
    description: "Ledger management, tax preparation, audit",
    icon: Search,
    domain: "FINANCE_MARKETING",
  },
  {
    value: "SALES_REPRESENTATIVE",
    label: "Sales Development Rep",
    description: "Outreach, lead qualification, negotiations",
    icon: TrendingUp,
    domain: "FINANCE_MARKETING",
  },

  // Education & Writing
  {
    value: "TEACHER",
    label: "Teacher / Educator",
    description: "Curriculum planning, classroom instruction",
    icon: GraduationCap,
    domain: "EDUCATION",
  },
  {
    value: "CONTENT_WRITER",
    label: "Content Writer / Editor",
    description: "SEO blogging, copywriting, content strategy",
    icon: PenTool,
    domain: "EDUCATION",
  },
  {
    value: "SOCIAL_WORKER",
    label: "Social Worker",
    description: "Casework, community support, client advocacy",
    icon: BookOpen,
    domain: "EDUCATION",
  },
];

export function RoleSelector({
  value,
  onChange,
  error,
}: RoleSelectorProps) {
  const [activeDomain, setActiveDomain] = useState<string>(() => {
    if (!value) return "TECH";
    const matched = roleOptions.find((o) => o.value === value);
    return matched ? matched.domain : "CUSTOM";
  });

  useEffect(() => {
    if (value) {
      const matched = roleOptions.find((o) => o.value === value);
      setActiveDomain(matched ? matched.domain : "CUSTOM");
    }
  }, [value]);

  const handleTabChange = (tabId: string) => {
    setActiveDomain(tabId);
    if (tabId === "CUSTOM") {
      const isPredefined = roleOptions.some((o) => o.value === value);
      if (isPredefined) {
        onChange("");
      }
    } else {
      const firstInDomain = roleOptions.find((o) => o.domain === tabId);
      if (firstInDomain) {
        onChange(firstInDomain.value);
      }
    }
  };

  const filteredRoles = roleOptions.filter((o) => o.domain === activeDomain);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">Target role</h3>
        <p className="mt-1 text-sm text-slate-500">
          Choose or enter the position you want to practice for.
        </p>
      </div>

      {/* Domain tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {DOMAIN_TABS.map((tab) => {
          const isTabActive = activeDomain === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={[
                "rounded-full px-4 py-2 text-xs font-semibold border transition-all duration-200 cursor-pointer",
                isTabActive
                  ? "border-violet-500/50 bg-violet-500/10 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                  : "border-white/[0.07] bg-white/[0.02] text-slate-400 hover:border-white/15 hover:text-white",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeDomain === "CUSTOM" ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <label className="text-sm font-medium text-slate-300">
              Specify your target role
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="e.g. Clinical Neuropsychologist, Civil Engineer, Flight Attendant, Chef..."
              className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-200 focus:border-violet-500/60 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-violet-500/60"
            />
          </div>
          <p className="text-xs text-slate-500 leading-normal">
            Our AI engine will customize all interview questions, technical criteria, scenarios, and evaluation metrics specifically for the role you specify.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredRoles.map((option) => {
            const Icon = option.icon;
            const isSelected = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onChange(option.value)}
                aria-pressed={isSelected}
                className={[
                  "group relative rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/70",
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
                        isSelected ? "text-white" : "text-slate-300",
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
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}