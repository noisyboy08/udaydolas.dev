import { Accordion } from "@/registry/accordion";

const FAQ = [
  { question: "What tech stack is used?", answer: "Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, and MDX for content." },
  { question: "Are components copy-paste ready?", answer: "Yes. Every component is self-contained with no external runtime dependencies beyond React." },
  { question: "Can I use these in commercial projects?", answer: "Absolutely — all components are MIT licensed and free to use in any project." },
  { question: "How do I install a component?", answer: "Use the CLI: pnpm dlx shadcn add [component-name], or copy the source directly from the registry." },
];

export default function AccordionDemo() {
  return (
    <div className="w-full max-w-sm">
      <Accordion items={FAQ} accentColor="#6366f1" />
    </div>
  );
}
