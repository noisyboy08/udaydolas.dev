import { ParticleCursor } from "@/registry/particle-cursor";

export default function ParticleCursorDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <ParticleCursor color="#6366f1" particleCount={4} size={5} className="cursor-default" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="text-xs font-medium text-white/30">Move your cursor here</p>
      </div>
    </div>
  );
}
