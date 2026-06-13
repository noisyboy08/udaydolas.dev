"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type GlowingOrbProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  colors?: string[];
  speed?: number;
};

export function GlowingOrb({
  className,
  size = "md",
  colors = ["#6366f1", "#a855f7", "#06b6d4", "#10b981"],
  speed = 4,
}: GlowingOrbProps) {
  const [colorIndex, setColorIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setColorIndex((i) => (i + 1) % colors.length);
    }, speed * 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [colors.length, speed]);

  const sizes = {
    sm: "size-14",
    md: "size-20",
    lg: "size-28",
  };

  const current = colors[colorIndex];
  const next = colors[(colorIndex + 1) % colors.length];

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* outer glow ring */}
      <div
        className={cn(
          "absolute rounded-full opacity-20 blur-2xl transition-all duration-[4000ms] ease-in-out",
          sizes[size]
        )}
        style={{
          background: `radial-gradient(circle, ${current}, transparent 70%)`,
          transform: "scale(2.2)",
        }}
      />
      {/* mid glow */}
      <div
        className={cn(
          "absolute rounded-full opacity-40 blur-lg transition-all duration-[4000ms] ease-in-out",
          sizes[size]
        )}
        style={{
          background: `radial-gradient(circle, ${current}, ${next} 60%, transparent 80%)`,
          transform: "scale(1.5)",
        }}
      />
      {/* core orb */}
      <div
        className={cn(
          "relative rounded-full shadow-2xl transition-all duration-[4000ms] ease-in-out",
          sizes[size]
        )}
        style={{
          background: `radial-gradient(circle at 35% 35%, white 0%, ${current} 40%, ${next} 100%)`,
          boxShadow: `0 0 40px 8px ${current}88`,
        }}
      >
        {/* specular highlight */}
        <div
          className="absolute top-[15%] left-[20%] h-[30%] w-[30%] rounded-full blur-sm"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
          }}
        />
      </div>
    </div>
  );
}
