"use client";

import { Bell, Menu, Search } from "lucide-react";

import { UserMenu } from "./UserMenu";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-20 items-center border-b border-white/[0.07] bg-[#050816]/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        aria-label="Open navigation"
        onClick={onMenuClick}
        className="mr-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-2.5 text-slate-400 transition hover:text-white lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden max-w-md flex-1 md:block">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />

          <input
            type="search"
            placeholder="Search InterviewForge..."
            className="h-11 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400/30 focus:bg-white/[0.04]"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl border border-white/[0.07] bg-white/[0.025] p-2.5 text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-[#050816] bg-violet-400" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}