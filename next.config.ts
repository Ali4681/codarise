import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    // Keep dev artifacts separate so `next build` does not clobber a running
    // dev server and to reduce transient `.next` file races on Windows.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  };
}
