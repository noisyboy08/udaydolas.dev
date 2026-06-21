import { CopyButton } from "@/registry/copy-button";

export default function CopyButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      <CopyButton
        text="pnpm dlx shadcn add @udaydolas/copy-button"
        variant="icon"
      />
      <CopyButton
        text="pnpm dlx shadcn add @udaydolas/copy-button"
        variant="icon-label"
      />
      <CopyButton
        text="pnpm dlx shadcn add @udaydolas/copy-button"
        variant="pill"
      />
      <CopyButton
        text="pnpm dlx shadcn add @udaydolas/copy-button"
        variant="icon-label"
        size="lg"
      />
    </div>
  );
}
