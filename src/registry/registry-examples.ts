import type { Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "apple-hello-effect-vi-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/apple-hello-effect.json"],
    files: [
      {
        path: "examples/apple-hello-effect-vi-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "apple-hello-effect-en-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/apple-hello-effect.json"],
    files: [
      {
        path: "examples/apple-hello-effect-en-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "theme-switcher-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/theme-switcher.json"],
    files: [
      {
        path: "examples/theme-switcher-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "wheel-picker-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/wheel-picker.json"],
    files: [
      {
        path: "examples/wheel-picker-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "wheel-picker-form-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/wheel-picker.json", "form"],
    files: [
      {
        path: "examples/wheel-picker-form-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "work-experience-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/work-experience.json"],
    files: [
      {
        path: "examples/work-experience-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "glowing-orb-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/glowing-orb.json"],
    files: [
      {
        path: "examples/glowing-orb-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "morphing-text-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/morphing-text.json"],
    files: [
      {
        path: "examples/morphing-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "spotlight-card-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/spotlight-card.json"],
    files: [
      {
        path: "examples/spotlight-card-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "neon-clock-demo",
    type: "registry:example",
    registryDependencies: ["<registryBaseUrl>/neon-clock.json"],
    files: [
      {
        path: "examples/neon-clock-demo.tsx",
        type: "registry:example",
      },
    ],
  },
];
