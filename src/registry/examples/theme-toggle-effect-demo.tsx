"use client";

import { useState } from "react";

import { ThemeToggleEffect } from "@/registry/theme-toggle-effect";

export default function ThemeToggleEffectDemo() {
  const [dark, setDark] = useState(true);

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2 transition-colors duration-500"
      style={{ background: dark ? "hsl(240,6%,10%)" : "hsl(48,100%,97%)" }}
    >
      <ThemeToggleEffect defaultDark={dark} onChange={setDark} />
      <p className="text-xs font-medium" style={{ color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}>
        {dark ? "Dark mode active" : "Light mode active"}
      </p>
    </div>
  );
}
