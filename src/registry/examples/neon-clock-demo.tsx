import { NeonClock } from "@/registry/neon-clock";

export default function NeonClockDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-4">
      <NeonClock color="purple" />
      <NeonClock color="cyan" />
    </div>
  );
}
