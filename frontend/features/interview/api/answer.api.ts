import { apiClient } from "@/lib/api/client";

import type {
  AnswerResponse,
  ApiResponse,
  EvaluateAnswerRequest,
  SubmitAnswerRequest,
} from "@/features/interview/types/answer.types";

export const answerApi = {
  submitAnswer: async (
    request: SubmitAnswerRequest
  ): Promise<AnswerResponse> => {
    const response = await apiClient.post<
      ApiResponse<AnswerResponse>
    >(
      "/answers",
      request
    );

    return response.data.data;
  },

  evaluateAnswer: async (
    request: EvaluateAnswerRequest
  ): Promise<AnswerResponse> => {
    const response = await apiClient.post<
      ApiResponse<AnswerResponse>
    >(
      "/answers/evaluate",
      request
    );

    return response.data.data;
  },

  submitAndEvaluate: async (
    request: SubmitAnswerRequest
  ): Promise<AnswerResponse> => {
    const submittedAnswer =
      await answerApi.submitAnswer(request);

    return answerApi.evaluateAnswer({
      answerId: submittedAnswer.id,
    });
  },
};