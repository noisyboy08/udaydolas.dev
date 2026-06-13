import { GlowingOrb } from "@/registry/glowing-orb";
import { TiltCard } from "@/registry/tilt-card";

export default function TiltCardDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-4">
      <TiltCard className="w-48 border border-border bg-card p-6" maxTilt={15}>
        <div className="flex flex-col items-center gap-3 text-center">
          <GlowingOrb size="sm" colors={["#6366f1", "#a855f7"]} />
          <p className="text-sm font-semibold">Tilt Card</p>
          <p className="text-xs text-muted-foreground">Hover me</p>
        </div>
      </TiltCard>
      <TiltCard className="w-48 border border-border bg-card p-6" maxTilt={10} glare={false}>
        <div className="flex flex-col items-center gap-3 text-center">
          <GlowingOrb size="sm" colors={["#06b6d4", "#10b981"]} />
          <p className="text-sm font-semibold">No Glare</p>
          <p className="text-xs text-muted-foreground">Subtle tilt</p>
        </div>
      </TiltCard>
    </div>
  );
}
