import { apiClient } from "@/lib/api/client";
import type { LearningRoadmapRequest, LearningRoadmapResponse } from "../types/roadmap.types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const roadmapApi = {
  generateRoadmap: async (
    request: LearningRoadmapRequest
  ): Promise<LearningRoadmapResponse> => {
    const response = await apiClient.post<
      ApiResponse<LearningRoadmapResponse>
    >("/roadmap/generate", request);

    return response.data.data;
  },
};
