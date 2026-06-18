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
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black flex flex-col items-center justify-center border border-white/5 select-none p-4">
        {/* Vercel technical blueprint banner */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            {/* Scrollable wheel pickers visual */}
            <div className="flex gap-1.5 h-12 items-center text-[8px] font-mono text-zinc-600">
              <div className="flex flex-col gap-1 select-none opacity-40">
                <span>08</span>
                <span className="text-zinc-400 font-bold scale-110">09</span>
                <span>10</span>
              </div>
              <div className="flex flex-col gap-1 select-none">
                <span>28</span>
                <span className="text-white font-bold scale-115">29</span>
                <span>30</span>
              </div>
              <div className="flex flex-col gap-1 select-none opacity-40">
                <span>01</span>
                <span className="text-zinc-400 font-bold scale-110">02</span>
                <span>03</span>
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="flex flex-col text-[8px] font-mono leading-normal tracking-wide text-zinc-500">
            <span className="text-white font-bold text-[9px] flex items-center gap-1.5 mb-0.5">
              {/* Triangle Logo */}
              <span className="inline-block border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-white" />
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
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black flex items-center justify-center border border-white/5 select-none p-2.5">
        {/* shadcn X profile card mockup */}
        <div className="w-[180px] rounded-lg border border-zinc-800 bg-zinc-950 p-2 font-sans text-[8px] text-zinc-400">
          <div className="flex items-start justify-between">
            <div className="size-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-white text-[10px] overflow-hidden">
              <SmileIcon className="size-4" />
            </div>
            <div className="flex gap-1">
              <span className="rounded-full border border-zinc-800 px-1.5 py-0.5 text-[6px] text-zinc-400">X</span>
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[6px] font-semibold text-black">Following</span>
            </div>
          </div>
          <div className="mt-1">
            <p className="font-bold text-white text-[9px] leading-tight flex items-center gap-0.5">
              shadcn
              <span className="inline-block size-2 rounded-full bg-blue-500 text-[5px] text-white flex items-center justify-center">✓</span>
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
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black flex items-center justify-center border border-white/5 select-none">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-zinc-800/40 bg-zinc-900/10 hover:border-zinc-800 transition-colors">
          <ChevronsUpDownIcon className="size-8 text-zinc-400" />
        </div>
      </div>
    );
  }

  if (slug === "mobius-loop-icon") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black flex items-center justify-center border border-white/5 select-none">
        <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-zinc-800/40 bg-zinc-900/10 hover:border-zinc-800 transition-colors">
          <InfinityIcon className="size-8 text-zinc-400" />
        </div>
      </div>
    );
  }

  if (slug === "spinning-circular-text") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black flex items-center justify-center border border-white/5 select-none">
        <div className="relative size-12 flex items-center justify-center border border-dashed border-zinc-800 rounded-full animate-[spin_8s_linear_infinite]">
          <div className="absolute text-[5px] font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center w-full h-full">
            <span className="text-[6px] tracking-normal select-none">BUILT WITH CARE • NCDAI •</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "dot-grid-spotlight") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black flex items-center justify-center border border-white/5 select-none">
        <div className="grid grid-cols-6 gap-1.5 p-2 bg-zinc-950 rounded-lg border border-zinc-900">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className={cn(
              "size-1 rounded-full",
              i === 10 || i === 11 || i === 16 || i === 17 ? "bg-zinc-400 shadow-sm" : "bg-zinc-800"
            )} />
          ))}
        </div>
      </div>
    );
  }

  // Fallback for other posts (e.g. standard blogs)
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black flex flex-col items-center justify-center border border-white/5 select-none p-4 font-mono text-[9px] text-zinc-500">
      <div className="border border-dashed border-zinc-800 rounded p-2 text-center max-w-[80%]">
        <span className="text-zinc-400 uppercase tracking-wider block mb-1">TECHNICAL GUIDE</span>
        <div className="h-px bg-zinc-800 my-1" />
        <span className="text-[8px] text-zinc-600 block">FIG_002 // ARTICLE</span>
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
  "dot-grid-spotlight"
];

export function Blog() {
  const allPosts = getAllPosts();
  
  // Total count of articles and components (excluding projects)
  const allPostsCount = allPosts.filter(
    (post) => post.metadata?.category !== "projects"
  ).length;

  // Retrieve exact 6 posts in design order
  const homePosts = HOME_BLOG_SLUGS.map((slug) =>
    allPosts.find((post) => post.slug === slug)
  ).filter((post): post is Post => !!post);

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

      <div className="relative py-4 px-4">
        {/* Visual middle column divider on desktop */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-1 border-l border-edge max-sm:hidden" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {homePosts.map((post) => {
            const isComponent = post.metadata.category === "components";
            const linkHref = isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`;
            
            return (
              <Link
                key={post.slug}
                href={linkHref}
                className="group flex flex-col gap-3 rounded-xl border border-edge bg-zinc-950/40 p-2 hover:border-zinc-800 hover:bg-zinc-900/20 transition-all duration-300 h-full"
              >
                <BlogCover slug={post.slug} />
                <div className="flex flex-col gap-1 p-2 pt-1">
                  <h3 className="text-sm font-semibold leading-snug text-balance text-zinc-200 group-hover:text-white transition-colors">
                    {post.metadata.title}
                  </h3>
                  <time
                    dateTime={dayjs(post.metadata.createdAt).toISOString()}
                    className="font-mono text-[10px] text-zinc-500"
                  >
                    {dayjs(post.metadata.createdAt).format("DD.MM.YYYY")}
                  </time>
                </div>
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
