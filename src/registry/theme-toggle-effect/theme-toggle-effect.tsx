"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type ThemeToggleEffectProps = {
  className?: string;
  defaultDark?: boolean;
  onChange?: (dark: boolean) => void;
};

export function ThemeToggleEffect({ className, defaultDark = true, onChange }: ThemeToggleEffectProps) {
  const [dark, setDark] = useState(defaultDark);
  const [animating, setAnimating] = useState(false);

  const toggle = () => {
    setAnimating(true);
    setTimeout(() => {
      setDark((d) => {
        const next = !d;
        onChange?.(next);
        return next;
      });
      setAnimating(false);
    }, 300);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "group relative flex size-16 items-center justify-center rounded-full border border-border transition-all duration-500",
        dark ? "bg-zinc-950" : "bg-amber-50",
        className
      )}
      aria-label="Toggle theme"
    >
      {/* Sun */}
      <div
        className={cn(
          "absolute transition-all duration-500",
          dark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" fill="#f59e0b" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const x1 = 12 + 6.5 * Math.cos(a);
            const y1 = 12 + 6.5 * Math.sin(a);
            const x2 = 12 + 9 * Math.cos(a);
            const y2 = 12 + 9 * Math.sin(a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />;
          })}
        </svg>
      </div>

      {/* Moon */}
      <div
        className={cn(
          "absolute transition-all duration-500",
          dark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        )}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="#c4b5fd"
            stroke="#c4b5fd"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Ripple on click */}
      {animating && (
        <span className="absolute inset-0 animate-ping rounded-full border-2 border-current opacity-20" />
      )}
    </button>
  );
}
