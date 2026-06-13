"use client";

import { useState } from "react";

import { ThemeToggleEffect } from "@/registry/theme-toggle-effect";

export default function ThemeToggleEffectDemo() {
  const [dark, setDark] = useState(true);

  return (
    <div
      className="flex flex-col items-center gap-4 rounded-xl p-8 transition-colors duration-500"
      style={{ background: dark ? "hsl(240,6%,10%)" : "hsl(48,100%,97%)" }}
    >
      <ThemeToggleEffect defaultDark={dark} onChange={setDark} />
      <p className="text-sm font-medium" style={{ color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}>
        {dark ? "Dark mode active" : "Light mode active"}
      </p>
    </div>
  );
}
