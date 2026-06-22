import { ChevronsUpDownIcon, InfinityIcon, SmileIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

// Dynamic custom covers matching the design blueprint aesthetics
export function BlogCover({ slug, title }: { slug: string; title?: string }) {
  if (slug === "react-wheel-picker-vercel") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Vercel technical blueprint banner */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            {/* Scrollable wheel pickers visual */}
            <div className="flex h-12 items-center gap-1.5 font-mono text-[8px] text-zinc-600">
              <div className="flex flex-col gap-1 opacity-40 select-none">
                <span>08</span>
                <span className="scale-110 font-bold text-zinc-400">09</span>
                <span>10</span>
              </div>
              <div className="flex flex-col gap-1 select-none">
                <span>28</span>
                <span className="scale-115 font-bold text-white">29</span>
                <span>30</span>
              </div>
              <div className="flex flex-col gap-1 opacity-40 select-none">
                <span>01</span>
                <span className="scale-110 font-bold text-zinc-400">02</span>
                <span>03</span>
              </div>
            </div>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div className="flex flex-col font-mono text-[8px] leading-normal tracking-wide text-zinc-500">
            <span className="mb-0.5 flex items-center gap-1.5 text-[9px] font-bold text-white">
              {/* Triangle Logo */}
              <span className="inline-block border-r-[5px] border-b-[9px] border-l-[5px] border-r-transparent border-b-white border-l-transparent" />
              VERCEL INC. // 2025
            </span>
            <span>OPEN SOURCE SOFTWARE PROGRAM</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "ud-brand") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Blueprint background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#18181b_1px,transparent_1px)] [background-size:8px_8px] opacity-60 pointer-events-none" />
        
        {/* Technical Logo Spec Sheet Mockup */}
        <div className="relative flex flex-col items-center justify-center space-y-2 z-10">
          {/* Logo Mark Container with Dimension Lines */}
          <div className="relative p-2 border border-dashed border-zinc-800 bg-zinc-950/80 rounded">
            {/* The UD logo mark */}
            <svg className="h-8 w-16 fill-white" viewBox="0 0 256 128">
              <path d="M24 128H0V0h24v128ZM112 128H88V0h24v128ZM88 128H24V104h64v24ZM160 128H136V0h24v128ZM232 24H160V0h72v24ZM232 128H160V104h72v24ZM256 104H232V24h24v80Z" />
            </svg>
            
            {/* Dimension guide markings */}
            <div className="absolute -top-1.5 left-0 right-0 flex items-center justify-between px-1 text-[4px] font-mono text-zinc-600">
              <span>← 256px →</span>
            </div>
            <div className="absolute -left-1.5 top-0 bottom-0 flex flex-col justify-between py-1 text-[4px] font-mono text-zinc-600 [writing-mode:vertical-lr]">
              <span>← 128px →</span>
            </div>
          </div>
          
          {/* Metadata labels */}
          <div className="flex flex-col items-center font-mono text-[6px] tracking-widest text-zinc-500 uppercase">
            <span className="font-semibold text-zinc-400">UD MARK // SPEC SHEET</span>
            <span className="text-[5px] text-zinc-600 mt-0.5">grid: 8x8 units / stroke: 1 unit</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "accordion") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Accordion Component UI Mockup */}
        <div className="w-[170px] space-y-1 font-sans text-[7px] text-zinc-400">
          <div className="rounded border border-zinc-800 bg-zinc-950 p-1.5">
            <div className="flex items-center justify-between text-white font-medium">
              <span>What is this system?</span>
              <span className="text-[5px]">▲</span>
            </div>
            <p className="mt-1 text-[6px] leading-normal text-zinc-500">
              A high-performance, accessible accordion component with smooth height transitions.
            </p>
          </div>
          <div className="flex items-center justify-between rounded border border-zinc-900 bg-zinc-950/40 p-1.5">
            <span>How do I integrate it?</span>
            <span className="text-[5px]">▼</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "animated-tabs") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Animated Tabs Mockup */}
        <div className="w-[180px] space-y-2 font-sans">
          {/* Tabs bar */}
          <div className="relative flex rounded-full border border-zinc-900 bg-zinc-950/80 p-0.5 text-[7px]">
            {/* Sliding background pill (highlight on Tab 1) */}
            <div className="absolute top-0.5 bottom-0.5 left-0.5 w-[32%] rounded-full bg-white/10 border border-white/5" />
            <div className="relative z-10 flex w-full items-center justify-between px-1">
              <span className="w-[32%] py-0.5 text-center text-white font-medium">Design</span>
              <span className="w-[32%] py-0.5 text-center text-zinc-500">Code</span>
              <span className="w-[32%] py-0.5 text-center text-zinc-500">Deploy</span>
            </div>
          </div>
          {/* Mock content panel */}
          <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-2 font-mono text-[5px] text-zinc-600">
            <span className="text-zinc-400">const</span> tabConfig = {"{"} animate: <span className="text-sky-400">true</span> {"}"};
          </div>
        </div>
      </div>
    );
  }

  if (slug === "avatar-group") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Avatar Group Mockup */}
        <div className="flex flex-col items-center gap-2">
          {/* Avatar stack */}
          <div className="flex -space-x-2.5">
            <div className="flex size-7 items-center justify-center rounded-full border-2 border-black bg-zinc-800 text-[8px] font-bold text-white">
              JD
            </div>
            <div className="flex size-7 items-center justify-center rounded-full border-2 border-black bg-zinc-700 text-[8px] font-bold text-zinc-300">
              UD
            </div>
            <div className="flex size-7 items-center justify-center rounded-full border-2 border-black bg-gradient-to-tr from-violet-500 to-indigo-500 text-[8px] font-bold text-white shadow-md">
              A
            </div>
            <div className="flex size-7 items-center justify-center rounded-full border-2 border-black bg-zinc-900 text-[7px] font-bold text-zinc-500">
              +4
            </div>
          </div>
          {/* Subtitle spec */}
          <span className="font-mono text-[5px] text-zinc-600 tracking-wider">
            AVATAR_STACK // LIMIT: 4 // SPACER: -10px
          </span>
        </div>
      </div>
    );
  }

  if (slug === "followed-by-shadcn-x") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-2.5 select-none">
        {/* shadcn X profile card mockup */}
        <div className="w-[180px] rounded-lg border border-zinc-800 bg-zinc-950 p-2 font-sans text-[8px] text-zinc-400">
          <div className="flex items-start justify-between">
            <div className="flex size-6 items-center justify-center overflow-hidden rounded-full border border-zinc-700 bg-zinc-800 text-[10px] font-bold text-white">
              <SmileIcon className="size-4" />
            </div>
            <div className="flex gap-1">
              <span className="rounded-full border border-zinc-800 px-1.5 py-0.5 text-[6px] text-zinc-400">
                X
              </span>
              <span className="rounded-full bg-white px-1.5 py-0.5 text-[6px] font-semibold text-black">
                Following
              </span>
            </div>
          </div>
          <div className="mt-1">
            <p className="flex items-center gap-0.5 text-[9px] leading-tight font-bold text-white">
              shadcn
              <span className="flex inline-block size-2 items-center justify-center rounded-full bg-blue-500 text-[5px] text-white">
                ✓
              </span>
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
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Combobox/Dropdown UI Mockup */}
        <div className="w-[170px] space-y-1.5 font-sans">
          {/* Main Select Button */}
          <div className="flex h-7 w-full items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 px-2.5 text-[8px] text-zinc-300">
            <span className="font-medium">Select Icon...</span>
            <ChevronsUpDownIcon className="size-3 text-zinc-500" />
          </div>
          {/* Dropdown Menu popover snippet */}
          <div className="divide-y divide-zinc-900 rounded-md border border-zinc-800 bg-zinc-950 p-1 text-[7px] text-zinc-400 shadow-xl">
            <div className="flex items-center gap-1.5 px-1.5 py-1 text-white font-medium bg-zinc-900/50 rounded-sm">
              <span className="text-[5px] text-zinc-400">✓</span>
              <span>ChevronsUpDown</span>
            </div>
            <div className="flex items-center gap-1.5 px-1.5 py-1 rounded-sm">
              <span className="w-1.5" />
              <span>InfinityLoop</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "mobius-loop-icon") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Infinite Loop Controller Mockup */}
        <div className="w-[180px] rounded-lg border border-zinc-800 bg-zinc-950 p-2 font-mono text-[7px] text-zinc-500">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
            <span className="text-[8px] font-semibold text-white tracking-wide">ANIMATION NODE</span>
            <span className="rounded bg-violet-500/10 px-1 py-0.5 text-[5px] font-bold text-violet-400">LOOP_ON</span>
          </div>
          <div className="mt-2 space-y-2">
            {/* Loop track visual */}
            <div className="relative h-1.5 w-full rounded-full bg-zinc-900">
              <div className="absolute left-[20%] right-[30%] h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
              <div className="absolute left-[70%] top-1/2 size-2 -translate-y-1/2 rounded-full border border-violet-400 bg-black shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
            </div>
            {/* Play controls */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-1.5 text-[6px]">
                <span className="cursor-pointer text-zinc-400 hover:text-white">▶ PLAY</span>
                <span className="text-zinc-700">|</span>
                <span className="cursor-pointer text-zinc-400 hover:text-white">⏸ PAUSE</span>
              </div>
              <div className="flex items-center justify-center rounded border border-violet-500/30 bg-violet-500/5 p-1 text-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.1)]">
                <InfinityIcon className="size-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "spinning-circular-text") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black select-none">
        {/* Radial Badge UI */}
        <div className="relative flex size-20 items-center justify-center">
          {/* Outer dotted ring rotating clockwise */}
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-zinc-800/80" />
          
          {/* Inner ring rotating counter-clockwise */}
          <div className="absolute inset-1.5 animate-[spin_6s_linear_infinite_reverse] rounded-full border border-zinc-900" />
          
          {/* Rotating Text Container */}
          <div className="absolute inset-2 animate-[spin_10s_linear_infinite] flex items-center justify-center rounded-full">
            <svg viewBox="0 0 100 100" className="size-full">
              <path
                id="textPath"
                fill="none"
                d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
              <text className="font-mono text-[7.5px] uppercase fill-zinc-500 tracking-[0.25em] font-bold">
                <textPath href="#textPath" startOffset="0%">
                  • DESIGN • CODE • ROTATE • SPIN
                </textPath>
              </text>
            </svg>
          </div>
          
          {/* Central status light/dot */}
          <div className="relative flex size-4 items-center justify-center rounded-full bg-zinc-950 border border-zinc-800">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "dot-grid-spotlight") {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black select-none">
        {/* Interactive Grid Spotlight Mockup */}
        <div className="relative flex h-24 w-40 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950/80 p-2 overflow-hidden">
          {/* Radial Spotlight glow overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_60%)] animate-pulse" />
          
          {/* Grid of Dots */}
          <div className="grid grid-cols-8 gap-2 relative z-10">
            {Array.from({ length: 40 }).map((_, i) => {
              // Calculate center coordinates (rows of 8)
              const col = i % 8;
              const row = Math.floor(i / 8);
              // Center is col 3-4, row 2
              const isCenter = Math.abs(col - 3.5) < 1.5 && Math.abs(row - 2) < 1.5;
              return (
                <div
                  key={i}
                  className={cn(
                    "size-1 rounded-full transition-all duration-300",
                    isCenter
                      ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] scale-125"
                      : "bg-zinc-800"
                  )}
                />
              );
            })}
          </div>
          
          {/* Coordinate labeling */}
          <div className="absolute bottom-1 right-2 font-mono text-[5px] text-zinc-600">
            x: 104px / y: 48px
          </div>
        </div>
      </div>
    );
  }

  // Fallback for other posts (e.g. standard blogs)
  return (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 font-mono text-[9px] text-zinc-500 select-none">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:12px_12px] opacity-40 pointer-events-none" />
      
      <div className="relative z-10 w-[85%] rounded-md border border-zinc-800/80 bg-zinc-950/80 p-3 text-center shadow-lg">
        <span className="mb-1.5 block text-[7px] tracking-[0.2em] text-zinc-500 uppercase font-semibold">
          TECHNICAL SPECIFICATION // DOCS
        </span>
        <div className="my-1.5 h-px bg-zinc-900" />
        <span className="block text-[10px] font-bold text-zinc-300 tracking-tight leading-snug my-1 text-balance">
          {title || slug.toUpperCase().replace(/-/g, " ")}
        </span>
        <div className="my-1.5 h-px bg-zinc-900" />
        <span className="block text-[6px] text-zinc-600 tracking-widest uppercase">
          FIG_SYS_{slug.toUpperCase().replace(/-/g, "_").slice(0, 8)}{" // ARTICLE.MDX"}
        </span>
      </div>
    </div>
  );
}
