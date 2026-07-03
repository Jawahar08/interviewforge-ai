"use client";

import Link from "next/link";
import { BrainCircuit, Menu } from "lucide-react";

import { Container } from "./Container";
import { GradientButton } from "../common/GradientButton";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Resume AI", href: "#resume-ai" },
  { label: "Mock Interview", href: "#mock-interview" },
];

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#050816]/70 backdrop-blur-xl">
      <Container className="flex h-18 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white">
              InterviewForge
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400">
              AI
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Sign In
          </Link>

          <GradientButton className="px-4 py-2 text-sm">
            Get Started
          </GradientButton>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          className="rounded-lg border border-white/10 p-2 text-slate-300 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Container>
    </header>
  );
}