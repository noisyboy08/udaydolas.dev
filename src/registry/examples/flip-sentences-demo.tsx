import { FlipSentences } from "@/registry/flip-sentences";

const SENTENCES = [
  "Turning ideas into reality.",
  "Software Engineer.",
  "Tech Explorer & Innovator.",
];

export default function FlipSentencesDemo() {
  return (
    <div className="flex items-center justify-center p-4">
      <FlipSentences sentences={SENTENCES} />
    </div>
  );
}
