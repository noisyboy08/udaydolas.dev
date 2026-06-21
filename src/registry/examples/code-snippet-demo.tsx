import { CodeSnippet } from "@/registry/code-snippet";

const CODE = `import { GlowingOrb } from "@/registry/glowing-orb";

export default function Demo() {
  return <GlowingOrb size="md" colors={["#6366f1", "#a855f7"]} />;
}`;

export default function CodeSnippetDemo() {
  return (
    <div className="w-full max-w-lg">
      <CodeSnippet
        code={CODE}
        language="tsx"
        filename="demo.tsx"
        showLineNumbers
      />
    </div>
  );
}
