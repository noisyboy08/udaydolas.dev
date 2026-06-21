import { MorphingText } from "@/registry/morphing-text";

const WORDS = ["ENGINEER", "DESIGNER", "BUILDER", "CREATOR", "INNOVATOR"];

export default function MorphingTextDemo() {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase">
        I am a
      </p>
      <MorphingText
        words={WORDS}
        className="text-3xl font-bold text-white"
        interval={2200}
      />
    </div>
  );
}
