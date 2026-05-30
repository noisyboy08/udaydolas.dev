"use client";

import dayjs from "dayjs";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { Post } from "@/types/blog";

// ─── Single blog card ─────────────────────────────────────────────────────────
function BlogCard({
  post,
  priority,
}: {
  post: Post;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-zinc-900/60 transition-all duration-300",
        "hover:border-white/20 hover:bg-zinc-900 hover:shadow-xl hover:shadow-black/40",
        "dark:bg-zinc-900/60 dark:hover:bg-zinc-900"
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-[1200/630] w-full overflow-hidden bg-zinc-950">
        {post.metadata.image ? (
          <>
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              fill
              priority={priority}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {/* subtle dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 via-transparent to-transparent" />
          </>
        ) : (
          // Placeholder for posts without cover
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-xs text-zinc-600">No cover</span>
          </div>
        )}

        {/* "New" badge */}
        {post.metadata.new && (
          <span className="absolute right-3 top-3 rounded-md bg-sky-500 px-2 py-0.5 font-mono text-xs font-semibold text-white shadow-lg">
            New
          </span>
        )}

        {/* Inset ring */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/8" />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="text-base font-semibold leading-snug text-balance text-white transition-colors group-hover:text-white/90 underline-offset-2">
          {post.metadata.title}
        </h3>

        <time
          dateTime={dayjs(post.metadata.createdAt).toISOString()}
          className="font-mono text-sm text-yellow-500/80"
        >
          {dayjs(post.metadata.createdAt).format("DD.MM.YYYY")}
        </time>
      </div>
    </Link>
  );
}

// ─── Main Blog view ───────────────────────────────────────────────────────────
export function BlogView({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (p) =>
        p.metadata.title.toLowerCase().includes(q) ||
        p.metadata.description?.toLowerCase().includes(q)
    );
  }, [posts, query]);

  return (
    <div className="min-h-svh">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="border-b border-edge px-4 pb-6 pt-4">
        <p className="mb-1 font-mono text-xs font-medium text-muted-foreground">
          Blog
        </p>
        <h1 className="max-w-lg text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Writing about code, design, and everything in between.
        </h1>
      </div>

      {/* ── Search ───────────────────────────────────────────────── */}
      <div className="border-b border-edge px-4 py-3">
        <label className="flex items-center gap-3 rounded-lg border border-edge bg-zinc-950/5 px-3 py-2 transition-colors focus-within:border-zinc-400/50 focus-within:bg-zinc-950/10 dark:bg-white/5 dark:focus-within:border-zinc-500/50 dark:focus-within:bg-white/8">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Blog…"
            className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
          />
        </label>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <div className="p-4">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((post, i) => (
              <BlogCard key={post.slug} post={post} priority={i < 2} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-20 text-center">
            <SearchIcon className="size-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              No posts found for{" "}
              <span className="font-medium text-foreground">&quot;{query}&quot;</span>
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      <div className="h-6" />
    </div>
  );
}
