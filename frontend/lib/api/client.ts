import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      return config;
    }

    const persistedAuth =
      localStorage.getItem("interviewforge-auth");

    if (!persistedAuth) {
      return config;
    }

    try {
      const parsed = JSON.parse(persistedAuth);

      const token =
        parsed?.state?.token;

      if (token) {
        config.headers.Authorization =
          `Bearer ${token}`;
      }
    } catch (error) {
      console.error(
        "Failed to read persisted auth token:",
        error
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);