"use client";

import * as motion from "motion/react-m";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Bar thickness for all letter strokes
const T = 9;

function WordmarkPaths() {
  /**
   * "UDAY DOLAS" — blocky outlined pixel letters.
   *
   * Each letter is built from thin filled rects that form the OUTLINE
   * of the letter (the dark background shows through the center),
   * matching the reference image style.
   *
   * Layout:  viewBox 0 0 935 165
   * Letters: 75px wide, 130px tall (y=25→155)
   * Gap:     20px between letters, 70px for the word space
   */

  // X starting positions
  const Ux  = 20;
  const D1x = 115;
  const Ax  = 210;
  const Yx  = 305;
  //          Y ends at 305+75=380 → 70px word-space → D starts at 450
  const D2x = 450;
  const Ox  = 545;
  const Lx  = 640;
  const A2x = 735;
  const Sx  = 830;

  return (
    <>
      {/* ─── U ─── */}
      <rect x={Ux + 0}  y={25}  width={T}  height={130} /> {/* left  */}
      <rect x={Ux + 66} y={25}  width={T}  height={130} /> {/* right */}
      <rect x={Ux + 0}  y={146} width={75} height={T}   /> {/* bottom */}

      {/* ─── D (first) ─── */}
      <rect x={D1x + 0}  y={25}  width={T}  height={130} /> {/* left */}
      <rect x={D1x + 0}  y={25}  width={57} height={T}   /> {/* top */}
      <rect x={D1x + 48} y={34}  width={T}  height={112} /> {/* right (shorter = D bulge) */}
      <rect x={D1x + 0}  y={146} width={57} height={T}   /> {/* bottom */}

      {/* ─── A (first) ─── */}
      <rect x={Ax + 0}  y={25}  width={T}  height={130} /> {/* left */}
      <rect x={Ax + 66} y={25}  width={T}  height={130} /> {/* right */}
      <rect x={Ax + 0}  y={25}  width={75} height={T}   /> {/* top */}
      <rect x={Ax + 0}  y={82}  width={75} height={T}   /> {/* crossbar */}

      {/* ─── Y ─── */}
      <rect x={Yx + 0}  y={25}  width={T}  height={70} /> {/* left arm */}
      <rect x={Yx + 66} y={25}  width={T}  height={70} /> {/* right arm */}
      <rect x={Yx + 0}  y={25}  width={75} height={T}  /> {/* top bar */}
      <rect x={Yx + 0}  y={86}  width={75} height={T}  /> {/* mid join */}
      <rect x={Yx + 33} y={86}  width={T}  height={69} /> {/* stem */}

      {/* ─── D (second) ─── */}
      <rect x={D2x + 0}  y={25}  width={T}  height={130} />
      <rect x={D2x + 0}  y={25}  width={57} height={T}   />
      <rect x={D2x + 48} y={34}  width={T}  height={112} />
      <rect x={D2x + 0}  y={146} width={57} height={T}   />

      {/* ─── O ─── */}
      <rect x={Ox + 0}  y={25}  width={T}  height={130} /> {/* left */}
      <rect x={Ox + 66} y={25}  width={T}  height={130} /> {/* right */}
      <rect x={Ox + 0}  y={25}  width={75} height={T}   /> {/* top */}
      <rect x={Ox + 0}  y={146} width={75} height={T}   /> {/* bottom */}

      {/* ─── L ─── */}
      <rect x={Lx + 0} y={25}  width={T}  height={130} /> {/* vertical */}
      <rect x={Lx + 0} y={146} width={75} height={T}   /> {/* foot */}

      {/* ─── A (second) ─── */}
      <rect x={A2x + 0}  y={25}  width={T}  height={130} />
      <rect x={A2x + 66} y={25}  width={T}  height={130} />
      <rect x={A2x + 0}  y={25}  width={75} height={T}   />
      <rect x={A2x + 0}  y={82}  width={75} height={T}   />

      {/* ─── S ─── */}
      <rect x={Sx + 0}  y={25}  width={75} height={T}  /> {/* top bar */}
      <rect x={Sx + 0}  y={25}  width={T}  height={66} /> {/* top-left */}
      <rect x={Sx + 0}  y={82}  width={75} height={T}  /> {/* mid bar */}
      <rect x={Sx + 66} y={91}  width={T}  height={64} /> {/* bottom-right */}
      <rect x={Sx + 0}  y={146} width={75} height={T}  /> {/* bottom bar */}
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
      viewBox="0 0 935 165"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      {...props}
    >
      <defs>
        {/* Multicolour gradient applied to hovered letters */}
        <linearGradient
          id="logoGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="82"
          x2="935"
          y2="82"
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
          r="25%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeInOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        {/*
          logoMask:
          • Black base  →  everything hidden
          • Letter shapes filled with the radial spotlight gradient
            →  only letters near the cursor become visible/bright
        */}
        <mask
          id="logoMask"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="935"
          height="165"
        >
          <rect width="935" height="165" fill="black" />
          <g fill="url(#revealMask)">
            <WordmarkPaths />
          </g>
        </mask>
      </defs>

      {/* Ghost / resting state — very faint outlined letters */}
      <g className="fill-zinc-400/20 dark:fill-zinc-500/25">
        <WordmarkPaths />
      </g>

      {/* Coloured gradient letters revealed through cursor spotlight */}
      <g fill="url(#logoGradient)" mask="url(#logoMask)">
        <WordmarkPaths />
      </g>
    </svg>
  );
}
