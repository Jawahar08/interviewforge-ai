"use client";

import { useEffect, useState, useRef } from "react";
import { useResume } from "@/features/resume/hooks/use-resume";
import {
  UploadCloud,
  FileText,
  Sparkles,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Award,
  Plus,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";

export default function ResumePage() {
  const {
    resumes,
    activeResume,
    loadingList,
    loadingActive,
    uploadLoading,
    fetchResumes,
    fetchResumeDetails,
    uploadResume,
    deleteResume,
    retryResume,
  } = useResume();

  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "practice">("overview");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch resume list on mount
  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = async (file: File) => {
    // Client-side secure validation
    if (!file.name.toLowerCase().endsWith(".pdf") && !file.name.toLowerCase().endsWith(".docx")) {
      toast.error("Only PDF and DOCX files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must not exceed 5MB");
      return;
    }

    try {
      toast.info(`Uploading & analyzing ${file.name}...`);
      await uploadResume(file);
      toast.success("Resume analyzed successfully!");
      // Automatically select the newly created resume if possible
      if (resumes.length > 0) {
        // Fetch first one (newest)
        await fetchResumeDetails(resumes[0].id);
      }
    } catch (err: unknown) {
      const axiosMessage = (err as any)?.response?.data?.message;
      toast.error(axiosMessage || "Failed to analyze resume. Check file or API key.");
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleDelete = async (id: number, filename: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete ${filename}?`)) {
      await deleteResume(id);
      toast.success("Resume deleted");
    }
  };

  const handleRetry = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      toast.info("Retrying analysis...");
      await retryResume(id);
      toast.success("Resume analyzed successfully!");
    } catch (err: unknown) {
      toast.error("Failed to retry analysis.");
    }
  };

  // Helper for dynamic score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 stroke-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    if (score >= 50) return "text-amber-400 stroke-amber-400 border-amber-500/30 bg-amber-500/10";
    return "text-rose-400 stroke-rose-400 border-rose-500/30 bg-rose-500/10";
  };

  return (
    <main className="min-h-screen bg-black bg-radial-at-t from-zinc-950 via-black to-black text-zinc-100 pb-20">
      <Toaster position="top-right" theme="dark" closeButton />
      
      {/* Premium Header */}
      <div className="border-b border-zinc-900 bg-zinc-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Resume Intelligence Workspace</span>
            </div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              ATS Score & Resume Optimizer
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
              <Shield className="w-3.5 h-3.5 text-violet-400" />
              <span>Secure Document Isolation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Upload Zone & History List (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Upload Dropzone */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 ${
              dragActive
                ? "border-violet-500 bg-violet-950/15"
                : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              disabled={uploadLoading}
            />

            {uploadLoading ? (
              <div className="py-6 flex flex-col items-center justify-center">
                <RefreshCw className="w-10 h-10 text-violet-400 animate-spin mb-4" />
                <h3 className="font-semibold text-lg text-zinc-200 mb-1">Analyzing Resume...</h3>
                <p className="text-xs text-zinc-400 max-w-xs">
                  Extracting text, analyzing skills, matching ATS algorithms, and preparing improvements.
                </p>
              </div>
            ) : (
              <div className="py-4 cursor-pointer" onClick={triggerFileSelect}>
                <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 mb-4 hover:scale-105 transition-transform duration-200">
                  <UploadCloud className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="font-semibold text-zinc-200 mb-1">Upload Resume</h3>
                <p className="text-xs text-zinc-400 mb-3">Drag & drop or browse your file</p>
                <div className="inline-flex px-3 py-1 rounded bg-zinc-950 text-[10px] text-zinc-400 font-mono border border-zinc-900">
                  PDF or DOCX • Max 5MB
                </div>
              </div>
            )}
          </motion.div>

          {/* Resumes List */}
          <div className="bg-zinc-950/60 backdrop-blur-xl border border-zinc-900 rounded-2xl p-6 flex flex-col flex-grow min-h-[300px]">
            <h2 className="text-lg font-bold text-zinc-200 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-400" />
              <span>Resume History ({resumes.length})</span>
            </h2>

            {loadingList ? (
              <div className="flex-grow flex items-center justify-center py-10">
                <RefreshCw className="w-6 h-6 text-zinc-500 animate-spin" />
              </div>
            ) : resumes.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center py-10 text-zinc-500">
                <FileText className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm">No resumes uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-2 flex-grow overflow-y-auto max-h-[400px] pr-1">
                {resumes.map((item) => {
                  const isActive = activeResume?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => fetchResumeDetails(item.id)}
                      className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-violet-950/20 border-violet-800/80"
                          : "bg-zinc-900/20 border-zinc-900 hover:bg-zinc-900/50 hover:border-zinc-800"
                      }`}
                    >
                      <div className="flex flex-col gap-1 min-w-0 pr-3">
                        <span className="text-sm font-medium text-zinc-200 truncate group-hover:text-white">
                          {item.filename}
                        </span>
                        <div className="flex items-center gap-2 text-xs">
                          {item.status === "COMPLETED" && (
                            <span className="inline-flex items-center text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px]">
                              ATS {item.atsScore}%
                            </span>
                          )}
                          {item.status === "PROCESSING" && (
                            <span className="inline-flex items-center text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded text-[10px] gap-1">
                              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                              Processing
                            </span>
                          )}
                          {item.status === "FAILED" && (
                            <span className="inline-flex items-center text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded text-[10px]">
                              Failed
                            </span>
                          )}
                          <span className="text-zinc-500 text-[10px] font-mono">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        {item.status === "FAILED" && (
                          <button
                            onClick={(e) => handleRetry(item.id, e)}
                            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800"
                            title="Retry analysis"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => handleDelete(item.id, item.filename, e)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:text-rose-400 text-zinc-500 border border-zinc-800"
                          title="Delete resume"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Analysis View (8 Cols) */}
        <div className="lg:col-span-8">
          
          {loadingActive ? (
            <div className="h-full min-h-[450px] bg-zinc-950/40 border border-zinc-900 rounded-2xl flex flex-col items-center justify-center text-zinc-400">
              <RefreshCw className="w-8 h-8 animate-spin mb-4 text-violet-400" />
              <span>Fetching analysis records...</span>
            </div>
          ) : activeResume ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-zinc-950/60 backdrop-blur-xl border border-zinc-900 rounded-2xl p-6 md:p-8 flex flex-col gap-8"
            >
              {/* Active Resume Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-900 pb-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-violet-400">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">{activeResume.filename}</h2>
                    <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Uploaded on {new Date(activeResume.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* ATS Circular Score Dial */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20">
                    {/* SVG Circle indicator */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        className="stroke-zinc-800 fill-transparent"
                        strokeWidth="5"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        className={`fill-transparent transition-all duration-1000 ${getScoreColor(
                          activeResume.atsScore || 0
                        )}`}
                        strokeWidth="6"
                        strokeDasharray={2 * Math.PI * 32}
                        strokeDashoffset={
                          2 * Math.PI * 32 * (1 - (activeResume.atsScore || 0) / 100)
                        }
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-extrabold text-white">
                        {activeResume.atsScore}%
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400">
                        ATS
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-300">ATS Assessment</div>
                    <div className="text-xs text-zinc-500">
                      {activeResume.atsScore && activeResume.atsScore >= 80
                        ? "Excellent match for standard job specs."
                        : activeResume.atsScore && activeResume.atsScore >= 50
                        ? "Average score. Target improvements."
                        : "Low compatibility. Needs attention."}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/60 border border-zinc-900 max-w-sm">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === "overview"
                      ? "bg-zinc-800 text-white shadow-sm border border-zinc-700/50"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Overview & Gaps
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === "projects"
                      ? "bg-zinc-800 text-white shadow-sm border border-zinc-700/50"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Optimization Projects
                </button>
                <button
                  onClick={() => setActiveTab("practice")}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                    activeTab === "practice"
                      ? "bg-zinc-800 text-white shadow-sm border border-zinc-700/50"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Practice Prep
                </button>
              </div>

              {/* Tab Contents */}
              <div className="min-h-[300px]">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* Strengths */}
                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-4.5 h-4.5" />
                        Key Strengths Detected
                      </h3>
                      <ul className="space-y-2.5 text-xs text-zinc-300">
                        {activeResume.strengths?.map((str, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="text-emerald-500/80 mt-0.5">•</span>
                            <span>{str}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Weaknesses / ATS Gaps */}
                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4.5 h-4.5" />
                        ATS Structural Weaknesses
                      </h3>
                      <ul className="space-y-2.5 text-xs text-zinc-300">
                        {activeResume.weaknesses?.map((weak, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="text-rose-500/80 mt-0.5">•</span>
                            <span>{weak}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Missing Skills (Keywords matching / Gaps) */}
                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-violet-400 flex items-center gap-2 mb-3">
                        <Award className="w-4.5 h-4.5" />
                        Missing Critical Skills (ATS Gaps)
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {activeResume.missingSkills?.length > 0 ? (
                          activeResume.missingSkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <p className="text-xs text-zinc-500">No missing skills detected.</p>
                        )}
                      </div>
                    </div>

                    {/* Improvement Suggestions */}
                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-sky-400 flex items-center gap-2 mb-3">
                        <Sparkles className="w-4.5 h-4.5" />
                        Formatting & ATS Optimizations
                      </h3>
                      <ul className="space-y-2.5 text-xs text-zinc-300">
                        {activeResume.improvements?.map((imp, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="text-sky-500/80 mt-0.5">•</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "projects" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-xl mb-4">
                      <p className="text-xs text-zinc-400 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        Based on your skill gaps, these projects are recommended to build or add to your resume to increase target compatibility:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeResume.suggestedProjects?.map((proj, idx) => (
                        <div
                          key={idx}
                          className="p-5 bg-zinc-900/20 border border-zinc-900 rounded-xl hover:border-zinc-800 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold font-mono">
                              {idx + 1}
                            </span>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                              Suggested Project Recommendation
                            </h4>
                          </div>
                          <p className="text-xs text-zinc-300 leading-relaxed">{proj}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "practice" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {/* Potential Interview Questions */}
                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-yellow-400 flex items-center gap-2 mb-3">
                        <Plus className="w-4.5 h-4.5 text-yellow-400" />
                        Targeted Interview Practice
                      </h3>
                      <ul className="space-y-3.5 text-xs text-zinc-300">
                        {activeResume.interviewQuestions?.map((q, idx) => (
                          <li key={idx} className="flex gap-2.5 items-start">
                            <span className="text-yellow-500 font-bold font-mono">Q{idx + 1}:</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Learning Resources */}
                    <div className="bg-zinc-900/20 border border-zinc-900 rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-pink-400 flex items-center gap-2 mb-3">
                        <BookOpen className="w-4.5 h-4.5" />
                        Learning Roadmaps & Resources
                      </h3>
                      <ul className="space-y-3 text-xs text-zinc-300">
                        {activeResume.learningResources?.map((res, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <span className="text-pink-500/80 mt-0.5">•</span>
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="h-full min-h-[450px] bg-zinc-900/10 border border-zinc-900 border-dashed rounded-2xl flex flex-col items-center justify-center text-zinc-500 p-8 text-center">
              <FileText className="w-12 h-12 mb-3 opacity-30 text-violet-400" />
              <h3 className="text-lg font-bold text-zinc-300 mb-1">Resume Dashboard</h3>
              <p className="text-sm max-w-sm leading-relaxed mb-6">
                Select an analyzed resume from your history or upload a new one to view your full ATS score and optimization insights.
              </p>
              <button
                onClick={triggerFileSelect}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 transition-all hover:scale-[1.02]"
              >
                Upload Your First Resume
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}