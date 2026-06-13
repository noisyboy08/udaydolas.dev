"use client";

import { cn } from "@/lib/utils";

type FluidGradientTextProps = {
  text: string;
  className?: string;
  colors?: string[];
  speed?: number;
};

export function FluidGradientText({
  text,
  className,
  colors = ["#6366f1", "#a855f7", "#ec4899", "#06b6d4", "#10b981"],
  speed = 4,
}: FluidGradientTextProps) {
  const gradient = [...colors, ...colors].join(", ");

  return (
    <span
      className={cn("inline-block font-bold select-none", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradient})`,
        backgroundSize: `${colors.length * 200}% auto`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: `fluid-gradient-move ${speed}s linear infinite`,
      }}
    >
      {text}
      <style>{`
        @keyframes fluid-gradient-move {
          0%   { background-position: 0% center; }
          100% { background-position: ${colors.length * 200}% center; }
        }
      `}</style>
    </span>
  );
}
