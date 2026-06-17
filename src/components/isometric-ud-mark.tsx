"use client";

import React, { useMemo } from "react";

import { cn } from "@/lib/utils";

interface IsometricUDMarkProps extends React.ComponentProps<"svg"> {
  themeColor?: string;
}

export function IsometricUDMark({
  className,
  id,
  ...props
}: IsometricUDMarkProps) {
  // Center of isometric grid inside the 800x350 viewBox
  const cx = 400;
  const cy = 175;
  const unit = 26; // size of each isometric grid cell
  const H = 0.8; // extrusion height (thickness) of blocks

  // 3D Isometric projection function
  const project = (u: number, v: number, w: number): [number, number] => {
    // u-axis points down-right (30 degrees)
    // w-axis points down-left (150 degrees)
    // v-axis points straight up
    const x = cx + (u - w) * unit * 0.866025;
    const y = cy + (u + w) * unit * 0.5 - v * unit;
    return [x, y];
  };

  // Helper to format projected points for SVG polygon 'points' attribute
  const formatPoints = (pts: [number, number, number][]) => {
    return pts.map(([u, v, w]) => project(u, v, w).join(",")).join(" ");
  };

  // Define guide lines (blueprint grids) at v=0 (floor)
  const guideLines = useMemo(() => {
    const lines = [];

    // Main bounding floor box
    lines.push({ from: [-1, 0, -1], to: [10.5, 0, -1] });
    lines.push({ from: [-1, 0, 5], to: [10.5, 0, 5] });
    lines.push({ from: [-1, 0, -1], to: [-1, 0, 5] });
    lines.push({ from: [10.5, 0, -1], to: [10.5, 0, 5] });

    // Diagonal projection perspective axes extending out
    lines.push({ from: [-3, 0, 1], to: [12, 0, 1], dashed: true });
    lines.push({ from: [-3, 0, 3], to: [12, 0, 3], dashed: true });
    lines.push({ from: [2, 0, -3], to: [2, 0, 7], dashed: true });
    lines.push({ from: [7, 0, -3], to: [7, 0, 7], dashed: true });

    // Outer extension lines to corners
    lines.push({ from: [-2, 0, -2], to: [11.5, 0, 4.75], dashed: true });
    lines.push({ from: [11, 0, -2], to: [-2.5, 0, 4.75], dashed: true });

    return lines.map((l, idx) => {
      const [x1, y1] = project(l.from[0], l.from[1], l.from[2]);
      const [x2, y2] = project(l.to[0], l.to[1], l.to[2]);
      return (
        <line
          key={`guide-${idx}`}
          x1={x1.toFixed(1)}
          y1={y1.toFixed(1)}
          x2={x2.toFixed(1)}
          y2={y2.toFixed(1)}
          className={cn(
            "stroke-zinc-500/20 dark:stroke-zinc-400/10",
            l.dashed ? "stroke-dasharray-[4_4]" : "stroke-dasharray-[2_2]"
          )}
          strokeWidth="1"
        />
      );
    });
  }, []);

  // Assemble the 3D polygons of U and D blocks
  const polygons = useMemo(() => {
    interface PolyDef {
      points: [number, number, number][];
      innerPoints?: [number, number, number][];
      type: "top" | "top-d" | "side-left" | "side-right" | "inner";
      hatchType: "top" | "side" | "none";
      depth: number;
    }

    const list: PolyDef[] = [];

    // --- U Top Face (8-point flat outline) ---
    const uTopPoints: [number, number, number][] = [
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
      points: uTopPoints,
      type: "top",
      hatchType: "top",
      depth:
        uTopPoints.reduce((sum, p) => sum + p[0] + p[2], 0) / uTopPoints.length,
    });

    // --- U Side Walls ---
    const uSides: [number, number, number][][] = [
      [
        [0, 0, 0],
        [0, H, 0],
        [0, H, 4],
        [0, 0, 4],
      ], // Outer Left (facing left)
      [
        [4, 0, 0],
        [4, H, 0],
        [4, H, 4],
        [4, 0, 4],
      ], // Outer Right (facing right)
      [
        [0, 0, 4],
        [0, H, 4],
        [4, H, 4],
        [4, 0, 4],
      ], // Front Wall (facing front-left)
      [
        [0, 0, 0],
        [0, H, 0],
        [1, H, 0],
        [1, 0, 0],
      ], // Left leg back wall (facing back-right)
      [
        [3, 0, 0],
        [3, H, 0],
        [4, H, 0],
        [4, 0, 0],
      ], // Right leg back wall (facing back-right)
      [
        [1, 0, 0],
        [1, H, 0],
        [1, H, 3],
        [1, 0, 3],
      ], // Inner Left (facing right)
      [
        [3, 0, 0],
        [3, H, 0],
        [3, H, 3],
        [3, 0, 3],
      ], // Inner Right (facing left)
      [
        [1, 0, 3],
        [1, H, 3],
        [3, H, 3],
        [3, 0, 3],
      ], // Inner Front/Recess (facing back-left)
    ];

    uSides.forEach((side) => {
      // Determine side hatch and wall type based on direction
      const avgU = side.reduce((sum, p) => sum + p[0], 0) / side.length;
      const avgW = side.reduce((sum, p) => sum + p[2], 0) / side.length;

      // Determine direction for shaded face colouring
      const isLeft = side[0][0] === side[2][0]; // u is constant -> wall lies along w axis (left-facing)

      list.push({
        points: side,
        type: isLeft ? "side-left" : "side-right",
        hatchType: "side",
        depth: avgU + avgW,
      });
    });

    // --- D Top Face (composed of outer ring and inner cutout) ---
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
      [7.75, H, 1],
      [8.5, H, 1.75],
      [8.5, H, 2.25],
      [7.75, H, 3],
      [6.5, H, 3],
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
      ], // Outer Front-Left
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
        [7.75, H, 1],
        [7.75, 0, 1],
      ], // Hole Back
      [
        [7.75, 0, 1],
        [7.75, H, 1],
        [8.5, H, 1.75],
        [8.5, 0, 1.75],
      ], // Hole Angled Back
      [
        [8.5, 0, 1.75],
        [8.5, H, 1.75],
        [8.5, H, 2.25],
        [8.5, 0, 2.25],
      ], // Hole Right
      [
        [8.5, 0, 2.25],
        [8.5, H, 2.25],
        [7.75, H, 3],
        [7.75, 0, 3],
      ], // Hole Angled Front
      [
        [7.75, 0, 3],
        [7.75, H, 3],
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

    // Sort polygons back-to-front (Painter's Algorithm)
    return list.sort((a, b) => a.depth - b.depth);
  }, []);

  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 350"
      fill="none"
      className={cn("h-auto w-full text-black dark:text-white", className)}
      {...props}
    >
      <defs>
        {/* Shading styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .isometric-poly {
            stroke-linejoin: round;
            transition: fill 0.3s, stroke 0.3s;
          }
          
          /* Shaded fills for 3D faces */
          .face-top {
            fill: #18181b;
            stroke: rgba(0, 0, 0, 0.25);
          }
          .face-side-left {
            fill: #0c0c0e;
            stroke: rgba(0, 0, 0, 0.35);
          }
          .face-side-right {
            fill: #121215;
            stroke: rgba(0, 0, 0, 0.3);
          }
          
          .dark .face-top {
            fill: #09090b;
            stroke: rgba(255, 255, 255, 0.2);
          }
          .dark .face-side-left {
            fill: #020203;
            stroke: rgba(255, 255, 255, 0.12);
          }
          .dark .face-side-right {
            fill: #050507;
            stroke: rgba(255, 255, 255, 0.15);
          }
          
          /* Hatch patterns coloring */
          .hatch-line {
            stroke: rgba(0, 0, 0, 0.15);
          }
          .dark .hatch-line {
            stroke: rgba(255, 255, 255, 0.12);
          }
        `,
          }}
        />

        {/* Diagonal Hatching Pattern for Top Faces */}
        <pattern
          id="isometric-hatch-top"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            className="hatch-line"
            strokeWidth="1"
          />
        </pattern>

        {/* Vertical Hatching Pattern for Side Faces */}
        <pattern
          id="isometric-hatch-vertical"
          width="6"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="8"
            className="hatch-line"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* 1. Guide lines (drawn in the background) */}
      <g>{guideLines}</g>

      {/* 2. Technical Metadata Texts */}
      <text
        x="635"
        y="300"
        className="fill-zinc-400/40 font-mono text-[10px] tracking-wider uppercase select-none dark:fill-zinc-600/30"
      >
        FIG_001
      </text>
      <text
        x="635"
        y="312"
        className="fill-zinc-400/20 font-mono text-[8px] tracking-widest uppercase select-none dark:fill-zinc-600/15"
      >
        Isometric Wireframe v1.0
      </text>

      {/* 3. 3D Polygons (drawn back-to-front) */}
      <g>
        {polygons.map((poly, idx) => {
          // Determine face classes and fill patterns
          let faceClass = "";
          let hatchFill = "none";

          if (poly.type === "top" || poly.type === "top-d") {
            faceClass = "face-top";
            hatchFill =
              poly.hatchType === "top" ? "url(#isometric-hatch-top)" : "none";
          } else if (poly.type === "side-left") {
            faceClass = "face-side-left";
            hatchFill =
              poly.hatchType === "side"
                ? "url(#isometric-hatch-vertical)"
                : "none";
          } else {
            faceClass = "face-side-right";
            hatchFill =
              poly.hatchType === "side"
                ? "url(#isometric-hatch-vertical)"
                : "none";
          }

          // Special rendering for D's top face to draw the inner hole properly using evenodd
          if (poly.type === "top-d" && poly.innerPoints) {
            const outerPath = poly.points
              .map(([u, v, w]) => project(u, v, w).join(","))
              .join(" L ");
            const innerPath = poly.innerPoints
              .map(([u, v, w]) => project(u, v, w).join(","))
              .join(" L ");
            const combinedD = `M ${outerPath} Z M ${innerPath} Z`;

            return (
              <g key={`poly-group-${idx}`}>
                {/* Solid shaded background */}
                <path
                  d={combinedD}
                  fillRule="evenodd"
                  className={cn("isometric-poly", faceClass)}
                  strokeWidth="0"
                />
                {/* Hatch pattern overlay */}
                <path
                  d={combinedD}
                  fillRule="evenodd"
                  fill={hatchFill}
                  strokeWidth="0"
                  pointerEvents="none"
                />
                {/* Crisp wireframe outline */}
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

          const formattedPoints = formatPoints(poly.points);

          return (
            <g key={`poly-group-${idx}`}>
              {/* Solid shaded background */}
              <polygon
                points={formattedPoints}
                className={cn("isometric-poly", faceClass)}
                strokeWidth="0"
              />
              {/* Hatch pattern overlay */}
              {hatchFill !== "none" && (
                <polygon
                  points={formattedPoints}
                  fill={hatchFill}
                  strokeWidth="0"
                  pointerEvents="none"
                />
              )}
              {/* Crisp wireframe outline */}
              <polygon
                points={formattedPoints}
                fill="none"
                className={cn("isometric-poly", faceClass)}
                strokeWidth="1"
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
