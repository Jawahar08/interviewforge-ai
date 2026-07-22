export interface ResumeListItem {
  id: number;
  filename: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  errorMessage?: string;
  atsScore?: number;
  createdAt: string;
}

export interface ResumeAnalysisResponse {
  atsScore: number;
  strengths: string[];
  weaknesses: string[];
  missingSkills: string[];
  improvements: string[];
  suggestedProjects: string[];
  interviewQuestions: string[];
  learningResources: string[];
}

export interface HrQuestion {
  id: string;
  question: string;
  category: string;
  whyHrAsksThis: string;
  resumeContext: string;
  sampleAnswer: string;
}

export interface HrEvaluationRequest {
  question: string;
  resumeContext: string;
  candidateAnswer: string;
}

export interface HrEvaluationResponse {
  starScore: number;
  starBreakdown: string;
  toneAndConfidence: string;
  resumeConsistency: string;
  verdict: string;
  keyStrengths: string[];
  improvements: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}