import { NumberCounter } from "@/registry/number-counter";

export default function NumberCounterDemo() {
  return (
    <div className="grid grid-cols-2 gap-6 py-4 sm:grid-cols-4">
      {[
        { to: 4700, suffix: "+", label: "GitHub Stars", color: "#6366f1" },
        { to: 98, suffix: "%", label: "Client Satisfaction", color: "#10b981" },
        { to: 50, suffix: "+", label: "Components", color: "#a855f7" },
        { to: 12, suffix: "", label: "Projects Shipped", color: "#06b6d4" },
      ].map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1">
          <NumberCounter
            to={s.to}
            suffix={s.suffix}
            className="text-3xl font-black"
            separator=","
          />
          <span className="text-xs text-muted-foreground text-center">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
