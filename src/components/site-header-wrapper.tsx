"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function SiteHeaderWrapper(props: React.ComponentProps<"header">) {
  const { scrollY } = useScroll();

  const [affix, setAffix] = useState(false);

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    setAffix(latestValue >= 8);
  });

  return <header data-affix={affix} {...props} />;
}

export function SiteHeaderContainer({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  const pathname = usePathname();
  const isShowcase = pathname === "/components/showcase";

  return (
    <div
      className={cn(
        className,
        isShowcase ? "max-w-[1720px]" : "md:max-w-3xl"
      )}
      {...props}
    >
      {children}
    </div>
  );
}
