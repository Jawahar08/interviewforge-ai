import { apiClient } from "@/lib/api/client";

import type {
  ApiResponse,
  AuthResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  GoogleAuthRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
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

  googleLogin: async (
    request: GoogleAuthRequest
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/auth/google",
      request
    );

    return response.data.data;
  },

  forgotPassword: async (
    request: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
      "/auth/forgot-password",
      request
    );

    return response.data.data;
  },

  verifyOtp: async (
    request: VerifyOtpRequest
  ): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ApiResponse<ForgotPasswordResponse>>(
      "/auth/verify-otp",
      request
    );

    return response.data.data;
  },

  resetPassword: async (
    request: ResetPasswordRequest
  ): Promise<void> => {
    await apiClient.post<ApiResponse<void>>(
      "/auth/reset-password",
      request
    );
  },
};