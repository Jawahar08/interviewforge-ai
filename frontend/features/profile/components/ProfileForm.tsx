"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  User,
  Mail,
  Lock,
  Shield,
  Save,
  Key,
  Loader2,
  Briefcase,
  Sparkles,
  Camera,
  CheckCircle2,
  Check,
  ShieldCheck,
  Award,
} from "lucide-react";

import { useProfile } from "../hooks/use-profile";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  targetRole: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export function ProfileForm() {
  const { profile, loading, updating, fetchProfile, updateProfile } = useProfile();
  const [activeTab, setActiveTab] = useState<"info" | "security">("info");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      targetRole: "",
    },
  });

  // Password Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    watch: watchPassword,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPasswordVal = watchPassword("newPassword") || "";

  const calculatePasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "Empty", color: "bg-slate-700" };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 25, label: "Weak", color: "bg-red-500" };
    if (score === 2) return { score: 50, label: "Fair", color: "bg-amber-500" };
    if (score === 3) return { score: 75, label: "Good", color: "bg-emerald-400" };
    return { score: 100, label: "Strong & Secure", color: "bg-violet-400" };
  };

  const pwdStrength = calculatePasswordStrength(newPasswordVal);

  useEffect(() => {
    if (profile) {
      resetProfile({
        fullName: profile.name || "",
        targetRole: profile.targetRole || "",
      });
    }
  }, [profile, resetProfile]);

  const onProfileSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfile({
        fullName: values.fullName,
        targetRole: values.targetRole || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onPasswordSubmit = async (values: PasswordFormValues) => {
    try {
      if (!profile) return;
      await updateProfile({
        fullName: profile.name,
        targetRole: profile.targetRole || "",
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      resetPassword();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-3xl border border-white/[0.08] bg-white/[0.01] backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
          <p className="text-xs text-slate-400 animate-pulse">Loading user profile details...</p>
        </div>
      </div>
    );
  }

  const userInitials = profile?.name
    ? profile.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "IF";

  const targetRolePresets = [
    "Backend Developer",
    "Full Stack Engineer",
    "Frontend Specialist",
    "DevOps / SRE",
    "AI/ML Engineer",
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Jaw-dropping Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0c101d]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/60">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-full max-w-xl bg-gradient-to-r from-violet-600/25 via-indigo-500/20 to-cyan-500/20 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Avatar & Name */}
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-2xl font-extrabold text-white shadow-xl shadow-violet-500/30 ring-4 ring-white/10 group-hover:ring-violet-400/50 transition-all duration-300">
                {userInitials}
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-[#0c101d]">
                <Check className="h-3 w-3 text-black font-bold" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {profile?.name || "InterviewForge User"}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/15 px-3 py-0.5 text-xs font-semibold text-violet-300">
                  <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
                  Verified Developer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                {profile?.email || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Quick Details Badge Array */}
          <div className="flex flex-wrap gap-3 border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-8">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-md">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Target Role</span>
              <span className="text-xs font-bold text-violet-300">
                {profile?.targetRole || "Not specified"}
              </span>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-md">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Status</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active Member
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pill Navigation Bar */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center rounded-2xl border border-white/[0.08] bg-[#0c101d]/90 p-1.5 backdrop-blur-xl shadow-lg">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === "info"
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <User className="h-4 w-4" />
            Personal Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === "security"
                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Lock className="h-4 w-4" />
            Security & Credentials
          </button>
        </div>
      </div>

      {/* Form Canvas Card */}
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101d]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/50">
        {activeTab === "info" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/[0.06] pb-5 space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-violet-400" />
                Personal Information
              </h3>
              <p className="text-xs text-slate-400">
                Update your display name and career target role for personalized interview simulations.
              </p>
            </div>

            <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Full Display Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      type="text"
                      placeholder="e.g. Jawahar Bharathi"
                      {...registerProfile("fullName")}
                      className="pl-10 h-11 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
                    />
                  </div>
                  {profileErrors.fullName && (
                    <p className="text-xs text-red-400">{profileErrors.fullName.message}</p>
                  )}
                </div>

                {/* Target Role */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Target Career Role</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      type="text"
                      placeholder="e.g. Backend Developer"
                      {...registerProfile("targetRole")}
                      className="pl-10 h-11 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
                    />
                  </div>
                  {profileErrors.targetRole && (
                    <p className="text-xs text-red-400">{profileErrors.targetRole.message}</p>
                  )}
                </div>
              </div>

              {/* Target Role Quick Presets */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Quick Role Suggestions
                </span>
                <div className="flex flex-wrap gap-2">
                  {targetRolePresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setProfileValue("targetRole", preset, { shouldValidate: true })}
                      className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1 text-xs font-medium text-slate-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white transition"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Email (Disabled) */}
                <div className="space-y-2 opacity-70">
                  <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>Registered Email Address</span>
                    <span className="text-[10px] text-slate-500">(Read-only)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-600" />
                    <Input
                      type="email"
                      value={profile?.email || ""}
                      disabled
                      className="pl-10 h-11 cursor-not-allowed border-white/[0.04] bg-white/[0.01] text-slate-400 rounded-xl text-sm"
                    />
                  </div>
                </div>

                {/* Account Type (Disabled) */}
                <div className="space-y-2 opacity-70">
                  <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                    <span>Account Authorization</span>
                    <span className="text-[10px] text-slate-500">(System Managed)</span>
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3.5 top-3 h-4 w-4 text-slate-600" />
                    <Input
                      type="text"
                      value="Standard OAuth Account"
                      disabled
                      className="pl-10 h-11 cursor-not-allowed border-white/[0.04] bg-white/[0.01] text-slate-400 rounded-xl text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                <Button
                  type="submit"
                  disabled={updating}
                  className="h-11 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 font-bold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500"
                >
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Details...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Details
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/[0.06] pb-5 space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-violet-400" />
                Change Password & Credentials
              </h3>
              <p className="text-xs text-slate-400">
                Enhance your account defense by updating your access password.
              </p>
            </div>

            <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Current Password</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...registerPassword("currentPassword")}
                    className="pl-10 h-11 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
                  />
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-xs text-red-400">{passwordErrors.currentPassword.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...registerPassword("newPassword")}
                      className="pl-10 h-11 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
                    />
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="text-xs text-red-400">{passwordErrors.newPassword.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...registerPassword("confirmPassword")}
                      className="pl-10 h-11 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm"
                    />
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-xs text-red-400">{passwordErrors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              {/* Password Complexity Gauge */}
              {newPasswordVal.length > 0 && (
                <div className="space-y-2 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-4 backdrop-blur-md">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Password Strength:</span>
                    <span className="font-bold text-white">{pwdStrength.label}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${pwdStrength.color}`}
                      style={{ width: `${pwdStrength.score}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                <Button
                  type="submit"
                  disabled={updating}
                  className="h-11 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 font-bold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500"
                >
                  {updating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Update Password
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
