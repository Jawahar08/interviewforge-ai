import { apiClient } from "@/lib/api/client";

import type {
  ApiResponse,
  ResumeAnalysisResponse,
} from "../types/resume.types";

export const resumeApi = {

  analyze: async (
    file: File
  ): Promise<ResumeAnalysisResponse> => {

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await apiClient.post<
        ApiResponse<ResumeAnalysisResponse>
      >(
        "/resume/analyze",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data.data;
  },
};