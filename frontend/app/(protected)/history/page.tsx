"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHistory } from "@/features/history/hooks/use-history";
import {
  Calendar,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const { history, loading, error, fetchHistory } = useHistory();
  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 50) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-10 text-zinc-100">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          Interview Practice History
        </h1>
        <p className="mt-2 text-zinc-400 text-sm">
          Review details, scores, and coaching recommendations from your previous AI sessions.
        </p>
      </div>

      {loading ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-8 h-8 text-violet-400 animate-spin" />
          <span className="text-zinc-500 text-sm">Loading history records...</span>
        </div>
      ) : error ? (
        <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center">
          <div className="p-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div className="max-w-md">
            <p className="text-sm text-zinc-400">{error}</p>
          </div>
          <button
            onClick={fetchHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Load
          </button>
        </div>
      ) : history.length === 0 ? (
        <div className="min-h-[350px] bg-zinc-950/20 border border-dashed border-zinc-900 rounded-2xl flex flex-col items-center justify-center text-center p-8">
          <FileText className="w-12 h-12 mb-3 text-zinc-600 opacity-40" />
          <h3 className="text-lg font-bold text-zinc-300 mb-1">No Practice Sessions</h3>
          <p className="text-sm text-zinc-500 max-w-sm mb-6 leading-relaxed">
            You haven&apos;t completed any mock interviews yet. Start one now to build your history log.
          </p>
          <button
            onClick={() => router.push("/interview")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/10 transition-all"
          >
            Start First Interview
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => router.push(`/interview/session/${item.id}/result`)}
              className="group bg-zinc-950/60 backdrop-blur-xl border border-zinc-900 rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-zinc-800 hover:bg-zinc-900/10 cursor-pointer transition-all duration-200"
            >
              <div>
                {/* Top header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-white group-hover:text-violet-400 transition-colors truncate">
                      {item.company}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium truncate mt-0.5">
                      {item.role}
                    </p>
                  </div>
                  <span className={`inline-flex px-2 py-0.5 rounded text-xs font-extrabold border ${getScoreColor(item.score)}`}>
                    {item.score.toFixed(0)}%
                  </span>
                </div>

                {/* Feedback preview */}
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-sans mb-4">
                  {item.feedback || "Review detailed feedback reports."}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-zinc-900 pt-4 text-[10px] text-zinc-500">
                <div className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <span className="flex items-center gap-1 text-violet-400 group-hover:translate-x-1 transition-transform font-semibold">
                  View Report
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}