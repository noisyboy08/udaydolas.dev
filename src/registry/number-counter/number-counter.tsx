"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type NumberCounterProps = {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  separator?: string;
};

export function NumberCounter({
  from = 0,
  to,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  separator = "",
}: NumberCounterProps) {
  const [value, setValue] = useState(from);
  const [started, setStarted] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const diff = to - from;
    const raf = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setValue(from + diff * ease);
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [started, from, to, duration]);

  const formatted = separator
    ? value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    : value.toFixed(decimals);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

import React from "react";
