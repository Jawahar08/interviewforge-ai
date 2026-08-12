"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/features/auth/api/auth.api";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/features/auth/schemas/auth.schema";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tokenParam = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [resetToken, setResetToken] = useState(tokenParam);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (tokenParam) setResetToken(tokenParam);
    if (emailParam) setEmail(emailParam);
  }, [tokenParam, emailParam]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const watchPassword = watch("password") || "";
  const hasMinLength = watchPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(watchPassword);
  const hasLowerCase = /[a-z]/.test(watchPassword);
  const hasNumber = /[0-9]/.test(watchPassword);

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!email) {
      setServerError("Email is required. Please use the forgot password form.");
      return;
    }

    try {
      setServerError(null);
      await authApi.resetPassword({
        email: email.trim().toLowerCase(),
        resetToken: resetToken || undefined,
        newPassword: values.password,
      });

      setIsSuccess(true);
    } catch (error: unknown) {
      console.error("Password reset failed:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          "Unable to reset password. Please check your reset link or try again.";
        setServerError(message);
        return;
      }

      if (error instanceof Error) {
        setServerError(error.message);
        return;
      }

      setServerError("Failed to reset password. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 shadow-xl shadow-emerald-500/10">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-white">
          Password Updated!
        </h2>

        <p className="mt-4 text-slate-400 max-w-sm mx-auto">
          Your password has been successfully updated. You can now sign in with your new credentials.
        </p>

        <div className="mt-8">
          <Button
            onClick={() => router.push("/auth/login")}
            className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 font-medium text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:shadow-violet-600/40 cursor-pointer"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Sign In Now</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-violet-400">
          Reset Password
        </p>

        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Set new password
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Enter and confirm your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Email display/input if missing */}
        {!emailParam ? (
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-200">
              Account Email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 bg-white/[0.04] pl-10 text-white border-white/10 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
              />
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm flex items-center justify-between">
            <span className="text-slate-400">Email:</span>
            <span className="font-medium text-violet-300">{email}</span>
          </div>
        )}

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-200">
            New Password
          </Label>

          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
              className={`h-12 bg-white/[0.04] pl-10 pr-11 text-white placeholder:text-slate-600 ${
                errors.password
                  ? "border-red-500/60 focus-visible:ring-red-500/20"
                  : "border-white/10 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}

          {/* Requirements Checklist */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs space-y-1.5 mt-2">
            <div className="font-medium text-slate-300 mb-1">
              Password requirements:
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <span
                className={`flex items-center gap-1.5 ${
                  hasMinLength ? "text-emerald-400" : "text-slate-500"
                }`}
              >
                <Check
                  className={`h-3.5 w-3.5 ${
                    hasMinLength ? "opacity-100" : "opacity-40"
                  }`}
                />
                8+ characters
              </span>
              <span
                className={`flex items-center gap-1.5 ${
                  hasUpperCase ? "text-emerald-400" : "text-slate-500"
                }`}
              >
                <Check
                  className={`h-3.5 w-3.5 ${
                    hasUpperCase ? "opacity-100" : "opacity-40"
                  }`}
                />
                Uppercase letter
              </span>
              <span
                className={`flex items-center gap-1.5 ${
                  hasLowerCase ? "text-emerald-400" : "text-slate-500"
                }`}
              >
                <Check
                  className={`h-3.5 w-3.5 ${
                    hasLowerCase ? "opacity-100" : "opacity-40"
                  }`}
                />
                Lowercase letter
              </span>
              <span
                className={`flex items-center gap-1.5 ${
                  hasNumber ? "text-emerald-400" : "text-slate-500"
                }`}
              >
                <Check
                  className={`h-3.5 w-3.5 ${
                    hasNumber ? "opacity-100" : "opacity-40"
                  }`}
                />
                One number
              </span>
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-slate-200">
            Confirm New Password
          </Label>

          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register("confirmPassword")}
              className={`h-12 bg-white/[0.04] pl-10 pr-11 text-white placeholder:text-slate-600 ${
                errors.confirmPassword
                  ? "border-red-500/60 focus-visible:ring-red-500/20"
                  : "border-white/10 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-sm text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 font-medium text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:shadow-violet-600/40 disabled:opacity-70 cursor-pointer"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                <span>Updating password...</span>
              </>
            ) : (
              <>
                <span>Set new password</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </>
            )}
          </span>
        </Button>

        <div className="pt-2 text-center">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Request new reset link</span>
          </Link>
        </div>
      </form>
    </motion.div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />

      {/* Background glows */}
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]" />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* Left section */}
        <section className="hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <Link href="/" className="flex w-fit items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
              <BrainCircuit className="h-6 w-6" />
            </div>

            <div>
              <p className="font-semibold tracking-tight">InterviewForge</p>
              <p className="text-xs font-medium tracking-[0.28em] text-violet-400">
                AI
              </p>
            </div>
          </Link>

          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
              <Sparkles className="h-4 w-4" />
              Direct Password Reset
            </div>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              Restore access to
              <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                your interview journey.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Choose a strong, unique password to safeguard your interview sessions, AI feedback reports, and resume analyses.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="font-medium text-white">Encrypted & Secure</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Cryptographically secured password hashes
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h2 className="font-medium text-white">Instant Sync</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Immediate login with your new password
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} InterviewForge AI
          </p>
        </section>

        {/* Right section */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <Link
              href="/"
              className="mb-10 flex w-fit items-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <span className="font-semibold">InterviewForge AI</span>
            </Link>

            <Suspense
              fallback={
                <div className="flex items-center justify-center py-16">
                  <LoaderCircle className="h-8 w-8 animate-spin text-violet-500" />
                </div>
              }
            >
              <ResetPasswordForm />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}
