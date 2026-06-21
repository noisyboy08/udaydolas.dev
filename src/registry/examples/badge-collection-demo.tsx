import { BadgeCollection } from "@/registry/badge-collection";

export default function BadgeCollectionDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <BadgeCollection className="max-w-xs justify-center" />
    </div>
  );
}
