"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { useAuthStore } from "@/shared/store/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const [hasHydrated, setHasHydrated] = useState(false);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const token = useAuthStore(
    (state) => state.token
  );

  useEffect(() => {
    const unsubscribe =
      useAuthStore.persist.onFinishHydration(() => {
        setHasHydrated(true);
      });

    if (useAuthStore.persist.hasHydrated()) {
      setTimeout(() => setHasHydrated(true), 0);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated || !token) {
      router.replace("/auth/login");
    }
  }, [
    hasHydrated,
    isAuthenticated,
    token,
    router,
  ]);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816]">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="h-8 w-8 animate-spin text-violet-400" />

          <p className="text-sm text-slate-500">
            Restoring your session...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816]">
        <LoaderCircle className="h-8 w-8 animate-spin text-violet-400" />
      </div>
    );
  }

  return <>{children}</>;
}