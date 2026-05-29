import type { Metadata } from "next";

import { ComponentsView } from "@/components/components-view";
import { getPostsByCategory } from "@/data/blog";

export const metadata: Metadata = {
  title: "Components",
  description: "Pixel-perfect, uniquely crafted.",
};

export default function Page() {
  const posts = getPostsByCategory("components");

  return (
    <div className="min-h-svh [--color-react:#087EA4] dark:[--color-react:#58C4DC]">
      {/* Hero heading — matches reference design */}
      <div className="screen-line-after px-4 pt-2 pb-4">
        <p className="mb-1 font-mono text-xs font-medium text-[--color-react]">
          Components
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pixel-perfect, uniquely crafted.
        </h1>
      </div>

      {/* View switcher + list / grid / showcase */}
      <ComponentsView posts={posts} />
    </div>
  );
}
