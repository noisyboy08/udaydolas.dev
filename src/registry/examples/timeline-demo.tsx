import { Timeline } from "@/registry/timeline";
import { CheckIcon } from "lucide-react";

const ITEMS = [
  { title: "Project kickoff", description: "Requirements gathered and tech stack decided.", date: "Jan 2025", status: "done" as const },
  { title: "Design system built", description: "Tokens, components, and patterns established.", date: "Feb 2025", status: "done" as const },
  { title: "Core components", description: "Building the component registry.", date: "Mar 2025", status: "active" as const },
  { title: "50+ components", description: "Expanding the library with new primitives.", date: "Jun 2025", status: "pending" as const },
  { title: "v1.0 release", description: "Public launch on Product Hunt.", date: "Jul 2025", status: "pending" as const },
];

export default function TimelineDemo() {
  return (
    <div className="w-full max-w-sm py-2">
      <Timeline items={ITEMS} accentColor="#6366f1" />
    </div>
  );
}
