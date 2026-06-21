"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type TestimonialSpotlightProps = {
  quote: string;
  author: string;
  role?: string;
  gradientFrom?: string;
  gradientTo?: string;
  className?: string;
};

export function TestimonialSpotlight({
  quote,
  author,
  role,
  gradientFrom = "#6366f1",
  gradientTo = "#06b6d4",
  className,
}: TestimonialSpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-zinc-900 sm:p-6 dark:border-border dark:bg-zinc-950 dark:text-white",
        className
      )}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, ${gradientFrom}15 0%, transparent 60%)`,
        }}
      />
      {/* Gradient border glow */}
      <div
        className="pointer-events-none absolute inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at ${pos.x}% ${pos.y}%, ${gradientFrom}30, transparent 60%)`,
          WebkitMaskImage: "linear-gradient(#fff,#fff)",
          maskImage: "linear-gradient(#fff,#fff)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative">
        {/* Large quote mark */}
        <div
          className="mb-1.5 text-4xl leading-none font-black opacity-20 dark:opacity-40"
          style={{ color: gradientFrom }}
        >
          &ldquo;
        </div>
        <p className="mb-3 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-300">
          {quote}
        </p>
        <div className="flex items-center gap-3">
          <div
            className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            {author[0]}
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-900 sm:text-sm dark:text-white">
              {author}
            </p>
            {role && (
              <p className="text-[10px] text-zinc-500 sm:text-xs dark:text-zinc-400">
                {role}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
