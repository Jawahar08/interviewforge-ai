import { apiClient } from "@/lib/api/client";

export interface DashboardResponse {
  totalInterviews: number;
  totalQuestions: number;
  totalAnswers: number;
  averageInterviewScore: number;
  highestScore: number;
  lowestScore: number;
  resumeAtsScore: number;
  aiInsight: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const dashboardApi = {
  async getAnalytics(): Promise<DashboardResponse> {
    const response = await apiClient.get<ApiResponse<DashboardResponse>>(
      "/dashboard"
    );
    return response.data.data;
  },
};
