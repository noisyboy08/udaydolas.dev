import { GradientBorderCard } from "@/registry/gradient-border-card";

export default function GradientBorderCardDemo() {
  return (
    <div className="flex flex-col gap-4 p-4 w-full max-w-sm">
      <GradientBorderCard gradientColors={["#6366f1", "#a855f7", "#ec4899"]}>
        <h3 className="font-semibold mb-1">Animated Gradient Border</h3>
        <p className="text-sm text-muted-foreground">The border cycles through a smooth gradient animation continuously.</p>
      </GradientBorderCard>
      <GradientBorderCard gradientColors={["#06b6d4", "#10b981", "#3b82f6"]} animated={false}>
        <h3 className="font-semibold mb-1">Static Gradient Border</h3>
        <p className="text-sm text-muted-foreground">A static multi-color border for a premium card look.</p>
      </GradientBorderCard>
    </div>
  );
}
