"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, AlertCircle } from "lucide-react";
import { RoadmapSetup } from "@/features/roadmap/components/RoadmapSetup";
import { RoadmapDisplay } from "@/features/roadmap/components/RoadmapDisplay";
import { roadmapApi } from "@/features/roadmap/api/roadmap.api";
import type { LearningRoadmapResponse, LearningRoadmapRequest } from "@/features/roadmap/types/roadmap.types";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<LearningRoadmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (data: LearningRoadmapRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await roadmapApi.generateRoadmap(data);
      setRoadmap(result);
    } catch (err: any) {
      console.error("Failed to generate roadmap:", err);
      setError(
        err.response?.data?.message ||
        "An unexpected error occurred while generating your roadmap. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Background radial glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-400 transition hover:border-violet-500/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>
              <span className="font-semibold">Generation Failed</span>
              <p className="mt-1 text-xs text-red-300/80 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {/* Active Stage (Setup vs Display) */}
        {!roadmap ? (
          <div className="py-6">
            <RoadmapSetup onSubmit={handleGenerate} isLoading={isLoading} />
          </div>
        ) : (
          <RoadmapDisplay roadmap={roadmap} onReset={() => setRoadmap(null)} />
        )}
      </div>
    </main>
  );
}