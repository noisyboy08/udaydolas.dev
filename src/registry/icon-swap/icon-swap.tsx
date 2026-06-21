"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type IconSwapProps = {
  iconA: React.ReactNode;
  iconB: React.ReactNode;
  label?: string;
  className?: string;
  direction?: "fade" | "flip" | "slide";
};

export function IconSwap({
  iconA,
  iconB,
  label,
  className,
  direction = "flip",
}: IconSwapProps) {
  const [swapped, setSwapped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSwapped((s) => !s)}
      className={cn(
        "group inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium",
        "transition-all hover:border-foreground/20 hover:bg-accent",
        className
      )}
      aria-label={label ?? "Toggle icon"}
    >
      <div
        className="relative flex size-5 items-center justify-center overflow-hidden"
        style={{ perspective: 300 }}
      >
        {/* Icon A */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={
            direction === "flip"
              ? {
                  transform: swapped ? "rotateY(90deg)" : "rotateY(0deg)",
                  opacity: swapped ? 0 : 1,
                }
              : direction === "slide"
                ? {
                    transform: swapped ? "translateY(-100%)" : "translateY(0)",
                    opacity: swapped ? 0 : 1,
                  }
                : { opacity: swapped ? 0 : 1 }
          }
        >
          {iconA}
        </div>
        {/* Icon B */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={
            direction === "flip"
              ? {
                  transform: swapped ? "rotateY(0deg)" : "rotateY(-90deg)",
                  opacity: swapped ? 1 : 0,
                }
              : direction === "slide"
                ? {
                    transform: swapped ? "translateY(0)" : "translateY(100%)",
                    opacity: swapped ? 1 : 0,
                  }
                : { opacity: swapped ? 1 : 0 }
          }
        >
          {iconB}
        </div>
      </div>
      {label && <span>{label}</span>}
    </button>
  );
}
