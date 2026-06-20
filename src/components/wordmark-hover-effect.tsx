"use client";

import * as motion from "motion/react-m";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const SW = 7; // bar/stroke width in SVG units

/**
 * "UDAY DOLAS" in blocky outlined pixel-art letters.
 *
 * Each letter is built from thin filled rects forming just the BORDER
 * of the letter (background shows through the hollow centre).
 *
 * DELIBERATE height variation per letter creates the organic skyline
 * silhouette seen in the reference image:
 *
 *   U  – left bar much taller than right bar (asymmetric U)
 *   D  – medium-tall
 *   A  – medium
 *   Y  – tall arms, no top connector, join at mid, stem below
 *   [word space]
 *   D  – tallest element in the whole wordmark
 *   O  – shortest (small square)
 *   L  – tall, simple vertical + foot
 *   A  – medium
 *   S  – medium, three horizontal bars + two side connectors
 *
 * ViewBox: 0 0 900 195   baseline (bottom edge): y = 176
 * All letters: visual width = 70 px, gaps = 22 px, word-space = 55 px
 */
function WordmarkPaths() {
  return (
    <>
      {/* ── U  x=15  left=y10  right=y35 ── */}
      <rect x={15}  y={10}  width={SW} height={166} />  {/* left bar  (tall) */}
      <rect x={78}  y={35}  width={SW} height={141} />  {/* right bar (shorter) */}
      <rect x={15}  y={169} width={70} height={SW}  />  {/* bottom bar */}

      {/* ── D  x=107  y=42 ── */}
      <rect x={107} y={42}  width={SW} height={134} />  {/* left bar */}
      <rect x={107} y={42}  width={70} height={SW}  />  {/* top bar */}
      <rect x={170} y={49}  width={SW} height={127} />  {/* right bar (inner) */}
      <rect x={107} y={169} width={70} height={SW}  />  {/* bottom bar */}

      {/* ── A  x=199  y=52 ── */}
      <rect x={199} y={52}  width={SW} height={124} />  {/* left bar */}
      <rect x={262} y={52}  width={SW} height={124} />  {/* right bar */}
      <rect x={199} y={52}  width={70} height={SW}  />  {/* top bar */}
      <rect x={199} y={108} width={70} height={SW}  />  {/* crossbar */}

      {/* ── Y  x=291  y=27  (arms, no top bar, midpoint join, stem) ── */}
      <rect x={291} y={27}  width={SW} height={75}  />  {/* left arm */}
      <rect x={354} y={27}  width={SW} height={75}  />  {/* right arm */}
      <rect x={291} y={102} width={70} height={SW}  />  {/* mid join */}
      <rect x={323} y={102} width={SW} height={74}  />  {/* centre stem */}

      {/* ═══ word space ═══ */}

      {/* ── D  x=438  y=5  TALLEST ── */}
      <rect x={438} y={5}   width={SW} height={171} />  {/* left bar */}
      <rect x={438} y={5}   width={70} height={SW}  />  {/* top bar */}
      <rect x={501} y={12}  width={SW} height={164} />  {/* right bar (inner) */}
      <rect x={438} y={169} width={70} height={SW}  />  {/* bottom bar */}

      {/* ── O  x=530  y=78  SHORTEST ── */}
      <rect x={530} y={78}  width={SW} height={98}  />  {/* left bar */}
      <rect x={593} y={78}  width={SW} height={98}  />  {/* right bar */}
      <rect x={530} y={78}  width={70} height={SW}  />  {/* top bar */}
      <rect x={530} y={169} width={70} height={SW}  />  {/* bottom bar */}

      {/* ── L  x=622  y=22  tall ── */}
      <rect x={622} y={22}  width={SW} height={154} />  {/* vertical bar */}
      <rect x={622} y={169} width={70} height={SW}  />  {/* foot bar */}

      {/* ── A  x=714  y=52 ── */}
      <rect x={714} y={52}  width={SW} height={124} />  {/* left bar */}
      <rect x={777} y={52}  width={SW} height={124} />  {/* right bar */}
      <rect x={714} y={52}  width={70} height={SW}  />  {/* top bar */}
      <rect x={714} y={108} width={70} height={SW}  />  {/* crossbar */}

      {/* ── S  x=806  y=67 ── */}
      <rect x={806} y={67}  width={70} height={SW}  />  {/* top bar */}
      <rect x={806} y={74}  width={SW} height={46}  />  {/* top-left vert */}
      <rect x={806} y={120} width={70} height={SW}  />  {/* mid bar */}
      <rect x={869} y={127} width={SW} height={42}  />  {/* bottom-right vert */}
      <rect x={806} y={169} width={70} height={SW}  />  {/* bottom bar */}
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
      viewBox="0 0 900 195"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      {...props}
    >
      <defs>
        {/* Multi-colour gradient for the hover reveal */}
        <linearGradient
          id="logoGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="97"
          x2="900"
          y2="97"
        >
          {hovered && (
            <>
              <stop offset="0%"   stopColor="var(--color-yellow-500)" />
              <stop offset="25%"  stopColor="var(--color-red-500)"    />
              <stop offset="50%"  stopColor="var(--color-blue-500)"   />
              <stop offset="75%"  stopColor="var(--color-cyan-500)"   />
              <stop offset="100%" stopColor="var(--color-violet-500)" />
            </>
          )}
        </linearGradient>

        {/* Radial spotlight that follows the cursor */}
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="22%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeInOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        {/*
          logoMask:
          • Black base hides everything
          • Letter rects filled with the radial spotlight:
            near cursor → white → colour revealed
            far from cursor → black → hidden
        */}
        <mask
          id="logoMask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="900"
          height="195"
        >
          <rect width="900" height="195" fill="black" />
          <g fill="url(#revealMask)">
            <WordmarkPaths />
          </g>
        </mask>
      </defs>

      {/* Ghost letters — very faint, always visible */}
      <g className="fill-zinc-400/[0.18] dark:fill-zinc-400/[0.12]">
        <WordmarkPaths />
      </g>

      {/* Coloured gradient revealed through cursor spotlight */}
      <g fill="url(#logoGradient)" mask="url(#logoMask)">
        <WordmarkPaths />
      </g>
    </svg>
  );
}
