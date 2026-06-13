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
    <div className={cn("rounded-xl border border-border bg-card p-4 space-y-3", className)}>
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="size-10 shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="h-3 w-32" />
          <Skeleton variant="text" className="h-2 w-20" />
        </div>
      </div>
      <Skeleton className="h-32 w-full" />
      <Skeleton variant="text" lines={3} />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
