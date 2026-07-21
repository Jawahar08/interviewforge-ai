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
} from "lucide-react";

import { useProfile } from "../hooks/use-profile";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

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
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
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
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // When profile loads, populate the form
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
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-3xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 text-xl font-bold text-white shadow-lg shadow-violet-500/20">
            {profile?.name ? profile.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "IF"}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{profile?.name || "InterviewForge User"}</h2>
            <p className="text-sm text-slate-400">{profile?.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">
            <Shield className="h-3 w-3" />
            Standard User
          </span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full max-w-xs grid grid-cols-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-1">
          <TabsTrigger value="info" className="py-2 text-xs sm:text-sm font-medium rounded-lg transition-all data-[state=active]:bg-violet-600 data-[state=active]:text-white">
            <User className="mr-2 h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="security" className="py-2 text-xs sm:text-sm font-medium rounded-lg transition-all data-[state=active]:bg-violet-600 data-[state=active]:text-white">
            <Lock className="mr-2 h-4 w-4" />
            Password
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <Card className="border border-white/[0.07] bg-white/[0.015] p-6 backdrop-blur-xl rounded-3xl">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-semibold text-white">Profile Details</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Update your account's public identity and target career role.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmitProfile(onProfileSubmit)} className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <Input
                        type="text"
                        placeholder="John Doe"
                        {...registerProfile("fullName")}
                        className="pl-10 h-10 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 focus:border-violet-500/50"
                      />
                    </div>
                    {profileErrors.fullName && (
                      <p className="text-xs text-red-400">{profileErrors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Target Role</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <Input
                        type="text"
                        placeholder="e.g. Backend Developer"
                        {...registerProfile("targetRole")}
                        className="pl-10 h-10 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 focus:border-violet-500/50"
                      />
                    </div>
                    {profileErrors.targetRole && (
                      <p className="text-xs text-red-400">{profileErrors.targetRole.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2 opacity-70">
                    <label className="text-xs font-medium text-slate-400">Email Address (Cannot change)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
                      <Input
                        type="email"
                        value={profile?.email || ""}
                        disabled
                        className="pl-10 h-10 cursor-not-allowed border-white/[0.04] bg-white/[0.01] text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 opacity-70">
                    <label className="text-xs font-medium text-slate-400">Role Status (Read-only)</label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-2.5 h-4 w-4 text-slate-600" />
                      <Input
                        type="text"
                        value="Authenticated User"
                        disabled
                        className="pl-10 h-10 cursor-not-allowed border-white/[0.04] bg-white/[0.01] text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={updating}
                    className="h-10 rounded-xl bg-violet-600 px-6 font-semibold text-white transition hover:bg-violet-500"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="border border-white/[0.07] bg-white/[0.015] p-6 backdrop-blur-xl rounded-3xl">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-lg font-semibold text-white">Change Password</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Secure your account by updating your credentials regularly.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">Current Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...registerPassword("currentPassword")}
                      className="pl-10 h-10 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 focus:border-violet-500/50"
                    />
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="text-xs text-red-400">{passwordErrors.currentPassword.message}</p>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...registerPassword("newPassword")}
                        className="pl-10 h-10 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 focus:border-violet-500/50"
                      />
                    </div>
                    {passwordErrors.newPassword && (
                      <p className="text-xs text-red-400">{passwordErrors.newPassword.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...registerPassword("confirmPassword")}
                        className="pl-10 h-10 border-white/[0.08] bg-white/[0.02] text-white placeholder-slate-600 focus:border-violet-500/50"
                      />
                    </div>
                    {passwordErrors.confirmPassword && (
                      <p className="text-xs text-red-400">{passwordErrors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={updating}
                    className="h-10 rounded-xl bg-violet-600 px-6 font-semibold text-white transition hover:bg-violet-500"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
