"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { META_THEME_COLORS } from "@/config/site";
import { useClickSound } from "@/hooks/use-click-sound";
import { useMetaColor } from "@/hooks/use-meta-color";
import { ThemeToggleEffect } from "@/registry/theme-toggle-effect";

export default function ThemeToggleEffectDemo() {
  const { resolvedTheme, setTheme } = useTheme();
  const { setMetaColor } = useMetaColor();
  const playClick = useClickSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-zinc-950 transition-colors duration-500">
        <ThemeToggleEffect defaultDark={true} />
        <p className="text-xs font-medium text-white/60">
          Dark mode active
        </p>
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleChange = (dark: boolean) => {
    playClick();
    const nextTheme = dark ? "dark" : "light";
    setTheme(nextTheme);
    setMetaColor(
      nextTheme === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light
    );
  };

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2 transition-colors duration-500"
      style={{ background: isDark ? "hsl(240,6%,10%)" : "hsl(48,100%,97%)" }}
    >
      <ThemeToggleEffect defaultDark={isDark} onChange={handleChange} />
      <p className="text-xs font-medium" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}>
        {isDark ? "Dark mode active" : "Light mode active"}
      </p>
    </div>
  );
}
