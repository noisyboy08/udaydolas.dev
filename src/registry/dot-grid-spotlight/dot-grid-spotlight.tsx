"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type DotGridSpotlightProps = {
  className?: string;
  dotColor?: string;
  spotlightColor?: string;
  dotSize?: number;
  gap?: number;
};

export function DotGridSpotlight({
  className,
  dotColor = "rgba(255,255,255,0.25)",
  spotlightColor = "rgba(139,92,246,0.6)",
  dotSize = 2,
  gap = 20,
}: DotGridSpotlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;
      const radius = 100;

      for (let x = gap / 2; x < canvas.width; x += gap) {
        for (let y = gap / 2; y < canvas.height; y += gap) {
          const dist = Math.hypot(x - mx, y - my);
          const t = Math.max(0, 1 - dist / radius);
          const r = dotSize + t * dotSize;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);

          if (t > 0) {
            // Parse spotlightColor rgba
            ctx.fillStyle = spotlightColor;
            ctx.globalAlpha = 0.2 + t * 0.8;
          } else {
            ctx.fillStyle = dotColor;
            ctx.globalAlpha = 1;
          }
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [dotColor, spotlightColor, dotSize, gap]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block h-full w-full", className)}
    />
  );
}
