"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";

import { useAuthStore } from "@/shared/store/auth.store";

export function UserMenu() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setTimeout(() => setHasHydrated(true), 0);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);

    router.replace("/auth/login");
    router.refresh();
  };

  const displayName = hasHydrated
    ? user?.email?.split("@")[0] || "InterviewForge User"
    : "InterviewForge User";

  const email = hasHydrated
    ? user?.email || "Signed in"
    : "Signed in";

  const role = hasHydrated
    ? user?.role || "USER"
    : "USER";

  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-2 py-2 transition hover:bg-white/[0.05]"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-xs font-bold text-white">
          {initials}
        </div>

        <div className="hidden min-w-0 text-left sm:block">
          <p className="max-w-40 truncate text-sm font-medium text-white">
            {displayName}
          </p>

          <p className="max-w-40 truncate text-xs text-slate-500">
            {email}
          </p>
        </div>

        <ChevronDown
          className={`hidden h-4 w-4 text-slate-500 transition-transform sm:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1120] p-2 shadow-2xl shadow-black/40">
          <div className="border-b border-white/[0.07] px-3 py-3">
            <p className="truncate text-sm font-semibold text-white">
              {displayName}
            </p>

            <p className="mt-1 truncate text-xs text-slate-500">
              {email}
            </p>

            <span className="mt-2 inline-flex rounded-full border border-violet-400/15 bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
              {role}
            </span>
          </div>

          <div className="py-2">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              <UserRound className="h-4 w-4" />
              Profile
            </Link>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>

          <div className="border-t border-white/[0.07] pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}