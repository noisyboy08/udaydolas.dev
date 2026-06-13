"use client";

import { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ElasticSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  label?: string;
  formatValue?: (v: number) => string;
  className?: string;
  accentColor?: string;
};

export function ElasticSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  label,
  formatValue = (v) => String(v),
  className,
  accentColor = "#6366f1",
}: ElasticSliderProps) {
  const [value, setValue] = useState(defaultValue);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percent = ((value - min) / (max - min)) * 100;

  const getValueFromEvent = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return value;

      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const raw = ((clientX - rect.left) / rect.width) * (max - min) + min;
      const stepped = Math.round(raw / step) * step;
      return Math.max(min, Math.min(max, stepped));
    },
    [min, max, step, value]
  );

  return (
    <div className={cn("w-full select-none", className)}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm font-medium">
          <span>{label}</span>
          <span
            className="font-mono text-xs transition-all duration-150"
            style={{ color: accentColor }}
          >
            {formatValue(value)}
          </span>
        </div>
      )}

      <div className="relative flex h-10 items-center">
        {/* Track */}
        <div
          ref={trackRef}
          className="relative h-1.5 w-full cursor-pointer rounded-full bg-muted"
          onMouseDown={(e) => {
            setDragging(true);
            setValue(getValueFromEvent(e));
          }}
        >
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-none"
            style={{ width: `${percent}%`, background: accentColor }}
          />

          {/* Thumb */}
          <div
            className={cn(
              "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150",
              dragging && "scale-125"
            )}
            style={{ left: `${percent}%` }}
          >
            <div
              className="size-4 rounded-full border-2 border-background shadow-md"
              style={{ background: accentColor }}
            />
          </div>
        </div>

        {/* Invisible range input for a11y */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
        />
      </div>
    </div>
  );
}
