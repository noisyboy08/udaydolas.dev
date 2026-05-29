"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type NeonClockProps = {
  className?: string;
  color?: "purple" | "cyan" | "green" | "pink";
};

const COLOR_MAP = {
  purple: {
    glow: "#a855f7",
    text: "text-purple-400",
    shadow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]",
    colon: "text-purple-500",
  },
  cyan: {
    glow: "#06b6d4",
    text: "text-cyan-400",
    shadow: "drop-shadow-[0_0_8px_rgba(6,182,212,0.9)]",
    colon: "text-cyan-500",
  },
  green: {
    glow: "#10b981",
    text: "text-emerald-400",
    shadow: "drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]",
    colon: "text-emerald-500",
  },
  pink: {
    glow: "#ec4899",
    text: "text-pink-400",
    shadow: "drop-shadow-[0_0_8px_rgba(236,72,153,0.9)]",
    colon: "text-pink-500",
  },
};

export function NeonClock({ className, color = "purple" }: NeonClockProps) {
  const [time, setTime] = useState<Date | null>(null);
  const [colonVisible, setColonVisible] = useState(true);

  useEffect(() => {
    setTime(new Date());

    const tick = setInterval(() => {
      setTime(new Date());
      setColonVisible((v) => !v);
    }, 500);

    return () => clearInterval(tick);
  }, []);

  const c = COLOR_MAP[color];

  if (!time) {
    return <div className={cn("h-16 w-36", className)} />;
  }

  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      {/* main time */}
      <div
        className={cn(
          "flex items-center gap-1 font-mono text-5xl font-bold tabular-nums tracking-tight",
          c.text,
          c.shadow
        )}
      >
        <span>{hours}</span>
        <span
          className={cn(
            "transition-opacity duration-100",
            colonVisible ? "opacity-100" : "opacity-20",
            c.colon
          )}
        >
          :
        </span>
        <span>{minutes}</span>
      </div>

      {/* seconds + ampm */}
      <div
        className={cn(
          "flex items-center gap-2 font-mono text-sm tabular-nums opacity-60",
          c.text
        )}
      >
        <span>{seconds}s</span>
        <span>·</span>
        <span>{ampm}</span>
      </div>
    </div>
  );
}
