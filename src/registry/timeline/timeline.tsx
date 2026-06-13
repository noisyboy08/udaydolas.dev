"use client";

import { cn } from "@/lib/utils";

type TimelineItem = {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: "done" | "active" | "pending";
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
  accentColor?: string;
};

export function Timeline({ items, className, accentColor = "#6366f1" }: TimelineProps) {
  const statusColors = {
    done: accentColor,
    active: accentColor,
    pending: "transparent",
  };

  const statusRing = {
    done: "ring-2",
    active: "ring-2 animate-pulse",
    pending: "ring-2 ring-border",
  };

  return (
    <div className={cn("relative space-y-0", className)}>
      {items.map((item, i) => (
        <div key={i} className="relative flex gap-4">
          {/* Line */}
          {i < items.length - 1 && (
            <div
              className="absolute left-4 top-8 w-px flex-none"
              style={{
                height: "calc(100% - 8px)",
                background: item.status === "done" ? accentColor : "var(--color-border)",
                opacity: item.status === "done" ? 0.4 : 0.3,
              }}
            />
          )}

          {/* Dot */}
          <div className="relative z-10 flex-none pt-1">
            <div
              className={cn("flex size-8 items-center justify-center rounded-full", statusRing[item.status ?? "pending"])}
              style={{
                background: statusColors[item.status ?? "pending"],
                ringColor: accentColor,
                borderColor: item.status === "pending" ? undefined : accentColor,
              }}
            >
              {item.icon ?? (
                <span
                  className="size-2.5 rounded-full"
                  style={{ background: item.status === "pending" ? "var(--color-muted-foreground)" : "white", opacity: item.status === "pending" ? 0.4 : 1 }}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="pb-6 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm">{item.title}</p>
              {item.date && (
                <span className="text-xs text-muted-foreground">{item.date}</span>
              )}
            </div>
            {item.description && (
              <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
