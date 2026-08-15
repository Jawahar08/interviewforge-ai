"use client";

import { useEffect, useState } from "react";
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

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (notification?: (notification: unknown) => void) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: string;
              theme?: string;
              size?: string;
              text?: string;
              shape?: string;
              width?: string | number;
            }
          ) => void;
        };
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (tokenResponse: { access_token?: string; error?: string }) => void;
          }) => {
            requestAccessToken: () => void;
          };
        };
      };
    };
  }
}

export function GoogleAuthButton({
  mode = "login",
  onError,
  className = "",
}: GoogleAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  useEffect(() => {
    // Load Google Identity Services script if not already present
    if (typeof window === "undefined") return;

    if (!document.getElementById("google-gsi-script")) {
      const script = document.createElement("script");
      script.id = "google-gsi-script";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleGoogleSuccess = async (credential: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.googleLogin({ token: credential });

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
      console.error("Google authentication failed:", error);
      let message = "Google authentication failed. Please try again.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message ?? message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (!googleClientId) {
      // If client ID is not configured yet, notify or simulate dev fallback
      const promptEmail = prompt(
        "Google Client ID is not configured in NEXT_PUBLIC_GOOGLE_CLIENT_ID.\n\nEnter your Google email to test Google Sign-In:"
      );
      if (!promptEmail) return;

      setIsLoading(true);
      authApi
        .googleLogin({
          email: promptEmail.trim().toLowerCase(),
          name: promptEmail.split("@")[0],
          token: "mock-google-token-" + Date.now(),
        })
        .then((response) => {
          setAuth(
            {
              email: response.email,
              role: response.role,
              isPremium: response.isPremium,
            },
            response.token
          );
          router.push("/dashboard");
        })
        .catch((err) => {
          console.error("Google dev sign-in error:", err);
          onError?.(err?.response?.data?.message || "Google authentication failed.");
        })
        .finally(() => setIsLoading(false));
      return;
    }

    if (window.google?.accounts?.id) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (res) => {
          if (res?.credential) {
            handleGoogleSuccess(res.credential);
          }
        },
      });

      window.google.accounts.id.prompt((notification: unknown) => {
        console.log("Google GIS prompt notification:", notification);
      });
    } else {
      onError?.("Google authentication service is loading. Please try again in a moment.");
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
