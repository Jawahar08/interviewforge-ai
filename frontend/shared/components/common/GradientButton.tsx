"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { motion } from "framer-motion";

type MotionButtonProps = ComponentPropsWithoutRef<typeof motion.button>;

interface GradientButtonProps extends MotionButtonProps {
  children: ReactNode;
  icon?: ReactNode;
}

export function GradientButton({
  children,
  icon,
  className = "",
  ...props
}: GradientButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl
        bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600
        px-5 py-3
        font-medium text-white
        shadow-lg shadow-violet-500/20
        transition-shadow duration-300
        hover:shadow-xl hover:shadow-violet-500/30
        disabled:pointer-events-none disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
      {icon}
    </motion.button>
  );
}