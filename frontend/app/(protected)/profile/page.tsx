import { Metadata } from "next";
import { ProfileForm } from "@/features/profile/components/ProfileForm";

export const metadata: Metadata = {
  title: "Profile - InterviewForge AI",
  description: "Manage your user profile details, target role, and account security settings.",
};

export default function ProfilePage() {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Account
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            {" "}
            Profile Settings
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
          Configure your personal info, target careers and customize security credentials.
        </p>
      </header>

      <div className="relative">
        <ProfileForm />
      </div>
    </div>
  );
}
