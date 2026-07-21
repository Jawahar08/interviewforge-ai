"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";

import axios from "axios";

import { useRouter } from "next/navigation";

import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/shared/store/auth.store";

import {
  loginSchema,
  type LoginFormData,
} from "@/features/auth/schemas/auth.schema";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

const setAuth = useAuthStore((state) => state.setAuth);

const [serverError, setServerError] = useState<string | null>(null);

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
});

const onSubmit = async (values: LoginFormData) => {
  try {
    setServerError(null);

    const response = await authApi.login({
      email: values.email.trim().toLowerCase(),
      password: values.password,
    });

    if (!response.token) {
      throw new Error("Authentication token was not returned");
    }

    setAuth(
      {
        email: response.email,
        role: response.role,
        isPremium: response.isPremium,
      },
      response.token
    );

    router.push("/dashboard");
  } catch (error: unknown) {
    console.error("Login failed:", error);

    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ??
        "Unable to sign in. Please check your credentials.";

      setServerError(message);
      return;
    }

    if (error instanceof Error) {
      setServerError(error.message);
      return;
    }

    setServerError("Unable to sign in. Please try again.");
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
              <p className="font-semibold tracking-tight">
                InterviewForge
              </p>
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
                AI-powered interview preparation
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
                Prepare with purpose.
                <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Interview with confidence.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Practice technical interviews, receive AI-driven feedback,
                analyze performance, and improve with every session.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Feature
                icon={<ShieldCheck className="h-5 w-5" />}
                title="Secure sessions"
                description="JWT-based authentication"
              />

              <Feature
                icon={<BrainCircuit className="h-5 w-5" />}
                title="AI feedback"
                description="Actionable interview insights"
              />
            </div>
          </div>

          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} InterviewForge AI
          </p>
        </section>

        {/* Right section */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-md"
          >
            {/* Mobile logo */}
            <Link
              href="/"
              className="mb-10 flex w-fit items-center gap-3 lg:hidden"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
                <BrainCircuit className="h-5 w-5" />
              </div>

              <span className="font-semibold">
                InterviewForge AI
              </span>
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-violet-400">
                Welcome back
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-slate-400">
                Continue your interview preparation journey.
              </p>
            </div>

            <form
  onSubmit={handleSubmit(onSubmit)}
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
      aria-invalid={Boolean(errors.email)}
      {...register("email")}
      className={`h-12 bg-white/[0.04] pl-10 text-white placeholder:text-slate-600 ${
        errors.email
          ? "border-red-500/60 focus-visible:ring-red-500/20"
          : "border-white/10 focus-visible:border-violet-500 focus-visible:ring-violet-500/20"
      }`}
    />
  </div>

  {errors.email && (
    <p className="text-sm text-red-400">
      {errors.email.message}
    </p>
  )}
</div>
              {/* Password */}
              <div className="space-y-2">
  <div className="flex items-center justify-between">
    <Label htmlFor="password" className="text-slate-200">
      Password
    </Label>

    <button
      type="button"
      className="text-sm text-violet-400 transition hover:text-violet-300"
    >
      Forgot password?
    </button>
  </div>

  <div className="relative">
    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      autoComplete="current-password"
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
      onClick={() => setShowPassword((current) => !current)}
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
    <p className="text-sm text-red-400">
      {errors.password.message}
    </p>
  )}
</div>

              {/* Submit */}
              <Button
  type="submit"
  disabled={isSubmitting}
  className="group h-12 w-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white shadow-lg shadow-violet-500/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
>
  {serverError && (
  <div
    role="alert"
    className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
  >
    {serverError}
  </div>
)}
  {isSubmitting ? (
    <>
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      Signing In...
    </>
  ) : (
    <>
      Sign In
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </>
  )}
</Button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-[0.2em] text-slate-600">
                New here?
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-violet-400 transition hover:text-violet-300"
              >
                Create account
              </Link>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="h-4 w-4" />
              Protected by secure JWT authentication
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <p className="font-medium text-white">
        {title}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>
    </div>
  );
}