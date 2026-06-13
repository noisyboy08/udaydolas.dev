import { DotGridSpotlight } from "@/registry/dot-grid-spotlight";

export default function DotGridSpotlightDemo() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
      <DotGridSpotlight
        dotColor="rgba(255,255,255,0.15)"
        spotlightColor="rgba(139,92,246,0.9)"
        dotSize={2}
        gap={18}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-sm font-medium text-white/40">Move your cursor</p>
      </div>
    </div>
  );
}
