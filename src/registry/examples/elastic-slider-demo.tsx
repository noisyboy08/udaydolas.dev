import { ElasticSlider } from "@/registry/elastic-slider";

export default function ElasticSliderDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6 p-4">
      <ElasticSlider
        label="Opacity"
        min={0}
        max={100}
        defaultValue={60}
        formatValue={(v) => `${v}%`}
        accentColor="#6366f1"
      />
      <ElasticSlider
        label="Blur"
        min={0}
        max={40}
        step={1}
        defaultValue={12}
        formatValue={(v) => `${v}px`}
        accentColor="#06b6d4"
      />
      <ElasticSlider
        label="Saturation"
        min={0}
        max={10}
        step={0.1}
        defaultValue={5}
        formatValue={(v) => v.toFixed(1)}
        accentColor="#a855f7"
      />
    </div>
  );
}
