import { apiClient } from "@/lib/api/client";
import { ApiResponse, UserProfile, ProfileUpdateInput } from "../types/profile";

export const profileApi = {
  async getProfile(): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>("/profile");
    return response.data.data;
  },

  async updateProfile(data: ProfileUpdateInput): Promise<UserProfile> {
    const response = await apiClient.put<ApiResponse<UserProfile>>("/profile", data);
    return response.data.data;
  },
};
