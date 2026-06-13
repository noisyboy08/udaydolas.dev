"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
};

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  radius = 80,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      setDelta({ x: dx * strength, y: dy * strength });
      setActive(true);
    }
  };

  const handleLeave = () => {
    setDelta({ x: 0, y: 0 });
    setActive(false);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white",
        "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg",
        "transition-shadow duration-300 hover:shadow-violet-500/40 hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
        className
      )}
      style={{
        transform: `translate(${delta.x}px, ${delta.y}px)`,
        transition: active ? "transform 0.1s ease-out" : "transform 0.4s cubic-bezier(.34,1.56,.64,1)",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}
