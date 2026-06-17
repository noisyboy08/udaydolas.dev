"use client";

import React, { useMemo } from "react";

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
  // Base coordinates of the isometric grid origin
  const cx = 305;
  const cy = 35;
  const unit = 40; // Scaled up unit size to fill cover banner height

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
      { from: [-8, 0, 1], to: [18, 0, 1], dashed: true },
      { from: [-8, 0, 3], to: [18, 0, 3], dashed: true },
      { from: [2, 0, -8], to: [2, 0, 12], dashed: true },
      { from: [7, 0, -8], to: [7, 0, 12], dashed: true },

      // Outer extension lines to corners
      { from: [-6, 0, -6], to: [16, 0, 10], dashed: true },
      { from: [16, 0, -6], to: [-6, 0, 10], dashed: true },
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
          className={cn(
            "stroke-zinc-500/35 dark:stroke-zinc-400/20", // Guide line styling
            l.dashed ? "stroke-dasharray-[4_4]" : "stroke-dasharray-[2_2]"
          )}
          strokeWidth="1"
        />
      );
    });
  }, [guideLines3D]);

  // Assemble the 3D polygons of U and D blocks (split to resolve non-convex rendering issues)
  const polygons = useMemo(() => {
    interface PolyDef {
      points: [number, number, number][];
      type: "top" | "side-left" | "side-right";
      hatchType: "top" | "side";
      depth: number;
    }

    const list: PolyDef[] = [];

    // --- U Top Face (split into 3 convex sections for perfect painter order) ---
    // 1. Left leg top: u: 0..1, w: 0..3
    const uTopLeftLeg: [number, number, number][] = [
      [0, H, 0],
      [1, H, 0],
      [1, H, 3],
      [0, H, 3],
    ];
    list.push({
      points: uTopLeftLeg,
      type: "top",
      hatchType: "top",
      depth:
        uTopLeftLeg.reduce((sum, p) => sum + p[0] + p[2], 0) /
        uTopLeftLeg.length,
    });

    // 2. Right leg top: u: 3..4, w: 0..3
    const uTopRightLeg: [number, number, number][] = [
      [3, H, 0],
      [4, H, 0],
      [4, H, 3],
      [3, H, 3],
    ];
    list.push({
      points: uTopRightLeg,
      type: "top",
      hatchType: "top",
      depth:
        uTopRightLeg.reduce((sum, p) => sum + p[0] + p[2], 0) /
        uTopRightLeg.length,
    });

    // 3. Connector top: u: 0..4, w: 3..4
    const uTopConnector: [number, number, number][] = [
      [0, H, 3],
      [4, H, 3],
      [4, H, 4],
      [0, H, 4],
    ];
    list.push({
      points: uTopConnector,
      type: "top",
      hatchType: "top",
      depth:
        uTopConnector.reduce((sum, p) => sum + p[0] + p[2], 0) /
        uTopConnector.length,
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

    // --- D Top Face (split into 4 convex pieces for depth sorting) ---
    // 1. D Left bar top
    const dTopL: [number, number, number][] = [
      [5.5, H, 0],
      [6.5, H, 0],
      [6.5, H, 4],
      [5.5, H, 4],
    ];
    list.push({
      points: dTopL,
      type: "top",
      hatchType: "top",
      depth: dTopL.reduce((sum, p) => sum + p[0] + p[2], 0) / dTopL.length,
    });

    // 2. D Top section top
    const dTopT: [number, number, number][] = [
      [6.5, H, 0],
      [8.5, H, 0],
      [7.75, H, 1],
      [6.5, H, 1],
    ];
    list.push({
      points: dTopT,
      type: "top",
      hatchType: "top",
      depth: dTopT.reduce((sum, p) => sum + p[0] + p[2], 0) / dTopT.length,
    });

    // 3. D Bottom section top
    const dTopB: [number, number, number][] = [
      [6.5, H, 3],
      [7.75, H, 3],
      [8.5, H, 4],
      [6.5, H, 4],
    ];
    list.push({
      points: dTopB,
      type: "top",
      hatchType: "top",
      depth: dTopB.reduce((sum, p) => sum + p[0] + p[2], 0) / dTopB.length,
    });

    // 4. D Right section top (curved front-right area)
    const dTopR: [number, number, number][] = [
      [7.75, H, 1],
      [8.5, H, 0],
      [9.5, H, 1],
      [9.5, H, 3],
      [8.5, H, 4],
      [7.75, H, 3],
      [8.5, H, 2.25],
      [8.5, H, 1.75],
    ];
    list.push({
      points: dTopR,
      type: "top",
      hatchType: "top",
      depth: dTopR.reduce((sum, p) => sum + p[0] + p[2], 0) / dTopR.length,
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
      viewBox="0 0 800 300" // Fixed 8:3 ratio to fill cover banner
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
            stroke: rgba(0, 0, 0, 0.38);
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
            stroke: rgba(255, 255, 255, 0.35);
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
            stroke: rgba(0, 0, 0, 0.18);
          }
          .dark .hatch-line {
            stroke: rgba(255, 255, 255, 0.16);
          }
        `,
          }}
        />

        {/* Diagonal Hatching Pattern for Top Faces (aligned to u axis) */}
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

      {/* 2. Technical Metadata Texts (positioned near bottom right) */}
      <text
        x="730"
        y="270"
        className="fill-zinc-400/55 font-mono text-[10px] font-bold tracking-wider uppercase select-none dark:fill-zinc-500/35"
      >
        FIG_001
      </text>
      <text
        x="730"
        y="280"
        className="fill-zinc-400/35 font-mono text-[7px] tracking-widest uppercase select-none dark:fill-zinc-500/20"
      >
        Isometric Wireframe v1.0
      </text>

      {/* 3. 3D Polygons (drawn back-to-front) */}
      <g>
        {polygons.map((poly, idx) => {
          let faceClass = "";
          let hatchFill = "none";

          if (poly.type === "top") {
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
