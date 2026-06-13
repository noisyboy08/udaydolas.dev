"use client";

import { LockIcon, UnlockIcon } from "lucide-react";
import { useCallback, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type SlideToUnlockProps = {
  onUnlock?: () => void;
  label?: string;
  unlockedLabel?: string;
  className?: string;
  accentColor?: string;
};

export function SlideToUnlock({
  onUnlock,
  label = "Slide to unlock",
  unlockedLabel = "Unlocked!",
  className,
  accentColor = "#6366f1",
}: SlideToUnlockProps) {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);

  const THUMB_W = 48;

  const getTrackWidth = () => trackRef.current?.offsetWidth ?? 280;

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (unlocked) return;
    dragging.current = true;
    startX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [unlocked]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const trackW = getTrackWidth();
    const max = trackW - THUMB_W;
    const delta = e.clientX - startX.current;
    const p = Math.max(0, Math.min(1, delta / max));
    setProgress(p);
  }, []);

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    if (progress >= 0.9) {
      setProgress(1);
      setUnlocked(true);
      onUnlock?.();
    } else {
      setProgress(0);
    }
  }, [progress, onUnlock]);

  const trackW = typeof window !== "undefined" ? (trackRef.current?.offsetWidth ?? 280) : 280;
  const max = trackW - THUMB_W;
  const thumbX = progress * max;

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative flex h-14 w-72 select-none items-center overflow-hidden rounded-full border border-border bg-muted",
        className
      )}
    >
      {/* Fill */}
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-none"
        style={{
          width: THUMB_W + thumbX,
          background: unlocked ? "#22c55e" : accentColor,
          opacity: 0.2 + progress * 0.3,
          transition: unlocked ? "background 0.3s" : undefined,
        }}
      />

      {/* Label */}
      <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-muted-foreground pointer-events-none">
        {unlocked ? unlockedLabel : label}
      </span>

      {/* Thumb */}
      <div
        className="absolute flex size-12 cursor-grab items-center justify-center rounded-full shadow-md active:cursor-grabbing"
        style={{
          left: thumbX,
          background: unlocked ? "#22c55e" : accentColor,
          transition: !dragging.current ? "left 0.3s cubic-bezier(.34,1.56,.64,1)" : undefined,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {unlocked ? (
          <UnlockIcon className="size-5 text-white" />
        ) : (
          <LockIcon className="size-5 text-white" />
        )}
      </div>
    </div>
  );
}
