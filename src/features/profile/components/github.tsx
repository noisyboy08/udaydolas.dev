import React, { useMemo } from "react";

import { cn } from "@/lib/utils";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

// Generates a mock dataset of 53 weeks * 7 days = 371 days
function generateYearlyData(seed: number) {
  let lcg = seed;
  const nextRand = () => {
    lcg = (lcg * 1664525 + 1013904223) % 4294967296;
    return lcg / 4294967296;
  };

  return Array.from({ length: 53 * 7 }, () => {
    const r = nextRand();
    if (r < 0.6) return 0;
    if (r < 0.8) return 1;
    if (r < 0.9) return 2;
    if (r < 0.97) return 3;
    return 4;
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

export function Github() {
  const data = useMemo(() => generateYearlyData(2026), []);
  const totalContributions = "4,748"; // Matches the reference image exactly

  const getColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-zinc-200/50 dark:bg-zinc-900/60 border border-zinc-300/10 dark:border-zinc-800/60";
      case 1:
        return "bg-zinc-300 dark:bg-zinc-800";
      case 2:
        return "bg-zinc-400 dark:bg-zinc-650";
      case 3:
        return "bg-zinc-500 dark:bg-zinc-500";
      case 4:
        return "bg-zinc-700 dark:bg-zinc-350";
      default:
        return "bg-zinc-200/50 dark:bg-zinc-900/60";
    }
  };

  return (
    <Panel id="github">
      <PanelHeader>
        <PanelTitle>GitHub</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-4 md:p-6">
        <div className="w-full text-zinc-900 dark:text-foreground font-sans selection:bg-zinc-500/30">
          <div className="flex flex-col">
            {/* The scrollable graph container */}
            <div className="overflow-x-auto pb-2 scrollbar-none">
              <div className="min-w-[620px] flex flex-col">
                {/* Month labels */}
                <div className="flex pl-7 mb-1.5 text-[10px] font-mono text-zinc-450 dark:text-zinc-500 select-none">
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
                  <div className="flex flex-col justify-between py-1.5 text-[9px] font-mono text-zinc-450 dark:text-zinc-500 w-5 select-none leading-none h-[78px]">
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
                    className="grid grid-flow-col gap-[3px] flex-1"
                    style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
                  >
                    {data.map((level, i) => (
                      <div
                        key={i}
                        className={cn(
                          "size-[9px] rounded-[1.5px] transition-all hover:scale-125 hover:z-10",
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
            <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-450 dark:text-zinc-500 pt-2 border-t border-zinc-200 dark:border-zinc-800/40">
              <span>
                {totalContributions} contributions in the past 365 days.
              </span>
              <div className="flex items-center gap-1.5 select-none">
                <span>Less</span>
                <span className="size-[9px] rounded-[1.5px] bg-zinc-200/50 dark:bg-zinc-900/60 border border-zinc-300/10 dark:border-zinc-800/60" />
                <span className="size-[9px] rounded-[1.5px] bg-zinc-300 dark:bg-zinc-800" />
                <span className="size-[9px] rounded-[1.5px] bg-zinc-400 dark:bg-zinc-650" />
                <span className="size-[9px] rounded-[1.5px] bg-zinc-500 dark:bg-zinc-500" />
                <span className="size-[9px] rounded-[1.5px] bg-zinc-700 dark:bg-zinc-350" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
