/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";

type TestimonialProps = {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
  avatar?: string;
  className?: string;
  variant?: "card" | "minimal" | "spotlight";
};

export function Testimonial({
  quote,
  author,
  role,
  company,
  rating = 5,
  avatar,
  className,
  variant = "card",
}: TestimonialProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  if (variant === "minimal") {
    return (
      <blockquote className={cn("space-y-3", className)}>
        <p className="text-lg leading-relaxed text-muted-foreground">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className="size-9 rounded-full object-cover"
            />
          ) : (
            <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 text-sm font-bold text-white">
              {author[0]}
            </span>
          )}
          <div>
            <p className="text-sm font-semibold">{author}</p>
            {role && <p className="text-xs text-muted-foreground">{role}</p>}
          </div>
        </footer>
      </blockquote>
    );
  }

  if (variant === "spotlight") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-card p-6",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-violet-500/10 before:via-transparent before:to-cyan-500/10",
          className
        )}
      >
        <div className="relative z-10">
          <div className="mb-4 flex gap-1">
            {stars.map((filled, i) => (
              <span
                key={i}
                className={filled ? "text-amber-400" : "text-muted"}
              >
                ★
              </span>
            ))}
          </div>
          <p className="mb-5 text-base leading-relaxed">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="flex items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt={author}
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 text-sm font-bold text-white">
                {author[0]}
              </span>
            )}
            <div>
              <p className="text-sm font-semibold">{author}</p>
              <p className="text-xs text-muted-foreground">
                {role}
                {company ? ` · ${company}` : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
    >
      <div className="mb-3 flex gap-1">
        {stars.map((filled, i) => (
          <span
            key={i}
            className={filled ? "text-amber-400" : "text-muted-foreground/30"}
          >
            ★
          </span>
        ))}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="size-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 text-xs font-bold text-white">
            {author[0]}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{author}</p>
          {role && (
            <p className="truncate text-xs text-muted-foreground">
              {role}
              {company ? ` · ${company}` : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
