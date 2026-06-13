import { GlowingOrb } from "@/registry/glowing-orb";
import { TiltCard } from "@/registry/tilt-card";

export default function TiltCardDemo() {
  return (
    <div className="flex items-center justify-center py-2">
      <TiltCard className="w-44 border border-border bg-card p-4" maxTilt={15}>
        <div className="flex flex-col items-center gap-2.5 text-center">
          <GlowingOrb size="sm" colors={["#6366f1", "#a855f7"]} />
          <p className="text-xs font-semibold font-sans">Tilt Card</p>
          <p className="text-[10px] text-muted-foreground font-sans">Hover to tilt & glare</p>
        </div>
      </TiltCard>
    </div>
  );
}
