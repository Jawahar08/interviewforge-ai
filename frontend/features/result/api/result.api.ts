import { apiClient } from "@/lib/api/client";
import { ResultResponse } from "../types/result.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const resultApi = {
  async generateResult(
    sessionId: string
  ): Promise<ResultResponse> {
    const response =
      await apiClient.post<
        ApiResponse<ResultResponse>
      >(
        `/results/generate/${sessionId}`
      );

    return response.data.data;
  },

  async getResult(
    sessionId: string
  ): Promise<ResultResponse> {
    const response =
      await apiClient.get<
        ApiResponse<ResultResponse>
      >(
        `/results/${sessionId}`
      );

    return response.data.data;
  },
};