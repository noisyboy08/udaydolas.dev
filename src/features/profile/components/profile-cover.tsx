import { BrandContextMenu } from "@/components/brand-context-menu";
import { IsometricUDMark } from "@/components/isometric-ud-mark";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "relative aspect-[4/3] border-x border-edge select-none sm:aspect-[5/2]",
          "flex items-center justify-center text-black dark:text-white",
          "screen-line-after after:-bottom-px",
          "bg-zinc-50 dark:bg-zinc-950"
        )}
      >
        {/* Full-width border line aligned with the top of the ProfileHeader, behind the SVG logo */}
        <div className="pointer-events-none absolute bottom-12 -left-[100vw] h-px w-[200vw] bg-edge sm:bottom-20" />
        <IsometricUDMark id="js-cover-mark" className="h-full w-full" />
      </div>
    </BrandContextMenu>
  );
}
