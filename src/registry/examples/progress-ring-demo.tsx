import { ProgressRing } from "@/registry/progress-ring";

export default function ProgressRingDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-4">
      <ProgressRing value={85} color="#6366f1" label="TypeScript" />
      <ProgressRing value={92} color="#10b981" label="React" />
      <ProgressRing
        value={70}
        color="#a855f7"
        label="Python"
        size={100}
        strokeWidth={8}
      />
    </div>
  );
}
