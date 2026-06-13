import { ShimmeringText } from "@/registry/shimmering-text";

export default function ShimmeringTextDemo() {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <ShimmeringText
        text="Shimmering Text"
        className="text-4xl"
        shimmerColor="#a855f7"
        baseColor="#555"
        speed={2}
      />
      <ShimmeringText
        text="Build Something Beautiful"
        className="text-lg"
        shimmerColor="#06b6d4"
        baseColor="#666"
        speed={3}
      />
    </div>
  );
}
