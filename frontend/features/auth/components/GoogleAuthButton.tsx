"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { authApi } from "@/features/auth/api/auth.api";
import { useAuthStore } from "@/shared/store/auth.store";
import axios from "axios";

interface GoogleAuthButtonProps {
  mode?: "login" | "register";
  onError?: (errorMessage: string) => void;
  className?: string;
}

export function GoogleAuthButton({
  mode = "login",
  onError,
  className = "",
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const googleClientId =
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "1023733054817-fhk7mshvskjlnks2o25j1a6lsq9d3r2j.apps.googleusercontent.com";

  const handleAuthSuccess = useCallback(
    (authData: { email: string; role: string; isPremium?: boolean; token: string }) => {
      setAuth(
        {
          email: authData.email,
          role: authData.role,
          isPremium: authData.isPremium,
        },
        authData.token
      );
      router.push("/dashboard");
    },
    [router, setAuth]
  );

  useEffect(() => {
    // Listen for OAuth message from callback popup window
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "GOOGLE_AUTH_SUCCESS" && event.data?.data) {
        setIsLoading(false);
        handleAuthSuccess(event.data.data);
      } else if (event.data?.type === "GOOGLE_AUTH_ERROR") {
        setIsLoading(false);
        onError?.(event.data.message || "Google authentication failed.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleAuthSuccess, onError]);

  const handleClick = () => {
    try {
      setIsLoading(true);

      const redirectUri = `${window.location.origin}/auth/callback/google`;
      const scope = encodeURIComponent("openid email profile");
      const nonce = Math.random().toString(36).substring(2);
      const state = Math.random().toString(36).substring(2);

      // Google OAuth 2.0 Authorization Endpoint
      const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
        googleClientId
      )}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=token%20id_token&scope=${scope}&nonce=${nonce}&state=${state}&prompt=select_account`;

      // Open Google Login in a centered popup window
      const width = 520;
      const height = 650;
      const left = window.screenX + Math.max(0, (window.outerWidth - width) / 2);
      const top = window.screenY + Math.max(0, (window.outerHeight - height) / 2);

      const popup = window.open(
        googleOAuthUrl,
        "google_oauth_popup",
        `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=no`
      );

      if (!popup || popup.closed || typeof popup.closed === "undefined") {
        // If popup was blocked by browser, redirect the whole page to Google OAuth
        window.location.href = googleOAuthUrl;
        return;
      }

      // Check periodically if popup was closed by user
      const popupCheckInterval = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupCheckInterval);
          setIsLoading(false);
        }
      }, 1000);
    } catch (err: unknown) {
      console.error("Error opening Google Auth:", err);
      setIsLoading(false);
      onError?.("Unable to launch Google authentication.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`relative flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-slate-200 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <LoaderCircle className="h-5 w-5 animate-spin text-violet-400" />
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      )}
      <span>{mode === "login" ? "Continue with Google" : "Sign up with Google"}</span>
    </button>
  );
}
