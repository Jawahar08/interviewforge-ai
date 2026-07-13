"use client";

import { create } from "zustand";

import type {
  ResumeAnalysisResponse,
} from "../types/resume.types";

interface ResumeState {

  analysis: ResumeAnalysisResponse | null;

  setAnalysis: (
    analysis: ResumeAnalysisResponse
  ) => void;

  clear: () => void;
}

export const useResumeStore =
create<ResumeState>((set) => ({

    analysis: null,

    setAnalysis: (analysis) =>

        set({
            analysis,
        }),

    clear: () =>
        set({
            analysis: null,
        }),

}));