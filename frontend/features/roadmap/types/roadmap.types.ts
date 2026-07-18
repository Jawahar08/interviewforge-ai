export interface WeekPlan {
  week: number;
  topic: string;
  tasks: string[];
}

export interface ProjectDto {
  title: string;
  description: string;
  keyTechnologies: string[];
}

export interface ResourceDto {
  name: string;
  type: string;
  url: string;
}

export interface LearningRoadmapRequest {
  targetRole: string;
  experience: string;
  resumeText: string;
}

export interface LearningRoadmapResponse {
  title: string;
  overallScore: number;
  estimatedDuration: string;
  weeks: WeekPlan[];
  projects: ProjectDto[];
  resources: ResourceDto[];
}
