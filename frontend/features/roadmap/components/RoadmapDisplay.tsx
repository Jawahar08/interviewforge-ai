"use client";

import { useState } from "react";
import {
  Calendar,
  CheckSquare,
  Square,
  BookOpen,
  ArrowLeft,
  ExternalLink,
  Award,
  Clock,
  Compass,
  CheckCircle2,
} from "lucide-react";
import type { LearningRoadmapResponse } from "../types/roadmap.types";

interface RoadmapDisplayProps {
  roadmap: LearningRoadmapResponse;
  onReset: () => void;
}

export function RoadmapDisplay({ roadmap, onReset }: RoadmapDisplayProps) {
  // Track checked tasks: key is "weekIndex-taskIndex"
  const [checkedTasks, setCheckedTasks] = useState<Record<string, boolean>>({});

  const toggleTask = (weekIndex: number, taskIndex: number) => {
    const key = `${weekIndex}-${taskIndex}`;
    setCheckedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Calculate task counts per week
  const getWeekProgress = (weekIndex: number, tasks: string[]) => {
    const checked = tasks.filter((_, idx) => checkedTasks[`${weekIndex}-${idx}`]).length;
    const total = tasks.length;
    const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
    return { checked, total, percentage };
  };

  // Calculate overall tasks checked
  const totalTasksCount = roadmap.weeks.reduce((acc, w) => acc + w.tasks.length, 0);
  const totalCheckedCount = roadmap.weeks.reduce((acc, w, wIdx) => {
    return acc + w.tasks.filter((_, tIdx) => checkedTasks[`${wIdx}-${tIdx}`]).length;
  }, 0);
  const overallTaskProgress = totalTasksCount > 0 ? Math.round((totalCheckedCount / totalTasksCount) * 100) : 0;

  // SVG Progress Ring calculations
  const radius = 50;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (overallTaskProgress / 100) * circumference;

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <button
            onClick={onReset}
            className="group mb-3 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Create new roadmap
          </button>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {roadmap.title || "Your Learning Roadmap"}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Follow this timeline to close skill gaps and master this domain.
          </p>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-300 hover:border-violet-500/30 hover:text-white transition cursor-pointer"
        >
          Reset Form
        </button>
      </div>

      {/* METRIC GAUGE row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Circle Progress Gauge */}
        <div className="flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-md">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
            <svg className="h-20 w-20 -rotate-90">
              <circle
                stroke="rgba(255, 255, 255, 0.05)"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              <circle
                stroke="#8b5cf6"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={circumference + " " + circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
                className="transition-all duration-300"
              />
            </svg>
            <span className="absolute text-sm font-bold text-violet-300">
              {overallTaskProgress}%
            </span>
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
              Roadmap Progress
            </span>
            <span className="text-lg font-bold text-white block mt-0.5">
              {totalCheckedCount} of {totalTasksCount} tasks
            </span>
            <span className="text-xs text-slate-400 leading-normal">
              Keep check boxes active to track growth.
            </span>
          </div>
        </div>

        {/* Readiness Score */}
        <div className="flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-md">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Award className="h-6 w-6 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
              Initial Readiness
            </span>
            <span className="text-2xl font-bold text-white block mt-0.5">
              {roadmap.overallScore}%
            </span>
            <span className="text-xs text-slate-400">
              Current profile alignment score.
            </span>
          </div>
        </div>

        {/* Estimated Duration */}
        <div className="flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-md sm:col-span-2 lg:col-span-1">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <Clock className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
              Estimated Duration
            </span>
            <span className="text-lg font-bold text-white block mt-0.5">
              {roadmap.estimatedDuration || "6 Weeks"}
            </span>
            <span className="text-xs text-slate-400">
              Optimal preparation timeframe.
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* TIMELINE TIMELINE (Left 2 cols) */}
        <div className="space-y-6 lg:col-span-2">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-violet-400" />
            Weekly Timeline
          </h3>

          <div className="relative border-l border-white/10 pl-6 ml-3 space-y-8">
            {roadmap.weeks.map((weekData, weekIdx) => {
              const { checked, total, percentage } = getWeekProgress(weekIdx, weekData.tasks);
              const isWeekCompleted = percentage === 100 && total > 0;

              return (
                <div key={weekIdx} className="relative group">
                  {/* Timeline dot connector */}
                  <div
                    className={[
                      "absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300",
                      isWeekCompleted
                        ? "border-emerald-500 bg-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        : "border-white/20 bg-[#050816] group-hover:border-violet-500/60",
                    ].join(" ")}
                  >
                    {isWeekCompleted && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 shadow-lg group-hover:border-white/10 transition duration-200">
                    {/* Header */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <span className="text-xs font-semibold text-violet-400 uppercase block tracking-wider">
                          Week {weekData.week || weekIdx + 1}
                        </span>
                        <h4 className="text-base font-bold text-white mt-0.5">
                          {weekData.topic}
                        </h4>
                      </div>
                      <div className="shrink-0 text-xs font-medium text-slate-500 bg-white/[0.03] border border-white/[0.05] rounded-lg px-2.5 py-1">
                        {checked} of {total} tasks ({percentage}%)
                      </div>
                    </div>

                    {/* Progress line */}
                    <div className="h-1.5 w-full bg-white/[0.03] rounded-full overflow-hidden mb-5">
                      <div
                        className={[
                          "h-full rounded-full transition-all duration-300",
                          isWeekCompleted ? "bg-emerald-500" : "bg-violet-500",
                        ].join(" ")}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    {/* Tasks list */}
                    <ul className="space-y-3">
                      {weekData.tasks.map((task, taskIdx) => {
                        const isChecked = !!checkedTasks[`${weekIdx}-${taskIdx}`];
                        return (
                          <li
                            key={taskIdx}
                            onClick={() => toggleTask(weekIdx, taskIdx)}
                            className={[
                              "flex items-start gap-3 rounded-xl p-3 border transition cursor-pointer select-none",
                              isChecked
                                ? "border-emerald-500/20 bg-emerald-500/[0.02] text-slate-400"
                                : "border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.025] hover:border-white/[0.08] text-slate-200",
                            ].join(" ")}
                          >
                            <span className="mt-0.5 shrink-0 transition duration-200">
                              {isChecked ? (
                                <CheckSquare className="h-4.5 w-4.5 text-emerald-400" />
                              ) : (
                                <Square className="h-4.5 w-4.5 text-slate-600 hover:text-slate-400" />
                              )}
                            </span>
                            <span className={isChecked ? "line-through text-slate-500" : ""}>
                              {task}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDEBAR CAPSTONES & RESOURCES (Right 1 col) */}
        <div className="space-y-8">
          {/* Projects */}
          {roadmap.projects && roadmap.projects.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="h-5 w-5 text-violet-400" />
                Recommended Projects
              </h3>
              <div className="space-y-4">
                {roadmap.projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 space-y-3 shadow-lg"
                  >
                    <h4 className="font-bold text-white text-sm">{project.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.keyTechnologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[10px] font-medium text-violet-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {roadmap.resources && roadmap.resources.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-violet-400" />
                Selected Resources
              </h3>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden shadow-lg">
                <ul className="divide-y divide-white/[0.05]">
                  {roadmap.resources.map((res, idx) => (
                    <li
                      key={idx}
                      className="p-4 hover:bg-white/[0.015] transition duration-150"
                    >
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider block">
                            {res.type || "Link"}
                          </span>
                          <span className="text-xs font-semibold text-slate-200 mt-1 block truncate group-hover:text-violet-300 transition-colors">
                            {res.name}
                          </span>
                        </div>
                        <ExternalLink className="h-4 w-4 shrink-0 text-slate-600 group-hover:text-violet-400 transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
