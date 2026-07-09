import { apiClient } from "@/lib/api/client";

import type {
  ApiResponse,
  SessionQuestionsResponse,
} from "@/features/interview/types/session-question.types";

export const sessionQuestionApi = {
  getSessionQuestions: async (
    sessionId: string
  ): Promise<SessionQuestionsResponse> => {
    const response = await apiClient.get<
      ApiResponse<SessionQuestionsResponse>
    >(
      `/sessions/${encodeURIComponent(
        sessionId
      )}/questions`
    );

    return response.data.data;
  },
};