import { useCallback, useState } from "react";
import { resumeApi } from "../api/resume.api";
import type { ResumeListItem, ResumeAnalysisResponse } from "../types/resume.types";
import { useResumeStore } from "../store/resume.store";

export function useResume() {
  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [activeResume, setActiveResume] = useState<(ResumeListItem & ResumeAnalysisResponse) | null>(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setGlobalAnalysis = useResumeStore((s) => s.setAnalysis);

  const fetchResumes = useCallback(async () => {
    try {
      setLoadingList(true);
      setError(null);
      const data = await resumeApi.list();
      setResumes(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch resumes history.");
    } finally {
      setLoadingList(false);
    }
  }, []);

  const fetchResumeDetails = useCallback(async (id: number) => {
    try {
      setLoadingActive(true);
      setError(null);
      const data = await resumeApi.get(id);
      setActiveResume(data);
      setGlobalAnalysis(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to load resume details.");
    } finally {
      setLoadingActive(false);
    }
  }, [setGlobalAnalysis]);

  const uploadResume = async (file: File) => {
    try {
      setUploadLoading(true);
      setError(null);
      const result = await resumeApi.analyze(file);
      setGlobalAnalysis(result);
      await fetchResumes(); // refresh list
      return result;
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "";
      const axiosMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(axiosMessage || message || "Failed to analyze resume.");
      throw err;
    } finally {
      setUploadLoading(false);
    }
  };

  const deleteResume = async (id: number) => {
    try {
      setError(null);
      await resumeApi.delete(id);
      setResumes((prev) => prev.filter((r) => r.id !== id));
      if (activeResume?.id === id) {
        setActiveResume(null);
      }
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to delete resume.");
    }
  };

  const retryResume = async (id: number) => {
    try {
      setUploadLoading(true);
      setError(null);
      const result = await resumeApi.retry(id);
      setGlobalAnalysis(result);
      await fetchResumes();
      await fetchResumeDetails(id);
      return result;
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to retry analysis.");
      throw err;
    } finally {
      setUploadLoading(false);
    }
  };

  return {
    resumes,
    activeResume,
    setActiveResume,
    loadingList,
    loadingActive,
    uploadLoading,
    error,
    setError,
    fetchResumes,
    fetchResumeDetails,
    uploadResume,
    deleteResume,
    retryResume,
  };
}
