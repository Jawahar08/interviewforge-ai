"use client";

import {
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

import { sessionQuestionApi } from
  "@/features/interview/api/session-question.api";

import { useInterviewSessionStore } from
  "@/features/interview/store/interview-session.store";

export function useSessionQuestions(
  sessionId: string | null
) {
  const questions =
    useInterviewSessionStore(
      (state) => state.questions
    );

  const currentQuestionIndex =
    useInterviewSessionStore(
      (state) => state.currentQuestionIndex
    );

  const isLoading =
    useInterviewSessionStore(
      (state) => state.isLoading
    );

  const error =
    useInterviewSessionStore(
      (state) => state.error
    );

  const setSessionQuestions =
    useInterviewSessionStore(
      (state) => state.setSessionQuestions
    );

  const setLoading =
    useInterviewSessionStore(
      (state) => state.setLoading
    );

  const setError =
    useInterviewSessionStore(
      (state) => state.setError
    );

  const nextQuestion =
    useInterviewSessionStore(
      (state) => state.nextQuestion
    );

  const previousQuestion =
    useInterviewSessionStore(
      (state) => state.previousQuestion
    );

  const goToQuestion =
    useInterviewSessionStore(
      (state) => state.goToQuestion
    );

  const loadQuestions =
    useCallback(async () => {
      if (!sessionId?.trim()) {
        setError(
          "Invalid interview session identifier."
        );
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let response =
          await sessionQuestionApi
            .getSessionQuestions(sessionId);

        let attempts = 0;
        // Poll up to 10 times (15 seconds max) while Gemini AI generates questions on backend
        while ((!response.questions || response.questions.length === 0) && attempts < 10) {
          attempts++;
          await new Promise((res) => setTimeout(res, 1500));
          try {
            response = await sessionQuestionApi.getSessionQuestions(sessionId);
          } catch {
            // Continue polling if transient network delay
          }
        }

        setSessionQuestions(response);
      } catch (caughtError: unknown) {
        console.error(
          "Failed to load session questions:",
          caughtError
        );

        if (axios.isAxiosError(caughtError)) {
          const responseMessage =
            caughtError.response?.data?.message;

          if (
            typeof responseMessage === "string"
          ) {
            setError(responseMessage);
            return;
          }

          if (
            caughtError.response?.status === 401
          ) {
            setError(
              "Your session has expired. Please sign in again."
            );
            return;
          }

          if (
            caughtError.response?.status === 403
          ) {
            setError(
              "You do not have permission to access this interview session."
            );
            return;
          }

          if (
            caughtError.response?.status === 404
          ) {
            setError(
              "Interview session was not found."
            );
            return;
          }
        }

        setError(
          "Unable to load interview questions."
        );
      }
    }, [
      sessionId,
      setError,
      setLoading,
      setSessionQuestions,
    ]);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const currentQuestion =
    questions[currentQuestionIndex] ?? null;

  const hasPrevious =
    currentQuestionIndex > 0;

  const hasNext =
    currentQuestionIndex <
    questions.length - 1;

  const isLastQuestion =
    questions.length > 0 &&
    currentQuestionIndex ===
      questions.length - 1;

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,

    isLoading,
    error,

    hasPrevious,
    hasNext,
    isLastQuestion,

    nextQuestion,
    previousQuestion,
    goToQuestion,

    retry: loadQuestions,
  };
}