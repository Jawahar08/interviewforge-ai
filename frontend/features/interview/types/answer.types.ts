export interface SubmitAnswerRequest {
  questionId: number;
  sessionId: number;
  userAnswer: string;
}

export interface EvaluateAnswerRequest {
  answerId: number;
}

export interface AnswerResponse {
  id: number;
  questionId: number;
  sessionId: number;
  userAnswer: string;
  score: number | null;
  feedback: string;
  submittedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}