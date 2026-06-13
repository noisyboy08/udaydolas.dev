import { ScrollFadeEffect } from "@/registry/scroll-fade-effect";

export default function ScrollFadeEffectDemo() {
  return (
    <div className="flex w-full flex-col gap-4 py-4">
      {["up", "down", "left", "right"].map((dir, i) => (
        <ScrollFadeEffect key={dir} direction={dir as "up"} delay={i * 100}>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-3">
            <div className="size-8 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500" />
            <div>
              <p className="text-sm font-semibold capitalize">Fade from {dir}</p>
              <p className="text-xs text-muted-foreground">Scroll to trigger this animation</p>
            </div>
          </div>
        </ScrollFadeEffect>
      ))}
    </div>
  );
}
