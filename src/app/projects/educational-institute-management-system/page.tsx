"use client";

import dynamic from "next/dynamic";

const ProjectPageClient = dynamic(
  () => import("../autoservice24/ProjectPageClient"),
  {
    ssr: false,
  },
);

export default function EducationalInstituteProjectPage() {
  return <ProjectPageClient />;
}
