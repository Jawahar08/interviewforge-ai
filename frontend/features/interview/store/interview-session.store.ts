"use client";

import { create } from "zustand";

import type {
  SessionQuestion,
  SessionQuestionsResponse,
} from "@/features/interview/types/session-question.types";

interface InterviewSessionState {
  sessionId: string | null;
  interviewId: number | string | null;
  status: string | null;

  questions: SessionQuestion[];
  currentQuestionIndex: number;

  isLoading: boolean;
  error: string | null;

  setSessionQuestions: (
    response: SessionQuestionsResponse
  ) => void;

  setLoading: (loading: boolean) => void;

  setError: (error: string | null) => void;

  nextQuestion: () => void;

  previousQuestion: () => void;

  goToQuestion: (index: number) => void;

  resetSession: () => void;
}

const initialState = {
  sessionId: null,
  interviewId: null,
  status: null,

  questions: [],
  currentQuestionIndex: 0,

  isLoading: false,
  error: null,
};

export const useInterviewSessionStore =
  create<InterviewSessionState>((set) => ({
    ...initialState,

    setSessionQuestions: (response) =>
      set({
        sessionId: response.sessionId,
        interviewId: response.interviewId,
        status: response.status,
        questions: response.questions,
        currentQuestionIndex: 0,
        isLoading: false,
        error: null,
      }),

    setLoading: (loading) =>
      set({
        isLoading: loading,
      }),

    setError: (error) =>
      set({
        error,
        isLoading: false,
      }),

    nextQuestion: () =>
      set((state) => {
        const lastIndex =
          state.questions.length - 1;

        if (
          state.currentQuestionIndex >= lastIndex
        ) {
          return state;
        }

        return {
          currentQuestionIndex:
            state.currentQuestionIndex + 1,
        };
      }),

    previousQuestion: () =>
      set((state) => {
        if (state.currentQuestionIndex <= 0) {
          return state;
        }

        return {
          currentQuestionIndex:
            state.currentQuestionIndex - 1,
        };
      }),

    goToQuestion: (index) =>
      set((state) => {
        if (
          index < 0 ||
          index >= state.questions.length
        ) {
          return state;
        }

        return {
          currentQuestionIndex: index,
        };
      }),

    resetSession: () =>
      set({
        ...initialState,
      }),
  }));