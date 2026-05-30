"use client";

import { Grid3X3Icon, LayoutGridIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense, useState } from "react";

import { Index } from "@/__registry__/index";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/blog";

// ─── Showcase card config ─────────────────────────────────────────────────────
// Maps each MDX slug → which registry example demo to render and how big the card is
type ShowcaseSize = "sm" | "md" | "lg" | "xl" | "tall";

const SHOWCASE_CONFIG: Record<
  string,
  { demo: string; size: ShowcaseSize; label: string }
> = {
  "apple-hello-effect": {
    demo: "apple-hello-effect-en-demo",
    size: "lg",
    label: "Apple Hello Effect",
  },
  "theme-switcher": {
    demo: "theme-switcher-demo",
    size: "sm",
    label: "Theme Switcher",
  },
  "wheel-picker": { demo: "wheel-picker-demo", size: "md", label: "Wheel Picker" },
  "work-experience": {
    demo: "work-experience-demo",
    size: "xl",
    label: "Work Experience",
  },
  "flip-sentences": { demo: "flip-sentences-demo", size: "sm", label: "Flip Sentences" },
  "glowing-orb": { demo: "glowing-orb-demo", size: "lg", label: "Glowing Orb" },
  "morphing-text": { demo: "morphing-text-demo", size: "md", label: "Morphing Text" },
  "spotlight-card": { demo: "spotlight-card-demo", size: "xl", label: "Spotlight Card" },
  "neon-clock": { demo: "neon-clock-demo", size: "lg", label: "Neon Clock" },
};

// ─── Lazy preview cell ─────────────────────────────────────────────────────────
function ShowcaseCell({
  slug,
  demoName,
  label,
  size,
}: {
  slug: string;
  demoName: string;
  label: string;
  size: ShowcaseSize;
}) {
  const entry = Index[demoName];
  const Component = entry?.component;

  const sizeClass: Record<ShowcaseSize, string> = {
    sm: "col-span-1 row-span-1",
    md: "col-span-1 row-span-2",
    lg: "col-span-2 row-span-2",
    xl: "col-span-2 row-span-3",
    tall: "col-span-1 row-span-3",
  };

  return (
    <Link
      href={`/components/${slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden transition-all duration-300",
        "bg-background hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60",
        sizeClass[size]
      )}
    >
      {/* live preview */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden p-6">
        {Component ? (
          <Suspense
            fallback={
              <div className="text-xs text-muted-foreground animate-pulse">
                Loading...
              </div>
            }
          >
            <div className="pointer-events-none flex w-full items-center justify-center">
              <Component />
            </div>
          </Suspense>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Icons.react className="size-8 opacity-30 text-[--color-react]" />
            <span className="text-xs opacity-50">Preview unavailable</span>
          </div>
        )}

        {/* hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black shadow-lg">
            View docs →
          </span>
        </div>
      </div>

      {/* label */}
      <div className="flex items-center gap-2 border-t border-edge px-4 py-2.5">
        <Icons.react className="size-3.5 shrink-0 text-[--color-react]" />
        <span className="text-xs font-medium text-muted-foreground truncate">
          {label}
        </span>
      </div>
    </Link>
  );
}

// ─── Fallback card for components with no demo ─────────────────────────────────
function FallbackCell({ post }: { post: Post }) {
  return (
    <Link
      href={`/components/${post.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden col-span-1 row-span-1 transition-all duration-300",
        "bg-background hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
      )}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6">
        <Icons.react className="size-8 text-[--color-react] opacity-60" />
        <span className="text-sm font-medium text-center text-balance">
          {post.metadata.title}
        </span>
        <span className="text-xs text-muted-foreground opacity-0 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0">
          View docs →
        </span>
      </div>
    </Link>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
type ViewMode = "grid" | "showcase";

export function ComponentsView({ posts }: { posts: Post[] }) {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <div className="[--color-react:#087EA4] dark:[--color-react:#58C4DC]">
      {/* toolbar */}
      <div className="flex items-center justify-between border-b border-edge px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          {posts.length} components
        </span>

        <div className="flex items-center gap-1 rounded-lg border border-edge bg-background p-1">
          <ViewButton
            active={view === "grid"}
            onClick={() => setView("grid")}
            title="Grid view"
          >
            <Grid3X3Icon className="size-3.5" />
          </ViewButton>
          <ViewButton
            active={view === "showcase"}
            onClick={() => setView("showcase")}
            title="Showcase view"
          >
            <LayoutGridIcon className="size-3.5" />
          </ViewButton>
        </div>
      </div>

      {/* GRID view */}
      {view === "grid" && (
        <div className="grid grid-cols-2 gap-px border-b border-edge sm:grid-cols-3 bg-edge">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/components/${post.slug}`}
              className="group/post flex items-center gap-3 border border-edge/0 p-4 transition-colors bg-background hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
            >
              <Icons.react
                className="size-4 shrink-0 text-(--color-react)"
                aria-hidden
              />
              <span className="text-sm font-medium leading-snug underline-offset-4 group-hover/post:underline">
                {post.metadata.title}
              </span>
              {post.metadata.new && (
                <span className="ml-auto shrink-0 rounded-md bg-info px-1.5 font-mono text-xs font-medium text-white">
                  New
                </span>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* SHOWCASE view */}
      {view === "showcase" && (
        <div
          className="grid auto-rows-[180px] grid-cols-2 gap-px border-b border-edge bg-edge sm:grid-cols-3 md:grid-cols-4"
        >
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
                />
              );
            }
            return <FallbackCell key={post.slug} post={post} />;
          })}
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}

// ─── View toggle button ────────────────────────────────────────────────────────
function ViewButton({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "flex size-7 items-center justify-center rounded-md transition-all",
        active
          ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
