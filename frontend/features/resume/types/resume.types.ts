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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}