import { BellIcon, BookmarkIcon, HeartIcon, MoonIcon, SunIcon } from "lucide-react";

import { IconSwap } from "@/registry/icon-swap";

export default function IconSwapDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-4">
      <IconSwap iconA={<HeartIcon className="size-4" />} iconB={<HeartIcon className="size-4 fill-rose-500 text-rose-500" />} label="Like" direction="flip" />
      <IconSwap iconA={<BookmarkIcon className="size-4" />} iconB={<BookmarkIcon className="size-4 fill-amber-400 text-amber-400" />} label="Save" direction="slide" />
      <IconSwap iconA={<BellIcon className="size-4" />} iconB={<BellIcon className="size-4 fill-blue-400 text-blue-400" />} label="Notify" direction="fade" />
      <IconSwap iconA={<SunIcon className="size-4 text-amber-400" />} iconB={<MoonIcon className="size-4 text-violet-400" />} direction="flip" />
    </div>
  );
}
