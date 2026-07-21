import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api/client";
import type { AppSettings } from "../types/settings";

const DEFAULT_SETTINGS: AppSettings = {
  aiTemperature: 0.7,
  aiModel: "gemini-flash",
  verbosity: "detailed",
  emailOnResume: true,
  weeklyRoadmapReminders: true,
  pushNotifications: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [clearingHistory, setClearingHistory] = useState(false);
  const [clearingResumes, setClearingResumes] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("interviewforge-settings");
      if (saved) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      }
    } catch (err) {
      console.error("Failed to load settings from localStorage:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem("interviewforge-settings", JSON.stringify(updated));
        toast.success("Settings saved successfully!");
      } catch (err) {
        console.error("Failed to save settings to localStorage:", err);
        toast.error("Failed to save settings.");
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      setClearingHistory(true);
      await apiClient.delete("/profile/interviews");
      toast.success("All mock interview history cleared!");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to clear interview history.");
    } finally {
      setClearingHistory(false);
    }
  }, []);

  const clearResumes = useCallback(async () => {
    try {
      setClearingResumes(true);
      await apiClient.delete("/profile/resumes");
      toast.success("All uploaded resumes and analysis history cleared!");
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to clear resume database.");
    } finally {
      setClearingResumes(false);
    }
  }, []);

  return {
    settings,
    loading,
    clearingHistory,
    clearingResumes,
    saveSettings,
    clearHistory,
    clearResumes,
  };
}
