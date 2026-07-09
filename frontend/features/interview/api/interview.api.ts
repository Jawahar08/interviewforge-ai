import { apiClient } from "@/lib/api/client";

import type {
  ApiResponse,
  InterviewDifficulty,
  InterviewRole,
} from "@/features/interview/types/interview.types";

export interface CreateBackendInterviewRequest {
  title: string;
  role: InterviewRole;
  difficulty: InterviewDifficulty;
}

export interface BackendInterview {
  id: number;
  title: string;
  role: string;
  difficulty: string;
  createdAt: string;
}

export const interviewApi = {
  createInterview: async (
    request: CreateBackendInterviewRequest
  ): Promise<BackendInterview> => {
    const response = await apiClient.post<
      ApiResponse<BackendInterview>
    >("/interviews", request);

    return response.data.data;
  },

  getInterviewById: async (
    interviewId: number
  ): Promise<BackendInterview> => {
    const response = await apiClient.get<
      ApiResponse<BackendInterview>
    >(`/interviews/${interviewId}`);

    return response.data.data;
  },

  getMyInterviews: async (): Promise<
    BackendInterview[]
  > => {
    const response = await apiClient.get<
      ApiResponse<BackendInterview[]>
    >("/interviews");

    return response.data.data;
  },
};