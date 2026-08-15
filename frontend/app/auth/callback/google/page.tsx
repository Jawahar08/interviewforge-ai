"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/shared/store/auth.store";

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function processAuth() {
      try {
        let idToken: string | null = null;
        let accessToken: string | null = null;

        // 1. Check URL Hash (e.g. #id_token=...&access_token=...)
        if (typeof window !== "undefined" && window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          idToken = hashParams.get("id_token");
          accessToken = hashParams.get("access_token");
        }

        // 2. Check query params (e.g. ?code=... or ?credential=...)
        if (!idToken && !accessToken) {
          idToken = searchParams.get("credential") || searchParams.get("id_token") || searchParams.get("token");
          accessToken = searchParams.get("access_token") || searchParams.get("code");
        }

        const token = idToken || accessToken;

        if (!token) {
          const error = searchParams.get("error") || "No authentication token was received from Google.";
          throw new Error(error);
        }

        // Send to backend
        const authResponse = await authApi.googleLogin({ token });

        if (!authResponse?.token) {
          throw new Error("Authentication failed: No token returned from server.");
        }

        setAuth(
          {
            email: authResponse.email,
            role: authResponse.role,
            isPremium: authResponse.isPremium,
          },
          authResponse.token
        );

        setStatus("success");

        // If this is a popup, notify parent and close
        if (window.opener && window.opener !== window) {
          try {
            window.opener.postMessage(
              {
                type: "GOOGLE_AUTH_SUCCESS",
                data: authResponse,
              },
              window.location.origin
            );
            setTimeout(() => {
              window.close();
            }, 500);
            return;
          } catch {
            // If postMessage fails, proceed to redirect
          }
        }

        // Redirect to dashboard
        setTimeout(() => {
          router.replace("/dashboard");
        }, 600);
      } catch (err: unknown) {
        console.error("Google authentication error:", err);
        setStatus("error");
        const msg = err instanceof Error ? err.message : "Google sign-in failed. Please try again.";
        setErrorMessage(msg);

        if (window.opener && window.opener !== window) {
          try {
            window.opener.postMessage(
              {
                type: "GOOGLE_AUTH_ERROR",
                message: msg,
              },
              window.location.origin
            );
          } catch {}
        }
      }
    }

    processAuth();
  }, [router, searchParams, setAuth]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-xl">
        {status === "loading" && (
          <div className="flex flex-col items-center space-y-4">
            <LoaderCircle className="h-10 w-10 animate-spin text-violet-400" />
            <h2 className="text-xl font-semibold text-white">Authenticating with Google...</h2>
            <p className="text-sm text-slate-400">Please wait while we complete your sign-in.</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center space-y-4">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            <h2 className="text-xl font-semibold text-white">Authentication Successful!</h2>
            <p className="text-sm text-slate-400">Redirecting to your dashboard...</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
            <h2 className="text-xl font-semibold text-white">Authentication Failed</h2>
            <p className="text-sm text-red-300">{errorMessage}</p>
            <button
              onClick={() => router.replace("/auth/login")}
              className="mt-4 rounded-xl bg-violet-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-white">
          <LoaderCircle className="h-10 w-10 animate-spin text-violet-400" />
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}
