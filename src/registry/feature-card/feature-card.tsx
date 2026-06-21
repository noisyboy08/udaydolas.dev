"use client";

import { cn } from "@/lib/utils";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  accentColor?: string;
  href?: string;
};

export function FeatureCard({
  title,
  description,
  icon,
  className,
  accentColor = "#6366f1",
  href,
}: FeatureCardProps) {
  const Tag = href ? "a" : "div";

  return (
    <Tag
      href={href}
      className={cn(
        "group relative flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-300",
        "hover:shadow-md",
        href && "cursor-pointer hover:border-foreground/20",
        className
      )}
    >
      {/* Icon bubble */}
      <div
        className="flex size-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${accentColor}18`, color: accentColor }}
      >
        {icon}
      </div>

      <div>
        <p className="mb-1 font-semibold">{title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {href && (
        <div
          className="mt-auto flex items-center gap-1 text-xs font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ color: accentColor }}
        >
          Learn more →
        </div>
      )}

      {/* Hover shimmer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px at 50% 0%, ${accentColor}0a, transparent 70%)`,
        }}
      />
    </Tag>
  );
}
