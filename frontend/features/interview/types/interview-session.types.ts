export type InterviewSessionStatus =
  | "READY"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ABANDONED";

export type InterviewDifficulty = "Easy" | "Medium" | "Hard";

export type InterviewType =
  | "TECHNICAL"
  | "BEHAVIORAL"
  | "CASE_STUDY"
  | "STRESS_ETHICS"
  | "SYSTEM_PROCESS"
  | "MIXED"
  | "Technical"
  | "Behavioral"
  | "Mixed";

export interface InterviewQuestion {
  id: string;
  questionNumber: number;
  question: string;
  category: string;
  difficulty: InterviewDifficulty;

  answer?: string;

  answeredAt?: string;
}

export interface InterviewSessionConfig {
  sessionId: string;
  targetRole: string;
  interviewType: InterviewType;
  difficulty: InterviewDifficulty;
  durationMinutes: number;
}

export interface InterviewSession {
  sessionId: string;

  status: InterviewSessionStatus;

  targetRole: string;
  interviewType: InterviewType;
  difficulty: InterviewDifficulty;
  durationMinutes: number;

  currentQuestionIndex: number;

  questions: InterviewQuestion[];

  startedAt: string | null;
  completedAt: string | null;
}

export interface SubmitAnswerPayload {
  questionId: string;
  answer: string;
}

export interface InterviewSessionState {
  session: InterviewSession | null;

  currentAnswer: string;

  isSubmittingAnswer: boolean;

  initializeSession: (
    config: InterviewSessionConfig
  ) => void;

  startInterview: () => void;

  setQuestions: (
    questions: InterviewQuestion[]
  ) => void;

  setCurrentAnswer: (
    answer: string
  ) => void;

  submitCurrentAnswer: () => void;

  goToNextQuestion: () => void;

  completeInterview: () => void;

  abandonInterview: () => void;

  resetSession: () => void;
}