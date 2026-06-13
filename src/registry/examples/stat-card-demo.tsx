import { UsersIcon, StarIcon, CodeIcon, ZapIcon } from "lucide-react";
import { StatCard } from "@/registry/stat-card";

export default function StatCardDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-2 gap-3">
      <StatCard label="GitHub Stars" value="4,703" change={12.4} icon={<StarIcon className="size-5" />} accentColor="#f59e0b" />
      <StatCard label="Components" value={50} suffix="+" change={28.1} icon={<CodeIcon className="size-5" />} accentColor="#6366f1" />
      <StatCard label="Users" value="2.1k" change={-3.2} icon={<UsersIcon className="size-5" />} accentColor="#10b981" />
      <StatCard label="Build Time" value="1.2" suffix="s" change={-18} icon={<ZapIcon className="size-5" />} accentColor="#06b6d4" />
    </div>
  );
}
