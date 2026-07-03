export const API = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },

  RESUME: {
    ANALYZE: "/resume/analyze",
  },

  INTERVIEW: {
    START: "/mock-interview/start",
    ANSWER: (id: string) => `/mock-interview/${id}/answer`,
    REPORT: (id: string) => `/mock-interview/${id}/report`,
  },

  PROFILE: {
    GET: "/profile",
  },
};