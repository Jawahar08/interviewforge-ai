export interface SessionQuestion {
  id: number | string;
  questionText: string;
  category: string | null;
  difficulty: string | null;
  questionNumber: number;
  totalQuestions: number;
}

export interface SessionQuestionsResponse {
  sessionId: string;
  interviewId: number | string;
  status: string;
  totalQuestions: number;
  questions: SessionQuestion[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}