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
    up: "translateY(12px)",
    down: "translateY(-12px)",
    left: "translateX(12px)",
    right: "translateX(-12px)",
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
    <div className="flex w-full flex-col gap-2 py-0.5">
      {(["up", "down", "left", "right"] as const).map((dir, i) => (
        <InstantFadeIn key={dir} direction={dir} delay={i * 120}>
          <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card p-2">
            <div className="size-7 shrink-0 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500" />
            <div>
              <p className="text-xs font-semibold capitalize">
                Fade From {dir}
              </p>
              <p className="text-[10px] text-muted-foreground">
                Scroll to trigger this animation
              </p>
            </div>
          </div>
        </InstantFadeIn>
      ))}
    </div>
  );
}
