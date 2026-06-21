import { Timeline } from "@/registry/timeline";

const ITEMS = [
  {
    title: "Project kickoff",
    description: "Tech stack decided.",
    date: "Jan 2025",
    status: "done" as const,
  },
  {
    title: "Design system",
    description: "Tokens and patterns established.",
    date: "Feb 2025",
    status: "done" as const,
  },
  {
    title: "v1.0 release",
    description: "Public launch on Product Hunt.",
    date: "Mar 2025",
    status: "active" as const,
  },
];

export default function TimelineDemo() {
  return (
    <div className="w-full max-w-sm py-1">
      <Timeline items={ITEMS} accentColor="#6366f1" />
    </div>
  );
}
