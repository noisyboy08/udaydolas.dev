import { TextFlip } from "@/registry/text-flip";

export default function TextFlipDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-6 text-center">
      <p className="text-3xl font-bold">
        I build <TextFlip words={["websites", "apps", "APIs", "UIs", "products"]} accentColor="#6366f1" />
      </p>
      <p className="text-xl font-semibold text-muted-foreground">
        Stack: <TextFlip words={["Next.js", "React", "TypeScript", "Tailwind", "Python"]} accentColor="#06b6d4" interval={1800} />
      </p>
    </div>
  );
}
