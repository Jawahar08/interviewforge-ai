import { z } from "zod";

export const interviewSchema = z.object({
  role: z.enum([
    "FULL_STACK_DEVELOPER",
    "BACKEND_DEVELOPER",
    "FRONTEND_DEVELOPER",
    "JAVA_DEVELOPER",
    "SOFTWARE_ENGINEER",
    "DEVOPS_ENGINEER",
  ]),

  interviewType: z.enum([
    "TECHNICAL",
    "BEHAVIORAL",
    "MIXED",
  ]),

  difficulty: z.enum([
    "EASY",
    "MEDIUM",
    "HARD",
  ]),

  duration: z.union([
    z.literal(15),
    z.literal(30),
    z.literal(45),
    z.literal(60),
  ]),

  experienceLevel: z.enum([
    "FRESHER",
    "JUNIOR",
    "MID_LEVEL",
    "SENIOR",
  ]),

  techStack: z
    .string()
    .trim()
    .min(1, "Enter at least one technology")
    .max(200, "Tech stack must be under 200 characters"),

  jobDescription: z
    .string()
    .trim()
    .max(5000, "Job description must be under 5000 characters")
    .optional(),
});

export type InterviewFormData = z.infer<
  typeof interviewSchema
>;