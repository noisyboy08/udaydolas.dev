import type { Registry } from "shadcn/registry";

export const components: Registry["items"] = [
  {
    name: "theme-switcher",
    type: "registry:component",
    description:
      "A theme switcher component for Next.js apps with next-themes and Tailwind CSS, supporting system, light, and dark modes.",
    title: "Theme Switcher",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: ["next-themes", "lucide-react", "motion"],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "theme-switcher/theme-switcher.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://chanhdai.com/components/theme-switcher-component",
  },
  {
    name: "flip-sentences",
    type: "registry:component",
    title: "Flip Sentences",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: ["motion"],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "flip-sentences/flip-sentences.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "apple-hello-effect",
    type: "registry:component",
    description:
      "Create a Xin chào and Hello writing effect inspired by Apple using Motion for React.",
    title: "Apple Hello Effect",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: ["motion"],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "apple-hello-effect/apple-hello-effect.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://chanhdai.com/components/writing-effect-inspired-by-apple",
  },
  {
    name: "wheel-picker",
    type: "registry:component",
    description:
      "iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support.",
    title: "Wheel Picker",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: ["@ncdai/react-wheel-picker"],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "wheel-picker/wheel-picker.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://chanhdai.com/components/react-wheel-picker",
  },
  {
    name: "work-experience",
    type: "registry:component",
    description:
      "Displays a list of work experiences with role details and durations.",
    title: "Work Experience",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: ["react-markdown", "lucide-react"],
    devDependencies: ["@tailwindcss/typography"],
    registryDependencies: [
      "<registryBaseUrl>/utils.json",
      "collapsible",
      "separator",
    ],
    files: [
      {
        path: "work-experience/work-experience.tsx",
        type: "registry:component",
      },
    ],
    cssVars: {
      light: {
        background: "oklch(1 0 0)",
        muted: "oklch(0.967 0.001 286.375)",
        "muted-foreground": "oklch(0.552 0.016 285.938)",
        border: "oklch(0.92 0.004 286.32)",
      },
      dark: {
        background: "oklch(0.141 0.005 285.823)",
        muted: "oklch(0.274 0.006 286.033)",
        "muted-foreground": "oklch(0.705 0.015 286.067)",
        border: "oklch(0.274 0.006 286.033)",
      },
    },
    docs: "https://chanhdai.com/components/work-experience-component",
  },
  {
    name: "glowing-orb",
    type: "registry:component",
    title: "Glowing Orb",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "glowing-orb/glowing-orb.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "morphing-text",
    type: "registry:component",
    title: "Morphing Text",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "morphing-text/morphing-text.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "spotlight-card",
    type: "registry:component",
    title: "Spotlight Card",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "spotlight-card/spotlight-card.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "neon-clock",
    type: "registry:component",
    title: "Neon Clock",
    author: "ncdai <dai@chanhdai.com>",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "neon-clock/neon-clock.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "dot-grid-spotlight",
    type: "registry:component",
    title: "Dot Grid Spotlight",
    description:
      "An interactive dot-grid canvas component that highlights dots near the cursor with a customisable spotlight glow effect.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "dot-grid-spotlight/dot-grid-spotlight.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "shimmering-text",
    type: "registry:component",
    title: "Shimmering Text",
    description:
      "A pure-CSS shimmer animation for text that sweeps a highlight across characters.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "shimmering-text/shimmering-text.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "spinning-circular-text",
    type: "registry:component",
    title: "Spinning Circular Text",
    description:
      "Characters arranged in a circle that continuously spin — built with SVG and CSS keyframes.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "spinning-circular-text/spinning-circular-text.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "testimonials-marquee",
    type: "registry:component",
    title: "Testimonials Marquee",
    description:
      "A continuous horizontal marquee of testimonial cards with pause-on-hover, configurable speed, and fade-out edges.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "testimonials-marquee/testimonials-marquee.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "glow-card-grid",
    type: "registry:component",
    title: "Glow Card Grid",
    description:
      "A responsive grid of cards that emit a radial glow following the mouse cursor.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "glow-card-grid/glow-card-grid.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "elastic-slider",
    type: "registry:component",
    title: "Elastic Slider",
    description:
      "A smooth, elastic-feeling range slider with floating value label and custom accent color.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "elastic-slider/elastic-slider.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "slide-to-unlock",
    type: "registry:component",
    title: "Slide to Unlock",
    description: "Draggable unlock slider with elastic spring-back.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "slide-to-unlock/slide-to-unlock.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "copy-button",
    type: "registry:component",
    title: "Copy Button",
    description: "Clipboard copy button with animated confirmation state.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "copy-button/copy-button.tsx", type: "registry:component" },
    ],
  },
  {
    name: "fluid-gradient-text",
    type: "registry:component",
    title: "Fluid Gradient Text",
    description:
      "Text with a continuously flowing multi-color gradient animation.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "fluid-gradient-text/fluid-gradient-text.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "scroll-fade-effect",
    type: "registry:component",
    title: "Scroll Fade Effect",
    description: "Intersection-observer reveal animation in 4 directions.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "scroll-fade-effect/scroll-fade-effect.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "text-flip",
    type: "registry:component",
    title: "Text Flip",
    description: "Cycles through an array of words with a 3D flip transition.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [{ path: "text-flip/text-flip.tsx", type: "registry:component" }],
  },
  {
    name: "testimonial",
    type: "registry:component",
    title: "Testimonial",
    description: "Testimonial card with card, minimal and spotlight variants.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "testimonial/testimonial.tsx", type: "registry:component" },
    ],
  },
  {
    name: "testimonial-spotlight",
    type: "registry:component",
    title: "Testimonial Spotlight",
    description: "Dark testimonial card with a mouse-tracking radial glow.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "testimonial-spotlight/testimonial-spotlight.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "number-counter",
    type: "registry:component",
    title: "Number Counter",
    description:
      "Animated number that counts up to a target when it enters the viewport.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "number-counter/number-counter.tsx", type: "registry:component" },
    ],
  },
  {
    name: "progress-ring",
    type: "registry:component",
    title: "Progress Ring",
    description: "SVG circular progress indicator with animated fill.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "progress-ring/progress-ring.tsx", type: "registry:component" },
    ],
  },
  {
    name: "gradient-border-card",
    type: "registry:component",
    title: "Gradient Border Card",
    description: "Card with an animated rotating gradient border.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "gradient-border-card/gradient-border-card.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "typewriter-effect",
    type: "registry:component",
    title: "Typewriter Effect",
    description: "Animated typewriter that types and deletes a list of words.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "typewriter-effect/typewriter-effect.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "magnetic-button",
    type: "registry:component",
    title: "Magnetic Button",
    description: "Button that magnetically follows the cursor on hover.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "magnetic-button/magnetic-button.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "avatar-group",
    type: "registry:component",
    title: "Avatar Group",
    description:
      "Overlapping avatar stack with gradient initials and overflow count.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "avatar-group/avatar-group.tsx", type: "registry:component" },
    ],
  },
  {
    name: "stat-card",
    type: "registry:component",
    title: "Stat Card",
    description: "Metric card with accent bar, trend indicator, and icon.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [{ path: "stat-card/stat-card.tsx", type: "registry:component" }],
  },
  {
    name: "timeline",
    type: "registry:component",
    title: "Timeline",
    description: "Vertical timeline with done/active/pending step states.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [{ path: "timeline/timeline.tsx", type: "registry:component" }],
  },
  {
    name: "pricing-card",
    type: "registry:component",
    title: "Pricing Card",
    description:
      "Pricing card with highlighted plan, badge, and animated border.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "pricing-card/pricing-card.tsx", type: "registry:component" },
    ],
  },
  {
    name: "step-progress",
    type: "registry:component",
    title: "Step Progress",
    description: "Multi-step progress in numbered, bars, and dots variants.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "step-progress/step-progress.tsx", type: "registry:component" },
    ],
  },
  {
    name: "badge-collection",
    type: "registry:component",
    title: "Badge Collection",
    description:
      "Badge set with success, warning, error, info, outline and gradient variants.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "badge-collection/badge-collection.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "skeleton-loader",
    type: "registry:component",
    title: "Skeleton Loader",
    description: "Animated skeleton placeholders for cards, text and circles.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "skeleton-loader/skeleton-loader.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "feature-card",
    type: "registry:component",
    title: "Feature Card",
    description: "Feature card with icon bubble and hover shimmer.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "feature-card/feature-card.tsx", type: "registry:component" },
    ],
  },
  {
    name: "code-snippet",
    type: "registry:component",
    title: "Code Snippet",
    description:
      "Dark code block with macOS chrome, language tag, and copy button.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "code-snippet/code-snippet.tsx", type: "registry:component" },
    ],
  },
  {
    name: "particle-cursor",
    type: "registry:component",
    title: "Particle Cursor",
    description: "Canvas particle trail that follows the mouse cursor.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "particle-cursor/particle-cursor.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "tilt-card",
    type: "registry:component",
    title: "Tilt Card",
    description: "3D perspective tilt card with glare highlight on hover.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [{ path: "tilt-card/tilt-card.tsx", type: "registry:component" }],
  },
  {
    name: "animated-tabs",
    type: "registry:component",
    title: "Animated Tabs",
    description: "Tabs with pill, underline, and card style variants.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "animated-tabs/animated-tabs.tsx", type: "registry:component" },
    ],
  },
  {
    name: "accordion",
    type: "registry:component",
    title: "Accordion",
    description: "Animated accordion with smooth height transitions.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [{ path: "accordion/accordion.tsx", type: "registry:component" }],
  },
  {
    name: "github-contributions",
    type: "registry:component",
    title: "GitHub Contributions",
    description: "GitHub-style contribution heatmap grid.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "github-contributions/github-contributions.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "github-stars",
    type: "registry:component",
    title: "GitHub Stars",
    description: "Star badge that fetches live star count from the GitHub API.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      { path: "github-stars/github-stars.tsx", type: "registry:component" },
    ],
  },
  {
    name: "middle-truncation",
    type: "registry:component",
    title: "Middle Truncation",
    description:
      "Truncates long strings from the middle, preserving start and end.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "middle-truncation/middle-truncation.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "theme-toggle-effect",
    type: "registry:component",
    title: "Theme Toggle Effect",
    description: "Animated sun/moon toggle button for dark/light mode.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [
      {
        path: "theme-toggle-effect/theme-toggle-effect.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "icon-swap",
    type: "registry:component",
    title: "Icon Swap",
    description:
      "Button that swaps between two icons with flip, slide or fade animation.",
    dependencies: [],
    registryDependencies: ["<registryBaseUrl>/utils.json"],
    files: [{ path: "icon-swap/icon-swap.tsx", type: "registry:component" }],
  },
];
