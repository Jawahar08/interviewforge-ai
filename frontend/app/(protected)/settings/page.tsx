import { Metadata } from "next";
import { SettingsForm } from "@/features/settings/components/SettingsForm";

export const metadata: Metadata = {
  title: "Settings - InterviewForge AI",
  description: "Configure AI preferences, toggles, and mock parameters.",
};

export default function SettingsPage() {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          System
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            Preferences
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Adjust generation engines, toggle notifications and manage database reset options.
        </p>
      </header>

      <div className="relative">
        <SettingsForm />
      </div>
    </div>
  );
}
