export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  targetRole: string | null;
  hasCustomGeminiApiKey?: boolean;
}

export interface ProfileUpdateInput {
  fullName: string;
  targetRole?: string;
  customGeminiApiKey?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
