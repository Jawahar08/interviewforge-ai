"use client";

import { useState, useEffect } from "react";
import {
  UserCheck,
  Sparkles,
  HelpCircle,
  FileText,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Award,
  Send,
  Loader2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { resumeApi } from "../api/resume.api";
import type { HrQuestion, HrEvaluationResponse } from "../types/resume.types";

interface HrRoundSectionProps {
  resumeId: number;
}

export function HrRoundSection({ resumeId }: HrRoundSectionProps) {
  const [questions, setQuestions] = useState<HrQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  // Active question being practiced
  const [selectedQuestion, setSelectedQuestion] = useState<HrQuestion | null>(null);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<HrEvaluationResponse | null>(null);

  // Expandable state for questions list
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    async function loadHrQuestions() {
      try {
        setLoadingQuestions(true);
        const data = await resumeApi.getHrQuestions(resumeId);
        setQuestions(data);
        if (data.length > 0) {
          setSelectedQuestion(data[0]);
          setExpandedId(data[0].id);
        }
      } catch (err) {
        console.error("Failed to load HR questions:", err);
        toast.error("Failed to load HR questions for this resume.");
      } finally {
        setLoadingQuestions(false);
      }
    }

    if (resumeId) {
      loadHrQuestions();
    }
  }, [resumeId]);

  const handleEvaluate = async () => {
    if (!selectedQuestion) return;
    if (!candidateAnswer.trim() || candidateAnswer.trim().length < 10) {
      toast.error("Please enter a comprehensive answer (at least 10 characters) before submitting for HR evaluation.");
      return;
    }

    try {
      setEvaluating(true);
      const result = await resumeApi.evaluateHrAnswer(resumeId, {
        question: selectedQuestion.question,
        resumeContext: selectedQuestion.resumeContext,
        candidateAnswer: candidateAnswer.trim(),
      });
      setEvaluation(result);
      toast.success("HR evaluation complete!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to evaluate HR answer.");
    } finally {
      setEvaluating(false);
    }
  };

  if (loadingQuestions) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-violet-400" />
          <p className="text-xs text-zinc-400 animate-pulse">Analyzing resume & generating HR persona questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HR Persona Header Banner */}
      <div className="rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/30 via-indigo-950/20 to-zinc-950 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
                <UserCheck className="h-7 w-7" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-zinc-950">
                <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">AI HR Talent Acquisition Manager</h3>
                <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-violet-300">
                  Resume-Grounded Persona
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Questions below are tailored specifically to your uploaded projects, experience, and career trajectory.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-right">
              <span className="text-[10px] uppercase font-semibold text-zinc-500 block">HR Questions</span>
              <span className="text-xs font-bold text-white">{questions.length} Custom HR Cards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: HR Questions List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-violet-400" />
            Resume-Grounded HR Questions
          </h4>

          <div className="space-y-3">
            {questions.map((q, idx) => {
              const isSelected = selectedQuestion?.id === q.id;
              const isExpanded = expandedId === q.id;

              return (
                <div
                  key={q.id || idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isSelected
                      ? "border-violet-500/80 bg-violet-950/20 shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/30"
                      : "border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50"
                  }`}
                >
                  <div
                    onClick={() => {
                      setSelectedQuestion(q);
                      setExpandedId(isExpanded ? null : q.id);
                      setEvaluation(null);
                    }}
                    className="p-4 cursor-pointer flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="rounded-md bg-violet-500/15 border border-violet-500/30 px-2 py-0.5 text-[10px] font-bold text-violet-300">
                          {q.category || "HR Behavioral"}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">Q{idx + 1}</span>
                      </div>
                      <h5 className="text-xs font-bold text-zinc-100 leading-snug">{q.question}</h5>
                    </div>

                    <button type="button" className="text-zinc-500 hover:text-zinc-300 pt-1 shrink-0">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-zinc-800/80 bg-zinc-950/80 p-4 space-y-3 text-xs">
                      {/* Why HR Asks This */}
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <HelpCircle className="h-3.5 w-3.5" />
                          Why HR Asks This
                        </span>
                        <p className="text-zinc-300 leading-relaxed">{q.whyHrAsksThis}</p>
                      </div>

                      {/* Resume Trigger Context */}
                      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          Resume Trigger Context
                        </span>
                        <p className="text-zinc-400 italic">"{q.resumeContext}"</p>
                      </div>

                      {/* Practice Action Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedQuestion(q);
                          setCandidateAnswer("");
                          setEvaluation(null);
                        }}
                        className="w-full rounded-xl bg-violet-600/20 border border-violet-500/30 px-3 py-2 text-xs font-bold text-violet-300 hover:bg-violet-600 hover:text-white transition flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="h-3.5 w-3.5" />
                        Practice Answering This Question
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: HR Interactive Practice Canvas (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {selectedQuestion ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur-xl space-y-6">
              {/* Question Header */}
              <div className="space-y-2 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-violet-500/10 border border-violet-500/30 px-3 py-0.5 text-xs font-bold text-violet-300">
                    {selectedQuestion.category}
                  </span>
                  <span className="text-xs text-zinc-400">Live Practice Session</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {selectedQuestion.question}
                </h3>
              </div>

              {/* Candidate Input Form */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-violet-400" />
                    Your Response (Use STAR Format: Situation, Task, Action, Result)
                  </label>
                  <span className="text-[10px] text-zinc-500">{candidateAnswer.length} characters</span>
                </div>

                <textarea
                  rows={6}
                  value={candidateAnswer}
                  onChange={(e) => setCandidateAnswer(e.target.value)}
                  placeholder="Type your response here... (Tip: Mention your situation, the task required, specific actions you personally took, and measurable results achieved)."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-xs text-zinc-100 placeholder-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/40 transition-all leading-relaxed"
                />

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedQuestion.sampleAnswer) {
                        setCandidateAnswer(selectedQuestion.sampleAnswer);
                        toast.info("Sample STAR answer loaded into response box.");
                      }
                    }}
                    className="text-xs text-violet-400 hover:text-violet-300 underline font-medium"
                  >
                    Use Sample STAR Answer
                  </button>

                  <button
                    type="button"
                    onClick={handleEvaluate}
                    disabled={evaluating}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-indigo-500 transition disabled:opacity-50"
                  >
                    {evaluating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Evaluating HR Response...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Get AI HR Feedback
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Evaluation Results Card */}
              {evaluation && (
                <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-5 space-y-5 animate-in fade-in duration-300">
                  {/* Verdict Header */}
                  <div className="flex items-center justify-between border-b border-violet-500/20 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-zinc-400 block">HR Round Verdict</span>
                      <span className="text-sm font-extrabold text-white flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-violet-400" />
                        {evaluation.verdict || "Acceptable Pass"}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-semibold text-zinc-400 block">STAR Format Score</span>
                      <span className="text-lg font-black text-emerald-400">{evaluation.starScore}%</span>
                    </div>
                  </div>

                  {/* Feedback Blocks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* STAR Breakdown */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-violet-300">STAR Structure</span>
                      <p className="text-zinc-300 leading-relaxed">{evaluation.starBreakdown}</p>
                    </div>

                    {/* Tone & Confidence */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3.5 space-y-1">
                      <span className="text-[10px] font-bold uppercase text-emerald-400">Tone & Professionalism</span>
                      <p className="text-zinc-300 leading-relaxed">{evaluation.toneAndConfidence}</p>
                    </div>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Key Strengths */}
                    <div className="space-y-2">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Key Strengths
                      </span>
                      <ul className="space-y-1 text-zinc-300">
                        {evaluation.keyStrengths?.map((st, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400">•</span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div className="space-y-2">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Suggested HR Adjustments
                      </span>
                      <ul className="space-y-1 text-zinc-300">
                        {evaluation.improvements?.map((imp, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-400">•</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-8 text-center text-zinc-500">
              <UserCheck className="h-10 w-10 opacity-30 text-violet-400 mb-3" />
              <p className="text-xs font-semibold text-zinc-400">Select an HR Question from the left list to begin practice.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
