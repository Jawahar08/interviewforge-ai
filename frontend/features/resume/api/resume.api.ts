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
    const response = await apiClient.get<ApiResponse<ResumeListItem & ResumeAnalysisResponse>>(
      `/resume/${id}`
    );
    return response.data.data;
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
};