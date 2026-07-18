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
} from "lucide-react";

import { RoleSelector } from "@/features/interview/components/RoleSelector";
import { InterviewTypeSelector } from "@/features/interview/components/InterviewTypeSelector";
import { DifficultySelector } from "@/features/interview/components/DifficultySelector";
import { DurationSelector } from "@/features/interview/components/DurationSelector";

import { useInterviewStore } from "@/features/interview/store/interview.store";
import { interviewApi } from "@/features/interview/api/interview.api";
import { sessionApi } from "@/features/interview/api/interview-session.api";
import type {
  InterviewDifficulty,
  InterviewDuration,
  InterviewRole,
  InterviewType,
} from "@/features/interview/types/interview.types";

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
});

type InterviewSetupFormValues = z.infer<
  typeof interviewSetupSchema
>;

export function InterviewSetupForm() {
  const router = useRouter();

  const [submissionError, setSubmissionError] =
    useState<string | null>(null);

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
    },
  });

  const role = watch("role");
  const type = watch("type");
  const difficulty = watch("difficulty");
  const duration = watch("duration");

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
    </form>
  );
}