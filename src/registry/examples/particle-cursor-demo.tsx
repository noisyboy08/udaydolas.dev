import { ParticleCursor } from "@/registry/particle-cursor";

export default function ParticleCursorDemo() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border bg-zinc-950">
      <ParticleCursor color="#6366f1" particleCount={4} size={5} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-sm font-medium text-white/30">Move your cursor here</p>
      </div>
    </div>
  );
}
