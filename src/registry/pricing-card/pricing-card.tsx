"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type PricingPlan = {
  name: string;
  price: number;
  description?: string;
  features: string[];
  cta?: string;
  highlight?: boolean;
  badge?: string;
};

type PricingCardProps = PricingPlan & {
  period?: "mo" | "yr";
  className?: string;
  accentColor?: string;
  onSelect?: (plan: string) => void;
};

export function PricingCard({
  name,
  price,
  description,
  features,
  cta = "Get started",
  highlight = false,
  badge,
  period = "mo",
  className,
  accentColor = "#6366f1",
  onSelect,
}: PricingCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 transition-all duration-300",
        highlight
          ? "border-transparent bg-zinc-950 text-white shadow-2xl"
          : "border-border bg-card",
        hovered && !highlight && "shadow-lg",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        highlight
          ? {
              backgroundImage: "linear-gradient(#09090b, #09090b), linear-gradient(135deg, #6366f1, #a855f7, #06b6d4)",
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "border-box",
              borderColor: "transparent",
              boxShadow: hovered
                ? `0 0 48px ${accentColor}45`
                : `0 0 32px ${accentColor}25`,
              transform: hovered ? "translateY(-4px)" : "none",
            }
          : undefined
      }
    >
      {badge && (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-bold text-white z-10"
          style={{ background: `linear-gradient(90deg, ${accentColor}, #a855f7)` }}
        >
          {badge}
        </span>
      )}

      <p className="mb-1 font-semibold">{name}</p>
      {description && <p className="mb-4 text-xs text-muted-foreground">{description}</p>}

      <div className="mb-6 flex items-end gap-1">
        <span className="text-4xl font-black tabular-nums">${price}</span>
        <span className="mb-1 text-sm text-muted-foreground">/{period}</span>
      </div>

      <ul className="mb-6 flex-1 space-y-2.5">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <CheckIcon
              className="mt-0.5 size-4 shrink-0"
              style={{ color: accentColor }}
            />
            <span className={highlight ? "text-zinc-300" : "text-muted-foreground"}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => onSelect?.(name)}
        className={cn(
          "mt-auto w-full rounded-xl py-2.5 text-sm font-semibold transition-all duration-200",
          highlight
            ? "bg-white text-zinc-900 hover:bg-zinc-100"
            : "border border-border bg-background hover:bg-accent"
        )}
        style={!highlight ? { borderColor: `${accentColor}40` } : undefined}
      >
        {cta}
      </button>
    </div>
  );
}
