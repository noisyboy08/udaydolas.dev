"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TypewriterEffectProps = {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursor?: boolean;
  cursorChar?: string;
};

export function TypewriterEffect({
  words,
  className,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 1800,
  cursor = true,
  cursorChar = "|",
}: TypewriterEffectProps) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const word = words[wordIdx];
    if (phase === "typing") {
      if (displayed.length < word.length) {
        const id = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
        return () => clearTimeout(id);
      } else {
        const id = setTimeout(() => setPhase("pause"), pauseDuration);
        return () => clearTimeout(id);
      }
    }
    if (phase === "pause") {
      setPhase("deleting");
    }
    if (phase === "deleting") {
      if (displayed.length > 0) {
        const id = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
        return () => clearTimeout(id);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={cn("font-mono", className)}>
      {displayed}
      {cursor && (
        <span
          className="ml-0.5 font-sans"
          style={{ opacity: cursorVisible ? 1 : 0 }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}
