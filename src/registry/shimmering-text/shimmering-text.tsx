"use client";

import React from "react";

import { cn } from "@/lib/utils";

type ShimmeringTextProps = {
  text: string;
  className?: string;
  shimmerColor?: string;
  baseColor?: string;
  speed?: number; // seconds for one full shimmer cycle
};

export function ShimmeringText({
  text,
  className,
  shimmerColor = "#a855f7",
  baseColor = "#888",
  speed = 2.5,
}: ShimmeringTextProps) {
  return (
    <span
      className={cn("relative inline-block select-none font-bold", className)}
      style={
        {
          color: baseColor,
          backgroundImage: `linear-gradient(120deg, ${baseColor} 40%, ${shimmerColor} 50%, #fff 55%, ${shimmerColor} 60%, ${baseColor} 70%)`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: `shimmering-text-anim ${speed}s linear infinite`,
        } as React.CSSProperties
      }
    >
      {text}
      <style>{`
        @keyframes shimmering-text-anim {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </span>
  );
}
