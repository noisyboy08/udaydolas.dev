"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

type GithubContributionsProps = {
  className?: string;
  weeks?: number;
  username?: string;
};

function generateData(weeks: number) {
  return Array.from({ length: weeks * 7 }, () =>
    Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 8 + 1)
  );
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GithubContributions({ className, weeks = 26, username = "udaydolas" }: GithubContributionsProps) {
  const data = useMemo(() => generateData(weeks), [weeks]);
  const total = data.reduce((a, b) => a + b, 0);

  const getColor = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count < 3) return "bg-emerald-900/60 dark:bg-emerald-900";
    if (count < 5) return "bg-emerald-700/70 dark:bg-emerald-700";
    if (count < 7) return "bg-emerald-500";
    return "bg-emerald-400";
  };

  const monthLabels = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now);
      d.setMonth(d.getMonth() - (5 - i));
      return MONTHS[d.getMonth()];
    });
  }, []);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex justify-between px-1">
        {monthLabels.map((m) => (
          <span key={m} className="text-xs text-muted-foreground">{m}</span>
        ))}
      </div>
      <div className="grid grid-flow-col gap-0.5" style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
        {data.map((count, i) => (
          <div
            key={i}
            title={`${count} contributions`}
            className={cn("aspect-square rounded-[2px] transition-opacity hover:opacity-70", getColor(count))}
          />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">{total.toLocaleString()}</span> contributions · @{username}
      </p>
    </div>
  );
}

