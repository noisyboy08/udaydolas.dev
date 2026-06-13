"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type CopyButtonProps = {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "icon-label" | "pill";
};

export function CopyButton({
  text,
  className,
  size = "md",
  variant = "icon-label",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const sizeClasses = {
    sm: "h-7 text-xs",
    md: "h-9 text-sm",
    lg: "h-11 text-base",
  };

  const iconSize = { sm: "size-3", md: "size-4", lg: "size-5" };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy to clipboard"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card font-medium text-muted-foreground",
        "transition-all duration-150 hover:border-foreground/20 hover:bg-accent hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variant === "icon" && "aspect-square",
        variant === "icon-label" && "px-3",
        variant === "pill" && "rounded-full px-4",
        sizeClasses[size],
        copied && "border-green-500/40 bg-green-500/10 text-green-500",
        className
      )}
    >
      <span className={cn("transition-transform duration-200", copied && "scale-110")}>
        {copied ? (
          <CheckIcon className={cn(iconSize[size], "text-green-500")} />
        ) : (
          <CopyIcon className={iconSize[size]} />
        )}
      </span>
      {variant !== "icon" && (
        <span className="transition-all duration-150">{copied ? "Copied!" : "Copy"}</span>
      )}
    </button>
  );
}
