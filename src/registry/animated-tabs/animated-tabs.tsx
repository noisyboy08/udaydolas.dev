"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type TabsProps = {
  tabs: { label: string; content: React.ReactNode; icon?: React.ReactNode }[];
  className?: string;
  variant?: "pill" | "underline" | "card";
  accentColor?: string;
};

export function AnimatedTabs({ tabs, className, variant = "pill", accentColor = "#6366f1" }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Tab list */}
      <div
        className={cn(
          "flex gap-1",
          variant === "pill" && "rounded-xl bg-muted p-1",
          variant === "underline" && "border-b border-border",
          variant === "card" && "gap-2"
        )}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative flex items-center gap-1.5 text-sm font-medium transition-all duration-200",
              variant === "pill" && "flex-1 justify-center rounded-lg px-3 py-1.5",
              variant === "underline" && "px-3 pb-2.5",
              variant === "card" && "rounded-lg border px-3 py-1.5",
              i !== active && "text-muted-foreground hover:text-foreground",
              i === active && variant === "pill" && "bg-background text-foreground shadow-sm",
              i === active && variant === "card" && "border-border bg-card text-foreground",
            )}
            style={
              i === active && variant === "underline"
                ? { color: accentColor }
                : undefined
            }
          >
            {tab.icon}
            {tab.label}
            {i === active && variant === "underline" && (
              <span
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full"
                style={{ background: accentColor }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        key={active}
        className="animate-in fade-in slide-in-from-bottom-2 duration-200"
      >
        {tabs[active].content}
      </div>
    </div>
  );
}
