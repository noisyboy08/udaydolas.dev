import type { Metadata } from "next";

import { BlogView } from "@/components/blog-view";
import { getAllPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about code, design, and everything in between.",
};

export default function Page() {
  const blogPosts = getAllPosts()
    .filter((post) => post.metadata?.category !== "projects")
    .sort(
      (a, b) =>
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
    );

  return <BlogView posts={blogPosts} />;
}
