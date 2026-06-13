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
    if (r < 0.6) return 0;       // Level 0 (no contribution)
    if (r < 0.8) return 1;       // Level 1
    if (r < 0.9) return 2;       // Level 2
    if (r < 0.97) return 3;      // Level 3
    return 4;                    // Level 4
  });
}

const MONTHS_ORDER = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];

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
    return Math.floor(180 + (selectedYear % 100) * 12 + (data.filter(x => x > 0).length * 1.5));
  }, [selectedYear, data]);

  const getColor = (level: number) => {
    switch (level) {
      case 0: return "bg-[#161b22] border border-[#272b33]/15 dark:border-white/5";
      case 1: return "bg-[#0e4429]";
      case 2: return "bg-[#006d32]";
      case 3: return "bg-[#26a641]";
      case 4: return "bg-[#39d353]";
      default: return "bg-[#161b22]";
    }
  };

  return (
    <div className={cn("w-full text-foreground font-sans selection:bg-emerald-500/30", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        
        {/* Main Content Area: Graph Card */}
        <div className="flex-1 min-w-0">
          
          {/* Header row containing contributions count & dropdown */}
          <div className="mb-2 flex items-center justify-between px-1">
            <h3 className="text-sm font-normal text-zinc-100">
              <span className="font-semibold">{totalContributions} contributions</span> in the last year
            </h3>
            <button className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1.5 transition-colors">
              Contribution settings
              <span className="text-[9px] text-zinc-500">▼</span>
            </button>
          </div>

          {/* Graph Outer Card */}
          <div className="rounded-lg border border-zinc-800 bg-[#0d1117] p-4 shadow-lg overflow-hidden">
            {/* The scrollable graph container */}
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700">
              <div className="min-w-[620px] flex flex-col">
                
                {/* Month labels */}
                <div className="flex pl-7 mb-1 text-[10px] text-zinc-400 select-none">
                  {MONTHS_ORDER.map((month, i) => (
                    <span 
                      key={month} 
                      className="inline-block" 
                      style={{ 
                        width: i === 0 ? "44px" : "48px" 
                      }}
                    >
                      {month}
                    </span>
                  ))}
                </div>

                {/* Day labels and grid side-by-side */}
                <div className="flex gap-2">
                  
                  {/* Days labels */}
                  <div className="flex flex-col justify-between py-1.5 text-[9px] text-zinc-400 w-5 select-none leading-none h-[78px]">
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
            <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/60">
              <a 
                href={`https://github.com/${username}`} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:text-emerald-400 transition-colors"
              >
                Learn how we count contributions
              </a>
              <div className="flex items-center gap-1.5 select-none">
                <span>Less</span>
                <span className="size-[9px] rounded-[1px] bg-[#161b22] border border-white/5" />
                <span className="size-[9px] rounded-[1px] bg-[#0e4429]" />
                <span className="size-[9px] rounded-[1px] bg-[#006d32]" />
                <span className="size-[9px] rounded-[1px] bg-[#26a641]" />
                <span className="size-[9px] rounded-[1px] bg-[#39d353]" />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>

        {/* Year Selector Stack on the right */}
        <div className="flex flex-row lg:flex-col gap-1 shrink-0 lg:w-28 text-xs self-start lg:pt-8 w-full lg:w-auto">
          {[2026, 2025, 2024].map((year) => {
            const active = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={cn(
                  "flex-1 lg:flex-initial py-1.5 px-3 rounded-md text-left transition-colors font-semibold",
                  active
                    ? "bg-[#0969da] text-white"
                    : "text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
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
