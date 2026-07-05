"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import { AppSidebar } from "./AppSidebar";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <div className="relative h-full w-[290px] max-w-[85vw] shadow-2xl">
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="absolute right-4 top-5 z-10 rounded-lg border border-white/10 bg-white/[0.05] p-2 text-slate-400 transition hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <AppSidebar onNavigate={onClose} />
      </div>
    </div>
  );
}