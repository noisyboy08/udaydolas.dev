import { MagneticButton } from "@/registry/magnetic-button";

export default function MagneticButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-8">
      <MagneticButton>Hover Me</MagneticButton>
      <MagneticButton
        strength={0.6}
        className="bg-gradient-to-r from-cyan-500 to-blue-600"
      >
        Magnetic Pull
      </MagneticButton>
      <MagneticButton
        strength={0.3}
        className="bg-gradient-to-r from-rose-500 to-pink-600"
      >
        Subtle Attract
      </MagneticButton>
    </div>
  );
}
