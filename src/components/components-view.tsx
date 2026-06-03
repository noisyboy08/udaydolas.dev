"use client";

import {
  BoxIcon,
  CheckIcon,
  CircleIcon,
  ClipboardIcon,
  ClockIcon,
  Grid2X2Icon,
  Grid3X3Icon,
  LayoutGridIcon,
  PanelTopIcon,
  SparklesIcon,
  SunIcon,
  TextCursorInputIcon,
  WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import React, { Suspense, useMemo, useState } from "react";

import { Index } from "@/__registry__/index";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/blog";

type ComponentsMode = "list" | "showcase";
type ShowcaseSize = "sm" | "md" | "wide" | "large" | "tall" | "hero";

const PACKAGE_MANAGERS = ["pnpm", "yarn", "npm", "bun"] as const;

const SHOWCASE_CONFIG: Record<
  string,
  { demo: string; size: ShowcaseSize; label: string; className?: string }
> = {
  "apple-hello-effect": {
    demo: "apple-hello-effect-en-demo",
    size: "large",
    label: "Apple Hello Effect",
  },
  "theme-switcher": {
    demo: "theme-switcher-demo",
    size: "sm",
    label: "Theme Switcher",
  },
  "wheel-picker": {
    demo: "wheel-picker-demo",
    size: "tall",
    label: "Wheel Picker",
  },
  "work-experience": {
    demo: "work-experience-demo",
    size: "hero",
    label: "Work Experience",
    className: "items-start justify-start overflow-y-auto p-6",
  },
  "flip-sentences": {
    demo: "flip-sentences-demo",
    size: "wide",
    label: "Flip Sentences",
  },
  "glowing-orb": {
    demo: "glowing-orb-demo",
    size: "wide",
    label: "Glowing Orb",
  },
  "morphing-text": {
    demo: "morphing-text-demo",
    size: "md",
    label: "Morphing Text",
  },
  "spotlight-card": {
    demo: "spotlight-card-demo",
    size: "large",
    label: "Spotlight Card",
  },
  "neon-clock": {
    demo: "neon-clock-demo",
    size: "wide",
    label: "Neon Clock",
  },
};

const COMPONENT_ICONS = [
  SparklesIcon,
  BoxIcon,
  CircleIcon,
  ClockIcon,
  WandSparklesIcon,
  TextCursorInputIcon,
  SunIcon,
  Grid2X2Icon,
  PanelTopIcon,
];

export function ComponentsView({
  posts,
  mode = "list",
}: {
  posts: Post[];
  mode?: ComponentsMode;
}) {
  return (
    <div className="[--color-react:#087EA4] dark:[--color-react:#58C4DC]">
      {mode === "list" ? (
        <ComponentsList posts={posts} />
      ) : (
        <ComponentsShowcase posts={posts} />
      )}
    </div>
  );
}

function ComponentsList({ posts }: { posts: Post[] }) {
  return (
    <>
      <InstallCommand defaultComponent={posts[0]?.slug ?? "theme-switcher"} />
      <div className="screen-line-before h-8 bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56" />
      <div className="flex items-center justify-between border-b border-edge px-4 py-2.5">
        <span className="text-sm font-medium text-muted-foreground">
          {posts.length} components
        </span>
        <ViewToggle active="list" />
      </div>
      <div className="grid border-b border-edge sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => {
          const Icon = COMPONENT_ICONS[index % COMPONENT_ICONS.length];

          return (
            <Link
              key={post.slug}
              href={`/components/${post.slug}`}
              className={cn(
                "group flex min-h-12 items-center gap-3 border-edge px-4 py-3 transition-colors hover:bg-accent/60",
                "sm:border-r lg:[&:nth-child(3n)]:border-r-0",
                "sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r",
                "[&:nth-child(n+2)]:border-t sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+4)]:border-t"
              )}
            >
              <span className="relative flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground shadow-sm">
                <Icon className="size-3.5" aria-hidden />
                {post.metadata.new && (
                  <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-info ring-2 ring-background" />
                )}
              </span>
              <span className="truncate text-sm font-semibold underline-offset-4 group-hover:underline">
                {post.metadata.title}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function InstallCommand({ defaultComponent }: { defaultComponent: string }) {
  const [manager, setManager] =
    useState<(typeof PACKAGE_MANAGERS)[number]>("pnpm");
  const [copied, setCopied] = useState(false);

  const command = useMemo(() => {
    const runners = {
      pnpm: "pnpm dlx shadcn add",
      yarn: "yarn dlx shadcn add",
      npm: "npx shadcn add",
      bun: "bunx shadcn add",
    };

    return `${runners[manager]} @udaydolas/${defaultComponent}`;
  }, [defaultComponent, manager]);

  const copyCommand = async () => {
    await navigator.clipboard?.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="border-b border-edge px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          <Icons.pnpm className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex items-center gap-4 overflow-x-auto font-mono text-sm">
            {PACKAGE_MANAGERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setManager(item)}
                className={cn(
                  "relative py-1 text-muted-foreground transition-colors hover:text-foreground",
                  manager === item && "text-foreground"
                )}
              >
                {item}
                {manager === item && (
                  <span className="absolute right-0 -bottom-px left-0 h-0.5 bg-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={copyCommand}
          className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Copy install command"
          title="Copy install command"
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <ClipboardIcon className="size-4" />
          )}
        </button>
      </div>
      <pre className="mt-3 overflow-x-auto pb-1 font-mono text-sm text-muted-foreground">
        <code>{command}</code>
      </pre>
    </div>
  );
}

function ComponentsShowcase({ posts }: { posts: Post[] }) {
  return (
    <>
      <div className="flex items-center justify-end border-b border-edge px-4 py-2.5">
        <ViewToggle active="showcase" />
      </div>
      <div className="grid auto-rows-[152px] grid-cols-1 gap-1 border-b border-edge bg-edge p-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const config = SHOWCASE_CONFIG[post.slug];

          if (config) {
            return (
              <ShowcaseCell
                key={post.slug}
                slug={post.slug}
                demoName={config.demo}
                label={config.label}
                size={config.size}
                className={config.className}
              />
            );
          }

          return <FallbackCell key={post.slug} post={post} />;
        })}
      </div>
    </>
  );
}

function ShowcaseCell({
  slug,
  demoName,
  label,
  size,
  className,
}: {
  slug: string;
  demoName: string;
  label: string;
  size: ShowcaseSize;
  className?: string;
}) {
  const entry = Index[demoName];
  const Component = entry?.component;

  const sizeClass: Record<ShowcaseSize, string> = {
    sm: "min-h-38",
    md: "row-span-2 min-h-76",
    wide: "sm:col-span-2 min-h-38",
    large: "sm:col-span-2 row-span-2 min-h-76",
    tall: "row-span-2 min-h-76",
    hero: "sm:col-span-2 row-span-3 min-h-114",
  };

  return (
    <section
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-border bg-background",
        sizeClass[size]
      )}
    >
      <div
        className={cn(
          "flex min-h-0 flex-1 items-center justify-center overflow-hidden p-5",
          className
        )}
      >
        {Component ? (
          <Suspense
            fallback={
              <div className="text-xs text-muted-foreground">Loading...</div>
            }
          >
            <div className="flex h-full w-full items-center justify-center">
              <Component />
            </div>
          </Suspense>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Icons.react className="size-8 text-[--color-react] opacity-30" />
            <span className="text-xs opacity-60">Preview unavailable</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-edge px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icons.react
            className="size-3.5 shrink-0 text-[--color-react]"
            aria-hidden
          />
          <span className="truncate text-xs font-medium text-muted-foreground">
            {label}
          </span>
        </div>
        <Link
          href={`/components/${slug}`}
          className="rounded-sm px-1.5 py-0.5 text-xs text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
        >
          Docs
        </Link>
      </div>
    </section>
  );
}

function FallbackCell({ post }: { post: Post }) {
  return (
    <Link
      href={`/components/${post.slug}`}
      className="group flex min-h-38 flex-col items-center justify-center gap-3 rounded-md border border-border bg-background p-6 text-center transition-colors hover:bg-accent/60"
    >
      <Icons.react className="size-8 text-[--color-react] opacity-60" />
      <span className="text-sm font-semibold text-balance">
        {post.metadata.title}
      </span>
      <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        View docs
      </span>
    </Link>
  );
}

function ViewToggle({ active }: { active: ComponentsMode }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-edge bg-background p-1">
      <Link
        href="/components"
        aria-label="Component list"
        title="Component list"
        className={cn(
          "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
          active === "list" && "bg-foreground text-background hover:text-background"
        )}
      >
        <Grid3X3Icon className="size-3.5" />
      </Link>
      <Link
        href="/components/showcase"
        aria-label="Component showcase"
        title="Component showcase"
        className={cn(
          "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
          active === "showcase" &&
            "bg-foreground text-background hover:text-background"
        )}
      >
        <LayoutGridIcon className="size-3.5" />
      </Link>
    </div>
  );
}
