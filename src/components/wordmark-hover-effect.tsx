"use client";

import * as motion from "motion/react-m";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

function WordmarkPaths() {
  return (
    <>
      {/* U */}
      <rect x="108" y="0" width="15" height="60" />
      <rect x="153" y="0" width="15" height="60" />
      <rect x="108" y="45" width="60" height="15" />
      {/* D */}
      <rect x="188" y="0" width="15" height="60" />
      <rect x="203" y="0" width="30" height="15" />
      <rect x="233" y="15" width="15" height="30" />
      <rect x="203" y="45" width="30" height="15" />
      {/* A */}
      <rect x="268" y="0" width="15" height="60" />
      <rect x="313" y="0" width="15" height="60" />
      <rect x="283" y="0" width="30" height="15" />
      <rect x="283" y="30" width="30" height="15" />
      {/* Y */}
      <rect x="348" y="0" width="15" height="30" />
      <rect x="393" y="0" width="15" height="30" />
      <rect x="370" y="30" width="15" height="30" />
      {/* D */}
      <rect x="438" y="0" width="15" height="60" />
      <rect x="453" y="0" width="30" height="15" />
      <rect x="483" y="15" width="15" height="30" />
      <rect x="453" y="45" width="30" height="15" />
      {/* O */}
      <rect x="518" y="0" width="15" height="60" />
      <rect x="533" y="0" width="30" height="15" />
      <rect x="563" y="0" width="15" height="60" />
      <rect x="533" y="45" width="30" height="15" />
      {/* L */}
      <rect x="598" y="0" width="15" height="60" />
      <rect x="598" y="45" width="45" height="15" />
      {/* A */}
      <rect x="658" y="0" width="15" height="60" />
      <rect x="703" y="0" width="15" height="60" />
      <rect x="673" y="0" width="30" height="15" />
      <rect x="673" y="30" width="30" height="15" />
      {/* S */}
      <rect x="748" y="0" width="45" height="15" />
      <rect x="748" y="15" width="15" height="15" />
      <rect x="748" y="30" width="45" height="15" />
      <rect x="778" y="45" width="15" height="15" />
      <rect x="748" y="45" width="45" height="15" />
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
      className={cn("w-full select-none", props.className)}
      viewBox="0 0 900 80"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      {...props}
    >
      <defs>
        {/* Gradient applied to hovered/revealed letters */}
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

        {/* Radial spotlight that follows the cursor */}
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="25%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeInOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        {/*
          logoMask: cuts the gradient reveal into letter shapes only.
          Black background = hide everything.
          White letter shapes multiplied by the radial gradient = reveal only
          the letters under the cursor spotlight.
        */}
        <mask
          id="logoMask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="900"
          height="80"
        >
          {/* Black base — hides everything by default */}
          <rect width="900" height="80" fill="black" />
          {/*
            Letter shapes filled with the radial gradient:
            where the gradient is white (near cursor) → letters are revealed.
            where the gradient is black (far from cursor) → letters stay hidden.
          */}
          <g fill="url(#revealMask)">
            <WordmarkPaths />
          </g>
        </mask>
      </defs>

      {/* Faint background block letters — always visible */}
      <g className="fill-zinc-300/35 dark:fill-zinc-800/40">
        <WordmarkPaths />
      </g>

      {/* Colored gradient letters revealed by cursor spotlight */}
      <g fill="url(#logoGradient)" mask="url(#logoMask)">
        <WordmarkPaths />
      </g>
    </svg>
  );
}
