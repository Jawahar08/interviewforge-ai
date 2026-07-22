import { Metadata } from "next";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { Shield, Sparkles, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile - InterviewForge AI",
  description: "Manage your user profile details, target role, and account security settings.",
};

export default function ProfilePage() {
  return (
    <div className="relative min-h-screen w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-10 space-y-8">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute right-1/4 top-1/2 h-[450px] w-[450px] rounded-full bg-indigo-600/10 blur-[130px]" />
      </div>

      {/* Header Banner */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/[0.08] pb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 backdrop-blur-md">
            <UserCheck className="h-3.5 w-3.5 text-violet-400" />
            USER ACCOUNT & CREDENTIALS
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Account <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Manage your personal identity, target software developer role, and update your security authentication credentials.
          </p>
        </div>

        {/* User Account Badge Pills */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 backdrop-blur-md">
            <Shield className="h-4 w-4 text-violet-400" />
            <span className="text-xs font-bold text-violet-200">Authenticated Member</span>
          </div>
        </div>
      </div>

      {/* Profile Form Main Component */}
      <div className="relative">
        <ProfileForm />
      </div>
    </div>
  );
}
