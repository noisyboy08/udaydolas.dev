"use client";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string | number;
  change?: number;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  className?: string;
  accentColor?: string;
};

export function StatCard({
  label,
  value,
  change,
  suffix,
  prefix,
  icon,
  className,
  accentColor = "#6366f1",
}: StatCardProps) {
  const isPositive = (change ?? 0) >= 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      {/* Subtle top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: accentColor }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {label}
          </p>
          <p className="text-2xl font-bold tracking-tight tabular-nums">
            {prefix}
            {value}
            {suffix}
          </p>
          {change !== undefined && (
            <div
              className={cn(
                "mt-1 flex items-center gap-1 text-xs font-medium",
                isPositive ? "text-emerald-500" : "text-rose-500"
              )}
            >
              {isPositive ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {isPositive ? "+" : ""}
              {change}% vs last period
            </div>
          )}
        </div>
        {icon && (
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-lg"
            style={{ background: `${accentColor}20`, color: accentColor }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
