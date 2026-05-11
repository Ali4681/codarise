"use client";

import dynamic from "next/dynamic";

const ProjectPageClient = dynamic(() => import("./ProjectPageClient"), {
  ssr: false,
});

export default function AutoService24ProjectPage() {
  return <ProjectPageClient />;
}
