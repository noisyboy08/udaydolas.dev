"use client";

import { cn } from "@/lib/utils";

type ScrollFadeEffectProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
};

export function ScrollFadeEffect({
  children,
  className,
  direction = "up",
  delay = 0,
}: ScrollFadeEffectProps) {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: "translateY(32px)",
    down: "translateY(-32px)",
    left: "translateX(32px)",
    right: "translateX(-32px)",
  };

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700 ease-out", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0)" : transforms[direction],
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

import React from "react";
