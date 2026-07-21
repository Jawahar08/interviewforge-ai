export interface AppSettings {
  aiTemperature: number;
  aiModel: "gemini-flash" | "gemini-pro" | "mock-dev";
  verbosity: "detailed" | "concise";
  emailOnResume: boolean;
  weeklyRoadmapReminders: boolean;
  pushNotifications: boolean;
}
