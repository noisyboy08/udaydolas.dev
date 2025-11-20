import type { Metadata } from "next";

import { NotFound as PageNotFound } from "@/components/not-found";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return <PageNotFound className="h-screen" />;
}
