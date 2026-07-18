import { apiClient } from "@/lib/api/client";

export interface HistoryItem {
  id: number;
  company: string;
  role: string;
  score: number;
  feedback: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const historyApi = {
  async getHistory(): Promise<HistoryItem[]> {
    const response = await apiClient.get<ApiResponse<HistoryItem[]>>(
      "/history"
    );
    return response.data.data;
  },
};
