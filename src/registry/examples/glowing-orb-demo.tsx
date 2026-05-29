import { GlowingOrb } from "@/registry/glowing-orb";

export default function GlowingOrbDemo() {
  return (
    <div className="flex items-center justify-center gap-8 py-4">
      <GlowingOrb size="sm" colors={["#6366f1", "#a855f7"]} />
      <GlowingOrb size="md" colors={["#06b6d4", "#10b981", "#6366f1"]} />
      <GlowingOrb size="sm" colors={["#ec4899", "#f97316"]} />
    </div>
  );
}
