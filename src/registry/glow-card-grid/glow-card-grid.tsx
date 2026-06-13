"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type GlowCardGridItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  glowColor?: string;
};

type GlowCardProps = GlowCardGridItem & {
  className?: string;
};

function GlowCard({ title, description, icon, glowColor = "#6366f1", className }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-shadow duration-300",
        hovered && "shadow-lg",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
    >
      {/* Glow layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, ${glowColor}22, transparent 60%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, ${glowColor}55, transparent 60%)`,
          WebkitMaskImage: "linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskImage: "linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          border: "1px solid transparent",
        }}
      />

      {icon && (
        <div className="mb-3 flex size-10 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="mb-1 text-sm font-semibold">{title}</h3>
      <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

type GlowCardGridProps = {
  items: GlowCardGridItem[];
  cols?: 2 | 3;
  className?: string;
};

export function GlowCardGrid({ items, cols = 3, className }: GlowCardGridProps) {
  return (
    <div
      className={cn(
        "grid gap-3",
        cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, i) => (
        <GlowCard key={i} {...item} />
      ))}
    </div>
  );
}
