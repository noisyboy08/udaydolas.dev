import dayjs from "dayjs";
import { ArrowRightIcon } from "lucide-react";
import { ChevronsUpDownIcon, InfinityIcon, SmileIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/data/blog";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/blog";

import { Panel, PanelHeader, PanelTitle } from "./panel";

// Dynamic custom covers matching the design blueprint aesthetics
export function BlogCover({ slug }: { slug: string }) {
  if (slug === "react-wheel-picker-vercel") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Vercel technical blueprint banner */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            {/* Scrollable wheel pickers visual */}
            <div className="flex h-12 items-center gap-1.5 font-mono text-[8px] text-zinc-600">
              <div className="flex flex-col gap-1 opacity-40 select-none">
                <span>08</span>
                <span className="scale-110 font-bold text-zinc-400">09</span>
                <span>10</span>
              </div>
              <div className="flex flex-col gap-1 select-none">
                <span>28</span>
                <span className="scale-115 font-bold text-white">29</span>
                <span>30</span>
              </div>
              <div className="flex flex-col gap-1 opacity-40 select-none">
                <span>01</span>
                <span className="scale-110 font-bold text-zinc-400">02</span>
                <span>03</span>
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="flex flex-col font-mono text-[8px] leading-normal tracking-wide text-zinc-500">
            <span className="mb-0.5 flex items-center gap-1.5 text-[9px] font-bold text-white">
              {/* Triangle Logo */}
              <span className="inline-block border-r-[5px] border-b-[9px] border-l-[5px] border-r-transparent border-b-white border-l-transparent" />
              VERCEL INC. // 2025
            </span>
            <span>OPEN SOURCE SOFTWARE PROGRAM</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "followed-by-shadcn-x") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-2.5 select-none">
        {/* shadcn X profile card mockup */}
        <div className="w-[180px] rounded-lg border border-zinc-800 bg-zinc-950 p-2 font-sans text-[8px] text-zinc-400">
          <div className="flex items-start justify-between">
            <div className="flex size-6 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-800 text-[10px] font-bold text-white">
              <SmileIcon className="size-4" />
            </div>
            <div className="flex gap-1">
              <span className="rounded-full border border-zinc-800 px-1.5 py-0.5 text-[6px] text-zinc-400">
                X
              </span>
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[6px] font-semibold text-black">
                Following
              </span>
            </div>
          </div>
          <div className="mt-1">
            <p className="flex items-center gap-0.5 text-[9px] leading-tight font-bold text-white">
              shadcn
              <span className="flex inline-block size-2 items-center justify-center rounded-full bg-blue-500 text-[5px] text-white">
                ✓
              </span>
            </p>
            <p className="text-[7px] text-zinc-500">@shadcn</p>
          </div>
          <p className="mt-1 text-[7px] leading-snug text-zinc-300">
            I own a computer / @vercel / git.new/ui
          </p>
          <div className="mt-1.5 flex flex-wrap gap-2 text-[6px] text-zinc-500">
            <span>🔗 shadcn.com</span>
            <span>📅 Joined April 2009</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "chevrons-up-down-icon") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black select-none">
        <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800/40 bg-zinc-900/10 p-3 transition-colors hover:border-zinc-800">
          <ChevronsUpDownIcon className="size-8 text-zinc-400" />
        </div>
      </div>
    );
  }

  if (slug === "mobius-loop-icon") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black select-none">
        <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800/40 bg-zinc-900/10 p-3 transition-colors hover:border-zinc-800">
          <InfinityIcon className="size-8 text-zinc-400" />
        </div>
      </div>
    );
  }

  if (slug === "spinning-circular-text") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black select-none">
        <div className="relative flex size-12 animate-[spin_8s_linear_infinite] items-center justify-center rounded-full border border-dashed border-zinc-800">
          <div className="absolute flex h-full w-full items-center justify-center font-mono text-[5px] tracking-widest text-zinc-500 uppercase">
            <span className="text-[6px] tracking-normal select-none">
              BUILT WITH CARE • UDAYDOLAS •
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "dot-grid-spotlight") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black select-none">
        <div className="grid grid-cols-6 gap-1.5 rounded-lg border border-zinc-900 bg-zinc-950 p-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "size-1 rounded-full",
                i === 10 || i === 11 || i === 16 || i === 17
                  ? "bg-zinc-400 shadow-sm"
                  : "bg-zinc-800"
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  // Fallback for other posts (e.g. standard blogs)
  return (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 font-mono text-[9px] text-zinc-500 select-none">
      <div className="max-w-[80%] rounded border border-dashed border-zinc-800 p-2 text-center">
        <span className="mb-1 block tracking-wider text-zinc-400 uppercase">
          TECHNICAL GUIDE
        </span>
        <div className="my-1 h-px bg-zinc-800" />
        <span className="block text-[8px] text-zinc-600">
          FIG_002 // ARTICLE
        </span>
      </div>
    </div>
  );
}

const HOME_BLOG_SLUGS = [
  "react-wheel-picker-vercel",
  "followed-by-shadcn-x",
  "chevrons-up-down-icon",
  "mobius-loop-icon",
  "spinning-circular-text",
  "dot-grid-spotlight",
];

export function Blog() {
  const allPosts = getAllPosts();

  // Total count of articles and components (excluding projects)
  const allPostsCount = allPosts.filter(
    (post) => post.metadata?.category !== "projects"
  ).length;

  // Retrieve exact 6 posts in design order
  const homePosts = HOME_BLOG_SLUGS.map((slug) => {
    const found = allPosts.find((post) => post.slug === slug);
    if (found) return found;

    // Fallbacks for deleted mock posts to keep the homepage UI intact
    if (slug === "chevrons-up-down-icon") {
      return {
        slug,
        metadata: {
          title: "Chevrons Up Down Icon",
          createdAt: "2026-06-10",
          category: "components",
        },
      } as Post;
    }
    if (slug === "mobius-loop-icon") {
      return {
        slug,
        metadata: {
          title: "Mobius Loop Icon",
          createdAt: "2026-06-10",
          category: "components",
        },
      } as Post;
    }
    return null;
  }).filter((post): post is Post => !!post);

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>
          Blog
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({allPostsCount})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <div className="relative px-4 py-4">
        {/* Visual middle column divider on desktop */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-1 border-l border-edge max-sm:hidden" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {homePosts.map((post) => {
            const isComponent = post.metadata.category === "components";
            const isMock = [
              "chevrons-up-down-icon",
              "mobius-loop-icon",
            ].includes(post.slug);
            const linkHref = isComponent
              ? `/components/${post.slug}`
              : `/blog/${post.slug}`;

            const cardContent = (
              <>
                <BlogCover slug={post.slug} />
                <div className="flex flex-col gap-1 p-2 pt-1">
                  <h3
                    className={cn(
                      "text-sm leading-snug font-semibold text-balance transition-colors",
                      isMock
                        ? "text-zinc-400"
                        : "text-zinc-200 group-hover:text-white"
                    )}
                  >
                    {post.metadata.title}
                  </h3>
                  <time
                    dateTime={dayjs(post.metadata.createdAt).toISOString()}
                    className="font-mono text-[10px] text-zinc-500"
                  >
                    {dayjs(post.metadata.createdAt).format("DD.MM.YYYY")}
                  </time>
                </div>
              </>
            );

            if (isMock) {
              return (
                <div
                  key={post.slug}
                  className="flex h-full cursor-default flex-col gap-3 rounded-xl border border-edge bg-zinc-950/40 p-2 select-none"
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link
                key={post.slug}
                href={linkHref}
                className="group flex h-full flex-col gap-3 rounded-xl border border-edge bg-zinc-950/40 p-2 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/20"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="screen-line-before flex justify-center py-2">
        <Button variant="default" asChild>
          <Link href="/blog">
            All Posts
            <ArrowRightIcon className="ml-1.5 size-4" />
          </Link>
        </Button>
      </div>
    </Panel>
  );
}
