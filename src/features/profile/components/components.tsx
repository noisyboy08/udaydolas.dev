import {
  AlignLeftIcon,
  ArrowRightIcon,
  ChevronsUpDownIcon,
  CircleIcon,
  DropletIcon,
  GithubIcon,
  Grid3X3Icon,
  InfinityIcon,
  MenuIcon,
  RefreshCwIcon,
  SlidersHorizontalIcon,
  SmileIcon,
  SunMoonIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Panel, PanelHeader, PanelTitle } from "./panel";

const HOME_COMPONENTS = [
  {
    title: "Chevrons Up Down Icon",
    slug: "chevrons-up-down-icon",
    icon: ChevronsUpDownIcon,
  },
  {
    title: "Mobius Loop Icon",
    slug: "mobius-loop-icon",
    icon: InfinityIcon,
  },
  {
    title: "Spinning Circular Text",
    slug: "spinning-circular-text",
    icon: CircleIcon,
  },
  {
    title: "Dot Grid Spotlight",
    slug: "dot-grid-spotlight",
    icon: Grid3X3Icon,
  },
  {
    title: "Icon Swap",
    slug: "icon-swap",
    icon: RefreshCwIcon,
  },
  {
    title: "Brand Assets Menu",
    slug: "brand-assets-menu",
    icon: MenuIcon,
  },
  {
    title: "Fluid Gradient Text",
    slug: "fluid-gradient-text",
    icon: DropletIcon,
  },
  {
    title: "TOC Minimap",
    slug: "toc-minimap",
    icon: AlignLeftIcon,
  },
  {
    title: "Elastic Slider",
    slug: "elastic-slider",
    icon: SlidersHorizontalIcon,
  },
  {
    title: "GitHub Contributions",
    slug: "github-contributions",
    icon: GithubIcon,
  },
  {
    title: "Theme Toggle Effect",
    slug: "theme-toggle-effect",
    icon: SunMoonIcon,
  },
  {
    title: "Twemoji",
    slug: "twemoji",
    icon: SmileIcon,
  },
];

export function Components() {
  return (
    <Panel id="components">
      <PanelHeader>
        <PanelTitle>
          Components
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            (30)
          </sup>
        </PanelTitle>
      </PanelHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-b border-edge">
        {HOME_COMPONENTS.map((item) => {
          const Icon = item.icon;
          const isMock = [
            "chevrons-up-down-icon",
            "mobius-loop-icon",
            "brand-assets-menu",
            "toc-minimap",
            "twemoji",
          ].includes(item.slug);

          const content = (
            <>
              <span className="relative flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground shadow-sm">
                <Icon className="size-3.5" aria-hidden />
              </span>
              <span
                className={cn(
                  "truncate text-sm font-semibold underline-offset-4",
                  isMock ? "text-zinc-500" : "group-hover:underline"
                )}
              >
                {item.title}
              </span>
            </>
          );

          const className = cn(
            "flex min-h-12 items-center gap-3 border-edge px-4 py-3",
            "sm:border-r md:[&:nth-child(3n)]:border-r-0 sm:max-md:[&:nth-child(2n)]:border-r-0 sm:border-r",
            "[&:nth-child(n+2)]:border-t sm:[&:nth-child(n+3)]:border-t md:[&:nth-child(n+4)]:border-t",
            isMock
              ? "cursor-default select-none bg-zinc-950/20"
              : "group transition-colors hover:bg-accent/60"
          );

          if (isMock) {
            return (
              <div key={item.title} className={className}>
                {content}
              </div>
            );
          }

          return (
            <Link
              key={item.title}
              href={`/components/${item.slug}`}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center py-2.5">
        <Button variant="default" asChild>
          <Link href="/components">
            All Components
            <ArrowRightIcon className="ml-1.5 size-4" />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
