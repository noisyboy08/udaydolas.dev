"use client";

import {
  BoxIcon,
  CheckIcon,
  CircleIcon,
  ClipboardIcon,
  ClockIcon,
  Code2Icon,
  GithubIcon,
  Grid2X2Icon,
  Grid3X3Icon,
  LayoutGridIcon,
  MessageSquareIcon,
  PanelTopIcon,
  QrCodeIcon,
  SlidersHorizontalIcon,
  SparklesIcon,
  SunIcon,
  TerminalIcon,
  TextCursorInputIcon,
  UsersIcon,
  WandSparklesIcon,
} from "lucide-react";
import Link from "next/link";
import React, { Suspense, useMemo, useState } from "react";

import { Index } from "@/__registry__/index";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { Post } from "@/types/blog";

type ComponentsMode = "list" | "showcase";
type ShowcaseSize = "sm" | "md" | "wide" | "large" | "tall" | "hero";

const PACKAGE_MANAGERS = ["pnpm", "yarn", "npm", "bun"] as const;

const SHOWCASE_CONFIG: Record<
  string,
  { demo: string; size: ShowcaseSize; label: string; className?: string }
> = {
  "apple-hello-effect": {
    demo: "apple-hello-effect-en-demo",
    size: "large",
    label: "Apple Hello Effect",
  },
  "theme-switcher": {
    demo: "theme-switcher-demo",
    size: "sm",
    label: "Theme Switcher",
  },
  "wheel-picker": {
    demo: "wheel-picker-demo",
    size: "tall",
    label: "Wheel Picker",
  },
  "work-experience": {
    demo: "work-experience-demo",
    size: "hero",
    label: "Work Experience",
    className: "items-start justify-start overflow-y-auto p-6",
  },
  "flip-sentences": {
    demo: "flip-sentences-demo",
    size: "sm",
    label: "Flip Sentences",
  },
  "glowing-orb": {
    demo: "glowing-orb-demo",
    size: "md",
    label: "Glowing Orb",
    className: "p-0 overflow-hidden",
  },
  "morphing-text": {
    demo: "morphing-text-demo",
    size: "md",
    label: "Morphing Text",
  },
  "spotlight-card": {
    demo: "spotlight-card-demo",
    size: "md",
    label: "Spotlight Card",
  },
  "neon-clock": {
    demo: "neon-clock-demo",
    size: "md",
    label: "Neon Clock",
  },
  "dot-grid-spotlight": {
    demo: "dot-grid-spotlight-demo",
    size: "wide",
    label: "Dot Grid Spotlight",
    className: "p-0 overflow-hidden",
  },
  "shimmering-text": {
    demo: "shimmering-text-demo",
    size: "md",
    label: "Shimmering Text",
  },
  "spinning-circular-text": {
    demo: "spinning-circular-text-demo",
    size: "md",
    label: "Spinning Circular Text",
  },
  "testimonials-marquee": {
    demo: "testimonials-marquee-demo",
    size: "large",
    label: "Testimonials Marquee",
    className: "p-0 overflow-hidden",
  },
  "glow-card-grid": {
    demo: "glow-card-grid-demo",
    size: "hero",
    label: "Glow Card Grid",
    className: "items-start justify-start overflow-y-auto p-4",
  },
  "elastic-slider": { demo: "elastic-slider-demo", size: "tall", label: "Elastic Slider" },
  "slide-to-unlock": { demo: "slide-to-unlock-demo", size: "md", label: "Slide to Unlock" },
  "copy-button": { demo: "copy-button-demo", size: "sm", label: "Copy Button" },
  "fluid-gradient-text": { demo: "fluid-gradient-text-demo", size: "md", label: "Fluid Gradient Text" },
  "scroll-fade-effect": { demo: "scroll-fade-effect-demo", size: "tall", label: "Scroll Fade Effect", className: "items-start justify-start p-2" },
  "text-flip": { demo: "text-flip-demo", size: "md", label: "Text Flip" },
  "testimonial": { demo: "testimonial-demo", size: "large", label: "Testimonial", className: "items-start justify-start p-4 overflow-auto" },
  "testimonial-spotlight": { demo: "testimonial-spotlight-demo", size: "md", label: "Testimonial Spotlight", className: "p-2" },
  "number-counter": { demo: "number-counter-demo", size: "wide", label: "Number Counter" },
  "progress-ring": { demo: "progress-ring-demo", size: "md", label: "Progress Ring" },
  "gradient-border-card": { demo: "gradient-border-card-demo", size: "tall", label: "Gradient Border Card", className: "items-start justify-start p-2 overflow-auto" },
  "typewriter-effect": { demo: "typewriter-effect-demo", size: "wide", label: "Typewriter Effect" },
  "magnetic-button": { demo: "magnetic-button-demo", size: "md", label: "Magnetic Button" },
  "avatar-group": { demo: "avatar-group-demo", size: "md", label: "Avatar Group" },
  "stat-card": { demo: "stat-card-demo", size: "hero", label: "Stat Card", className: "items-start justify-start p-3 overflow-auto" },
  "timeline": { demo: "timeline-demo", size: "tall", label: "Timeline", className: "items-start justify-start p-4 overflow-auto" },
  "pricing-card": { demo: "pricing-card-demo", size: "hero", label: "Pricing Card", className: "items-start justify-start p-4 overflow-auto" },
  "step-progress": { demo: "step-progress-demo", size: "large", label: "Step Progress", className: "items-start justify-start p-4 overflow-hidden" },
  "badge-collection": { demo: "badge-collection-demo", size: "md", label: "Badge Collection" },
  "skeleton-loader": { demo: "skeleton-loader-demo", size: "large", label: "Skeleton Loader", className: "items-start justify-start p-3 overflow-auto" },
  "feature-card": { demo: "feature-card-demo", size: "large", label: "Feature Card", className: "items-start justify-start overflow-auto" },
  "code-snippet": { demo: "code-snippet-demo", size: "large", label: "Code Snippet", className: "items-start justify-start p-3 overflow-auto" },
  "particle-cursor": { demo: "particle-cursor-demo", size: "wide", label: "Particle Cursor", className: "p-0 overflow-hidden" },
  "tilt-card": { demo: "tilt-card-demo", size: "md", label: "Tilt Card" },
  "animated-tabs": { demo: "animated-tabs-demo", size: "md", label: "Animated Tabs" },
  "accordion": { demo: "accordion-demo", size: "tall", label: "Accordion", className: "items-start justify-start p-4 overflow-auto" },
  "github-contributions": { demo: "github-contributions-demo", size: "large", label: "GitHub Contributions", className: "p-3 overflow-hidden" },
  "github-stars": { demo: "github-stars-demo", size: "sm", label: "GitHub Stars" },
  "middle-truncation": { demo: "middle-truncation-demo", size: "md", label: "Middle Truncation" },
  "theme-toggle-effect": { demo: "theme-toggle-effect-demo", size: "sm", label: "Theme Toggle Effect", className: "p-0" },
  "icon-swap": { demo: "icon-swap-demo", size: "md", label: "Icon Swap" },
};

const COMPONENT_ICONS = [
  SparklesIcon,
  BoxIcon,
  CircleIcon,
  ClockIcon,
  WandSparklesIcon,
  TextCursorInputIcon,
  SunIcon,
  Grid2X2Icon,
  PanelTopIcon,
  Code2Icon,
  GithubIcon,
  MessageSquareIcon,
  QrCodeIcon,
  SlidersHorizontalIcon,
  TerminalIcon,
  UsersIcon,
  LayoutGridIcon,
  SparklesIcon,
  BoxIcon,
  CircleIcon,
];

const sizeClass: Record<ShowcaseSize, string> = {
  sm: "min-h-38",
  md: "row-span-2 min-h-76",
  wide: "sm:col-span-2 min-h-38",
  large: "sm:col-span-2 row-span-2 min-h-76",
  tall: "row-span-2 min-h-76",
  hero: "sm:col-span-2 row-span-3 min-h-114",
};

export function ComponentsView({
  posts,
  mode = "list",
}: {
  posts: Post[];
  mode?: ComponentsMode;
}) {
  return (
    <div className="[--color-react:#087EA4] dark:[--color-react:#58C4DC]">
      {mode === "list" ? (
        <ComponentsList posts={posts} />
      ) : (
        <ComponentsShowcase posts={posts} />
      )}
    </div>
  );
}

function ComponentsList({ posts }: { posts: Post[] }) {
  return (
    <>
      <InstallCommand defaultComponent={posts[0]?.slug ?? "theme-switcher"} />
      <div className="screen-line-before h-8 bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56" />
      <div className="flex items-center justify-between border-b border-edge px-4 py-2.5">
        <span className="text-sm font-medium text-muted-foreground">
          {posts.length} components
        </span>
        <ViewToggle active="list" />
      </div>
      <div className="grid border-b border-edge sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => {
          const Icon = COMPONENT_ICONS[index % COMPONENT_ICONS.length];

          return (
            <Link
              key={post.slug}
              href={`/components/${post.slug}`}
              className={cn(
                "group flex min-h-12 items-center gap-3 border-edge px-4 py-3 transition-colors hover:bg-accent/60",
                "sm:border-r lg:[&:nth-child(3n)]:border-r-0",
                "sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r",
                "[&:nth-child(n+2)]:border-t sm:[&:nth-child(n+3)]:border-t lg:[&:nth-child(n+4)]:border-t"
              )}
            >
              <span className="relative flex size-6 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground shadow-sm">
                <Icon className="size-3.5" aria-hidden />
                {post.metadata.new && (
                  <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-info ring-2 ring-background" />
                )}
              </span>
              <span className="truncate text-sm font-semibold underline-offset-4 group-hover:underline">
                {post.metadata.title}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function InstallCommand({ defaultComponent }: { defaultComponent: string }) {
  const [manager, setManager] =
    useState<(typeof PACKAGE_MANAGERS)[number]>("pnpm");
  const [copied, setCopied] = useState(false);

  const command = useMemo(() => {
    const runners = {
      pnpm: "pnpm dlx shadcn add",
      yarn: "yarn dlx shadcn add",
      npm: "npx shadcn add",
      bun: "bunx shadcn add",
    };

    return `${runners[manager]} @udaydolas/${defaultComponent}`;
  }, [defaultComponent, manager]);

  const copyCommand = async () => {
    await navigator.clipboard?.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="border-b border-edge px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-4">
          <Icons.pnpm className="size-4 shrink-0 text-muted-foreground" />
          <div className="flex items-center gap-4 overflow-x-auto font-mono text-sm">
            {PACKAGE_MANAGERS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setManager(item)}
                className={cn(
                  "relative py-1 text-muted-foreground transition-colors hover:text-foreground",
                  manager === item && "text-foreground"
                )}
              >
                {item}
                {manager === item && (
                  <span className="absolute right-0 -bottom-px left-0 h-0.5 bg-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={copyCommand}
          className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Copy install command"
          title="Copy install command"
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <ClipboardIcon className="size-4" />
          )}
        </button>
      </div>
      <pre className="mt-3 overflow-x-auto pb-1 font-mono text-sm text-muted-foreground">
        <code>{command}</code>
      </pre>
    </div>
  );
}

function ComponentsShowcase({ posts }: { posts: Post[] }) {
  return (
    <>
      <div className="flex items-center justify-end border-b border-edge px-4 py-2.5">
        <ViewToggle active="showcase" />
      </div>
      <div className="grid grid-flow-dense auto-rows-[152px] grid-cols-1 gap-1 border-b border-edge bg-edge p-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {posts.map((post) => {
          const config = SHOWCASE_CONFIG[post.slug];

          if (config) {
            return (
              <ShowcaseCell
                key={post.slug}
                slug={post.slug}
                demoName={config.demo}
                label={config.label}
                size={config.size}
                className={config.className}
              />
            );
          }

          return <FallbackCell key={post.slug} post={post} />;
        })}
        <ExtraShowcaseCell label="Gradient Controls" size="md">
          <GradientControlsPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Install Command" size="sm">
          <CommandPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Text Spotlight" size="wide">
          <TextSpotlightPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Testimonials" size="wide" className="p-2">
          <TestimonialsPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Creator Grid" size="large" className="p-3">
          <CreatorGridPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Version Tags" size="tall" className="p-3">
          <VersionTagsPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Haptic QR" size="md">
          <HapticQrPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Dot Matrix" size="md">
          <DotMatrixPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="System Terminal" size="md">
          <TerminalConsolePreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Audio Controller" size="md">
          <AudioControllerPreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Token Usage" size="md">
          <TokenUsagePreview />
        </ExtraShowcaseCell>
        <ExtraShowcaseCell label="Michael" size="md">
          <MichaelSignPreview />
        </ExtraShowcaseCell>
      </div>
    </>
  );
}

function ShowcaseCell({
  slug,
  demoName,
  label,
  size,
  className,
}: {
  slug: string;
  demoName: string;
  label: string;
  size: ShowcaseSize;
  className?: string;
}) {
  const entry = Index[demoName];
  const Component = entry?.component;

  return (
    <section
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-border bg-background",
        sizeClass[size]
      )}
    >
      <div
        className={cn(
          "flex min-h-0 flex-1 items-center justify-center overflow-hidden p-5",
          className
        )}
      >
        {Component ? (
          <Suspense
            fallback={
              <div className="text-xs text-muted-foreground">Loading...</div>
            }
          >
            <div className="flex min-h-full w-full items-center justify-center">
              <Component />
            </div>
          </Suspense>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Icons.react className="size-8 text-[--color-react] opacity-30" />
            <span className="text-xs opacity-60">Preview unavailable</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-edge px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Icons.react
            className="size-3.5 shrink-0 text-[--color-react]"
            aria-hidden
          />
          <span className="truncate text-xs font-medium text-muted-foreground">
            {label}
          </span>
        </div>
        <Link
          href={`/components/${slug}`}
          className="rounded-sm px-1.5 py-0.5 text-xs text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
        >
          Docs
        </Link>
      </div>
    </section>
  );
}

function ExtraShowcaseCell({
  label,
  size,
  className,
  children,
}: {
  label: string;
  size: ShowcaseSize;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-border bg-background",
        sizeClass[size]
      )}
    >
      <div
        className={cn(
          "flex min-h-0 flex-1 items-center justify-center overflow-hidden p-5",
          className
        )}
      >
        {children}
      </div>
      <div className="flex items-center gap-2 border-t border-edge px-3 py-2">
        <SparklesIcon
          className="size-3.5 shrink-0 text-[--color-react]"
          aria-hidden
        />
        <span className="truncate text-xs font-medium text-muted-foreground">
          {label}
        </span>
      </div>
    </section>
  );
}

function GradientControlsPreview() {
  const rows = [
    ["Opacity", "0.50"],
    ["Blur", "20px"],
    ["Saturation", "8.0"],
  ];

  return (
    <div className="flex w-56 flex-col gap-3">
      {rows.map(([label, value], index) => (
        <div
          key={label}
          className="grid h-10 grid-cols-[1fr_88px] overflow-hidden rounded-md bg-muted text-sm"
        >
          <span
            className={cn(
              "flex items-center px-3 text-muted-foreground",
              index === 0 && "bg-white/5",
              index === 1 && "bg-white/8",
              index === 2 && "bg-white/10"
            )}
          >
            {label}
          </span>
          <span className="flex items-center justify-end px-3 font-mono text-muted-foreground">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}


function CommandPreview() {
  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-card p-3 font-mono text-sm">
      <div className="mb-3 flex items-center justify-between text-muted-foreground">
        <div className="flex items-center gap-3">
          <Icons.pnpm className="size-4" />
          <span className="font-semibold text-foreground">pnpm</span>
          <span>yarn</span>
          <span>npm</span>
          <span>bun</span>
        </div>
        <ClipboardIcon className="size-4" />
      </div>
      <p className="text-muted-foreground">$ pnpm dlx shadcn add button</p>
    </div>
  );
}

function TextSpotlightPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <p className="absolute top-6 text-xs text-muted-foreground">
        Move your cursor within the text below
      </p>
      <p className="select-none text-7xl font-black tracking-normal text-transparent [-webkit-text-stroke:1px_var(--border)] sm:text-8xl">
        uday
      </p>
      <div className="absolute bottom-10 h-px w-4/5 bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

function TestimonialsPreview() {
  const quotes = [
    ["Great job", "Built with care and speed."],
    ["Clean design", "One of the sharpest portfolio systems."],
    ["Smooth UX", "The components feel ready to use."],
  ];

  return (
    <div className="grid h-full w-full grid-cols-3 divide-x divide-border overflow-hidden rounded-md border border-border">
      {quotes.map(([title, body]) => (
        <div key={title} className="flex min-w-0 flex-col justify-between p-2.5 bg-card">
          <p className="text-xs font-semibold text-balance leading-normal">{body}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="size-6 shrink-0 rounded-full bg-gradient-to-br from-cyan-400 via-violet-400 to-rose-400" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold leading-none truncate">{title}</p>
              <p className="text-[9px] text-muted-foreground leading-none mt-0.5 truncate">Creator feedback</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CreatorGridPreview() {
  const people = ["shadcn", "OrcDev", "David Haz", "Shu", "Emil", "Uday"];

  return (
    <div className="grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
      {people.map((person, index) => (
        <div
          key={person}
          className="flex h-[108px] flex-col items-center justify-center rounded-lg border border-border bg-card p-2 text-center shadow-sm"
        >
          <span
            className={cn(
              "mb-2 size-11 rounded-full bg-gradient-to-br",
              index % 3 === 0 && "from-fuchsia-400 via-sky-400 to-amber-300",
              index % 3 === 1 && "from-lime-300 via-emerald-400 to-cyan-400",
              index % 3 === 2 && "from-violet-400 via-rose-300 to-orange-300"
            )}
          />
          <span className="text-xs font-bold leading-tight">{person}</span>
          <span className="text-[10px] text-muted-foreground leading-none mt-0.5">
            @{person.toLowerCase().replace(" ", "")}
          </span>
        </div>
      ))}
    </div>
  );
}

function VersionTagsPreview() {
  return (
    <div className="w-56 rounded-lg border border-border bg-card p-4">
      <p className="mb-2.5 text-xs text-muted-foreground">Tags</p>
      <div className="max-h-[140px] space-y-2.5 overflow-y-auto pr-2 font-mono text-sm">
        {Array.from({ length: 9 }, (_, index) => (
          <p key={index} className="border-b border-border pb-2">
            v1.2.0-beta.{50 - index}
          </p>
        ))}
      </div>
    </div>
  );
}

function HapticQrPreview() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="rounded-md bg-foreground px-3 py-1 text-sm font-semibold text-background">
        Haptic
      </span>
      <p className="max-w-44 text-sm text-muted-foreground">
        Scan the QR code below to try it on mobile.
      </p>
      <div className="grid grid-cols-9 gap-0.5 rounded-lg bg-white p-3">
        {Array.from({ length: 81 }, (_, index) => (
          <span
            key={index}
            className={cn(
              "size-2",
              index % 2 === 0 || index % 7 === 0 || index % 13 === 0
                ? "bg-black"
                : "bg-white"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function DotMatrixPreview() {
  return (
    <div className="grid h-full w-full grid-cols-[repeat(24,minmax(0,1fr))] gap-2 opacity-70">
      {Array.from({ length: 240 }, (_, index) => (
        <span
          key={index}
          className={cn(
            "size-1 rounded-full",
            index % 19 === 0 ? "bg-info" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
}

function TerminalConsolePreview() {
  return (
    <div className="w-full h-full flex flex-col font-mono text-[10px] text-muted-foreground bg-black/40 p-3 rounded border border-border/40 overflow-hidden leading-relaxed justify-between">
      <div className="space-y-1">
        <p className="text-info font-bold">~ udaydolas$ init --system</p>
        <p className="text-emerald-400">✓ Load core credentials</p>
        <p className="text-emerald-400">✓ Establish remote connection (12ms)</p>
        <p className="text-rose-400">✗ Security warning bypassed</p>
        <p className="text-amber-400">! Optimizing garbage collection</p>
      </div>
      <p className="text-foreground animate-pulse mt-2">udaydolas.dev ~ $ _</p>
    </div>
  );
}

function AudioControllerPreview() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-3 bg-card border border-border/40 rounded-md">
      <div className="flex items-center gap-2">
        <div className="size-10 rounded bg-gradient-to-tr from-rose-500 via-purple-500 to-blue-500 flex items-center justify-center shrink-0">
          <span className="size-1.5 bg-white rounded-full animate-ping" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold truncate">Anti-Gravity Beats</p>
          <p className="text-[10px] text-muted-foreground truncate">Procedural Synth Engine</p>
        </div>
      </div>
      
      <div className="flex items-end gap-1 h-8 px-1">
        {[20, 45, 60, 30, 80, 50, 95, 75, 40, 60, 25, 55, 70, 40].map((h, i) => (
          <span
            key={i}
            className="flex-1 bg-gradient-to-t from-violet-500 to-cyan-400 rounded-t-sm animate-pulse"
            style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-1 text-[10px] text-muted-foreground font-mono">
        <span>02:14</span>
        <div className="flex items-center gap-2.5 text-xs text-foreground">
          <button type="button" className="hover:text-cyan-400">⏮</button>
          <button type="button" className="size-5 rounded-full bg-foreground text-background flex items-center justify-center font-bold">⏸</button>
          <button type="button" className="hover:text-cyan-400">⏭</button>
        </div>
        <span>03:45</span>
      </div>
    </div>
  );
}

function TokenUsagePreview() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2">
      <div className="relative size-20 flex items-center justify-center">
        <svg className="absolute size-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="34"
            className="stroke-muted fill-none"
            strokeWidth="6"
          />
          <circle
            cx="40"
            cy="40"
            r="34"
            className="stroke-cyan-400 fill-none"
            strokeWidth="6"
            strokeDasharray="213.6"
            strokeDashoffset="64"
            strokeLinecap="round"
          />
        </svg>
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold font-mono">70%</span>
          <span className="text-[8px] text-muted-foreground font-mono">92.5k t/s</span>
        </div>
      </div>
      <div className="min-w-0 mt-1">
        <p className="text-xs font-semibold">Gemma 2B Local</p>
        <p className="text-[9px] text-muted-foreground font-mono">API Usage Limits</p>
      </div>
    </div>
  );
}

function MichaelSignPreview() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-2 overflow-hidden bg-black/80 rounded-md border border-border/40">
      <img
        src="/images/michael-sign.png"
        alt="Michael Signature"
        className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_12px_rgba(234,179,8,0.3)] transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}

function FallbackCell({ post }: { post: Post }) {
  return (
    <Link
      href={`/components/${post.slug}`}
      className="group flex min-h-38 flex-col items-center justify-center gap-3 rounded-md border border-border bg-background p-6 text-center transition-colors hover:bg-accent/60"
    >
      <Icons.react className="size-8 text-[--color-react] opacity-60" />
      <span className="text-sm font-semibold text-balance">
        {post.metadata.title}
      </span>
      <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        View docs
      </span>
    </Link>
  );
}

function ViewToggle({ active }: { active: ComponentsMode }) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-edge bg-background p-1">
      <Link
        href="/components"
        aria-label="Component list"
        title="Component list"
        className={cn(
          "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
          active === "list" && "bg-foreground text-background hover:text-background"
        )}
      >
        <Grid3X3Icon className="size-3.5" />
      </Link>
      <Link
        href="/components/showcase"
        aria-label="Component showcase"
        title="Component showcase"
        className={cn(
          "flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
          active === "showcase" &&
            "bg-foreground text-background hover:text-background"
        )}
      >
        <LayoutGridIcon className="size-3.5" />
      </Link>
    </div>
  );
}
