import { SpinningCircularText } from "@/registry/spinning-circular-text";

export default function SpinningCircularTextDemo() {
  return (
    <div className="flex items-center justify-center gap-8 py-4">
      <SpinningCircularText
        text="UDAY DOLAS • DEVELOPER • "
        radius={60}
        fontSize={11}
        duration={8}
        color="#a855f7"
      />
      <SpinningCircularText
        text="REACT • NEXT.JS • TYPESCRIPT • "
        radius={50}
        fontSize={10}
        duration={12}
        color="#06b6d4"
      />
    </div>
  );
}
