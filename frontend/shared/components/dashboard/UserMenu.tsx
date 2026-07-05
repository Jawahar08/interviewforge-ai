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

interface StoredUser {
  email?: string;
  role?: string;
  name?: string;
  fullName?: string;
}

function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const possibleKeys = [
    "user",
    "auth-user",
    "authUser",
  ];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);

    if (!value) {
      continue;
    }

    try {
      return JSON.parse(value) as StoredUser;
    } catch {
      // Ignore malformed storage values.
    }
  }

  return null;
}

export function UserMenu() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
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
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth-user");
    localStorage.removeItem("authUser");

    setOpen(false);

    router.replace("/auth/login");
    router.refresh();
  };

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "InterviewForge User";

  const email = user?.email || "Signed in";

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
          <p className="max-w-36 truncate text-sm font-medium text-white">
            {displayName}
          </p>

          <p className="max-w-36 truncate text-xs text-slate-500">
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