"use client";

import * as motion from "motion/react-m";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

function WordmarkPaths() {
  return (
    <>
      {/* U (X: 48 to 112) */}
      <path d="M 48 40 L 48 128 A 32 32 0 0 0 112 128 L 112 40" />
      {/* d (X: 128 to 192) */}
      <path d="M 128 128 A 32 32 0 1 0 192 128 A 32 32 0 1 0 128 128 M 192 40 L 192 160" />
      {/* a (X: 208 to 272) */}
      <path d="M 208 128 A 32 32 0 1 0 272 128 A 32 32 0 1 0 208 128 M 272 96 L 272 160" />
      {/* y (X: 288 to 352) */}
      <path d="M 288 96 L 288 128 A 32 32 0 0 0 352 128 M 352 96 L 352 176 A 16 16 0 0 1 336 192 L 310 192" />
      {/* D (X: 368 to 432) */}
      <path d="M 368 40 L 368 160 M 368 40 A 64 60 0 0 1 368 160" />
      {/* o (X: 448 to 512) */}
      <path d="M 448 128 A 32 32 0 1 0 512 128 A 32 32 0 1 0 448 128" />
      {/* l (X: 528 to 592) */}
      <path d="M 560 40 L 560 160" />
      {/* a (X: 608 to 672) */}
      <path d="M 608 128 A 32 32 0 1 0 672 128 A 32 32 0 1 0 608 128 M 672 96 L 672 160" />
      {/* s (X: 688 to 752) */}
      <path d="M 748 104 C 748 96, 692 96, 692 116 C 692 136, 748 128, 748 148 C 748 164, 692 164, 692 156" />
    </>
  );
}

export function WordmarkHoverEffect(props: React.ComponentProps<"svg">) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (containerRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = containerRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={containerRef}
      className={cn("w-full max-w-3xl h-auto select-none", props.className)}
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      {...props}
    >
      <defs>
        {/* Clip path to cut off letters below the horizontal line */}
        <clipPath id="halfCutClip">
          <rect x="0" y="0" width="800" height="160" />
        </clipPath>

        <linearGradient
          id="logoGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor={"var(--color-yellow-500)"} />
              <stop offset="25%" stopColor={"var(--color-red-500)"} />
              <stop offset="50%" stopColor={"var(--color-blue-500)"} />
              <stop offset="75%" stopColor={"var(--color-cyan-500)"} />
              <stop offset="100%" stopColor={"var(--color-violet-500)"} />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeInOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask
          id="logoMask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="800"
          height="200"
          fill="black"
        >
          <rect fill="url(#revealMask)" width="800" height="200" />
          <g clipPath="url(#halfCutClip)">
            <WordmarkPaths />
          </g>
        </mask>

        <mask
          id="pathOutsideMask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="800"
          height="200"
          fill="black"
        >
          <rect fill="white" width="800" height="200" />
          <g clipPath="url(#halfCutClip)">
            <WordmarkPaths />
          </g>
        </mask>
      </defs>

      {/* Render horizontal line at the cutoff point Y = 160 */}
      <line
        x1="0"
        y1="160"
        x2="800"
        y2="160"
        className="stroke-zinc-300 dark:stroke-zinc-800"
        strokeWidth="2"
      />

      <g
        className="fill-transparent stroke-zinc-300/35 dark:stroke-zinc-800/40"
        strokeWidth="3.5"
        mask="url(#pathOutsideMask)"
      >
        <g clipPath="url(#halfCutClip)">
          <WordmarkPaths />
        </g>
      </g>

      <g
        className="fill-transparent"
        stroke="url(#logoGradient)"
        strokeWidth="3.5"
        mask="url(#logoMask)"
      >
        <g clipPath="url(#halfCutClip)">
          <WordmarkPaths />
        </g>
      </g>
    </svg>
  );
}
