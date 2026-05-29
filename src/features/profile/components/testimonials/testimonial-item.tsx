import dayjs from "dayjs";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { Testimonial } from "../../types/testimonials";

export function TestimonialItem({
  className,
  testimonial,
}: {
  className?: string;
  testimonial: Testimonial;
}) {
  return (
    <div className={cn("group/testimonial flex items-start pr-2", className)}>
      {testimonial.clientAvatar ? (
        <Image
          src={testimonial.clientAvatar}
          alt={testimonial.clientName}
          width={40}
          height={40}
          className="mx-4 flex size-10 shrink-0 rounded-full"
          sizes="40px"
          loading="lazy"
          aria-hidden
        />
      ) : (
        <div
          className="mx-4 flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-hidden
        >
          <span className="text-lg font-semibold">
            {testimonial.clientName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </span>
        </div>
      )}

      <div className="flex-1 space-y-2 border-l border-dashed border-edge p-4 pr-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="leading-snug font-medium text-balance">
              {testimonial.clientName}
            </h3>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span>{testimonial.clientRole}</span>
              {testimonial.clientCompany && (
                <>
                  <Separator
                    className="data-[orientation=vertical]:h-4"
                    orientation="vertical"
                  />
                  <span>{testimonial.clientCompany}</span>
                </>
              )}
              {testimonial.date && (
                <>
                  <Separator
                    className="data-[orientation=vertical]:h-4"
                    orientation="vertical"
                  />
                  <time dateTime={dayjs(testimonial.date).toISOString()}>
                    {dayjs(testimonial.date).format("MMM YYYY")}
                  </time>
                </>
              )}
            </div>
          </div>
          {testimonial.rating && (
            <div
              className="flex items-center gap-0.5"
              aria-label={`${testimonial.rating} out of 5 stars`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    "size-4",
                    i < testimonial.rating!
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  )}
                  aria-hidden
                />
              ))}
            </div>
          )}
        </div>

        {testimonial.projectName && (
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Project:</span>{" "}
            {testimonial.projectLink ? (
              <a
                href={testimonial.projectLink}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 link"
              >
                {testimonial.projectName}
                <ArrowUpRightIcon className="size-3" aria-hidden />
              </a>
            ) : (
              <span>{testimonial.projectName}</span>
            )}
          </div>
        )}

        <p className="text-sm leading-relaxed text-balance text-muted-foreground">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>
    </div>
  );
}
