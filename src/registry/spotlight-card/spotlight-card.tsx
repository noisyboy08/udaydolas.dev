"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
};

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(139, 92, 246, 0.15)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const spot = spotRef.current;
    if (!card || !spot) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spot.style.opacity = "1";
    spot.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${spotlightColor}, transparent 60%)`;
  };

  const handleMouseLeave = () => {
    const spot = spotRef.current;
    if (spot) spot.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-6 transition-all duration-300 hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/20",
        className
      )}
    >
      {/* spotlight overlay */}
      <div
        ref={spotRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
      />
      {/* content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
