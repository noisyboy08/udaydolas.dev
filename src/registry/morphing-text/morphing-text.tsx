"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type MorphingTextProps = {
  words: string[];
  className?: string;
  interval?: number;
};

// Blends two strings character-by-character for a morphing effect
function morphString(from: string, to: string, progress: number): string {
  const maxLen = Math.max(from.length, to.length);
  const fromPadded = from.padEnd(maxLen, " ");
  const toPadded = to.padEnd(maxLen, " ");

  return Array.from({ length: maxLen }, (_, i) => {
    const threshold = i / maxLen;
    if (progress >= threshold + 0.15) return toPadded[i];
    if (progress < threshold) return fromPadded[i];

    // In transition zone — show a random ASCII character
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
    return chars[Math.floor(Math.random() * chars.length)];
  }).join("");
}

export function MorphingText({
  words,
  className,
  interval = 2500,
}: MorphingTextProps) {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState(words[0] ?? "");
  const [isAnimating, setIsAnimating] = useState(false);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = (current + 1) % words.length;
      setIsAnimating(true);

      const from = words[current];
      const to = words[next];
      const duration = 600;
      const start = performance.now();

      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        setDisplayed(morphString(from, to, progress));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayed(to);
          setIsAnimating(false);
          setCurrent(next);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [current, words, interval]);

  return (
    <span
      className={cn(
        "font-mono tracking-widest tabular-nums transition-all",
        isAnimating && "opacity-80",
        className
      )}
    >
      {displayed}
    </span>
  );
}
