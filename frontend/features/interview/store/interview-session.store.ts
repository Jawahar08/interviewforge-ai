"use client";

import { create } from "zustand";

import type {
  InterviewQuestion,
  InterviewSessionConfig,
  InterviewSessionState,
} from "../types/interview-session.types";

export const useInterviewSessionStore =
  create<InterviewSessionState>((set, get) => ({
    session: null,

    currentAnswer: "",

    isSubmittingAnswer: false,

    initializeSession: (
      config: InterviewSessionConfig
    ) => {
      set({
        session: {
          sessionId: config.sessionId,

          status: "READY",

          targetRole: config.targetRole,
          interviewType: config.interviewType,
          difficulty: config.difficulty,
          durationMinutes: config.durationMinutes,

          currentQuestionIndex: 0,

          questions: [],

          startedAt: null,
          completedAt: null,
        },

        currentAnswer: "",

        isSubmittingAnswer: false,
      });
    },

    startInterview: () => {
      const { session } = get();

      if (!session) {
        return;
      }

      set({
        session: {
          ...session,

          status: "IN_PROGRESS",

          startedAt:
            session.startedAt ??
            new Date().toISOString(),
        },
      });
    },

    setQuestions: (
      questions: InterviewQuestion[]
    ) => {
      const { session } = get();

      if (!session) {
        return;
      }

      set({
        session: {
          ...session,
          questions,
        },
      });
    },

    setCurrentAnswer: (
      answer: string
    ) => {
      set({
        currentAnswer: answer,
      });
    },

    submitCurrentAnswer: () => {
      const {
        session,
        currentAnswer,
      } = get();

      if (!session) {
        return;
      }

      const trimmedAnswer =
        currentAnswer.trim();

      if (!trimmedAnswer) {
        return;
      }

      const currentQuestion =
        session.questions[
          session.currentQuestionIndex
        ];

      if (!currentQuestion) {
        return;
      }

      set({
        isSubmittingAnswer: true,
      });

      const updatedQuestions =
        session.questions.map(
          (question, index) => {
            if (
              index !==
              session.currentQuestionIndex
            ) {
              return question;
            }

            return {
              ...question,

              answer: trimmedAnswer,

              answeredAt:
                new Date().toISOString(),
            };
          }
        );

      set({
        session: {
          ...session,

          questions: updatedQuestions,
        },

        currentAnswer: "",

        isSubmittingAnswer: false,
      });
    },

    goToNextQuestion: () => {
      const { session } = get();

      if (!session) {
        return;
      }

      const nextIndex =
        session.currentQuestionIndex + 1;

      if (
        nextIndex >=
        session.questions.length
      ) {
        return;
      }

      set({
        session: {
          ...session,

          currentQuestionIndex: nextIndex,
        },

        currentAnswer: "",
      });
    },

    completeInterview: () => {
      const { session } = get();

      if (!session) {
        return;
      }

      set({
        session: {
          ...session,

          status: "COMPLETED",

          completedAt:
            new Date().toISOString(),
        },
      });
    },

    abandonInterview: () => {
      const { session } = get();

      if (!session) {
        return;
      }

      set({
        session: {
          ...session,

          status: "ABANDONED",

          completedAt:
            new Date().toISOString(),
        },
      });
    },

    resetSession: () => {
      set({
        session: null,

        currentAnswer: "",

        isSubmittingAnswer: false,
      });
    },
  }));