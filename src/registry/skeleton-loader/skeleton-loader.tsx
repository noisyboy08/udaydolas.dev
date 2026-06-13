"use client";

import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
  variant?: "text" | "circle" | "rect";
  lines?: number;
};

export function Skeleton({ className, variant = "rect", lines = 1 }: SkeletonProps) {
  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 rounded-full bg-muted animate-pulse",
              i === lines - 1 && "w-3/4"
            )}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className={cn(
        "animate-pulse bg-muted",
        variant === "circle" ? "rounded-full" : "rounded-md",
        variant === "text" ? "h-3" : "h-full",
        className
      )}
    />
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-xl border border-border bg-card p-3 space-y-2.5", className)}>
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="size-8 shrink-0" />
        <div className="flex-1 space-y-1.5">
          <Skeleton variant="text" className="h-3 w-28" />
          <Skeleton variant="text" className="h-2 w-16" />
        </div>
      </div>
      <Skeleton className="h-20 w-full" />
      <Skeleton variant="text" lines={2} />
      <div className="flex gap-2 pt-0.5">
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-7 w-16" />
      </div>
    </div>
  );
}
