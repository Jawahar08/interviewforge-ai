import { apiClient } from "@/lib/api/client";

import type {
  ApiResponse,
  CreateInterviewRequest,
  CreateInterviewResponse,
  InterviewSession,
} from "@/features/interview/types/interview.types";

export const interviewApi = {
  createSession: async (
    request: CreateInterviewRequest
  ): Promise<CreateInterviewResponse> => {
    const response =
      await apiClient.post<
        ApiResponse<CreateInterviewResponse>
      >(
        "/interviews",
        request
      );

    return response.data.data;
  },

  getSessionById: async (
    sessionId: string
  ): Promise<InterviewSession> => {
    const response =
      await apiClient.get<
        ApiResponse<InterviewSession>
      >(
        `/interviews/${sessionId}`
      );

    return response.data.data;
  },

  getMySessions: async (): Promise<
    InterviewSession[]
  > => {
    const response =
      await apiClient.get<
        ApiResponse<InterviewSession[]>
      >(
        "/interviews"
      );

    return response.data.data;
  },
};