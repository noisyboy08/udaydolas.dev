"use client";

import { cn } from "@/lib/utils";

type ProgressRingProps = {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: string;
  trackColor?: string;
  showLabel?: boolean;
  label?: string;
  animate?: boolean;
};

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 10,
  className,
  color = "#6366f1",
  trackColor,
  showLabel = true,
  label,
  animate = true,
}: ProgressRingProps) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(100, Math.max(0, value)) / 100) * circ;
  const cx = size / 2;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
    >
      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={trackColor ?? "currentColor"}
          className={!trackColor ? "text-muted" : ""}
        />
        {/* Progress */}
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={
            animate
              ? { transition: "stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)" }
              : undefined
          }
        />
      </svg>
      {showLabel && (
        <div className="absolute flex flex-col items-center">
          <span className="text-xl font-bold tabular-nums">
            {Math.round(value)}%
          </span>
          {label && (
            <span className="text-xs text-muted-foreground">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}
