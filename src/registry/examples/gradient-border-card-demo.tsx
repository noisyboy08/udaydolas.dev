import { GradientBorderCard } from "@/registry/gradient-border-card";

export default function GradientBorderCardDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 p-4">
      <GradientBorderCard gradientColors={["#6366f1", "#a855f7", "#ec4899"]}>
        <h3 className="mb-1 font-semibold">Animated Gradient Border</h3>
        <p className="text-sm text-muted-foreground">
          The border cycles through a smooth gradient animation continuously.
        </p>
      </GradientBorderCard>
      <GradientBorderCard
        gradientColors={["#06b6d4", "#10b981", "#3b82f6"]}
        animated={false}
      >
        <h3 className="mb-1 font-semibold">Static Gradient Border</h3>
        <p className="text-sm text-muted-foreground">
          A static multi-color border for a premium card look.
        </p>
      </GradientBorderCard>
    </div>
  );
}
