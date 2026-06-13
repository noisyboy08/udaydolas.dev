import { TypewriterEffect } from "@/registry/typewriter-effect";

export default function TypewriterEffectDemo() {
  return (
    <div className="flex flex-col items-center gap-2 py-2">
      <p className="text-3xl font-bold">
        I am a{" "}
        <TypewriterEffect
          words={["Developer", "Designer", "Builder", "Creator"]}
          className="text-violet-400"
          typingSpeed={80}
          deletingSpeed={40}
        />
      </p>
      <TypewriterEffect
        words={["Building the future", "One component at a time", "With React & Next.js"]}
        className="text-lg text-muted-foreground"
        typingSpeed={60}
      />
    </div>
  );
}
