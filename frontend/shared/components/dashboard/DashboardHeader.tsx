"use client";

import { Bell, Menu, Search, Globe } from "lucide-react";
import { UserMenu } from "./UserMenu";
import { CURRENCIES, useAppStore } from "@/shared/store/app.store";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  const currency = useAppStore((state) => state.currency);
  const setCurrency = useAppStore((state) => state.setCurrency);

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
        {/* Currency Selector */}
        <div className="relative">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="appearance-none rounded-xl border border-white/[0.07] bg-white/[0.025] pl-8 pr-7 py-2.5 text-xs font-semibold text-slate-300 outline-none transition hover:bg-white/[0.05] hover:text-white focus:border-violet-500/50 cursor-pointer"
          >
            {Object.values(CURRENCIES).map((c) => (
              <option key={c.code} value={c.code} className="bg-[#0c1120] text-white">
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
          <Globe className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
          <span className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500 text-[10px] font-bold">▾</span>
        </div>

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