import { apiClient } from "@/lib/api/client";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type InterviewSessionResponse = {
  id: number;
  interviewId: number;
  status: string;
  startedAt?: string | null;
  completedAt?: string | null;
};

export const sessionApi = {
  startSession: async (
    interviewId: number
  ): Promise<InterviewSessionResponse> => {
    const response = await apiClient.post<
      ApiResponse<InterviewSessionResponse>
    >("/sessions/start", {
      interviewId,
    });

    return response.data.data;
  },

  getSession: async (
    sessionId: number
  ): Promise<InterviewSessionResponse> => {
    const response = await apiClient.get<
      ApiResponse<InterviewSessionResponse>
    >(`/sessions/${sessionId}`);

    return response.data.data;
  },

  completeSession: async (
    sessionId: number
  ): Promise<InterviewSessionResponse> => {
    const response = await apiClient.patch<
      ApiResponse<InterviewSessionResponse>
    >(`/sessions/${sessionId}/complete`);

    return response.data.data;
  },
};