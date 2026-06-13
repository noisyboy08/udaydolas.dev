"use client";

import { useEffect, useState } from "react";

function InstantFadeIn({
  children,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay + 80);
    return () => clearTimeout(t);
  }, [delay]);

  const transforms: Record<string, string> = {
    up: "translateY(20px)",
    down: "translateY(-20px)",
    left: "translateX(20px)",
    right: "translateX(-20px)",
  };

  return (
    <div
      className="transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[direction],
      }}
    >
      {children}
    </div>
  );
}

export default function ScrollFadeEffectDemo() {
  return (
    <div className="flex w-full flex-col gap-3 py-2">
      {(["up", "down", "left", "right"] as const).map((dir, i) => (
        <InstantFadeIn key={dir} direction={dir} delay={i * 120}>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <div className="size-8 shrink-0 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500" />
            <div>
              <p className="text-sm font-semibold capitalize">Fade from {dir}</p>
              <p className="text-xs text-muted-foreground">Direction: {dir}</p>
            </div>
          </div>
        </InstantFadeIn>
      ))}
    </div>
  );
}
