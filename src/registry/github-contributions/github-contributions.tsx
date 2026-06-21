"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type GithubContributionsProps = {
  className?: string;
  username?: string;
  initialYear?: number;
};

// Generates a mock dataset of 53 weeks * 7 days = 371 days
// Each day has a contribution count/level (0 to 4)
function generateYearlyData(seed: number) {
  // Simple LCG pseudo-random number generator for reproducible mock data
  let lcg = seed;
  const nextRand = () => {
    lcg = (lcg * 1664525 + 1013904223) % 4294967296;
    return lcg / 4294967296;
  };

  return Array.from({ length: 53 * 7 }, () => {
    const r = nextRand();
    if (r < 0.6) return 0; // Level 0 (no contribution)
    if (r < 0.8) return 1; // Level 1
    if (r < 0.9) return 2; // Level 2
    if (r < 0.97) return 3; // Level 3
    return 4; // Level 4
  });
}

const MONTHS_ORDER = [
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
];

export function GithubContributions({
  className,
  username = "noisyboy08",
  initialYear = 2026,
}: GithubContributionsProps) {
  const [selectedYear, setSelectedYear] = useState(initialYear);

  // Generate data based on selectedYear
  const data = useMemo(() => generateYearlyData(selectedYear), [selectedYear]);

  const totalContributions = useMemo(() => {
    // Generate a consistent but realistic total for each year
    return Math.floor(
      180 + (selectedYear % 100) * 12 + data.filter((x) => x > 0).length * 1.5
    );
  }, [selectedYear, data]);

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-[#ebedf0] dark:bg-[#161b22] border border-[#1b1f23]/6 dark:border-white/5";
      case 1:
        return "bg-[#9be9a8] dark:bg-[#0e4429]";
      case 2:
        return "bg-[#40c463] dark:bg-[#006d32]";
      case 3:
        return "bg-[#30a14e] dark:bg-[#26a641]";
      case 4:
        return "bg-[#216e39] dark:bg-[#39d353]";
      default:
        return "bg-[#ebedf0] dark:bg-[#161b22]";
    }
  };

  return (
    <div
      className={cn(
        "w-full font-sans text-zinc-900 selection:bg-emerald-500/30 dark:text-foreground",
        className
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        {/* Main Content Area: Graph Card */}
        <div className="min-w-0 flex-1">
          {/* Header row containing contributions count & dropdown */}
          <div className="mb-2 flex items-center justify-between px-1">
            <h3 className="text-zinc-850 text-sm font-normal dark:text-zinc-100">
              <span className="font-semibold">
                {totalContributions} contributions
              </span>{" "}
              in the last year
            </h3>
            <button className="flex items-center gap-1.5 text-xs text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200">
              Contribution settings
              <span className="text-zinc-450 text-[9px] dark:text-zinc-500">
                ▼
              </span>
            </button>
          </div>

          {/* Graph Outer Card */}
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-[#0d1117]">
            {/* The scrollable graph container */}
            <div className="scrollbar-thin scrollbar-thumb-zinc-350 dark:scrollbar-thumb-zinc-700 overflow-x-auto pb-2">
              <div className="flex min-w-[620px] flex-col">
                {/* Month labels */}
                <div className="mb-1 flex pl-7 text-[10px] text-zinc-500 select-none dark:text-zinc-400">
                  {MONTHS_ORDER.map((month, i) => (
                    <span
                      key={month}
                      className="inline-block"
                      style={{
                        width: i === 0 ? "44px" : "48px",
                      }}
                    >
                      {month}
                    </span>
                  ))}
                </div>

                {/* Day labels and grid side-by-side */}
                <div className="flex gap-2">
                  {/* Days labels */}
                  <div className="flex h-[78px] w-5 flex-col justify-between py-1.5 text-[9px] leading-none text-zinc-500 select-none dark:text-zinc-400">
                    <span className="h-2.5"></span>
                    <span className="h-2.5">Mon</span>
                    <span className="h-2.5"></span>
                    <span className="h-2.5">Wed</span>
                    <span className="h-2.5"></span>
                    <span className="h-2.5">Fri</span>
                    <span className="h-2.5"></span>
                  </div>

                  {/* Contributions grid (53 columns * 7 rows) */}
                  <div
                    className="grid flex-1 grid-flow-col gap-[3px]"
                    style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
                  >
                    {data.map((level, i) => (
                      <div
                        key={i}
                        className={cn(
                          "size-[9px] rounded-[1.5px] transition-all hover:z-10 hover:scale-125",
                          getColor(level)
                        )}
                        title={`Level ${level} contributions`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Row of Graph Card */}
            <div className="mt-3 flex flex-wrap items-center justify-between border-t border-zinc-200 pt-2 text-[11px] text-zinc-500 dark:border-t-zinc-800/60 dark:text-zinc-400">
              <a
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#0969da] dark:hover:text-emerald-400"
              >
                Learn how we count contributions
              </a>
              <div className="flex items-center gap-1.5 select-none">
                <span>Less</span>
                <span className="size-[9px] rounded-[1px] border border-[#1b1f23]/6 bg-[#ebedf0] dark:border-white/5 dark:bg-[#161b22]" />
                <span className="size-[9px] rounded-[1px] bg-[#9be9a8] dark:bg-[#0e4429]" />
                <span className="size-[9px] rounded-[1px] bg-[#40c463] dark:bg-[#006d32]" />
                <span className="size-[9px] rounded-[1px] bg-[#30a14e] dark:bg-[#26a641]" />
                <span className="size-[9px] rounded-[1px] bg-[#216e39] dark:bg-[#39d353]" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Year Selector Stack on the right */}
        <div className="flex w-full shrink-0 flex-row gap-1 self-start text-xs lg:w-28 lg:w-auto lg:flex-col lg:pt-8">
          {[2026, 2025, 2024].map((year) => {
            const active = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "flex-1 rounded-md px-3 py-1.5 text-left font-semibold transition-colors lg:flex-initial",
                  active
                    ? "bg-[#0969da] text-white"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-200"
                )}
              >
                {year}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
