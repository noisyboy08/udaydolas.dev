"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TextFlipProps = {
  words: string[];
  className?: string;
  interval?: number;
  accentColor?: string;
};

export function TextFlip({
  words,
  className,
  interval = 2000,
  accentColor = "#6366f1",
}: TextFlipProps) {
  const [index, setIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFlipping(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setFlipping(false);
      }, 300);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="inline-block min-w-28 text-center font-bold transition-all duration-300"
        style={{
          color: accentColor,
          transform: flipping ? "rotateX(90deg)" : "rotateX(0deg)",
          opacity: flipping ? 0 : 1,
          perspective: "400px",
          display: "inline-block",
        }}
      >
        {words[index]}
      </span>
    </span>
  );
}
