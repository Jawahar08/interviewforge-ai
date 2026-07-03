export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  email: string;
  role: string;
  token: string;
  message: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}