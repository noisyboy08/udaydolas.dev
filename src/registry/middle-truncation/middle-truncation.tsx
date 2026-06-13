"use client";

import { cn } from "@/lib/utils";

type MiddleTruncationProps = {
  text: string;
  maxLength?: number;
  className?: string;
  separator?: string;
};

export function MiddleTruncation({ text, maxLength = 32, className, separator = "..." }: MiddleTruncationProps) {
  if (text.length <= maxLength) {
    return <span className={className}>{text}</span>;
  }
  const half = Math.floor((maxLength - separator.length) / 2);
  const start = text.slice(0, half);
  const end = text.slice(text.length - (maxLength - half - separator.length));

  return (
    <span className={cn("inline-block font-mono", className)} title={text}>
      {start}
      <span className="text-muted-foreground">{separator}</span>
      {end}
    </span>
  );
}

export function MiddleTruncationDemo() {
  const examples = [
    "/Users/uday/Documents/Projects/portfolio-website/src/components/button.tsx",
    "FY2026_Q1_Consolidated_Financial_Report_Final_v3.pdf",
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "https://www.example.com/very/long/path/to/a/resource/that/is/truncated",
  ];

  return (
    <div className="w-full max-w-sm space-y-3 rounded-xl border border-border bg-card p-4">
      {examples.map((ex) => (
        <div key={ex} className="text-sm">
          <MiddleTruncation text={ex} maxLength={36} className="text-xs" />
        </div>
      ))}
    </div>
  );
}
