import type { HTMLAttributes, ReactNode } from "react";

interface GlassCardProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GlassCard({
  children,
  className = "",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-2xl
        border border-white/10
        bg-white/[0.04]
        shadow-2xl shadow-black/10
        backdrop-blur-xl
        transition-all duration-300
        hover:border-violet-400/20
        hover:bg-white/[0.06]
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}