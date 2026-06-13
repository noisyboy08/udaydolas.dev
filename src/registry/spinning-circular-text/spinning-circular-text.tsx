"use client";

import { cn } from "@/lib/utils";

type SpinningCircularTextProps = {
  text: string;
  className?: string;
  radius?: number; // px
  fontSize?: number;
  duration?: number; // seconds
  color?: string;
};

export function SpinningCircularText({
  text,
  className,
  radius = 70,
  fontSize = 12,
  duration = 10,
  color = "currentColor",
}: SpinningCircularTextProps) {
  const chars = text.split("");
  const angleStep = 360 / chars.length;
  const size = radius * 2 + fontSize * 2;

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ animation: `spinning-circular-text-spin ${duration}s linear infinite` }}
      >
        {chars.map((char, i) => {
          const angle = i * angleStep - 90;
          const rad = (angle * Math.PI) / 180;
          const cx = size / 2;
          const cy = size / 2;
          const x = cx + radius * Math.cos(rad);
          const y = cy + radius * Math.sin(rad);

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={fontSize}
              fill={color}
              fontWeight="600"
              letterSpacing="0"
              transform={`rotate(${angle + 90}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}
      </svg>
      <style>{`
        @keyframes spinning-circular-text-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
