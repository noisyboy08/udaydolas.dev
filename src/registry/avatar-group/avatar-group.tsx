"use client";

import { cn } from "@/lib/utils";

type AvatarGroupProps = {
  avatars: { name: string; color?: string; image?: string }[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const COLORS = [
  "from-violet-500 to-indigo-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-pink-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-fuchsia-500 to-purple-500",
];

export function AvatarGroup({ avatars, max = 5, size = "md", className }: AvatarGroupProps) {
  const shown = avatars.slice(0, max);
  const rest = avatars.length - max;

  const sizes = {
    sm: "size-7 text-xs ring-1",
    md: "size-10 text-sm ring-2",
    lg: "size-14 text-base ring-2",
  };

  const overlap = { sm: "-ml-2", md: "-ml-3", lg: "-ml-4" };

  return (
    <div className={cn("flex items-center", className)}>
      {shown.map((a, i) => (
        <div
          key={i}
          title={a.name}
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-full ring-background",
            "bg-gradient-to-br font-bold text-white",
            sizes[size],
            COLORS[i % COLORS.length],
            i > 0 && overlap[size]
          )}
          style={{ zIndex: shown.length - i }}
        >
          {a.name[0].toUpperCase()}
        </div>
      ))}
      {rest > 0 && (
        <div
          className={cn(
            "relative flex shrink-0 items-center justify-center rounded-full bg-muted font-semibold text-muted-foreground ring-background",
            sizes[size],
            overlap[size]
          )}
        >
          +{rest}
        </div>
      )}
    </div>
  );
}
