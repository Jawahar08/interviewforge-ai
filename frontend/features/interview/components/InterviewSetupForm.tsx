"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  BrainCircuit,
  Loader2,
  ShieldCheck,
  Sparkles,
  Building2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

import { RoleSelector } from "@/features/interview/components/RoleSelector";
import { InterviewTypeSelector } from "@/features/interview/components/InterviewTypeSelector";
import { DifficultySelector } from "@/features/interview/components/DifficultySelector";
import { DurationSelector } from "@/features/interview/components/DurationSelector";

import { useInterviewStore } from "@/features/interview/store/interview.store";
import { interviewApi } from "@/features/interview/api/interview.api";
import { sessionApi } from "@/features/interview/api/interview-session.api";
import { useAuthStore } from "@/shared/store/auth.store";
import { useAppStore } from "@/shared/store/app.store";
import { apiClient } from "@/lib/api/client";
import { Button } from "@/shared/components/ui/button";
import type {
  InterviewDifficulty,
  InterviewDuration,
  InterviewRole,
  InterviewType,
} from "@/features/interview/types/interview.types";

const COMPANIES = [
  { id: "", name: "General Prep", logo: "🚀" },
  { id: "Google", name: "Google", logo: "G" },
  { id: "Amazon", name: "Amazon", logo: "AM" },
  { id: "Meta", name: "Meta", logo: "M" },
  { id: "Microsoft", name: "Microsoft", logo: "MS" },
  { id: "Apple", name: "Apple", logo: "" },
  { id: "Netflix", name: "Netflix", logo: "N" },
  { id: "Stripe", name: "Stripe", logo: "S" },
  { id: "Uber", name: "Uber", logo: "U" },
  { id: "Zoho", name: "Zoho", logo: "Z" },
  { id: "TCS", name: "TCS", logo: "T" },
  { id: "Infosys", name: "Infosys", logo: "I" },
];

const interviewSetupSchema = z.object({
  role: z.string().min(2, "Role must be at least 2 characters"),
  type: z.enum([
    "TECHNICAL",
    "BEHAVIORAL",
    "CASE_STUDY",
    "STRESS_ETHICS",
    "SYSTEM_PROCESS",
    "MIXED",
  ]),
  difficulty: z.enum([
    "EASY",
    "MEDIUM",
    "HARD",
  ]),
  duration: z.union([
    z.literal(15),
    z.literal(30),
    z.literal(45),
    z.literal(60),
  ]),
  company: z.string().optional(),
});

type InterviewSetupFormValues = z.infer<
  typeof interviewSetupSchema
>;

export function InterviewSetupForm() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const token = useAuthStore((state) => state.token);

  const [submissionError, setSubmissionError] =
    useState<string | null>(null);
  const [upgrading, setUpgrading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const currency = useAppStore((state) => state.currency);
  const getCurrencyInfo = useAppStore((state) => state.getCurrencyInfo);
  const currencyInfo = getCurrencyInfo();

  const setInterviewConfig = useInterviewStore(
    (state) => state.setInterviewConfig
  );

  const {
    handleSubmit,
    watch,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<InterviewSetupFormValues>({
    resolver: zodResolver(interviewSetupSchema),
    defaultValues: {
      role: "FULL_STACK_DEVELOPER",
      type: "TECHNICAL",
      difficulty: "MEDIUM",
      duration: 30,
      company: "",
    },
  });

  const role = watch("role");
  const type = watch("type");
  const difficulty = watch("difficulty");
  const duration = watch("duration");
  const company = watch("company") || "";

  const isPremium = user?.isPremium || false;

  const onSubmit = async (
    values: InterviewSetupFormValues
  ) => {
    try {
      setSubmissionError(null);

      const interview =
        await interviewApi.createInterview({
          title: `${values.role} ${values.type} Interview`,
          role: values.role,
          difficulty: values.difficulty,
          company: values.company || undefined,
        });

      const session =
        await sessionApi.startSession(
          interview.id
        );

      const sessionId =
        String(session.id);

      setInterviewConfig({
        sessionId,
        role: values.role,
        type: values.type,
        difficulty: values.difficulty,
        duration: values.duration,
      });

      sessionStorage.setItem(
        `interview-session-${sessionId}`,
        JSON.stringify({
          role: values.role,
          interviewType: values.type,
          difficulty: values.difficulty,
          duration: values.duration,
          company: values.company || "",
        })
      );

      router.push(
        `/interview/session/${sessionId}`
      );
    } catch (error) {
      console.error(
        "Failed to prepare interview:",
        error
      );

      setSubmissionError(
        "Unable to prepare the interview session. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <section className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
        <RoleSelector
          value={role as InterviewRole}
          onChange={(selectedRole) =>
            setValue("role", selectedRole, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          error={errors.role?.message}
        />
      </section>

      <section className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-violet-400" />
              Company-Targeted Preparation
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select a target company to align the interview questions with their engineering bar.
            </p>
          </div>
          {!isPremium && (
            <span className="rounded-full bg-violet-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-violet-400 border border-violet-500/20 w-fit">
              Paid Feature
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {COMPANIES.map((comp) => {
            const isSelected = company === comp.id;
            const isLocked = comp.id !== "" && !isPremium;

            return (
              <button
                key={comp.id}
                type="button"
                onClick={() => {
                  if (isLocked) {
                    setShowUpgradeModal(true);
                  } else {
                    setValue("company", comp.id, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }
                }}
                className={`group relative flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                  isSelected
                    ? "border-violet-500 bg-violet-500/10 text-white"
                    : "border-white/[0.06] bg-white/[0.01] hover:border-white/[0.12] hover:bg-white/[0.02] text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-semibold transition-all ${
                  isSelected ? "bg-violet-600 text-white" : "bg-white/[0.05] group-hover:bg-white/[0.08]"
                }`}>
                  {comp.logo}
                </div>

                <span className="text-xs font-medium">{comp.name}</span>

                {isLocked && (
                  <div className="absolute top-2 right-2 rounded bg-black/60 p-0.5 border border-white/[0.05]">
                    <Lock className="h-3 w-3 text-violet-400" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
        <InterviewTypeSelector
          value={type as InterviewType}
          onChange={(selectedType) =>
            setValue("type", selectedType, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
          error={errors.type?.message}
        />
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
          <DifficultySelector
            value={
              difficulty as InterviewDifficulty
            }
            onChange={(selectedDifficulty) =>
              setValue(
                "difficulty",
                selectedDifficulty,
                {
                  shouldValidate: true,
                  shouldDirty: true,
                }
              )
            }
            error={errors.difficulty?.message}
          />
        </section>

        <section className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
          <DurationSelector
            value={
              duration as InterviewDuration
            }
            onChange={(selectedDuration) =>
              setValue(
                "duration",
                selectedDuration,
                {
                  shouldValidate: true,
                  shouldDirty: true,
                }
              )
            }
            error={errors.duration?.message}
          />
        </section>
      </div>

      {submissionError && (
        <div
          role="alert"
          className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {submissionError}
        </div>
      )}

      <section className="overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-blue-500/[0.08]">
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              <Sparkles className="h-4 w-4" />
              AI Interview Session
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white">
              Your practice session is ready
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              InterviewForge will prepare a focused
              session using your selected role,
              interview type, difficulty, and
              duration.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/20 px-3 py-1.5 text-xs text-slate-400">
                <BrainCircuit className="h-3.5 w-3.5 text-violet-300" />
                Adaptive practice
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-black/20 px-3 py-1.5 text-xs text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
                Private session
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={[
              "inline-flex min-h-12 items-center justify-center gap-2",
              "rounded-xl px-6 py-3",
              "bg-gradient-to-r from-violet-600 to-blue-600",
              "text-sm font-semibold text-white",
              "shadow-lg shadow-violet-500/20",
              "transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-violet-500/30",
              "focus:outline-none focus-visible:ring-2",
              "focus-visible:ring-violet-400",
              "disabled:cursor-not-allowed disabled:opacity-60",
              "lg:min-w-48",
            ].join(" ")}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Preparing...
              </>
            ) : (
              <>
                Start Interview
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </section>

      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c1120] p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold"
            >
              &times;
            </button>

            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-500/10">
                <Sparkles className="h-6 w-6 text-violet-400 animate-pulse" />
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-white">
                Unlock Premium Prep
              </h3>
              
              <p className="text-xs text-slate-400">
                Access tailored interview practice questions for FAANG and top-tier product tech companies.
              </p>

              <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.03] p-4 text-left space-y-3">
                <h4 className="text-sm font-semibold text-white flex justify-between">
                  <span>Pro Membership</span>
                  <span className="text-violet-400">
                    {currencyInfo.symbol}
                    {currencyInfo.price.toLocaleString()}/mo
                  </span>
                </h4>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                  <li>Google, Meta, Amazon custom questions</li>
                  <li>In-depth AI feedback & response scoring</li>
                  <li>ATS resume match & checklist roadmaps</li>
                  <li>Unlimited simulator practice sessions</li>
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  onClick={async () => {
                    try {
                      setUpgrading(true);
                      const response = await apiClient.post("/profile/upgrade");
                      if (response.data.success) {
                        toast.success("Welcome to Pro! Premium unlocked.");
                        if (user) {
                          setAuth(
                            { ...user, isPremium: true },
                            token || ""
                          );
                        }
                        setShowUpgradeModal(false);
                      }
                    } catch (err) {
                      console.error("Upgrade failed:", err);
                      toast.error("Failed to process payment upgrade.");
                    } finally {
                      setUpgrading(false);
                    }
                  }}
                  disabled={upgrading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold flex justify-center items-center gap-2 shadow-lg"
                >
                  {upgrading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing Upgrade...
                    </>
                  ) : (
                    "Upgrade Account Now"
                  )}
                </Button>
                <p className="text-[10px] text-slate-500 mt-2">
                  Demo environment. Clicking will mock payment and activate Premium.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}