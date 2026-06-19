"use client";

import React from "react";

import { cn } from "@/lib/utils";

export function WordmarkHoverEffect({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn("w-full select-none", className)}
      viewBox="0 0 1200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Group with transition for subtle hover opacity change */}
      <g className="transition-all duration-700 ease-in-out hover:opacity-60 opacity-20 dark:opacity-15">
        {/* Underline - fine hairline wire */}
        <line
          x1="120"
          y1="140"
          x2="620"
          y2="140"
          className="stroke-neutral-800 dark:stroke-neutral-200"
          strokeWidth="0.8"
        />

        {/* Wordmark Text - elegant thin hairline script font */}
        <text
          x="140"
          y="120"
          className="fill-neutral-800 dark:fill-neutral-200 select-none font-light"
          style={{
            fontFamily: "var(--font-script), cursive",
            fontSize: "105px",
            letterSpacing: "0.01em",
          }}
        >
          UdayDolas
        </text>
      </g>
    </svg>
  );
}
