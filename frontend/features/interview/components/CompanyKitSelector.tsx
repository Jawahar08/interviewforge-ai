"use client";

import { useState } from "react";
import { COMPANY_KITS, type CompanyKit } from "../data/companyKits.data";
import { Building2, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  onSelectKit?: (kit: CompanyKit) => void;
}

export function CompanyKitSelector({ onSelectKit }: Props) {
  const [selectedKit, setSelectedKit] = useState<CompanyKit>(COMPANY_KITS[0]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);

  const handleSelect = (kit: CompanyKit) => {
    setSelectedKit(kit);
    setActiveQuestionIdx(0);
    if (onSelectKit) {
      onSelectKit(kit);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-violet-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Targeted Company Interview Kits</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            FAANG & Top Tech Company Tracks
          </h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Calibrated against real interview rubrics</span>
        </div>
      </div>

      {/* Company Selector Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {COMPANY_KITS.map((kit) => {
          const isSelected = selectedKit.id === kit.id;
          return (
            <button
              key={kit.id}
              onClick={() => handleSelect(kit)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[120px] ${
                isSelected
                  ? `${kit.bgGradient} ${kit.borderColor} shadow-lg shadow-violet-500/10 ring-1 ring-violet-500/30`
                  : "bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{kit.logo}</span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-violet-400" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-0.5">{kit.name}</h3>
                <p className="text-[10px] text-zinc-400 line-clamp-2 leading-tight">
                  {kit.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Kit Deep Dive Dashboard */}
      <motion.div
        key={selectedKit.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border ${selectedKit.bgGradient} ${selectedKit.borderColor} space-y-6`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{selectedKit.logo}</span>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <span>{selectedKit.name} Interview Kit</span>
                <span className="text-[10px] font-mono uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded">
                  Calibrated Track
                </span>
              </h3>
              <p className="text-xs text-zinc-300">{selectedKit.tagline}</p>
            </div>
          </div>
        </div>

        {/* Focus Areas & Evaluation Rubric */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-2">
            <div className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Core Technical & Leadership Focus
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedKit.focusAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-1.5">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Company Evaluation Philosophy
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {selectedKit.evaluationStyle}
            </p>
          </div>
        </div>

        {/* Curated Question Pool */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Curated Company Question Pool
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedKit.questionPool.map((q, idx) => (
              <div
                key={idx}
                onClick={() => setActiveQuestionIdx(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeQuestionIdx === idx
                    ? "bg-zinc-900 border-violet-500/50 shadow-md"
                    : "bg-zinc-950/40 border-zinc-800/50 hover:bg-zinc-900/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {q.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      q.difficulty === "HARD"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{q.title}</h4>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-2">
                  {q.questionText}
                </p>
                <div className="text-[11px] text-amber-300/90 font-mono bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                  💡 Hint: {q.hint}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
