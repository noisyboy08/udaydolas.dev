import { BadgeCollection } from "@/registry/badge-collection";

export default function BadgeCollectionDemo() {
  return (
    <div className="flex items-center justify-center p-6 w-full">
      <BadgeCollection className="max-w-xs justify-center" />
    </div>
  );
}
