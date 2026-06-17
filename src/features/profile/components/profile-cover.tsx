import { BrandContextMenu } from "@/components/brand-context-menu";
import { IsometricUDMark } from "@/components/isometric-ud-mark";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "aspect-2/1 border-x border-edge select-none overflow-hidden",
          "flex items-center justify-center text-black dark:text-white",
          "screen-line-before screen-line-after before:-top-px after:-bottom-px",
          "bg-zinc-50 dark:bg-zinc-950"
        )}
      >
        <IsometricUDMark
          id="js-cover-mark"
          className="w-full h-full"
        />
      </div>
    </BrandContextMenu>
  );
}
