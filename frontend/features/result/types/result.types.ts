export interface QuestionReview {
  questionId: number;
  questionText: string;
  category: string;
  difficulty: string;
  modelAnswer: string;
  userAnswer: string;
  score: number;
  feedback: string;
}

export interface ResultResponse {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  strengths: string;
  weaknesses: string;
  recommendation: string;
  summary: string;
  questions?: QuestionReview[];
}