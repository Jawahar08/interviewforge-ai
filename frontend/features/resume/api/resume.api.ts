import { apiClient } from "@/lib/api/client";

import type {
  ApiResponse,
  ResumeAnalysisResponse,
  ResumeListItem,
} from "../types/resume.types";

export const resumeApi = {
  analyze: async (file: File): Promise<ResumeAnalysisResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<ApiResponse<ResumeAnalysisResponse>>(
      "/resume/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  },

  list: async (): Promise<ResumeListItem[]> => {
    const response = await apiClient.get<ApiResponse<ResumeListItem[]>>(
      "/resume"
    );
    return response.data.data;
  },

  get: async (id: number): Promise<ResumeListItem & ResumeAnalysisResponse> => {
    try {
      const [itemRes, analysisRes] = await Promise.all([
        apiClient.get<ApiResponse<ResumeListItem>>(`/resume/${id}`),
        apiClient.get<ApiResponse<ResumeAnalysisResponse>>(`/resume/${id}/analysis`).catch(() => null),
      ]);
      return {
        ...itemRes.data.data,
        ...(analysisRes?.data?.data || {}),
      } as ResumeListItem & ResumeAnalysisResponse;
    } catch {
      const response = await apiClient.get<ApiResponse<ResumeListItem & ResumeAnalysisResponse>>(
        `/resume/${id}`
      );
      return response.data.data;
    }
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete<ApiResponse<void>>(`/resume/${id}`);
  },

  retry: async (id: number): Promise<ResumeAnalysisResponse> => {
    const response = await apiClient.post<ApiResponse<ResumeAnalysisResponse>>(
      `/resume/${id}/retry`
    );
    return response.data.data;
  },

  getHrQuestions: async (id: number) => {
    const response = await apiClient.get<ApiResponse<import("../types/resume.types").HrQuestion[]>>(
      `/resume/${id}/hr-questions`
    );
    return response.data.data;
  },

  evaluateHrAnswer: async (id: number, request: import("../types/resume.types").HrEvaluationRequest) => {
    const response = await apiClient.post<ApiResponse<import("../types/resume.types").HrEvaluationResponse>>(
      `/resume/${id}/hr-evaluate`,
      request
    );
    return response.data.data;
  },
};