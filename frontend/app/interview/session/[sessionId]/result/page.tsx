"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useResult } from "@/features/result/hooks/use-result";

export default function ResultPage() {
  const params = useParams();

  const sessionId =
    params.sessionId as string;

  const {
    result,
    loading,
    error,
    loadResult,
  } = useResult();

  useEffect(() => {
    if (sessionId) {
      loadResult(sessionId);
    }
  }, [
    sessionId,
    loadResult,
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading Result...
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error || "Result not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Interview Result
      </h1>

      <div className="grid md:grid-cols-4 gap-4 mb-10">

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-gray-400">
            Overall
          </h2>

          <p className="text-4xl font-bold">
            {result.overallScore.toFixed(0)}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-gray-400">
            Technical
          </h2>

          <p className="text-4xl font-bold">
            {result.technicalScore.toFixed(0)}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-gray-400">
            Communication
          </h2>

          <p className="text-4xl font-bold">
            {result.communicationScore.toFixed(0)}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-gray-400">
            Confidence
          </h2>

          <p className="text-4xl font-bold">
            {result.confidenceScore.toFixed(0)}
          </p>
        </div>

      </div>

      <div className="space-y-6">

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Strengths
          </h2>

          <p>
            {result.strengths}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Weaknesses
          </h2>

          <p>
            {result.weaknesses}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Recommendation
          </h2>

          <p>
            {result.recommendation}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-3">
            Summary
          </h2>

          <p>
            {result.summary}
          </p>
        </div>

      </div>

    </div>
  );
}