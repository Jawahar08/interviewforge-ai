import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8080/api/v1";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      if (error.response?.status === 401) {
        console.warn("Session expired or unauthorized (401). Clearing stored auth token.");
        const persistedAuth = localStorage.getItem("interviewforge-auth");
        if (persistedAuth) {
          try {
            const parsed = JSON.parse(persistedAuth);
            if (parsed.state) {
              parsed.state.user = null;
              parsed.state.token = null;
              parsed.state.isAuthenticated = false;
              localStorage.setItem("interviewforge-auth", JSON.stringify(parsed));
            }
          } catch {
            localStorage.removeItem("interviewforge-auth");
          }
        }
      } else if (!error.response) {
        console.error(
          "Network Error: Unable to connect to backend server at " + API_BASE_URL
        );
      }
    }
    return Promise.reject(error);
  }
);