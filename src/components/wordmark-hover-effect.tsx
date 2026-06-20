"use client";

import * as motion from "motion/react-m";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * "UDAY DOLAS" pixel-art wordmark — same style as the chanhdai.com footer.
 *
 * Letter geometry rules (copied faithfully from chanhdai-wordmark.tsx):
 *   bar width  = 8 px
 *   viewBox    = 0 0 960 190
 *   baseline y = 180  (bottom of every letter)
 *
 * Heights vary per letter to create the irregular city-skyline silhouette:
 *   U  y=18  (tall)
 *   D  y=18  (tall)
 *   A  y=70  (short)
 *   Y  y=25  (tall, arms + stem)
 *   D  y=10  (TALLEST, extra visual weight)
 *   O  y=70  (short)
 *   L  y=20  (tall)
 *   A  y=70  (short)
 *   S  y=55  (medium)
 */

const B = 8;   // bar / stroke width
const Y0 = 180; // baseline (bottom edge of all letters)

function WordmarkPaths() {
  // ── letter x origins ──────────────────────────────────────────────────
  const Ux  = 20;   // U  → right edge  98
  const D1x = 118;  // D  → right edge  196
  const Ax  = 216;  // A  → right edge  294
  const Yx  = 314;  // Y  → right edge  392 → +60 word-space → D at 452
  const D2x = 452;  // D  → right edge  530
  const Ox  = 550;  // O  → right edge  628
  const Lx  = 648;  // L  → right edge  726
  const A2x = 746;  // A  → right edge  824
  const Sx  = 844;  // S  → right edge  922

  // helper: height from a top-y to the baseline
  const h = (topY: number) => Y0 - topY;

  return (
    <>
      {/* ── U  top=18  w=78 ── */}
      <rect x={Ux}      y={18}  width={B}  height={h(18)} />  {/* left bar  */}
      <rect x={Ux + 70} y={18}  width={B}  height={h(18)} />  {/* right bar */}
      <rect x={Ux}      y={Y0 - B} width={78} height={B} />  {/* bottom bar */}

      {/* ── D  top=18  w=78 ── */}
      <rect x={D1x}      y={18}      width={B}  height={h(18)} />  {/* left  */}
      <rect x={D1x}      y={18}      width={78} height={B}     />  {/* top   */}
      <rect x={D1x + 70} y={18 + B}  width={B}  height={h(18) - B} />  {/* right (inner arc) */}
      <rect x={D1x}      y={Y0 - B}  width={78} height={B}    />  {/* bottom */}

      {/* ── A  top=70  w=78 ── */}
      <rect x={Ax}      y={70}      width={B}  height={h(70)} />  {/* left  */}
      <rect x={Ax + 70} y={70}      width={B}  height={h(70)} />  {/* right */}
      <rect x={Ax}      y={70}      width={78} height={B}     />  {/* top   */}
      <rect x={Ax}      y={115}     width={78} height={B}     />  {/* crossbar */}

      {/* ── Y  top=25  arms=25→102  stem=102→180  w=78 ── */}
      <rect x={Yx}      y={25}  width={B}  height={77} />  {/* left arm  */}
      <rect x={Yx + 70} y={25}  width={B}  height={77} />  {/* right arm */}
      <rect x={Yx}      y={102} width={78} height={B}  />  {/* mid join  */}
      <rect x={Yx + 35} y={102} width={B}  height={h(102)} />  {/* stem  */}

      {/* ═══ word space ═══ */}

      {/* ── D  top=10  w=78  (TALLEST) ── */}
      <rect x={D2x}      y={10}      width={B}  height={h(10)} />
      <rect x={D2x}      y={10}      width={78} height={B}     />
      <rect x={D2x + 70} y={10 + B}  width={B}  height={h(10) - B} />
      <rect x={D2x}      y={Y0 - B}  width={78} height={B}    />

      {/* ── O  top=70  w=78  (shortest) ── */}
      <rect x={Ox}      y={70}     width={B}  height={h(70)} />  {/* left  */}
      <rect x={Ox + 70} y={70}     width={B}  height={h(70)} />  {/* right */}
      <rect x={Ox}      y={70}     width={78} height={B}     />  {/* top   */}
      <rect x={Ox}      y={Y0 - B} width={78} height={B}    />  {/* bottom */}

      {/* ── L  top=20  w=78 ── */}
      <rect x={Lx} y={20}     width={B}  height={h(20)} />  {/* vertical */}
      <rect x={Lx} y={Y0 - B} width={78} height={B}    />  {/* foot     */}

      {/* ── A  top=70  w=78 ── */}
      <rect x={A2x}      y={70}  width={B}  height={h(70)} />
      <rect x={A2x + 70} y={70}  width={B}  height={h(70)} />
      <rect x={A2x}      y={70}  width={78} height={B}     />
      <rect x={A2x}      y={115} width={78} height={B}     />

      {/* ── S  top=55  w=78 ── */}
      <rect x={Sx}      y={55}      width={78} height={B}  />  {/* top bar      */}
      <rect x={Sx}      y={55 + B}  width={B}  height={52} />  {/* top-left     */}
      <rect x={Sx}      y={107 + B} width={78} height={B}  />  {/* mid bar      */}
      <rect x={Sx + 70} y={116 + B} width={B}  height={h(116) - B} />  {/* bot-right */}
      <rect x={Sx}      y={Y0 - B}  width={78} height={B}  />  {/* bottom bar   */}
    </>
  );
}

export function WordmarkHoverEffect(props: React.ComponentProps<"svg">) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor]         = useState({ x: 0, y: 0 });
  const [hovered, setHovered]       = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (containerRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = containerRef.current.getBoundingClientRect();
      setMaskPosition({
        cx: `${((cursor.x - svgRect.left) / svgRect.width)  * 100}%`,
        cy: `${((cursor.y - svgRect.top)  / svgRect.height) * 100}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={containerRef}
      className={cn("w-full select-none", props.className)}
      viewBox="0 0 960 190"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      {...props}
    >
      <defs>
        {/* Multi-stop gradient applied on hover */}
        <linearGradient
          id="logoGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="95"
          x2="960"
          y2="95"
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

        {/* Radial spotlight that tracks the cursor */}
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
            black base  → hides everything
            letter bars filled with the radial spotlight
            → only bars near the cursor turn white → gradient colour shows through
        */}
        <mask
          id="logoMask"
          maskUnits="userSpaceOnUse"
          x="0" y="0" width="960" height="190"
        >
          <rect width="960" height="190" fill="black" />
          <g fill="url(#revealMask)">
            <WordmarkPaths />
          </g>
        </mask>
      </defs>

      {/* Ghost / resting state: very faint outlines */}
      <g className="fill-zinc-400/[0.15] dark:fill-zinc-300/[0.10]">
        <WordmarkPaths />
      </g>

      {/* Colour gradient, revealed only through the letter bars */}
      <g fill="url(#logoGradient)" mask="url(#logoMask)">
        <WordmarkPaths />
      </g>
    </svg>
  );
}
