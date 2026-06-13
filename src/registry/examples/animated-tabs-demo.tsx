import { AnimatedTabs } from "@/registry/animated-tabs";
import { CodeIcon, EyeIcon, SettingsIcon } from "lucide-react";

export default function AnimatedTabsDemo() {
  return (
    <div className="w-full max-w-sm">
      <AnimatedTabs
        variant="pill"
        accentColor="#6366f1"
        tabs={[
          {
            label: "Preview",
            icon: <EyeIcon className="size-3.5" />,
            content: <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">Preview panel content goes here.</div>,
          },
          {
            label: "Code",
            icon: <CodeIcon className="size-3.5" />,
            content: <div className="rounded-lg bg-zinc-950 p-4 font-mono text-xs text-zinc-300">{"<AnimatedTabs tabs={[...]} />"}</div>,
          },
          {
            label: "Settings",
            icon: <SettingsIcon className="size-3.5" />,
            content: <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">Settings panel content goes here.</div>,
          },
        ]}
      />
    </div>
  );
}
