import dayjs from "dayjs";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Icons } from "@/components/icons";
import { SimpleTooltip } from "@/components/ui/tooltip";
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
        "group/post flex h-full flex-col justify-between gap-3 p-2",
        "max-sm:screen-line-before max-sm:screen-line-after",
        "sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
      )}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group/link flex flex-grow flex-col gap-2"
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
        <div className="mt-auto flex items-center gap-2.5 p-2 pt-0">
          {post.metadata.github && (
            <SimpleTooltip content="GitHub Code">
              <a
                href={post.metadata.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-edge bg-zinc-50 text-muted-foreground transition-colors hover:bg-zinc-100 hover:text-foreground dark:bg-zinc-900/50 dark:hover:bg-zinc-800"
              >
                <Icons.github className="size-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </SimpleTooltip>
          )}
          {post.metadata.live && (
            <SimpleTooltip content="Live Preview">
              <a
                href={post.metadata.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-edge bg-zinc-50 text-muted-foreground transition-colors hover:bg-zinc-100 hover:text-foreground dark:bg-zinc-900/50 dark:hover:bg-zinc-800"
              >
                <LinkIcon className="size-4" />
                <span className="sr-only">Live Preview</span>
              </a>
            </SimpleTooltip>
          )}
        </div>
      )}
    </div>
  );
}
