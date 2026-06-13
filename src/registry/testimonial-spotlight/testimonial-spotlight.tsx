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
        "group relative overflow-hidden rounded-2xl border border-border bg-zinc-950 p-8 text-white",
        className
      )}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}% ${pos.y}%, ${gradientFrom}22 0%, transparent 60%)`,
        }}
      />
      {/* Gradient border glow */}
      <div
        className="pointer-events-none absolute inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at ${pos.x}% ${pos.y}%, ${gradientFrom}40, transparent 60%)`,
          WebkitMaskImage: "linear-gradient(#fff,#fff)",
          maskImage: "linear-gradient(#fff,#fff)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative">
        {/* Large quote mark */}
        <div
          className="mb-4 text-6xl font-black leading-none"
          style={{ color: gradientFrom, opacity: 0.4 }}
        >
          &ldquo;
        </div>
        <p className="mb-6 text-lg leading-relaxed text-zinc-300">{quote}</p>
        <div className="flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }}
          >
            {author[0]}
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            {role && <p className="text-sm text-zinc-400">{role}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
