import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to unwrap the ApiResponse<T>
apiClient.interceptors.response.use(
  (response) => {
    // Our backend returns { success: true, message: "...", data: {...} }
    if (response.data && response.data.success !== undefined) {
      if (!response.data.success) {
        return Promise.reject(new Error(response.data.message || 'API Error'));
      }
      return response.data; // Return the whole ApiResponse object
    }
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'Network error';
    console.error('API Call Failed:', message);
    return Promise.reject(new Error(message));
  }
);

// --- API Service Methods ---

export const InterviewService = {
  getStats: async () => {
    // Mocked for dashboard (since backend might not have this explicit aggregation endpoint yet)
    // We will call existing endpoints if available or return mocked stats for visual impact
    return {
      success: true,
      data: {
        totalInterviews: 12,
        averageScore: 85,
        upcoming: 2
      }
    };
  },
  
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/resume/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  startSession: async (interviewId) => {
    return apiClient.post(`/sessions?interviewId=${interviewId}`);
  },

  generateQuestion: async (sessionId) => {
    return apiClient.post(`/ai/questions/generate?sessionId=${sessionId}`);
  },

  submitAnswer: async (sessionId, questionId, text) => {
    return apiClient.post(`/answers`, {
      sessionId,
      questionId,
      text
    });
  },

  getRecommendation: async (sessionId) => {
    return apiClient.get(`/recommendations/session/${sessionId}`);
  }
};
