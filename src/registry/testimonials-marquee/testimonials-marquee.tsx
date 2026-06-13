"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type TestimonialsMarqueeItem = {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
};

type TestimonialsMarqueeProps = {
  items: TestimonialsMarqueeItem[];
  speed?: number; // px/s
  pauseOnHover?: boolean;
  className?: string;
  direction?: "left" | "right";
};

function Card({ item }: { item: TestimonialsMarqueeItem }) {
  return (
    <div className="mx-3 flex w-72 shrink-0 flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <p className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 via-sky-400 to-emerald-400 text-xs font-bold text-white">
          {item.author[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{item.author}</p>
          {item.role && (
            <p className="truncate text-xs text-muted-foreground">{item.role}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsMarquee({
  items,
  speed = 40,
  pauseOnHover = true,
  className,
  direction = "left",
}: TestimonialsMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex"
        style={{
          animation: `marquee-scroll ${(doubled.length * 72 * 2) / speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
