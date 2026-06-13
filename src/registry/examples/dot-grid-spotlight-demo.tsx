"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { DotGridSpotlight } from "@/registry/dot-grid-spotlight";

export default function DotGridSpotlightDemo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <div className={`relative h-48 w-full overflow-hidden rounded-xl border border-border transition-colors duration-300 ${isDark ? "bg-zinc-950 text-white" : "bg-zinc-50 text-zinc-900"}`}>
      <DotGridSpotlight
        dotColor={isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"}
        spotlightColor={isDark ? "rgba(139,92,246,0.9)" : "rgba(124,58,237,0.75)"}
        dotSize={2}
        gap={18}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className={`text-sm font-medium ${isDark ? "text-white/40" : "text-zinc-400"}`}>
          Move your cursor
        </p>
      </div>
    </div>
  );
}
