"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BrainCircuit,
  FileSearch,
  History,
  LayoutDashboard,
  Map,
  MessageSquareText,
  Settings,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Mock Interview",
    href: "/interview",
    icon: MessageSquareText,
  },
  {
    label: "Interview History",
    href: "/history",
    icon: History,
  },
  {
    label: "Resume AI",
    href: "/resume",
    icon: FileSearch,
  },
  {
    label: "Roadmap",
    href: "/roadmap",
    icon: Map,
  },
];

const accountItems = [
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  onNavigate?: () => void;
}

export function AppSidebar({ onNavigate }: AppSidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="flex h-full w-full flex-col border-r border-white/[0.07] bg-[#070b17]">
      <div className="flex h-20 items-center border-b border-white/[0.07] px-6">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="font-bold tracking-tight text-white">
              InterviewForge
            </p>

            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400">
              AI
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Workspace
        </p>

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                  active
                    ? "bg-violet-500/10 text-violet-300"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                    active
                      ? "bg-violet-500/15 text-violet-400"
                      : "bg-white/[0.03] text-slate-500 group-hover:text-white"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </div>

                <span>{item.label}</span>

                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="my-6 border-t border-white/[0.06]" />

        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Account
        </p>

        <nav className="space-y-1">
          {accountItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                  active
                    ? "bg-violet-500/10 text-violet-300"
                    : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                    active
                      ? "bg-violet-500/15 text-violet-400"
                      : "bg-white/[0.03] text-slate-500 group-hover:text-white"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </div>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/[0.07] p-4">
        <div className="rounded-2xl border border-violet-400/10 bg-gradient-to-br from-violet-500/10 to-blue-500/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <BarChart3 className="h-4 w-4 text-violet-400" />
            Keep improving
          </div>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Every completed interview helps build a clearer picture of your
            progress.
          </p>
        </div>
      </div>
    </aside>
  );
}