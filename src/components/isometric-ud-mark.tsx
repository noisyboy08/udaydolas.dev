"use client";

import React, { useMemo } from "react";

import { cn } from "@/lib/utils";

interface IsometricUDMarkProps extends React.ComponentProps<"svg"> {
  themeColor?: string;
}

const H = 0.9; // extrusion height (thickness) of blocks

// 3D coordinates for all corners of U and D blocks
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

export function IsometricUDMark({
  className,
  id,
  ...props
}: IsometricUDMarkProps) {
  // Base coordinates of the isometric grid origin
  const cx = 400;
  const cy = 180;
  const unit = 32; // size of each isometric grid cell (scaled up from 26 for better detail visibility)

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

  // List of all guide lines (blueprint lines)
  const guideLines3D = useMemo(
    () => [
      // Main bounding floor box (v=0)
      { from: [-1, 0, -1], to: [10.5, 0, -1] },
      { from: [-1, 0, 5], to: [10.5, 0, 5] },
      { from: [-1, 0, -1], to: [-1, 0, 5] },
      { from: [10.5, 0, -1], to: [10.5, 0, 5] },

      // Diagonal projection perspective axes extending out
      { from: [-3, 0, 1], to: [12, 0, 1], dashed: true },
      { from: [-3, 0, 3], to: [12, 0, 3], dashed: true },
      { from: [2, 0, -3], to: [2, 0, 7], dashed: true },
      { from: [7, 0, -3], to: [7, 0, 7], dashed: true },

      // Outer extension lines to corners
      { from: [-2, 0, -2], to: [11.5, 0, 4.75], dashed: true },
      { from: [11, 0, -2], to: [-2.5, 0, 4.75], dashed: true },
    ],
    []
  );

  // Calculate the bounding box of all projected coordinates dynamically to crop the SVG perfectly
  const viewBox = useMemo(() => {
    const all3DPoints: [number, number, number][] = [
      // Polygons
      [0, H, 0],
      [1, H, 0],
      [1, H, 3],
      [3, H, 3],
      [3, H, 0],
      [4, H, 0],
      [4, H, 4],
      [0, H, 4],
      ...dTopOuter,
      ...dTopInner,
      // Base corners
      [0, 0, 0],
      [4, 0, 0],
      [0, 0, 4],
      [4, 0, 4],
      [5.5, 0, 0],
      [9.5, 0, 0],
      [5.5, 0, 4],
      [9.5, 0, 4],
    ];

    const projected = all3DPoints.map(([u, v, w]) => project(u, v, w));
    const xs = projected.map((p) => p[0]);
    const ys = projected.map((p) => p[1]);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const margin = 12; // padding around the drawing boundaries
    const width = maxX - minX + 2 * margin;
    const height = maxY - minY + 2 * margin;

    return {
      minX: minX - margin,
      minY: minY - margin,
      width,
      height,
      maxX,
      maxY,
      value: `${(minX - margin).toFixed(1)} ${(minY - margin).toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)}`,
    };
  }, []);

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
          className={cn(
            "stroke-zinc-500/35 dark:stroke-zinc-400/20", // Increased guide line opacity for better visibility
            l.dashed ? "stroke-dasharray-[4_4]" : "stroke-dasharray-[2_2]"
          )}
          strokeWidth="1"
        />
      );
    });
  }, [guideLines3D]);

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
      ], // Outer Left
      [
        [4, 0, 0],
        [4, H, 0],
        [4, H, 4],
        [4, 0, 4],
      ], // Outer Right
      [
        [0, 0, 4],
        [0, H, 4],
        [4, H, 4],
        [4, 0, 4],
      ], // Front Wall
      [
        [0, 0, 0],
        [0, H, 0],
        [1, H, 0],
        [1, 0, 0],
      ], // Left leg back wall
      [
        [3, 0, 0],
        [3, H, 0],
        [4, H, 0],
        [4, 0, 0],
      ], // Right leg back wall
      [
        [1, 0, 0],
        [1, H, 0],
        [1, H, 3],
        [1, 0, 3],
      ], // Inner Left
      [
        [3, 0, 0],
        [3, H, 0],
        [3, H, 3],
        [3, 0, 3],
      ], // Inner Right
      [
        [1, 0, 3],
        [1, H, 3],
        [3, H, 3],
        [3, 0, 3],
      ], // Inner Front
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

    // --- D Top Face ---
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

    return list.sort((a, b) => a.depth - b.depth);
  }, []);

  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox.value} // Dynamically calculated tight viewBox
      fill="none"
      className={cn("h-auto w-full text-black dark:text-white", className)}
      style={{ overflow: "visible" }}
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
          
          /* Solid shaded backgrounds for 3D faces */
          .face-top {
            fill: #f4f4f5;
            stroke: rgba(0, 0, 0, 0.38); /* Increased stroke contrast */
          }
          .face-side-left {
            fill: #e4e4e7;
            stroke: rgba(0, 0, 0, 0.28);
          }
          .face-side-right {
            fill: #ebebef;
            stroke: rgba(0, 0, 0, 0.32);
          }
          
          .dark .face-top {
            fill: #0c0c0e;
            stroke: rgba(255, 255, 255, 0.35); /* High-contrast white stroke */
          }
          .dark .face-side-left {
            fill: #030304;
            stroke: rgba(255, 255, 255, 0.22);
          }
          .dark .face-side-right {
            fill: #07070a;
            stroke: rgba(255, 255, 255, 0.28);
          }
          
          /* Hatch patterns coloring */
          .hatch-line {
            stroke: rgba(0, 0, 0, 0.18); /* Increased hatch visibility */
          }
          .dark .hatch-line {
            stroke: rgba(255, 255, 255, 0.16);
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
      <g>{guideLinesJSX}</g>

      {/* 2. Technical Metadata Texts (positioned dynamically near bottom right of bounding box) */}
      <text
        x={viewBox.maxX - 62}
        y={viewBox.maxY - 16}
        className="fill-zinc-400/50 font-mono text-[10px] font-bold tracking-wider uppercase select-none dark:fill-zinc-500/35"
      >
        FIG_001
      </text>
      <text
        x={viewBox.maxX - 62}
        y={viewBox.maxY - 6}
        className="fill-zinc-400/30 font-mono text-[7px] tracking-widest uppercase select-none dark:fill-zinc-500/20"
      >
        Isometric Wireframe v1.0
      </text>

      {/* 3. 3D Polygons (drawn back-to-front) */}
      <g>
        {polygons.map((poly, idx) => {
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

          const formattedPoints = formatPoints(poly.points);

          return (
            <g key={`poly-group-${idx}`}>
              <polygon
                points={formattedPoints}
                className={cn("isometric-poly", faceClass)}
                strokeWidth="0"
              />
              {hatchFill !== "none" && (
                <polygon
                  points={formattedPoints}
                  fill={hatchFill}
                  strokeWidth="0"
                  pointerEvents="none"
                />
              )}
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
