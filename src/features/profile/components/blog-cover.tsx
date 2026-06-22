import {
  CheckIcon,
  ChevronsUpDownIcon,
  CopyIcon,
  InfinityIcon,
  MoonIcon,
  MousePointerIcon,
  PauseIcon,
  PlayIcon,
  SlidersIcon,
  SmileIcon,
  SparklesIcon,
  StarIcon,
  SunIcon
} from "lucide-react";
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
              <div className="flex h-12 flex-col justify-center gap-1 select-none">
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

  // ─── NEW CUSTOM COVERS FOR ALL REMAINING slugs ──────────────────────────────
  if (slug === "apple-hello-effect") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes drawPath {
            0% { stroke-dashoffset: 1000; }
            100% { stroke-dashoffset: 0; }
          }
          .hello-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: drawPath 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
          }
        `}</style>
        <svg viewBox="0 0 200 80" className="w-[160px] h-auto">
          <defs>
            <linearGradient id="helloGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          {/* Signature stylized 'hello' text drawing path */}
          <path
            className="hello-path"
            d="M20,50 C40,50 45,30 45,20 C45,10 38,15 35,25 C30,40 50,60 65,45 C75,35 68,25 65,30 C60,40 80,48 85,38 C90,28 85,30 83,38 C80,45 95,45 102,35 C105,30 102,38 105,42 C108,45 120,40 125,28 C128,20 120,15 118,25 C115,38 128,45 140,35 C148,28 143,20 138,28 C135,35 145,45 160,40 C175,35 180,25 180,25"
            fill="none"
            stroke="url(#helloGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute bottom-2 font-mono text-[5.5px] text-zinc-600 tracking-wider">
          MAC_SYS // SIGNATURE_HELLO_RENDER
        </div>
      </div>
    );
  }

  if (slug === "badge-collection") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-[190px]">
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2 py-0.5 font-mono text-[7px] font-medium text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.1)]">
            <span className="size-1 rounded-full bg-emerald-400" />
            Stable v1.0
          </span>
          <span className="flex items-center gap-1 rounded-full border border-sky-500/30 bg-sky-500/5 px-2 py-0.5 font-mono text-[7px] font-medium text-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.1)]">
            <span className="size-1 rounded-full bg-sky-400 animate-pulse" />
            Active
          </span>
          <span className="flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/5 px-2 py-0.5 font-mono text-[7px] font-medium text-violet-400">
            TypeScript
          </span>
          <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/5 px-2 py-0.5 font-mono text-[7px] font-medium text-amber-400">
            Deprecated
          </span>
        </div>
      </div>
    );
  }

  if (slug === "code-snippet") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[180px] rounded-lg border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-[6px] text-zinc-500">
          {/* Header */}
          <div className="flex items-center gap-1 border-b border-zinc-900 bg-zinc-900/40 px-2 py-1.5">
            <div className="size-1.5 rounded-full bg-rose-500" />
            <div className="size-1.5 rounded-full bg-amber-500" />
            <div className="size-1.5 rounded-full bg-emerald-500" />
            <span className="ml-1 text-zinc-600 text-[5px]">editor.tsx</span>
          </div>
          {/* Content */}
          <div className="p-2 space-y-0.5 leading-normal">
            <div>
              <span className="text-pink-500">import</span> {"{"} Button {"}"}{" "}
              <span className="text-pink-500">from</span>{" "}
              <span className="text-emerald-400">&quot;@/components/ui/button&quot;</span>;
            </div>
            <div className="text-zinc-700">1 |</div>
            <div>
              <span className="text-pink-500">export default function</span>{" "}
              <span className="text-blue-400">App</span>() {"{"}
            </div>
            <div>
              &nbsp;&nbsp;<span className="text-pink-500">return</span> (
            </div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-400">Button</span>{" "}
              <span className="text-amber-500">variant</span>=
              <span className="text-emerald-400">&quot;outline&quot;</span>&gt;
            </div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Click Me</div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-400">Button</span>&gt;
            </div>
            <div>&nbsp;&nbsp;);</div>
            <div>{"}"}</div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "copy-button") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex flex-col gap-2 w-[170px]">
          <div className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 p-1.5 font-mono text-[7px] text-zinc-400">
            <span>npm i @ud-brand/ui</span>
            <div className="flex size-4 cursor-pointer items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">
              <CopyIcon className="size-2.5" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-md border border-emerald-500/20 bg-emerald-500/5 p-1.5 font-mono text-[7px] text-emerald-400">
            <span>npm i @ud-brand/ui</span>
            <div className="flex size-4 items-center justify-center rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckIcon className="size-2.5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "elastic-slider") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[180px] py-6 relative">
          {/* Elastic Curve Visual */}
          <svg className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 w-full overflow-visible pointer-events-none">
            {/* The elastic track line showing a pull warp */}
            <path
              d="M 0,24 Q 100,6 180,24"
              fill="none"
              stroke="#27272a"
              strokeWidth="2.5"
            />
            <path
              d="M 0,24 Q 100,6 100,6"
              fill="none"
              stroke="url(#sliderGrad)"
              strokeWidth="2.5"
            />
            <defs>
              <linearGradient id="sliderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Drag Handle Indicator */}
          <div className="absolute left-[54%] top-[10px] size-3 -translate-x-1/2 rounded-full border-2 border-white bg-black shadow-[0_0_8px_rgba(59,130,246,0.8)] z-10" />
          {/* Hand/cursor mockup */}
          <div className="absolute left-[58%] top-[18px] flex flex-col gap-1 items-center z-20">
            <MousePointerIcon className="size-3 text-sky-400 fill-sky-400/20 rotate-[15deg]" />
            <span className="font-mono text-[4.5px] text-sky-400 bg-black/80 px-1 rounded border border-sky-500/20">
              dx: +14px
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "feature-card") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[180px] rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 font-sans space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex size-5 items-center justify-center rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <SparklesIcon className="size-3" />
            </div>
            <span className="rounded-full bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 text-[5px] font-mono text-zinc-500 uppercase">
              UI_NODE
            </span>
          </div>
          <h4 className="text-[9px] font-bold text-white tracking-tight">
            Infinite Motion Layout
          </h4>
          <p className="text-[6.5px] leading-relaxed text-zinc-500">
            Accelerate page rendering with hardware-composited layout engines.
          </p>
          <div className="h-px bg-zinc-900" />
          <div className="flex items-center justify-between text-[5px] font-mono text-zinc-600">
            <span>FPS: 120.00</span>
            <span className="text-emerald-400 font-semibold">STABLE</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "flip-sentences") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="space-y-1 font-sans text-center">
          <p className="text-[7.5px] text-zinc-500">Create apps that are</p>
          <div className="relative flex items-center justify-center h-6 overflow-hidden">
            <style>{`
              @keyframes slideFlip {
                0%, 25% { transform: translateY(0); }
                33%, 58% { transform: translateY(-100%); }
                66%, 91% { transform: translateY(-200%); }
                100% { transform: translateY(0); }
              }
              .flip-scroller {
                animation: slideFlip 7s cubic-bezier(0.76, 0, 0.24, 1) infinite;
              }
            `}</style>
            <div className="flip-scroller flex flex-col h-6 font-mono text-[10px] font-bold text-white tracking-tight uppercase">
              <span className="h-6 flex items-center justify-center text-sky-400">
                1. Beautiful //
              </span>
              <span className="h-6 flex items-center justify-center text-violet-400">
                2. Accessible //
              </span>
              <span className="h-6 flex items-center justify-center text-amber-400">
                3. Performant //
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "fluid-gradient-text") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes flowGrad {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .fluid-text {
            background: linear-gradient(90deg, #f43f5e, #a855f7, #3b82f6, #10b981, #fbbf24, #f43f5e);
            background-size: 300% 300%;
            animation: flowGrad 6s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fillColor: transparent;
          }
        `}</style>
        <div className="flex flex-col items-center gap-1">
          <span className="fluid-text font-black font-sans text-lg tracking-tighter uppercase leading-none">
            FLUID GRADIENT
          </span>
          <span className="font-mono text-[5px] text-zinc-600 tracking-[0.2em] uppercase">
            300% linear anim cycle
          </span>
        </div>
      </div>
    );
  }

  if (slug === "github-contributions") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex flex-col gap-1.5 items-center">
          {/* Matrix Grid */}
          <div className="grid grid-cols-12 gap-0.5 border border-zinc-900 bg-zinc-950 p-1.5 rounded-md">
            {Array.from({ length: 60 }).map((_, i) => {
              // Generate contribution colors
              const val = (i * 17) % 5;
              return (
                <div
                  key={i}
                  className={cn(
                    "size-1.5 rounded-[1px]",
                    val === 0 && "bg-zinc-900",
                    val === 1 && "bg-emerald-950",
                    val === 2 && "bg-emerald-800",
                    val === 3 && "bg-emerald-600",
                    val === 4 && "bg-emerald-400"
                  )}
                />
              );
            })}
          </div>
          <span className="font-mono text-[5.5px] text-zinc-500 uppercase tracking-widest">
            382 Commits // current_year
          </span>
        </div>
      </div>
    );
  }

  if (slug === "github-stars") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-sans">
          <StarIcon className="size-3.5 fill-amber-400 text-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          <div className="h-4 w-px bg-zinc-800" />
          <div className="flex flex-col font-mono text-[6.5px] leading-tight text-zinc-500">
            <span className="font-bold text-white">GITHUB STARS</span>
            <span>1,408 stargazers</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "glow-card-grid") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="grid grid-cols-2 gap-1.5 w-[180px]">
          {/* Card 1: Default */}
          <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-2 space-y-1">
            <div className="h-1 w-6 rounded bg-zinc-800" />
            <div className="h-0.5 w-10 rounded bg-zinc-900" />
          </div>
          {/* Card 2: Glowing */}
          <div className="relative rounded-lg border border-violet-500/30 bg-zinc-950 p-2 overflow-hidden shadow-[0_0_12px_rgba(139,92,246,0.15)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.2),transparent_70%)]" />
            <div className="relative z-10 space-y-1">
              <div className="h-1 w-6 rounded bg-violet-400" />
              <div className="h-0.5 w-10 rounded bg-zinc-800" />
            </div>
            {/* Custom virtual cursor pointer overlay */}
            <div className="absolute right-1 bottom-1 flex flex-col gap-0.5 z-20">
              <MousePointerIcon className="size-2 text-violet-400 fill-violet-400/20 rotate-[15deg]" />
            </div>
          </div>
          {/* Card 3: Default */}
          <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-2 space-y-1">
            <div className="h-1 w-6 rounded bg-zinc-800" />
            <div className="h-0.5 w-10 rounded bg-zinc-900" />
          </div>
          {/* Card 4: Default */}
          <div className="rounded-lg border border-zinc-900 bg-zinc-950 p-2 space-y-1">
            <div className="h-1 w-6 rounded bg-zinc-800" />
            <div className="h-0.5 w-10 rounded bg-zinc-900" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "glowing-orb") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes orbScale {
            0% { transform: scale(1); filter: blur(12px); opacity: 0.8; }
            50% { transform: scale(1.15); filter: blur(18px); opacity: 1; }
            100% { transform: scale(1); filter: blur(12px); opacity: 0.8; }
          }
          .orb-glow {
            animation: orbScale 4s ease-in-out infinite;
          }
        `}</style>
        <div className="relative flex size-12 items-center justify-center">
          {/* Outer glowing orb blurring */}
          <div className="absolute inset-0 orb-glow rounded-full bg-gradient-to-tr from-rose-500 via-violet-600 to-sky-400" />
          {/* Inner core portal */}
          <div className="relative z-10 size-8 rounded-full border border-white/10 bg-black shadow-inner" />
        </div>
      </div>
    );
  }

  if (slug === "gradient-border-card") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes borderSpin {
            100% { transform: rotate(360deg); }
          }
          .gradient-edge {
            animation: borderSpin 4s linear infinite;
          }
        `}</style>
        <div className="relative h-16 w-32 overflow-hidden rounded-xl bg-zinc-950 p-[1.5px]">
          {/* Rotating gradient element */}
          <div className="gradient-edge absolute inset-[-100%] bg-[conic-gradient(from_0deg,#3b82f6,#8b5cf6,#ec4899,#3b82f6)]" />
          {/* Inner mask content */}
          <div className="relative size-full rounded-[10px] bg-black p-2 flex flex-col justify-between font-mono text-[5px] text-zinc-600">
            <span className="text-[6px] font-bold text-white">CONIC EDGE CARD</span>
            <span>border_width: 1.5px</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "icon-swap") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex items-center gap-4">
          <div className="flex size-7 items-center justify-center rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white">
            <PlayIcon className="size-3" />
          </div>
          <span className="font-mono text-[7px] text-zinc-600">→ swap →</span>
          <div className="flex size-7 items-center justify-center rounded bg-white text-black font-bold">
            <PauseIcon className="size-3 fill-black text-black" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "magnetic-button") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Bounds tracking border */}
        <div className="relative flex h-14 w-28 items-center justify-center rounded-lg border border-dashed border-zinc-800 bg-zinc-950/20">
          {/* Magnetic button displaced */}
          <div className="absolute left-[35%] top-[25%] flex h-6 w-16 items-center justify-center rounded border border-sky-500/30 bg-sky-500/5 text-[7px] font-mono text-sky-400 shadow-md">
            <span>Button</span>
          </div>
          {/* Cursor pulling button */}
          <div className="absolute left-[45%] top-[10px] flex flex-col gap-0.5 z-20">
            <MousePointerIcon className="size-3 text-sky-500 fill-sky-500/10 rotate-[15deg]" />
            <span className="font-mono text-[4px] text-sky-500 bg-black/80 px-0.5 rounded">
              dist: 12px
            </span>
          </div>
          <div className="absolute bottom-1 right-2 font-mono text-[5px] text-zinc-700">
            BOUNDS_ACTIVE
          </div>
        </div>
      </div>
    );
  }

  if (slug === "middle-truncation") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex flex-col gap-1 w-[180px] font-mono text-[7px]">
          <span className="text-zinc-600">Full path:</span>
          <span className="text-zinc-500 text-[6px] truncate">
            C:/Users/udayd/OneDrive/Desktop/udaydolas.dev-main/src/registry/middle-truncation.tsx
          </span>
          <div className="h-px bg-zinc-900 my-1" />
          <span className="text-zinc-600">Truncated result:</span>
          <div className="flex items-center text-white font-medium bg-zinc-950 border border-zinc-800 px-2 py-1 rounded">
            <span>C:/Users/udayd/.../middle-truncation.tsx</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "morphing-text") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes textMorph {
            0%, 45% { opacity: 1; transform: scale(1); filter: blur(0); }
            50%, 95% { opacity: 0; transform: scale(0.9); filter: blur(8px); }
            100% { opacity: 1; transform: scale(1); filter: blur(0); }
          }
          @keyframes textMorphAlt {
            0%, 45% { opacity: 0; transform: scale(0.9); filter: blur(8px); }
            50%, 95% { opacity: 1; transform: scale(1); filter: blur(0); }
            100% { opacity: 0; transform: scale(0.9); filter: blur(8px); }
          }
          .morph-word-1 {
            animation: textMorph 6s infinite;
          }
          .morph-word-2 {
            animation: textMorphAlt 6s infinite;
          }
        `}</style>
        <div className="relative flex h-8 items-center justify-center">
          <span className="morph-word-1 absolute text-lg font-black tracking-tight text-white uppercase font-sans">
            SPEED_COMPILER
          </span>
          <span className="morph-word-2 absolute text-lg font-black tracking-tight text-violet-400 uppercase font-sans">
            LAYOUT_ENGINE
          </span>
        </div>
      </div>
    );
  }

  if (slug === "neon-clock") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex flex-col items-center gap-1.5">
          {/* LED Panel */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 shadow-inner">
            <span className="font-mono text-base font-extrabold text-emerald-400 tracking-wider shadow-[0_0_12px_rgba(52,211,153,0.3)] animate-pulse">
              12:45:08
            </span>
          </div>
          <span className="font-mono text-[5.5px] text-zinc-600 uppercase tracking-widest">
            DIGITAL_TICK // SYNCED
          </span>
        </div>
      </div>
    );
  }

  if (slug === "number-counter") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex items-center gap-1.5 font-mono">
          <div className="flex h-12 w-6 flex-col justify-center items-center rounded border border-zinc-850 bg-zinc-950 text-xs font-bold text-white overflow-hidden">
            <div className="flex flex-col gap-2 translate-y-[-20%] animate-pulse">
              <span className="opacity-40">1</span>
              <span>2</span>
              <span className="opacity-40">3</span>
            </div>
          </div>
          <div className="flex h-12 w-6 flex-col justify-center items-center rounded border border-zinc-850 bg-zinc-950 text-xs font-bold text-white overflow-hidden">
            <div className="flex flex-col gap-2 translate-y-[-60%] animate-pulse">
              <span className="opacity-40">7</span>
              <span>8</span>
              <span className="opacity-40">9</span>
            </div>
          </div>
          <div className="flex h-12 w-6 flex-col justify-center items-center rounded border border-zinc-850 bg-zinc-950 text-xs font-bold text-white overflow-hidden">
            <div className="flex flex-col gap-2 translate-y-[-40%] animate-pulse">
              <span className="opacity-40">3</span>
              <span>4</span>
              <span className="opacity-40">5</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "particle-cursor") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="relative h-20 w-40 rounded-xl border border-zinc-900 bg-zinc-950/40 overflow-hidden">
          {/* Cursor dot trail */}
          <svg className="absolute inset-0 size-full pointer-events-none">
            {/* Draw curve trail */}
            <path
              d="M 20,45 C 50,20 100,60 130,30"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Dots */}
            <circle cx="20" cy="45" r="1.5" className="fill-sky-500/20" />
            <circle cx="55" cy="30" r="2" className="fill-sky-500/50" />
            <circle cx="95" cy="50" r="2.5" className="fill-sky-500/80" />
            <circle cx="130" cy="30" r="3.5" className="fill-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
          </svg>
          <div className="absolute left-[133px] top-[32px] z-10">
            <MousePointerIcon className="size-3 text-sky-400 fill-sky-400/20 rotate-[15deg]" />
          </div>
          <div className="absolute bottom-1 right-2 font-mono text-[4.5px] text-zinc-700">
            PARTICLE_STREAM
          </div>
        </div>
      </div>
    );
  }

  if (slug === "pricing-card") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[150px] rounded-xl border border-zinc-800 bg-zinc-950 p-3 font-sans space-y-2 shadow-xl">
          <div className="flex flex-col gap-0.5">
            <span className="text-[6.5px] font-mono text-zinc-500 uppercase tracking-widest">
              Developer Plan
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-white">$19</span>
              <span className="text-[6px] text-zinc-500">/ month</span>
            </div>
          </div>
          {/* Checks list */}
          <div className="space-y-1 text-[5.5px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span>
              <span>All Components Included</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400">✓</span>
              <span>Next.js Boilerplates</span>
            </div>
          </div>
          <div className="flex h-5 w-full items-center justify-center rounded-md bg-white text-[7px] font-bold text-black cursor-pointer hover:bg-zinc-200">
            Subscribe Now
          </div>
        </div>
      </div>
    );
  }

  if (slug === "progress-ring") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="relative flex size-14 items-center justify-center">
          <svg className="size-full rotate-[-90deg]">
            <circle
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="#18181b"
              strokeWidth="4.5"
            />
            <circle
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="#ec4899"
              strokeWidth="4.5"
              strokeDasharray="138"
              strokeDashoffset="35"
              strokeLinecap="round"
              className="shadow-[0_0_8px_rgba(236,72,153,0.5)]"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-[8px] font-bold text-white">
            <span>75%</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "scroll-fade-effect") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="relative w-[160px] h-20 rounded border border-zinc-900 bg-zinc-950/40 p-2 overflow-hidden space-y-1.5">
          {/* Scroll view fade masking panels */}
          <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-black to-transparent z-10" />
          
          {/* Inner scrolling mockup items */}
          <div className="h-5 rounded border border-zinc-900 bg-zinc-900/10 opacity-30 flex items-center px-1.5 text-[5px] text-zinc-500 font-mono">
            Item // 01 (Out of bounds)
          </div>
          <div className="h-5 rounded border border-zinc-800 bg-zinc-900/30 flex items-center px-1.5 text-[5px] text-zinc-300 font-mono">
            Item // 02 (Focus Area)
          </div>
          <div className="h-5 rounded border border-zinc-900 bg-zinc-900/10 opacity-30 flex items-center px-1.5 text-[5px] text-zinc-500 font-mono">
            Item // 03 (Out of bounds)
          </div>
        </div>
      </div>
    );
  }

  if (slug === "shimmering-text") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes lineShimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          .shimmer-span {
            color: #6b7280;
            background-image: linear-gradient(120deg, #6b7280 40%, #e879f9 50%, #fff 55%, #e879f9 60%, #6b7280 70%);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fillColor: transparent;
            animation: lineShimmer 2.5s linear infinite;
          }
        `}</style>
        <div className="flex flex-col items-center">
          <span className="shimmer-span font-black font-sans text-xl tracking-wide uppercase leading-none">
            SHIMMER
          </span>
          <span className="font-mono text-[5px] text-zinc-600 mt-1 uppercase tracking-widest">
            Diagonal Mask Shine
          </span>
        </div>
      </div>
    );
  }

  if (slug === "skeleton-loader") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[170px] rounded-lg border border-zinc-900 bg-zinc-950 p-3 space-y-2.5">
          <div className="flex items-center gap-2.5">
            {/* Pulsing Avatar */}
            <div className="size-6 rounded-full bg-zinc-900 animate-pulse" />
            <div className="space-y-1 w-full">
              {/* Pulsing details */}
              <div className="h-1.5 w-[50%] rounded bg-zinc-900 animate-pulse" />
              <div className="h-1 w-[70%] rounded bg-zinc-900/60 animate-pulse" />
            </div>
          </div>
          <div className="h-1 w-full rounded bg-zinc-900 animate-pulse" />
        </div>
      </div>
    );
  }

  if (slug === "slide-to-unlock") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="relative flex h-7 w-[180px] items-center justify-between rounded-full border border-zinc-800 bg-zinc-950/80 p-0.5">
          {/* Slider drag handle */}
          <div className="flex size-6 items-center justify-center rounded-full bg-white text-[7px] text-black font-bold cursor-pointer">
            ➔
          </div>
          {/* Slide guide text */}
          <span className="absolute left-[38%] font-mono text-[6px] tracking-wide text-zinc-500 animate-pulse">
            slide to deploy...
          </span>
        </div>
      </div>
    );
  }

  if (slug === "spotlight-card") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="relative h-18 w-36 rounded-xl border border-zinc-800 bg-zinc-950 p-2.5 overflow-hidden">
          {/* Radial Spotlight Beam */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(14,165,233,0.25),transparent_60%)]" />
          <div className="relative z-10 flex flex-col justify-between h-full font-mono text-[5px] text-zinc-600">
            <span className="text-[6.5px] font-bold text-white">SPOTLIGHT</span>
            <span>cursor_offset: x_y_coords</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "stat-card") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[160px] rounded-xl border border-zinc-800 bg-zinc-950 p-3 font-sans space-y-1.5">
          <div className="flex items-center justify-between text-[6.5px] font-mono text-zinc-500 uppercase">
            <span>Server Latency</span>
            <span className="text-emerald-400 font-semibold">-12.4%</span>
          </div>
          <div className="text-base font-bold text-white tracking-tight">
            14.2ms
          </div>
          {/* Metric Sparkline chart */}
          <svg className="h-6 w-full overflow-visible">
            <path
              d="M 0,20 L 25,12 L 50,18 L 75,5 L 100,12 L 136,3"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <path
              d="M 0,20 L 25,12 L 50,18 L 75,5 L 100,12 L 136,3 L 136,24 L 0,24 Z"
              fill="url(#statGrad)"
              className="opacity-10"
            />
            <defs>
              <linearGradient id="statGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  if (slug === "step-progress") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex items-center gap-1.5">
          {/* Node 1: Done */}
          <div className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-[6.5px] font-bold text-black font-mono">
            ✓
          </div>
          <div className="h-0.5 w-8 bg-emerald-500" />
          {/* Node 2: Active */}
          <div className="flex size-4.5 items-center justify-center rounded-full border border-sky-400 bg-black text-[7px] font-bold text-sky-400 font-mono shadow-[0_0_8px_rgba(56,189,248,0.5)]">
            2
          </div>
          <div className="h-0.5 w-8 bg-zinc-800" />
          {/* Node 3: Pending */}
          <div className="flex size-4 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 text-[6.5px] text-zinc-600 font-mono">
            3
          </div>
        </div>
      </div>
    );
  }

  if (slug === "testimonial") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[180px] rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 font-sans space-y-1.5">
          <div className="flex gap-0.5 text-amber-500 text-[6px]">
            ★★★★★
          </div>
          <p className="text-[6.5px] italic leading-normal text-zinc-300">
            &quot;The custom registry components are built with extreme detail. Completely transformed my frontend workflow.&quot;
          </p>
          <div className="flex items-center gap-1.5">
            <div className="size-4.5 rounded-full bg-zinc-800 border border-zinc-700" />
            <div className="flex flex-col font-mono text-[4.5px] leading-tight text-zinc-500">
              <span className="font-semibold text-white">Alex Rivera</span>
              <span>Staff Engineer, Stripe</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "testimonial-spotlight" || slug === "testimonial") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[185px] rounded-xl border border-zinc-800 bg-zinc-950 p-3 font-sans space-y-2 relative overflow-hidden">
          <div className="absolute right-2 top-2 rounded bg-indigo-500/10 px-1 py-0.5 font-mono text-[5px] font-bold text-indigo-400">
            FEATURED
          </div>
          <p className="text-[7px] font-medium leading-relaxed text-white">
            &quot;Top-tier layout components with clean, modular syntax.&quot;
          </p>
          <div className="flex items-center justify-between text-[4.5px] font-mono text-zinc-500">
            <span>Verified Customer // Stripe Inc.</span>
            <span>★★★★★</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "testimonials-marquee") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="relative w-[180px] py-1 border-y border-zinc-900 overflow-hidden">
          {/* Testimonial slider track */}
          <div className="flex gap-2 w-max animate-pulse">
            <span className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-[6px] text-zinc-400">
              Alex R. ★★★★★
            </span>
            <span className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-[6px] text-zinc-400">
              Stripe Team ✓
            </span>
            <span className="rounded bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 font-mono text-[6px] text-zinc-400">
              Vercel Staff
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "text-flip") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes characterRotate {
            0%, 40% { transform: rotateX(0deg); }
            50%, 90% { transform: rotateX(180deg); }
            100% { transform: rotateX(360deg); }
          }
          .rotate-char {
            animation: characterRotate 4s ease-in-out infinite;
            transform-style: preserve-3d;
          }
        `}</style>
        <div className="flex items-center gap-1 text-base font-black font-mono text-white tracking-wide">
          <span>F</span>
          <span>L</span>
          <span className="rotate-char inline-block text-sky-400">I</span>
          <span>P</span>
        </div>
      </div>
    );
  }

  if (slug === "theme-switcher") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[140px] rounded-lg border border-zinc-800 bg-zinc-950 p-1 font-sans text-[7px] text-zinc-400 shadow-xl space-y-0.5">
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-zinc-900/50 text-white font-medium">
            <SunIcon className="size-2.5 text-amber-500" />
            <span>Light Theme</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded">
            <MoonIcon className="size-2.5 text-indigo-400" />
            <span>Dark Theme</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded">
            <SlidersIcon className="size-2.5 text-zinc-500" />
            <span>System Settings</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "theme-toggle-effect") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex items-center gap-4">
          <div className="flex size-7 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-amber-500">
            <SunIcon className="size-3.5 fill-amber-500/10" />
          </div>
          <span className="font-mono text-[7px] text-zinc-600">⇄ toggle ⇄</span>
          <div className="flex size-7 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-sky-400">
            <MoonIcon className="size-3.5 fill-sky-400/10" />
          </div>
        </div>
      </div>
    );
  }

  if (slug === "tilt-card") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        {/* Tilt card grid projection */}
        <div className="relative h-16 w-32 rounded-xl border border-zinc-800 bg-zinc-950 p-2 transform rotate-x-12 rotate-y-[-12deg] shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.1),transparent_70%)]" />
          <div className="relative z-10 flex flex-col justify-between h-full font-mono text-[5px] text-zinc-600">
            <span className="text-[6px] font-bold text-white">PERSPECTIVE_TILT</span>
            <span>angle_y: -12.0°</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "timeline") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="relative flex flex-col gap-3.5 w-[140px] pl-3 border-l border-zinc-800">
          {/* Vertical Timeline timeline */}
          <div className="absolute left-[-3.5px] top-1 size-1.5 rounded-full bg-sky-500 ring-4 ring-sky-500/10" />
          <div className="absolute left-[-3.5px] top-[26px] size-1.5 rounded-full bg-zinc-700" />
          
          <div className="space-y-0.5">
            <span className="font-mono text-[5px] text-sky-400 uppercase">Q2 2026 // STARTUP</span>
            <p className="text-[7px] font-bold text-white leading-none">System launch</p>
          </div>
          <div className="space-y-0.5">
            <span className="font-mono text-[5px] text-zinc-600 uppercase">Q3 2026 // UPDATE</span>
            <p className="text-[7px] font-bold text-zinc-500 leading-none">Release modules</p>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "typewriter-effect") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes cursorBlink {
            50% { opacity: 0; }
          }
          .type-cursor {
            animation: cursorBlink 0.8s step-end infinite;
          }
        `}</style>
        <div className="flex items-center gap-0.5 font-mono text-[9px] text-emerald-400 font-bold">
          <span>&gt; npm install</span>
          <span className="type-cursor inline-block w-1.5 h-3 bg-emerald-400" />
        </div>
      </div>
    );
  }

  if (slug === "wheel-picker") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="flex items-center gap-1.5 font-mono text-[8px] text-zinc-600">
          <div className="flex flex-col gap-1 opacity-40 select-none">
            <span>Jan</span>
            <span className="scale-110 font-bold text-zinc-400">Feb</span>
            <span>Mar</span>
          </div>
          <div className="flex flex-col justify-center gap-1 select-none">
            <span>12</span>
            <span className="scale-115 font-bold text-white">13</span>
            <span>14</span>
          </div>
          <div className="flex flex-col gap-1 opacity-40 select-none">
            <span>2024</span>
            <span className="scale-110 font-bold text-zinc-400">2025</span>
            <span>2026</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "work-experience") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="w-[180px] rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 font-sans space-y-2">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5">
            <span className="font-mono text-[6px] text-zinc-500 uppercase tracking-widest">
              Career Timeline
            </span>
            <span className="rounded bg-sky-500/10 px-1 py-0.5 font-mono text-[5px] font-bold text-sky-400">
              ACTIVE
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[7.5px] font-bold text-white">Software Engineer</span>
                <span className="text-[5.5px] text-zinc-500">Google Inc.</span>
              </div>
              <span className="font-mono text-[5.5px] text-zinc-500">2024 - PRES</span>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[7.5px] font-bold text-zinc-400">Frontend developer</span>
                <span className="text-[5.5px] text-zinc-600">Startup Lab</span>
              </div>
              <span className="font-mono text-[5.5px] text-zinc-650">2022 - 2024</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "3d-planet") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <style>{`
          @keyframes rotateGlobe {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .globe-mesh {
            animation: rotateGlobe 12s linear infinite;
          }
        `}</style>
        <div className="relative flex size-14 items-center justify-center">
          {/* Wireframe Rotating Globe mockup */}
          <div className="globe-mesh absolute inset-0 rounded-full border border-dashed border-zinc-700/60" />
          <div className="globe-mesh absolute inset-1.5 rounded-full border border-zinc-800/80 [transform:rotateY(45deg)]" />
          <div className="globe-mesh absolute inset-1.5 rounded-full border border-zinc-800/80 [transform:rotateX(45deg)]" />
          <div className="absolute inset-0.5 rounded-full border border-zinc-800/30" />
          <div className="size-2.5 rounded-full bg-white/10" />
        </div>
      </div>
    );
  }

  if (slug === "aegis-hud") {
    return (
      <div className="relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-white/5 bg-black p-4 select-none">
        <div className="relative flex h-20 w-40 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950/20 overflow-hidden">
          {/* sci-fi heads up display grids */}
          <div className="absolute size-14 rounded-full border border-dashed border-red-500/25 animate-spin" />
          <div className="absolute size-8 rounded-full border border-red-500/30" />
          <div className="absolute h-0.5 w-18 bg-red-500/30" />
          <div className="absolute w-0.5 h-18 bg-red-500/30" />
          {/* HUD specs */}
          <div className="absolute top-1 left-2 font-mono text-[4.5px] text-red-500/60">
            SYS_LOCK: AEGIS_HUD
          </div>
          <div className="absolute bottom-1 right-2 font-mono text-[4.5px] text-red-500/60">
            RANGE: 408m
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
