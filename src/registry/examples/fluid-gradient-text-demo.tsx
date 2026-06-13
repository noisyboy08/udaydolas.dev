import { FluidGradientText } from "@/registry/fluid-gradient-text";

export default function FluidGradientTextDemo() {
  return (
    <div className="flex flex-col items-center gap-5 py-4">
      <FluidGradientText text="Fluid Gradient" className="text-5xl" speed={4} />
      <FluidGradientText text="Crafted with Code" className="text-2xl" colors={["#06b6d4", "#3b82f6", "#6366f1"]} speed={3} />
      <FluidGradientText text="udaydolas.dev" className="text-xl font-mono" colors={["#10b981", "#06b6d4", "#6366f1", "#a855f7"]} speed={5} />
    </div>
  );
}
