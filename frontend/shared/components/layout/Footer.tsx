import Link from "next/link";
import { BrainCircuit } from "lucide-react";

import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#03050f]">
      <Container className="py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600">
              <BrainCircuit className="h-5 w-5 text-white" />
            </div>

            <span className="font-semibold text-white">
              InterviewForge AI
            </span>
          </Link>

          <p className="text-center text-sm text-slate-500">
            AI-powered interview preparation for ambitious developers.
          </p>

          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} InterviewForge AI
          </p>
        </div>
      </Container>
    </footer>
  );
}