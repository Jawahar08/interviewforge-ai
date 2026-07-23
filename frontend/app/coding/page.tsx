"use client";

import { useState, useMemo } from "react";
import { CODING_PROBLEMS, PROBLEM_CATEGORIES, type CodingProblem } from "@/features/coding/data/problems.data";
import { CodeSandbox } from "@/features/interview/components/CodeSandbox";
import { SystemDesignCanvas } from "@/features/interview/components/SystemDesignCanvas";
import {
  Code2,
  Sparkles,
  Search,
  CheckCircle2,
  Trophy,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  BookOpen,
  Network,
  Filter,
} from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 25;

export default function CodingArenaPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProblem, setActiveProblem] = useState<CodingProblem | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "hints" | "system-design">("description");
  const [solvedProblemIds, setSolvedProblemIds] = useState<string[]>(["two-sum"]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter problems
  const filteredProblems = useMemo(() => {
    return CODING_PROBLEMS.filter((p) => {
      const matchesDiff = selectedDifficulty === "ALL" || p.difficulty === selectedDifficulty;
      const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDiff && matchesCat && matchesSearch;
    });
  }, [selectedDifficulty, selectedCategory, searchQuery]);

  // Paginated problems slice
  const totalPages = Math.ceil(filteredProblems.length / ITEMS_PER_PAGE) || 1;
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProblems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProblems, currentPage]);

  const handleMarkSolved = (id: string) => {
    if (!solvedProblemIds.includes(id)) {
      setSolvedProblemIds((prev) => [...prev, id]);
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Background Orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-emerald-600/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-400 transition hover:border-violet-500/30 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          {activeProblem && (
            <button
              onClick={() => setActiveProblem(null)}
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/20"
            >
              <ChevronLeft className="h-4 w-4" />
              All Problems List ({CODING_PROBLEMS.length})
            </button>
          )}
        </div>

        {!activeProblem ? (
          /* ================= PROBLEM DIRECTORY VIEW ================= */
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-violet-950/60 via-zinc-900/90 to-indigo-950/60 border border-violet-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300 mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  LeetCode 500+ & FAANG Coding Arena
                </div>
                <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                  AI-Powered 500+ Coding Challenges
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                  Practice 500 top LeetCode Data Structures, Algorithms, and System Design problems with real-time AI code audits and complexity analysis.
                </p>
              </div>

              {/* Solved Stats Widget */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 shrink-0">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Solved Challenges</div>
                  <div className="text-xl font-extrabold text-white">
                    {solvedProblemIds.length} <span className="text-xs text-zinc-500 font-normal">/ {CODING_PROBLEMS.length} Available</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Top 15% Candidate Performance</div>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search 500+ LeetCode problems..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500"
                  />
                </div>

                {/* Difficulty Filter Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950 border border-zinc-800 w-full sm:w-auto overflow-x-auto">
                  {["ALL", "EASY", "MEDIUM", "HARD"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => {
                        setSelectedDifficulty(diff);
                        setCurrentPage(1);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedDifficulty === diff
                          ? "bg-violet-600 text-white shadow-sm"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-zinc-800/60 no-scrollbar">
                <span className="text-[10px] font-bold text-zinc-500 uppercase flex items-center gap-1 shrink-0 mr-1">
                  <Filter className="w-3 h-3" /> Topics:
                </span>
                {PROBLEM_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                      selectedCategory === cat
                        ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                        : "bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Problems List Table */}
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl">
              <div className="grid grid-cols-12 p-4 border-b border-zinc-800 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                <div className="col-span-1">Status</div>
                <div className="col-span-5">Title & Topic</div>
                <div className="col-span-3">Category</div>
                <div className="col-span-1">Difficulty</div>
                <div className="col-span-2 text-right">Action</div>
              </div>

              <div className="divide-y divide-zinc-800/60">
                {paginatedProblems.length > 0 ? (
                  paginatedProblems.map((prob) => {
                    const isSolved = solvedProblemIds.includes(prob.id);
                    return (
                      <div
                        key={prob.id}
                        className="grid grid-cols-12 p-4 items-center hover:bg-zinc-900/80 transition-colors"
                      >
                        <div className="col-span-1">
                          {isSolved ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-zinc-700 block" />
                          )}
                        </div>

                        <div className="col-span-5">
                          <h3 className="text-sm font-bold text-white hover:text-violet-300 transition-colors">
                            {prob.title}
                          </h3>
                          <span className="text-[11px] text-zinc-400">Acceptance: {prob.acceptanceRate}</span>
                        </div>

                        <div className="col-span-3">
                          <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-300">
                            {prob.category}
                          </span>
                        </div>

                        <div className="col-span-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              prob.difficulty === "EASY"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : prob.difficulty === "MEDIUM"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            }`}
                          >
                            {prob.difficulty}
                          </span>
                        </div>

                        <div className="col-span-2 text-right">
                          <button
                            onClick={() => {
                              setActiveProblem(prob);
                              setActiveTab("description");
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-500/10 transition-all hover:scale-105"
                          >
                            <span>Solve</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-zinc-500 text-xs font-mono">
                    No problems found matching your filters. Try clearing search or category filter.
                  </div>
                )}
              </div>

              {/* Pagination Controls Footer */}
              <div className="p-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-950/60">
                <div className="text-xs text-zinc-400 font-mono">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredProblems.length)} of {filteredProblems.length} LeetCode Problems
                </div>

                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </button>

                  <span className="text-xs font-bold text-violet-300 font-mono px-2">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= FULL LEETCODE ARENA WORKSPACE ================= */
          <div className="space-y-4">
            {/* Arena Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <Code2 className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                    <span>{activeProblem.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        activeProblem.difficulty === "EASY"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : activeProblem.difficulty === "MEDIUM"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      }`}
                    >
                      {activeProblem.difficulty}
                    </span>
                  </h2>
                  <div className="text-xs text-slate-400">{activeProblem.category} • Acceptance: {activeProblem.acceptanceRate}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkSolved(activeProblem.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Solved</span>
                </button>
              </div>
            </div>

            {/* Split Screen Grid (Left Specs, Right Sandbox) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Problem Statement & Hints (5 Cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-4 max-h-[700px] overflow-y-auto">
                {/* Tabs */}
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "description"
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Description</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("hints")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "hints"
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>AI Walkthrough</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("system-design")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "system-design"
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Network className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Architecture Canvas</span>
                  </button>
                </div>

                {activeTab === "description" && (
                  <div className="space-y-4 text-xs leading-relaxed text-zinc-300">
                    <div className="whitespace-pre-line font-sans text-sm">{activeProblem.description}</div>

                    {/* Examples */}
                    <div className="space-y-3 pt-2">
                      <span className="font-bold text-white text-xs uppercase tracking-wider block">Examples:</span>
                      {activeProblem.examples.map((ex, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1 font-mono text-[11px]">
                          <div><span className="text-zinc-500">Input:</span> <span className="text-zinc-200">{ex.input}</span></div>
                          <div><span className="text-zinc-500">Output:</span> <span className="text-emerald-400">{ex.output}</span></div>
                          {ex.explanation && (
                            <div className="text-zinc-400 text-[10px] pt-1 font-sans">💡 {ex.explanation}</div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Constraints */}
                    <div className="space-y-2 pt-2">
                      <span className="font-bold text-white text-xs uppercase tracking-wider block">Constraints:</span>
                      <ul className="list-disc pl-4 space-y-1 font-mono text-[11px] text-zinc-400">
                        {activeProblem.constraints.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "hints" && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-2 text-xs">
                    <span className="font-bold uppercase tracking-wider block flex items-center gap-1.5">
                      💡 AI Optimal Strategy & Complexity Guide
                    </span>
                    <p className="leading-relaxed">{activeProblem.solutionHint}</p>
                  </div>
                )}

                {activeTab === "system-design" && (
                  <div className="pt-2">
                    <SystemDesignCanvas />
                  </div>
                )}
              </div>

              {/* Right Column: Code Sandbox Editor (7 Cols) */}
              <div className="lg:col-span-7">
                <CodeSandbox
                  initialCode={activeProblem.starterTemplates.javascript}
                  testCases={activeProblem.testCases}
                  onSolved={() => handleMarkSolved(activeProblem.id)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
