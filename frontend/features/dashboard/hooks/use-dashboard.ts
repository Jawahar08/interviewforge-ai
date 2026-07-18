import { useCallback, useState } from "react";
import { dashboardApi, type DashboardResponse } from "../api/dashboard.api";

export function useDashboard() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await dashboardApi.getAnalytics();
      setData(res);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch dashboard metrics.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    fetchAnalytics,
  };
}
