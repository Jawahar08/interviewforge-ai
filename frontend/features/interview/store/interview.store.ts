"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  InterviewDifficulty,
  InterviewDuration,
  InterviewRole,
  InterviewType,
} from "@/features/interview/types/interview.types";

interface InterviewConfig {
  sessionId: string;
  role: InterviewRole;
  type: InterviewType;
  difficulty: InterviewDifficulty;
  duration: InterviewDuration;
}

interface InterviewState {
  interviewConfig: InterviewConfig | null;

  setInterviewConfig: (
    config: InterviewConfig
  ) => void;

  clearInterviewConfig: () => void;
}

export const useInterviewStore =
  create<InterviewState>()(
    persist(
      (set) => ({
        interviewConfig: null,

        setInterviewConfig: (config) =>
          set({
            interviewConfig: config,
          }),

        clearInterviewConfig: () =>
          set({
            interviewConfig: null,
          }),
      }),
      {
        name: "interviewforge-interview",
      }
    )
  );