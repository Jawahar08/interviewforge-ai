export type InterviewRole = string;

export type InterviewType =
  | "TECHNICAL"
  | "BEHAVIORAL"
  | "CASE_STUDY"
  | "STRESS_ETHICS"
  | "SYSTEM_PROCESS"
  | "MIXED";

export type InterviewDifficulty =
  | "EASY"
  | "MEDIUM"
  | "HARD";

export type ExperienceLevel =
  | "FRESHER"
  | "JUNIOR"
  | "MID_LEVEL"
  | "SENIOR";

export type InterviewDuration = 15 | 30 | 45 | 60;

export interface InterviewSetupFormValues {
  role: InterviewRole;
  interviewType: InterviewType;
  difficulty: InterviewDifficulty;
  duration: InterviewDuration;
  experienceLevel: ExperienceLevel;
  techStack: string;
  jobDescription?: string;
}

export interface CreateInterviewRequest {
  role: InterviewRole;
  interviewType: InterviewType;
  difficulty: InterviewDifficulty;
  duration: InterviewDuration;
  experienceLevel: ExperienceLevel;
  techStack: string[];
  jobDescription?: string;
}

export type InterviewStatus =
  | "CREATED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface InterviewSession {
  id: string;
  role: InterviewRole;
  interviewType: InterviewType;
  difficulty: InterviewDifficulty;
  duration: InterviewDuration;
  experienceLevel: ExperienceLevel;
  techStack: string[];
  jobDescription?: string | null;
  status: InterviewStatus;
  createdAt: string;
  startedAt?: string | null;
  completedAt?: string | null;
}

export interface CreateInterviewResponse {
  session: InterviewSession;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}