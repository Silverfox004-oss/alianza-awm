"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TimerProps {
  limitSeconds: number;
  elapsedSeconds?: number;
  onExpire?: () => void;
  className?: string;
}

export function Timer({ limitSeconds, elapsedSeconds = 0, onExpire, className }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(limitSeconds - elapsedSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) { onExpire?.(); return; }
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(id); onExpire?.(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []); // intentionally runs once

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isWarning = secondsLeft < 120;
  const isCritical = secondsLeft < 60;

  return (
    <span
      className={cn(
        "font-mono text-sm font-medium tabular-nums",
        isWarning && "text-amber-500",
        isCritical && "text-destructive animate-pulse",
        className
      )}
      aria-live="polite"
      aria-label={`${minutes} minutes and ${seconds} seconds remaining`}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </span>
  );
}
