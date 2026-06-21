import { SpotlightCard } from "@/registry/spotlight-card";

export default function SpotlightCardDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 p-2">
      <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.18)">
        <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-white">
          Spotlight Card
        </h3>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Move your cursor over this card to see the spotlight effect follow
          your mouse.
        </p>
      </SpotlightCard>
      <SpotlightCard spotlightColor="rgba(6, 182, 212, 0.18)">
        <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-white">
          Cyan Glow
        </h3>
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Customise the spotlight color to match your brand.
        </p>
      </SpotlightCard>
    </div>
  );
}
