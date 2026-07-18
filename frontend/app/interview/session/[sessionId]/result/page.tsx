"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useResult } from "@/features/result/hooks/use-result";
import {
  Award,
  BookOpen,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Brain,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const { result, loading, error, loadResult } = useResult();
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  useEffect(() => {
    if (sessionId) {
      loadResult(sessionId);
    }
  }, [sessionId, loadResult]);

  const toggleQuestion = (idx: number) => {
    setExpandedQuestion(expandedQuestion === idx ? null : idx);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-4">
        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
        <h3 className="font-semibold text-lg animate-pulse text-zinc-300">Evaluating Performance...</h3>
        <p className="text-xs text-zinc-500 max-w-xs text-center">
          Running multi-dimensional scoring and compiling question review models.
        </p>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white gap-6 px-6 text-center">
        <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="max-w-md">
          <h2 className="text-xl font-bold mb-2">Evaluation Failed</h2>
          <p className="text-sm text-zinc-400">
            {error || "We couldn't retrieve the interview performance record. It might not be generated yet or you might be unauthorized."}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => sessionId && loadResult(sessionId)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Fetching
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Helper for dynamic score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 stroke-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 50) return "text-amber-400 stroke-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-rose-400 stroke-rose-400 border-rose-500/30 bg-rose-500/10";
  };

  return (
    <main className="min-h-screen bg-black bg-radial-at-t from-zinc-950 via-black to-black text-zinc-100 pb-20">
      
      {/* Header Banner */}
      <div className="border-b border-zinc-900 bg-zinc-950/40 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-violet-500/10 border border-violet-500/20 text-violet-400 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-violet-400 font-bold">Interview Session Report</div>
              <h1 className="text-lg font-bold text-white leading-tight">Performance Summary</h1>
            </div>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-xs font-semibold text-zinc-400 hover:text-white px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 transition-all"
          >
            Exit Workspace
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* Section 1: Main Metric Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Dial Circular Card (5 Cols) */}
          <div className="md:col-span-5 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-8">Overall Performance Rating</h3>
            
            <div className="relative w-48 h-48 mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  className="stroke-zinc-900 fill-transparent"
                  strokeWidth="8"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  className={`fill-transparent transition-all duration-1000 ${getScoreColor(
                    result.overallScore || 0
                  )}`}
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 80}
                  strokeDashoffset={
                    2 * Math.PI * 80 * (1 - (result.overallScore || 0) / 100)
                  }
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                  {(result.overallScore || 0).toFixed(0)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold mt-1">
                  Overall Score
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 max-w-xs">
              This rating is compiled dynamically based on candidate communication logic, code execution correct patterns, and answer relevance.
            </p>
          </div>

          {/* Sub-Metric Columns (7 Cols) */}
          <div className="md:col-span-7 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-8 flex flex-col justify-between gap-6">
            <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Granular Metrics Breakdown</h3>

            <div className="space-y-6">
              {/* Technical Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <Brain className="w-4 h-4 text-sky-400" />
                    <span>Technical Proficiency</span>
                  </div>
                  <span className="text-sm font-bold text-white font-mono">{(result.technicalScore || 0).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full bg-sky-400 transition-all duration-1000"
                    style={{ width: `${result.technicalScore || 0}%` }}
                  />
                </div>
              </div>

              {/* Communication Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Communication & Clarity</span>
                  </div>
                  <span className="text-sm font-bold text-white font-mono">{(result.communicationScore || 0).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all duration-1000"
                    style={{ width: `${result.communicationScore || 0}%` }}
                  />
                </div>
              </div>

              {/* Confidence Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-violet-400" />
                    <span>Confidence Signals</span>
                  </div>
                  <span className="text-sm font-bold text-white font-mono">{(result.confidenceScore || 0).toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden">
                  <div
                    className="h-full bg-violet-400 transition-all duration-1000"
                    style={{ width: `${result.confidenceScore || 0}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/30 border border-zinc-900 text-xs text-zinc-400 mt-2">
              <TrendingUp className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <span>
                Based on these signals, you show high capability in coding structure but could improve detailed optimization explanation.
              </span>
            </div>
          </div>

        </div>

        {/* Section 2: AI Report Detail (Strengths, Weaknesses, Recommendations) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Strengths & Weaknesses */}
          <div className="flex flex-col gap-6">
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle className="w-4.5 h-4.5" />
                Key Interview Strengths
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {result.strengths || "Strengths analysis is currently empty."}
              </p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4.5 h-4.5" />
                Areas for Improvement
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {result.weaknesses || "Weakness analysis is currently empty."}
              </p>
            </div>
          </div>

          {/* Recommendations & Summary */}
          <div className="flex flex-col gap-6">
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-violet-400 flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5" />
                Actionable Recommendation
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {result.recommendation || "Recommendations are currently empty."}
              </p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5" />
                AI Session Summary
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {result.summary || "Summary is currently empty."}
              </p>
            </div>
          </div>

        </div>

        {/* Section 3: Question by Question Review */}
        {result.questions && result.questions.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-white border-b border-zinc-900 pb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-violet-400" />
              <span>Question-by-Question Breakdown</span>
            </h2>

            <div className="space-y-4">
              {result.questions.map((q, idx) => {
                const isExpanded = expandedQuestion === idx;
                const convertedScore = q.score !== null ? q.score * 10 : 0; // standardise to 0-100 or keep raw out of 10
                
                return (
                  <div
                    key={q.questionId || idx}
                    className="bg-zinc-950/60 border border-zinc-900 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    {/* Header bar */}
                    <div
                      onClick={() => toggleQuestion(idx)}
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-900/30 transition-colors"
                    >
                      <div className="flex items-start gap-4 min-w-0 pr-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold font-mono text-zinc-400">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-zinc-200 truncate max-w-xl">
                            {q.questionText}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                            {q.category && (
                              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400 font-medium">
                                {q.category}
                              </span>
                            )}
                            {q.difficulty && (
                              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850 text-zinc-400 font-medium uppercase">
                                {q.difficulty}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                          convertedScore >= 80
                            ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
                            : convertedScore >= 50
                            ? "text-amber-400 bg-amber-500/10 border border-amber-500/20"
                            : "text-rose-400 bg-rose-500/10 border border-rose-500/20"
                        }`}>
                          Score: {q.score !== null ? q.score.toFixed(0) : "N/A"}/10
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-zinc-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500" />
                        )}
                      </div>
                    </div>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden border-t border-zinc-900"
                        >
                          <div className="p-5 flex flex-col gap-5 bg-zinc-950/20 text-xs leading-relaxed">
                            {/* Candidate answer */}
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 bg-zinc-900/10 border border-zinc-900 rounded-xl">
                                <h4 className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider mb-2">Candidate Answer</h4>
                                <p className="text-zinc-200 font-mono whitespace-pre-wrap">{q.userAnswer || "No answer submitted."}</p>
                              </div>
                              <div className="p-4 bg-zinc-900/10 border border-zinc-900 rounded-xl">
                                <h4 className="font-bold text-zinc-400 text-[10px] uppercase tracking-wider mb-2">Reference Answer</h4>
                                <p className="text-zinc-300 font-mono whitespace-pre-wrap">{q.modelAnswer || "No reference answer available."}</p>
                              </div>
                            </div>

                            {/* Evaluation feedback */}
                            <div className="p-4 bg-violet-950/10 border border-violet-950/20 rounded-xl">
                              <h4 className="font-bold text-violet-400 text-[10px] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                AI Evaluation Feedback
                              </h4>
                              <p className="text-zinc-200 whitespace-pre-wrap font-sans">{q.feedback || "No feedback generated."}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}