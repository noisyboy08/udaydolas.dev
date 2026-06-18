"use client";

import * as motion from "motion/react-m";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

function WordmarkPaths() {
  return (
    <text
      x="50%"
      y="312"
      textAnchor="middle"
      className="select-none fill-transparent font-sans"
      style={{
        fontSize: "138px",
        fontWeight: 700,
        fontFamily: "var(--font-sans), sans-serif",
        letterSpacing: "-0.04em",
      }}
    >
      UdayDolas
    </text>
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
      className={cn("w-full max-w-2xl h-auto select-none", props.className)}
      viewBox="0 0 770 330"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      {...props}
    >
      <defs>
        {/* Clip path to cut off letters below the horizontal line */}
        <clipPath id="halfCutClip">
          <rect x="0" y="0" width="770" height="280" />
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
          width="770"
          height="330"
          fill="black"
        >
          <rect fill="url(#revealMask)" width="770" height="330" />
          <g clipPath="url(#halfCutClip)">
            <WordmarkPaths />
          </g>
        </mask>

        <mask
          id="pathOutsideMask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="770"
          height="330"
          fill="black"
        >
          <rect fill="white" width="770" height="330" />
          <g clipPath="url(#halfCutClip)">
            <WordmarkPaths />
          </g>
        </mask>
      </defs>

      {/* Render horizontal line at the cutoff point Y = 280 */}
      <line
        x1="0"
        y1="280"
        x2="770"
        y2="280"
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
