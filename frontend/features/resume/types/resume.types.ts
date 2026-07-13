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