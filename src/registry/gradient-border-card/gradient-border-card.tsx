"use client";

import { cn } from "@/lib/utils";

type GradientBorderCardProps = {
  children: React.ReactNode;
  className?: string;
  gradientColors?: string[];
  padding?: string;
  animated?: boolean;
};

export function GradientBorderCard({
  children,
  className,
  gradientColors = ["#6366f1", "#a855f7", "#ec4899", "#06b6d4"],
  padding = "p-5",
  animated = true,
}: GradientBorderCardProps) {
  const gradient = gradientColors.join(", ");

  return (
    <div
      className={cn("relative rounded-xl p-px", className)}
      style={{
        background: `linear-gradient(135deg, ${gradient})`,
        backgroundSize: animated ? "200% 200%" : undefined,
        animation: animated
          ? "gradient-border-spin 4s linear infinite"
          : undefined,
      }}
    >
      <div
        className={cn("relative h-full w-full rounded-[11px] bg-card", padding)}
      >
        {children}
      </div>
      <style>{`
        @keyframes gradient-border-spin {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
