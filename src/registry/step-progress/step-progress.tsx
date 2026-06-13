"use client";

import { cn } from "@/lib/utils";

type StepProgressProps = {
  steps: string[];
  current: number;
  className?: string;
  accentColor?: string;
  variant?: "dots" | "bars" | "numbered";
};

export function StepProgress({
  steps,
  current,
  className,
  accentColor = "#6366f1",
  variant = "numbered",
}: StepProgressProps) {
  if (variant === "bars") {
    return (
      <div className={cn("flex gap-1.5", className)}>
        {steps.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: i < current ? "100%" : i === current ? "60%" : "0%",
                background: accentColor,
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {steps.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i <= current ? accentColor : "var(--color-muted)",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                i < current && "text-white",
                i === current && "text-white ring-4",
                i > current && "border border-border bg-muted text-muted-foreground"
              )}
              style={
                i <= current
                  ? { background: accentColor, ringColor: `${accentColor}40` }
                  : undefined
              }
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span className="mt-1 max-w-16 text-center text-xs text-muted-foreground">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div
              className="mx-1 mb-5 h-px flex-1 transition-all duration-500"
              style={{ background: i < current ? accentColor : "var(--color-border)" }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

import React from "react";
