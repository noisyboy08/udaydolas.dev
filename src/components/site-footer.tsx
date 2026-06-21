"use client";

import { usePathname } from "next/navigation";

import { WordmarkHoverEffect } from "@/components/wordmark-hover-effect";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const pathname = usePathname();
  const isShowcase = pathname === "/components/showcase";

  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div
        className={cn(
          "screen-line-before mx-auto pt-4",
          isShowcase ? "max-w-[1720px]" : "md:max-w-3xl"
        )}
      >
        <p className="mb-1 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Inspired by tailwindcss.com & ui.shadcn.com
        </p>

        <p className="mb-4 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Built by{" "}
          <a
            className="link"
            href="https://github.com/noisyboy08"
            target="_blank"
            rel="noopener"
          >
            Uday Dolas
          </a>
          .
        </p>

        <div className="screen-line-before screen-line-after h-8">
          <div className="h-full w-full bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56" />
        </div>

        {/* Large visual wordmark signature */}
        <div className="flex justify-center px-8 py-6 select-none">
          <WordmarkHoverEffect className="h-auto w-full max-w-3xl" />
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}
