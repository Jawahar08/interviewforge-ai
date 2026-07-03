import { apiClient } from "@/lib/api/client";

import type {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types/auth.types";

export const authApi = {
  register: async (
    request: RegisterRequest
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      request
    );

    return response.data.data;
  },

  login: async (
    request: LoginRequest
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      request
    );

    return response.data.data;
  },
};