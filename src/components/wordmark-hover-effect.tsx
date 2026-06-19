"use client";

import React from "react";

import { cn } from "@/lib/utils";

function WordmarkPaths() {
  return (
    <>
      {/* U (X: 200 to 264) */}
      <path d="M 200 40 L 200 128 A 32 32 0 0 0 264 128 L 264 40" />
      {/* d (X: 280 to 344) */}
      <path d="M 280 128 A 32 32 0 1 0 344 128 A 32 32 0 1 0 280 128 M 344 40 L 344 160" />
      {/* a (X: 360 to 424) */}
      <path d="M 360 128 A 32 32 0 1 0 424 128 A 32 32 0 1 0 360 128 M 424 96 L 424 160" />
      {/* y (X: 440 to 504) - clipped at Y=160 */}
      <path d="M 440 96 L 440 128 A 32 32 0 0 0 504 128 M 504 96 L 504 176 A 16 16 0 0 1 488 192 L 462 192" />
      {/* D (X: 520 to 584) */}
      <path d="M 520 40 L 520 160 M 520 40 A 64 60 0 0 1 520 160" />
      {/* o (X: 600 to 664) */}
      <path d="M 600 128 A 32 32 0 1 0 664 128 A 32 32 0 1 0 600 128" />
      {/* l (X: 712) */}
      <path d="M 712 40 L 712 160" />
      {/* a (X: 760 to 824) */}
      <path d="M 760 128 A 32 32 0 1 0 824 128 A 32 32 0 1 0 760 128 M 824 96 L 824 160" />
      {/* s (X: 840 to 904) */}
      <path d="M 900 104 C 900 96, 844 96, 844 116 C 844 136, 900 128, 900 148 C 900 164, 844 164, 844 156" />
    </>
  );
}

export function WordmarkHoverEffect({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn("w-full select-none", className)}
      viewBox="0 0 1200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Clip path to cut off letters below the horizontal underline at Y = 160 */}
        <clipPath id="wordmarkClip">
          <rect x="0" y="0" width="1200" height="160" />
        </clipPath>
      </defs>

      <g className="transition-opacity duration-500 ease-in-out hover:opacity-50 opacity-20 dark:opacity-15">
        {/* Thin horizontal underline beneath the full wordmark extending slightly past */}
        <line
          x1="160"
          y1="160"
          x2="940"
          y2="160"
          className="stroke-neutral-800 dark:stroke-neutral-200"
          strokeWidth="0.8"
        />

        {/* Wordmark letter paths in ultra-thin single-stroke weight */}
        <g
          className="fill-transparent stroke-neutral-800 dark:stroke-neutral-200"
          strokeWidth="0.8"
          clipPath="url(#wordmarkClip)"
        >
          <WordmarkPaths />
        </g>
      </g>
    </svg>
  );
}
