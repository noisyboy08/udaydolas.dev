"use client";

import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isShowcase = pathname === "/components/showcase";

  return (
    <div
      className={cn(
        "mx-auto border-x border-edge",
        isShowcase ? "max-w-[1720px]" : "md:max-w-3xl"
      )}
    >
      <div
        className={cn(
          "h-8 px-2",
          "screen-line-after",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
        )}
      />

      {children}
    </div>
  );
}
