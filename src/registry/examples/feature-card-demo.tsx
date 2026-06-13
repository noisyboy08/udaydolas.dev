import { ZapIcon, ShieldIcon, SparklesIcon } from "lucide-react";
import { FeatureCard } from "@/registry/feature-card";

export default function FeatureCardDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 p-2">
      <FeatureCard title="Zero Dependencies" description="Built with vanilla React. No extra packages needed." icon={<ZapIcon className="size-4" />} accentColor="#f59e0b" />
      <FeatureCard title="Accessible" description="Keyboard navigable and screen reader friendly." icon={<ShieldIcon className="size-4" />} accentColor="#10b981" />
      <FeatureCard title="Animated" description="GPU-powered micro-interactions out of the box." icon={<SparklesIcon className="size-4" />} accentColor="#6366f1" />
    </div>
  );
}
