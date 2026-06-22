import dayjs from "dayjs";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/data/blog";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/blog";

import { BlogCover } from "./blog-cover";
import { Panel, PanelHeader, PanelTitle } from "./panel";


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
