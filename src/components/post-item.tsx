import dayjs from "dayjs";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/blog";

export function PostItem({
  post,
  shouldPreloadImage,
}: {
  post: Post;
  shouldPreloadImage?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/post flex flex-col gap-3 p-2 justify-between h-full",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group/link flex flex-col gap-2 flex-grow"
      >
        {post.metadata.image && (
          <div className="relative select-none [&_img]:aspect-1200/630 [&_img]:rounded-xl">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              width={1200}
              height={630}
              priority={shouldPreloadImage}
              sizes="(max-width: 640px) 100vw, 50vw"
            />

            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />

            {post.metadata.new && (
              <span className="absolute top-1.5 right-1.5 rounded-md bg-info px-1.5 font-mono text-sm font-medium text-white text-shadow-xs">
                New
              </span>
            )}
          </div>
        )}

        <div className="flex flex-col gap-1 p-2">
          <h3 className="text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/link:underline">
            {post.metadata.title}
          </h3>

          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-sm text-muted-foreground">
              <time dateTime={dayjs(post.metadata.createdAt).toISOString()}>
                {dayjs(post.metadata.createdAt).format("DD.MM.YYYY")}
              </time>
            </dd>
          </dl>
        </div>
      </Link>

      {(post.metadata.github || post.metadata.live) && (
        <div className="flex flex-wrap items-center gap-3 p-2 pt-0 mt-auto">
          {post.metadata.github && (
            <a
              href={post.metadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-edge bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-1.5 text-sm font-medium text-foreground transition-colors"
            >
              <Icons.github className="size-4" />
              GitHub Code
            </a>
          )}
          {post.metadata.live && (
            <a
              href={post.metadata.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-foreground text-background hover:opacity-90 px-3 py-1.5 text-sm font-medium transition-opacity"
            >
              <LinkIcon className="size-3.5" />
              Live Preview
            </a>
          )}
        </div>
      )}
    </div>
  );
}
