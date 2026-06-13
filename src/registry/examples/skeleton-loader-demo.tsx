import { SkeletonCard } from "@/registry/skeleton-loader";

export default function SkeletonLoaderDemo() {
  return (
    <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 p-2">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
