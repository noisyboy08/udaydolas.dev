"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeSnippetProps = {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
};

export function CodeSnippet({
  code,
  language = "tsx",
  filename,
  className,
  showLineNumbers = false,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-zinc-950", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-rose-500" />
            <span className="size-3 rounded-full bg-amber-400" />
            <span className="size-3 rounded-full bg-emerald-500" />
          </div>
          {filename && (
            <span className="font-mono text-xs text-zinc-400">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {language && (
            <span className="rounded bg-white/8 px-1.5 py-0.5 font-mono text-xs text-zinc-400">{language}</span>
          )}
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            {copied ? <CheckIcon className="size-3.5 text-emerald-400" /> : <CopyIcon className="size-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-relaxed">
          {showLineNumbers ? (
            lines.map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="w-6 shrink-0 select-none text-right font-mono text-zinc-600 text-xs">
                  {i + 1}
                </span>
                <code className="text-zinc-300">{line}</code>
              </div>
            ))
          ) : (
            <code className="text-zinc-300">{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
}
