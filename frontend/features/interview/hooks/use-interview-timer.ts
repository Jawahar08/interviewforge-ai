"use client";

import { useEffect, useMemo, useState } from "react";

export function useInterviewTimer(durationMinutes: number = 30) {
  const totalSeconds = durationMinutes * 60;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const remainingSeconds = Math.max(
    totalSeconds - elapsedSeconds,
    0
  );

  const minutes = Math.floor(remainingSeconds / 60);

  const seconds = remainingSeconds % 60;

  const formatted = useMemo(() => {
    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }, [minutes, seconds]);

  return {
    formatted,
    minutes,
    seconds,
    elapsedSeconds,
    remainingSeconds,
    isExpired: remainingSeconds === 0,
  };
}