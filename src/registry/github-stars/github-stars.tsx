"use client";

import { StarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type GithubStarsProps = {
  owner: string;
  repo: string;
  className?: string;
  defaultCount?: number;
  showIcon?: boolean;
};

export function GithubStars({ owner, repo, className, defaultCount = 1240, showIcon = true }: GithubStarsProps) {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${owner}/${repo}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => { setStars(d.stargazers_count ?? defaultCount); setLoading(false); })
      .catch(() => { setStars(defaultCount); setLoading(false); });
    return () => controller.abort();
  }, [owner, repo, defaultCount]);

  const format = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <a
      href={`https://github.com/${owner}/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium",
        "transition-all hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-400",
        className
      )}
    >
      {showIcon && <StarIcon className="size-4" />}
      <span>{loading ? "…" : format(stars ?? defaultCount)}</span>
      <span className="text-muted-foreground">stars</span>
    </a>
  );
}
