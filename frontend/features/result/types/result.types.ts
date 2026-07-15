export interface ResultResponse {
  overallScore: number;
  technicalScore: number;
  communicationScore: number;
  confidenceScore: number;
  strengths: string;
  weaknesses: string;
  recommendation: string;
  summary: string;
}