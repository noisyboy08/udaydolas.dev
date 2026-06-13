"use client";

import { useState } from "react";
import { StepProgress } from "@/registry/step-progress";

const STEPS = ["Cart", "Shipping", "Payment", "Review"];

export default function StepProgressDemo() {
  const [current, setCurrent] = useState(1);

  return (
    <div className="flex w-full max-w-md flex-col gap-8 py-4">
      <StepProgress steps={STEPS} current={current} variant="numbered" accentColor="#6366f1" />
      <StepProgress steps={STEPS} current={current} variant="bars" accentColor="#06b6d4" />
      <StepProgress steps={STEPS} current={current} variant="dots" accentColor="#a855f7" />
      <div className="flex gap-2">
        <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">← Prev</button>
        <button onClick={() => setCurrent((c) => Math.min(STEPS.length - 1, c + 1))} className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm">Next →</button>
      </div>
    </div>
  );
}
