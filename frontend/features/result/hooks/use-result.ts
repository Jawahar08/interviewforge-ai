"use client";

import { useCallback, useState } from "react";

import { resultApi } from "../api/result.api";
import { ResultResponse } from "../types/result.types";

export function useResult() {
  const [result, setResult] =
    useState<ResultResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const generateResult = useCallback(
    async (sessionId: string) => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await resultApi.generateResult(
            sessionId
          );

        setResult(data);

        return data;
      } catch (err) {
        console.error(err);

        setError(
          "Failed to generate result."
        );

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadResult = useCallback(
    async (sessionId: string) => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await resultApi.getResult(
            sessionId
          );

        setResult(data);

        return data;
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load result."
        );

        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    result,
    loading,
    error,
    generateResult,
    loadResult,
  };
}