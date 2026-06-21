import { SlideToUnlock } from "@/registry/slide-to-unlock";

export default function SlideToUnlockDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <SlideToUnlock onUnlock={() => {}} accentColor="#6366f1" />
      <SlideToUnlock
        onUnlock={() => {}}
        accentColor="#06b6d4"
        label="Slide to confirm"
        unlockedLabel="Confirmed!"
      />
    </div>
  );
}
