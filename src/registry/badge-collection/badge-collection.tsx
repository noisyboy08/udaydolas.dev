"use client";

import { cn } from "@/lib/utils";

type BadgeProps = {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline" | "gradient";
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  className?: string;
};

const variantStyles: Record<string, string> = {
  default: "bg-muted text-muted-foreground",
  success: "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20",
  warning: "bg-amber-500/15 text-amber-500 border border-amber-500/20",
  error: "bg-rose-500/15 text-rose-500 border border-rose-500/20",
  info: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  outline: "border border-border text-foreground",
  gradient: "text-white border-0",
};

const dotColors: Record<string, string> = {
  default: "bg-muted-foreground",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-rose-500",
  info: "bg-blue-400",
  outline: "bg-foreground",
  gradient: "bg-white",
};

export function Badge({ label, variant = "default", size = "md", dot = false, className }: BadgeProps) {
  const sizeClass = { sm: "px-1.5 py-0.5 text-xs", md: "px-2.5 py-0.5 text-xs", lg: "px-3 py-1 text-sm" };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium",
        variantStyles[variant],
        sizeClass[size],
        variant === "gradient" && "bg-gradient-to-r from-violet-600 to-indigo-600",
        className
      )}
    >
      {dot && (
        <span
          className={cn("size-1.5 rounded-full", dotColors[variant], variant === "success" && "animate-pulse")}
        />
      )}
      {label}
    </span>
  );
}

export function BadgeCollection({ className }: { className?: string }) {
  const badges: BadgeProps[] = [
    { label: "Default", variant: "default" },
    { label: "Success", variant: "success", dot: true },
    { label: "Warning", variant: "warning", dot: true },
    { label: "Error", variant: "error", dot: true },
    { label: "Info", variant: "info" },
    { label: "Outline", variant: "outline" },
    { label: "Gradient", variant: "gradient" },
    { label: "Live", variant: "success", dot: true, size: "sm" },
    { label: "Beta", variant: "info", size: "sm" },
    { label: "New", variant: "gradient", size: "sm" },
  ];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {badges.map((b) => (
        <Badge key={b.label + b.variant} {...b} />
      ))}
    </div>
  );
}
