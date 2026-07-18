import { useCallback, useState } from "react";
import { historyApi, type HistoryItem } from "../api/history.api";

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await historyApi.getHistory();
      setHistory(data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch interview history.");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    history,
    loading,
    error,
    fetchHistory,
  };
}
