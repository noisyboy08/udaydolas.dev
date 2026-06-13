import type { Metadata } from "next";

import { ComponentsView } from "@/components/components-view";
import { getPostsByCategory } from "@/data/blog";

export const metadata: Metadata = {
  title: "Component Showcase",
  description: "Interactive component previews.",
};

export default function Page() {
  const posts = getPostsByCategory("components");

  return (
    <div className="min-h-svh [--color-react:#087EA4] dark:[--color-react:#58C4DC]">
      <div className="screen-line-after px-4 pt-10 pb-4">
        <p className="mb-1 text-sm font-medium text-muted-foreground">
          Component Showcase
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-balance">
          Pixel-perfect, uniquely crafted.
        </h1>
      </div>

      <ComponentsView posts={posts} mode="showcase" />
    </div>
  );
}
