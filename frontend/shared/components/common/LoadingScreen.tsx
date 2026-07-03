"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050816]">
      <div className="flex flex-col items-center gap-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            h-12 w-12
            rounded-full
            border-2 border-white/10
            border-t-violet-500
          "
        />

        <motion.p
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
          }}
          className="text-sm font-medium tracking-wide text-slate-400"
        >
          Preparing InterviewForge AI...
        </motion.p>
      </div>
    </div>
  );
}