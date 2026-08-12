"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/features/auth/api/auth.api";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
} from "@/features/auth/schemas/auth.schema";

type Step = "REQUEST" | "VERIFY_OTP" | "RESET" | "SUCCESS";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("REQUEST");
  const [userEmail, setUserEmail] = useState("");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP State
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [isOtpSubmitting, setIsOtpSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "VERIFY_OTP" && resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, resendCountdown]);

  // Form for Step 1: Request Reset (Send OTP)
  const {
    register: registerRequest,
    handleSubmit: handleSubmitRequest,
    formState: { errors: requestErrors, isSubmitting: isRequestSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for Step 3: Set New Password
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    watch: watchReset,
    formState: { errors: resetErrors, isSubmitting: isResetSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const watchPassword = watchReset("password") || "";

  // Password requirements check
  const hasMinLength = watchPassword.length >= 8;
  const hasUpperCase = /[A-Z]/.test(watchPassword);
  const hasLowerCase = /[a-z]/.test(watchPassword);
  const hasNumber = /[0-9]/.test(watchPassword);

  const [devOtp, setDevOtp] = useState<string | null>(null);

  const onRequestSubmit = async (values: ForgotPasswordFormData) => {
    try {
      setServerError(null);
      setServerSuccess(null);
      const cleanEmail = values.email.trim().toLowerCase();
      const response = await authApi.forgotPassword({ email: cleanEmail });

      setUserEmail(response.email || cleanEmail);
      if (response.otp) {
        setDevOtp(response.otp);
      }
      setResendCountdown(60);
      setOtpDigits(["", "", "", "", "", ""]);
      setStep("VERIFY_OTP");
    } catch (error: unknown) {
      console.error("Forgot password request failed:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          "Unable to find an account with that email. Please check and try again.";
        setServerError(message);
        return;
      }

      if (error instanceof Error) {
        setServerError(error.message);
        return;
      }

      setServerError("An unexpected error occurred. Please try again.");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste of whole OTP
      const pasted = value.replace(/\D/g, "").slice(0, 6);
      if (pasted.length > 0) {
        const newDigits = [...otpDigits];
        for (let i = 0; i < 6; i++) {
          newDigits[i] = pasted[i] || "";
        }
        setOtpDigits(newDigits);
        const focusIndex = Math.min(pasted.length, 5);
        otpInputRefs.current[focusIndex]?.focus();
      }
      return;
    }

    const digit = value.replace(/\D/g, "");
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newDigits = [...otpDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedData[i] || "";
      }
      setOtpDigits(newDigits);
      const focusIndex = Math.min(pastedData.length, 5);
      otpInputRefs.current[focusIndex]?.focus();
    }
  };

  const onVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otpDigits.join("");
    if (fullOtp.length !== 6) {
      setServerError("Please enter all 6 digits of the verification code.");
      return;
    }

    try {
      setServerError(null);
      setIsOtpSubmitting(true);

      const response = await authApi.verifyOtp({
        email: userEmail,
        otp: fullOtp,
      });

      if (response.resetToken) {
        setResetToken(response.resetToken);
      }

      setStep("RESET");
    } catch (error: unknown) {
      console.error("OTP verification failed:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          "Invalid or expired verification code. Please try again.";
        setServerError(message);
        return;
      }

      if (error instanceof Error) {
        setServerError(error.message);
        return;
      }

      setServerError("Verification failed. Please check your code and try again.");
    } finally {
      setIsOtpSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0 || isResending) return;

    try {
      setIsResending(true);
      setServerError(null);
      setServerSuccess(null);

      const response = await authApi.forgotPassword({ email: userEmail });
      if (response.otp) {
        setDevOtp(response.otp);
      }
      setResendCountdown(60);
      setOtpDigits(["", "", "", "", "", ""]);
      setServerSuccess("A new 6-digit code has been sent to your email.");
      otpInputRefs.current[0]?.focus();
    } catch (error: unknown) {
      console.error("Resend OTP failed:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ?? "Unable to resend OTP. Please try again.";
        setServerError(message);
        return;
      }

      setServerError("Failed to resend verification code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const onResetSubmit = async (values: ResetPasswordFormData) => {
    try {
      setServerError(null);
      await authApi.resetPassword({
        email: userEmail,
        resetToken: resetToken || undefined,
        newPassword: values.password,
      });

      setStep("SUCCESS");
    } catch (error: unknown) {
      console.error("Password reset failed:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ??
          "Unable to reset password. Please try again or request a new reset link.";
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                <Sparkles className="h-4 w-4" />
                Email OTP Authentication
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                Reset securely.
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Verified with Email OTP.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Your account is protected by two-step verification. We send a 6-digit one-time code to your registered email to ensure only you can update your password.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h2 className="font-medium text-white">Gmail OTP Security</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Time-expiring 6-digit verification code
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <KeyRound className="h-5 w-5" />
                </div>
                <h2 className="font-medium text-white">Instant Account Reset</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Verify in seconds and resume preparation
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

            <AnimatePresence mode="wait">
              {/* STEP 1: Request Password Reset (Send OTP) */}
              {step === "REQUEST" && (
                <motion.div
                  key="step-request"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-violet-400">
                      Step 1 of 3 · Email Verification
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      Forgot password?
                    </h2>

                    <p className="mt-3 text-slate-400">
                      Enter your account email. We&apos;ll send a 6-digit OTP code for authentication.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmitRequest(onRequestSubmit)}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-200">
                        Email address
                      </Label>

                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          autoFocus
                          aria-invalid={Boolean(requestErrors.email)}
                          {...registerRequest("email")}
                          className={`h-12 bg-white/[0.04] pl-10 text-white placeholder:text-slate-600 ${
                            requestErrors.email
                              ? "border-red-500/60 focus-visible:ring-red-500/20"
                              : "border-white/10 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
                          }`}
                        />
                      </div>

                      {requestErrors.email && (
                        <p className="text-sm text-red-400">
                          {requestErrors.email.message}
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
                      disabled={isRequestSubmitting}
                      className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 font-medium text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:shadow-violet-600/40 disabled:opacity-70 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isRequestSubmitting ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            <span>Sending OTP code...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Verification Code</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>

                    <div className="pt-4 text-center">
                      <Link
                        href="/auth/login"
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to sign in</span>
                      </Link>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Verify 6-Digit OTP */}
              {step === "VERIFY_OTP" && (
                <motion.div
                  key="step-verify-otp"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium uppercase tracking-[0.22em] text-violet-400">
                        Step 2 of 3 · Verification Code
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setStep("REQUEST");
                          setServerError(null);
                          setServerSuccess(null);
                        }}
                        className="text-xs text-slate-400 hover:text-violet-300 transition"
                      >
                        Change email
                      </button>
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      Enter OTP Code
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      We sent a 6-digit code to{" "}
                      <span className="font-medium text-violet-300">
                        {userEmail}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={onVerifyOtpSubmit} noValidate className="space-y-6">
                    {/* 6-Digit OTP Boxes */}
                    <div className="space-y-2">
                      <Label className="text-slate-200">
                        6-Digit Verification Code
                      </Label>

                      <div className="flex justify-between gap-2 sm:gap-3">
                        {otpDigits.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => {
                              otpInputRefs.current[idx] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={idx === 0 ? 6 : 1}
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            onPaste={handleOtpPaste}
                            autoFocus={idx === 0}
                            className="h-14 w-12 sm:w-14 rounded-xl border border-white/10 bg-white/[0.04] text-center text-2xl font-bold text-white shadow-inner transition focus:border-violet-500 focus:bg-violet-500/10 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                          />
                        ))}
                      </div>
                    </div>

                    {serverSuccess && (
                      <div
                        role="status"
                        className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
                      >
                        {serverSuccess}
                      </div>
                    )}

                    {devOtp && (
                      <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3 text-xs text-violet-300 flex items-center justify-between">
                        <span>
                          Code: <strong className="font-mono text-sm text-white tracking-widest">{devOtp}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const digits = devOtp.split("").slice(0, 6);
                            setOtpDigits(digits);
                          }}
                          className="text-violet-400 hover:text-violet-200 underline font-medium cursor-pointer"
                        >
                          Auto-fill
                        </button>
                      </div>
                    )}

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
                      disabled={isOtpSubmitting || otpDigits.join("").length !== 6}
                      className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 font-medium text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:shadow-violet-600/40 disabled:opacity-50 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isOtpSubmitting ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            <span>Verifying code...</span>
                          </>
                        ) : (
                          <>
                            <span>Verify Code</span>
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setStep("REQUEST");
                          setServerError(null);
                          setServerSuccess(null);
                        }}
                        className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        disabled={resendCountdown > 0 || isResending}
                        onClick={handleResendOtp}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 hover:text-violet-300 disabled:text-slate-600 disabled:cursor-not-allowed transition"
                      >
                        {isResending ? (
                          <>
                            <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : resendCountdown > 0 ? (
                          <span>Resend code in {resendCountdown}s</span>
                        ) : (
                          <>
                            <RefreshCw className="h-3.5 w-3.5" />
                            <span>Resend Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: Set New Password */}
              {step === "RESET" && (
                <motion.div
                  key="step-reset"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-8">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium uppercase tracking-[0.22em] text-violet-400">
                        Step 3 of 3 · Update Password
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <Check className="h-3 w-3" /> OTP Verified
                      </span>
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                      Create new password
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      Resetting password for{" "}
                      <span className="font-medium text-violet-300">
                        {userEmail}
                      </span>
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmitReset(onResetSubmit)}
                    noValidate
                    className="space-y-5"
                  >
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
                          autoFocus
                          aria-invalid={Boolean(resetErrors.password)}
                          {...registerReset("password")}
                          className={`h-12 bg-white/[0.04] pl-10 pr-11 text-white placeholder:text-slate-600 ${
                            resetErrors.password
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

                      {resetErrors.password && (
                        <p className="text-sm text-red-400">
                          {resetErrors.password.message}
                        </p>
                      )}

                      {/* Password Requirements Checklist */}
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
                      <Label
                        htmlFor="confirmPassword"
                        className="text-slate-200"
                      >
                        Confirm New Password
                      </Label>

                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter your new password"
                          autoComplete="new-password"
                          aria-invalid={Boolean(resetErrors.confirmPassword)}
                          {...registerReset("confirmPassword")}
                          className={`h-12 bg-white/[0.04] pl-10 pr-11 text-white placeholder:text-slate-600 ${
                            resetErrors.confirmPassword
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

                      {resetErrors.confirmPassword && (
                        <p className="text-sm text-red-400">
                          {resetErrors.confirmPassword.message}
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
                      disabled={isResetSubmitting}
                      className="group relative h-12 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 font-medium text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:shadow-violet-600/40 disabled:opacity-70 cursor-pointer"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isResetSubmitting ? (
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
                      <button
                        type="button"
                        onClick={() => {
                          setStep("VERIFY_OTP");
                          setServerError(null);
                        }}
                        className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to OTP verification</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Success Confirmation */}
              {step === "SUCCESS" && (
                <motion.div
                  key="step-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 shadow-xl shadow-emerald-500/10">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl text-white">
                    Password Reset Complete!
                  </h2>

                  <p className="mt-4 text-slate-400 max-w-sm mx-auto">
                    Your password has been successfully updated with secure OTP authentication. You can now sign in with your new credentials.
                  </p>

                  <div className="mt-8 space-y-4">
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
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}
