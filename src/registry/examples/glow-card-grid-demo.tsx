import { CodeIcon, LayersIcon, RocketIcon,ShieldIcon, SparklesIcon, ZapIcon } from "lucide-react";

import { GlowCardGrid } from "@/registry/glow-card-grid";

const ITEMS = [
  {
    title: "Motion Effects",
    description: "Smooth, GPU-accelerated animations using CSS and the Web Animations API.",
    icon: <SparklesIcon className="size-4" />,
    glowColor: "#a855f7",
  },
  {
    title: "Zero Dependencies",
    description: "Built with vanilla React and CSS. No extra libraries required.",
    icon: <ZapIcon className="size-4" />,
    glowColor: "#06b6d4",
  },
  {
    title: "Accessible",
    description: "Every component is keyboard-navigable and screen reader friendly.",
    icon: <ShieldIcon className="size-4" />,
    glowColor: "#10b981",
  },
  {
    title: "Composable",
    description: "Designed to be layered and combined for complex UI patterns.",
    icon: <LayersIcon className="size-4" />,
    glowColor: "#f59e0b",
  },
  {
    title: "TypeScript First",
    description: "Full type safety and IntelliSense support out of the box.",
    icon: <CodeIcon className="size-4" />,
    glowColor: "#3b82f6",
  },
  {
    title: "Production Ready",
    description: "Tested in real projects and optimised for performance.",
    icon: <RocketIcon className="size-4" />,
    glowColor: "#ec4899",
  },
];

export default function GlowCardGridDemo() {
  return (
    <div className="w-full max-w-3xl p-4">
      <GlowCardGrid items={ITEMS} cols={3} />
    </div>
  );
}
