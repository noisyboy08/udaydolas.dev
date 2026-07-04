"use client";

import React, { useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface IsometricUDMarkProps extends React.ComponentProps<"svg"> {
  themeColor?: string;
}

const H = 0.7; // Sleek extrusion height (thickness) matching CD reference

export function IsometricUDMark({
  className,
  id,
  ...props
}: IsometricUDMarkProps) {
  // Spring bounce animation state
  const [springY, setSpringY] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  function triggerSpring() {
    if (animFrameRef.current !== null) return;
    const startTime = performance.now();
    const amplitude = -18; // px upward jump
    const freq = 8;        // oscillation frequency
    const decay = 4;       // decay rate

    function animate(now: number) {
      const t = (now - startTime) / 1000;
      const y = amplitude * Math.exp(-decay * t) * Math.cos(freq * t);
      setSpringY(y);
      if (t < 1.2) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setSpringY(0);
        animFrameRef.current = null;
      }
    }
    animFrameRef.current = requestAnimationFrame(animate);
  }

  // Base coordinates of the isometric grid origin
  const cx = 350;
  const cy = 60;
  const unit = 40; // Scaled up unit size to match CD reference

  // 3D Isometric projection function
  const project = (u: number, v: number, w: number): [number, number] => {
    const x = cx + (u - w) * unit * 0.866025;
    const y = cy + (u + w) * unit * 0.5 - v * unit;
    return [x, y];
  };

  // Helper to format projected points for SVG polygon 'points' attribute
  const formatPoints = (pts: [number, number, number][]) => {
    return pts.map(([u, v, w]) => project(u, v, w).join(",")).join(" ");
  };

  // List of all guide lines (blueprint lines extending all the way across)
  const guideLines3D = useMemo(
    () => [
      // Main bounding floor box (v=0)
      { from: [-1, 0, -1], to: [10.5, 0, -1] },
      { from: [-1, 0, 5], to: [10.5, 0, 5] },
      { from: [-1, 0, -1], to: [-1, 0, 5] },
      { from: [10.5, 0, -1], to: [10.5, 0, 5] },

      // Diagonal projection perspective axes extending out to the edges
      { from: [-20, 0, 1], to: [20, 0, 1], dashed: true },
      { from: [-20, 0, 3], to: [20, 0, 3], dashed: true },
      { from: [2, 0, -15], to: [2, 0, 20], dashed: true },
      { from: [7, 0, -15], to: [7, 0, 20], dashed: true },

      // Outer extension lines to corners
      { from: [-15, 0, -15], to: [20, 0, 20], dashed: true },
      { from: [20, 0, -15], to: [-15, 0, 20], dashed: true },
    ],
    []
  );

  // Render guide lines
  const guideLinesJSX = useMemo(() => {
    return guideLines3D.map((l, idx) => {
      const [x1, y1] = project(l.from[0], l.from[1], l.from[2]);
      const [x2, y2] = project(l.to[0], l.to[1], l.to[2]);
      return (
        <line
          key={`guide-${idx}`}
          x1={x1.toFixed(1)}
          y1={y1.toFixed(1)}
          x2={x2.toFixed(1)}
          y2={y2.toFixed(1)}
          className="guide-line-animated stroke-zinc-500/35 dark:stroke-zinc-400/20"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      );
    });
  }, [guideLines3D]);

  // Assemble the 3D polygons of U and D blocks (split to resolve non-convex rendering issues)
  const polygons = useMemo(() => {
    interface PolyDef {
      points: [number, number, number][];
      innerPoints?: [number, number, number][];
      type: "top" | "top-d" | "side-left" | "side-right";
      hatchType: "top" | "side";
      depth: number;
    }

    const list: PolyDef[] = [];

    // --- U Top Face (single continuous polygon) ---
    const uTop: [number, number, number][] = [
      [0, H, 0],
      [1, H, 0],
      [1, H, 3],
      [3, H, 3],
      [3, H, 0],
      [4, H, 0],
      [4, H, 4],
      [0, H, 4],
    ];
    list.push({
      points: uTop,
      type: "top",
      hatchType: "top",
      depth: uTop.reduce((sum, p) => sum + p[0] + p[2], 0) / uTop.length,
    });

    // --- U Side Walls (facing left/right/front/back) ---
    const uSides: [number, number, number][][] = [
      [
        [0, 0, 0],
        [0, H, 0],
        [0, H, 4],
        [0, 0, 4],
      ], // Outer Left (facing down-left)
      [
        [4, 0, 0],
        [4, H, 0],
        [4, H, 4],
        [4, 0, 4],
      ], // Outer Right (facing down-left)
      [
        [0, 0, 4],
        [0, H, 4],
        [4, H, 4],
        [4, 0, 4],
      ], // Outer Front Wall (facing down-right)
      [
        [0, 0, 0],
        [0, H, 0],
        [1, H, 0],
        [1, 0, 0],
      ], // Left leg back end (facing down-right)
      [
        [3, 0, 0],
        [3, H, 0],
        [4, H, 0],
        [4, 0, 0],
      ], // Right leg back end (facing down-right)
      [
        [1, 0, 0],
        [1, H, 0],
        [1, H, 3],
        [1, 0, 3],
      ], // Inner Left wall (facing down-left)
      [
        [3, 0, 0],
        [3, H, 0],
        [3, H, 3],
        [3, 0, 3],
      ], // Inner Right wall (facing down-left)
      [
        [1, 0, 3],
        [1, H, 3],
        [3, H, 3],
        [3, 0, 3],
      ], // Inner Connector wall (facing down-right)
    ];

    uSides.forEach((side) => {
      const avgU = side.reduce((sum, p) => sum + p[0], 0) / side.length;
      const avgW = side.reduce((sum, p) => sum + p[2], 0) / side.length;
      const isLeft = side[0][0] === side[2][0];

      list.push({
        points: side,
        type: isLeft ? "side-left" : "side-right",
        hatchType: "side",
        depth: avgU + avgW,
      });
    });

    // --- D Top Face (single continuous polygon with inner hole) ---
    const dTopOuter: [number, number, number][] = [
      [5.5, H, 0],
      [8.5, H, 0],
      [9.5, H, 1],
      [9.5, H, 3],
      [8.5, H, 4],
      [5.5, H, 4],
    ];
    const dTopInner: [number, number, number][] = [
      [6.5, H, 1],
      [6.5, H, 3],
      [8.5, H, 3],
      [8.5, H, 1],
    ];
    list.push({
      points: dTopOuter,
      innerPoints: dTopInner,
      type: "top-d",
      hatchType: "top",
      depth:
        dTopOuter.reduce((sum, p) => sum + p[0] + p[2], 0) / dTopOuter.length,
    });

    // --- D Side Walls ---
    const dSides: [number, number, number][][] = [
      [
        [5.5, 0, 0],
        [5.5, H, 0],
        [5.5, H, 4],
        [5.5, 0, 4],
      ], // Outer Left
      [
        [5.5, 0, 4],
        [5.5, H, 4],
        [8.5, H, 4],
        [8.5, 0, 4],
      ], // Outer Front
      [
        [8.5, 0, 4],
        [8.5, H, 4],
        [9.5, H, 3],
        [9.5, 0, 3],
      ], // Outer Angled Front-Right
      [
        [9.5, 0, 3],
        [9.5, H, 3],
        [9.5, H, 1],
        [9.5, 0, 1],
      ], // Outer Right
      [
        [9.5, 0, 1],
        [9.5, H, 1],
        [8.5, H, 0],
        [8.5, 0, 0],
      ], // Outer Angled Back-Right
      [
        [5.5, 0, 0],
        [5.5, H, 0],
        [8.5, H, 0],
        [8.5, 0, 0],
      ], // Outer Back-Right

      // D Inner Hole Walls
      [
        [6.5, 0, 3],
        [6.5, H, 3],
        [6.5, H, 1],
        [6.5, 0, 1],
      ], // Hole Left
      [
        [6.5, 0, 1],
        [6.5, H, 1],
        [8.5, H, 1],
        [8.5, 0, 1],
      ], // Hole Back
      [
        [8.5, 0, 1],
        [8.5, H, 1],
        [8.5, H, 3],
        [8.5, 0, 3],
      ], // Hole Right
      [
        [8.5, 0, 3],
        [8.5, H, 3],
        [6.5, H, 3],
        [6.5, 0, 3],
      ], // Hole Front
    ];

    dSides.forEach((side) => {
      const avgU = side.reduce((sum, p) => sum + p[0], 0) / side.length;
      const avgW = side.reduce((sum, p) => sum + p[2], 0) / side.length;
      const isLeft = side[0][0] === side[2][0];

      list.push({
        points: side,
        type: isLeft ? "side-left" : "side-right",
        hatchType: "side",
        depth: avgU + avgW,
      });
    });

    return list.sort((a, b) => a.depth - b.depth);
  }, []);

  // Separate top-face polygons (animated) from side walls (static)
  const topPolygons = polygons.filter(
    (p) => p.type === "top" || p.type === "top-d"
  );
  const sidePolygons = polygons.filter(
    (p) => p.type === "side-left" || p.type === "side-right"
  );

  // Project a polygon to SVG — optionally offset in Y
  function renderPoly(
    poly: (typeof polygons)[0],
    idx: number,
    yOffset = 0
  ) {
    let faceClass = "";
    let hatchId = "";

    if (poly.type === "top") {
      faceClass = "face-top";
      hatchId = "isometric-hatch-top";
    } else if (poly.type === "top-d") {
      faceClass = "face-top";
      hatchId = "isometric-hatch-top";
    } else if (poly.type === "side-left") {
      faceClass = "face-side-left";
      hatchId = "isometric-hatch-side-left";
    } else {
      faceClass = "face-side-right";
      hatchId = "isometric-hatch-side-right";
    }

    const hatchFill = `url(#${hatchId})`;

    const offsetProject = (u: number, v: number, w: number): [number, number] => {
      const [x, y] = project(u, v, w);
      return [x, y + yOffset];
    };

    const offsetFormatPoints = (pts: [number, number, number][]) =>
      pts.map(([u, v, w]) => offsetProject(u, v, w).join(",")).join(" ");

    // Special rendering for D's top face (with hole) using evenodd path
    if (poly.type === "top-d" && poly.innerPoints) {
      const outerPath = poly.points
        .map(([u, v, w]) => offsetProject(u, v, w).join(","))
        .join(" L ");
      const innerPath = poly.innerPoints
        .map(([u, v, w]) => offsetProject(u, v, w).join(","))
        .join(" L ");
      const combinedD = `M ${outerPath} Z M ${innerPath} Z`;

      return (
        <g key={`poly-group-${idx}`}>
          <path
            d={combinedD}
            fillRule="evenodd"
            className={cn("isometric-poly", faceClass)}
            strokeWidth="0"
          />
          <path
            d={combinedD}
            fillRule="evenodd"
            fill={hatchFill}
            strokeWidth="0"
            pointerEvents="none"
          />
          <path
            d={combinedD}
            fillRule="evenodd"
            fill="none"
            className={cn("isometric-poly", faceClass)}
            strokeWidth="1"
          />
        </g>
      );
    }

    const formattedPoints = offsetFormatPoints(poly.points);

    return (
      <g key={`poly-group-${idx}`}>
        <polygon
          points={formattedPoints}
          className={cn("isometric-poly", faceClass)}
          strokeWidth="0"
        />
        <polygon
          points={formattedPoints}
          fill={hatchFill}
          strokeWidth="0"
          pointerEvents="none"
        />
        <polygon
          points={formattedPoints}
          fill="none"
          className={cn("isometric-poly", faceClass)}
          strokeWidth="1"
        />
      </g>
    );
  }

  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 400"
      fill="none"
      className={cn("h-auto w-full cursor-pointer text-black dark:text-white", className)}
      style={{ overflow: "visible" }}
      onClick={triggerSpring}
      {...props}
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .isometric-poly {
            stroke-linejoin: round;
            transition: fill 0.3s, stroke 0.3s;
          }
          
          /* Solid backgrounds for blueprint sketch faces */
          .face-top,
          .face-side-left,
          .face-side-right {
            fill: #fafafa;
            stroke: rgba(0, 0, 0, 0.45);
          }
          
          .dark .face-top,
          .dark .face-side-left,
          .dark .face-side-right {
            fill: #09090b;
            stroke: rgba(255, 255, 255, 0.4);
          }
          
          /* Animated guide lines */
          @keyframes dashMove {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -24; }
          }
          .guide-line-animated {
            animation: dashMove 8s linear infinite;
          }
        `,
          }}
        />

        {/* Prominent diagonal hatching for top faces — matching ////// reference */}
        <pattern
          id="isometric-hatch-top"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(60)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
        </pattern>

        {/* Hatching for side-left faces */}
        <pattern
          id="isometric-hatch-side-left"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(80)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1.1"
          />
        </pattern>

        {/* Hatching for side-right faces */}
        <pattern
          id="isometric-hatch-side-right"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(-10)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.1"
          />
        </pattern>

        <clipPath id="guide-clip-path">
          <rect x="-1000" y="0" width="3000" height="400" />
        </clipPath>
      </defs>

      {/* 1. Guide lines (drawn in the background) */}
      <g clipPath="url(#guide-clip-path)">{guideLinesJSX}</g>

      {/* 2. Technical Metadata Texts (positioned near bottom right) */}
      <text
        x="730"
        y="370"
        className="fill-zinc-400/55 font-mono text-[10px] font-bold tracking-wider uppercase select-none dark:fill-zinc-500/35"
      >
        FIG_001
      </text>
      <text
        x="730"
        y="380"
        className="fill-zinc-400/35 font-mono text-[7px] tracking-widest uppercase select-none dark:fill-zinc-500/20"
      >
        Isometric Wireframe v1.0
      </text>

      {/* 3. Side walls — static, no animation */}
      <g>
        {sidePolygons.map((poly, idx) => renderPoly(poly, idx, 0))}
      </g>

      {/* 4. Top faces — spring-animated upward on click */}
      <g style={{ transform: `translateY(${springY}px)` }}>
        {topPolygons.map((poly, idx) => renderPoly(poly, idx + 1000, springY))}
      </g>
    </svg>
  );
}
