"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  autoservice24Project,
  getAutoservice24Content,
} from "../data/autoservice24";
import { useTheme } from "./ThemeProvider";
import { useDirection } from "./useDirection";

const ProjectsSection = () => {
  const { isDarkMode } = useTheme();
  const { dir, isRTL, language } = useDirection();
  const content = getAutoservice24Content(language);
  const previewShots = [
    autoservice24Project.screenshots[0],
    autoservice24Project.screenshots[2],
    autoservice24Project.screenshots[8],
  ];
  const sectionBadgeClass = isDarkMode
    ? "border-purple-400/30 bg-purple-500/10 text-purple-100 shadow-[0_0_24px_rgba(168,85,247,0.14)]"
    : "border-indigo-200 bg-indigo-50 text-indigo-800";
  const sectionTitleGradient = isDarkMode
    ? "bg-gradient-to-r from-blue-400 to-purple-400"
    : "bg-gradient-to-r from-indigo-600 to-purple-600";
  const sectionCardClass = isDarkMode
    ? "border-cyan-500/20 bg-[linear-gradient(135deg,rgba(2,6,23,0.92),rgba(15,23,42,0.9),rgba(8,145,178,0.18))]"
    : "border-cyan-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(240,249,255,0.98),rgba(236,253,245,0.98))]";
  const projectBadgeClass = isDarkMode
    ? "border-purple-400/25 bg-slate-800/70"
    : "border-indigo-200 bg-indigo-50";
  const projectEyebrowClass = isDarkMode
    ? "text-purple-200/90"
    : "text-indigo-700/90";
  const statCardClass = isDarkMode
    ? "border-cyan-400/10 bg-cyan-500/5 text-slate-100"
    : "border-cyan-100 bg-white/80 text-slate-700";

  return (
    <section
      id="projects"
      dir={dir}
      className="relative py-24"
      aria-labelledby="projects-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div
            className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${sectionBadgeClass}`}
          >
            <Sparkles className="h-4 w-4" />
            <span>{content.cardEyebrow}</span>
          </div>
          <h2
            id="projects-title"
            className="mb-4 text-5xl font-black leading-[1.1] sm:text-6xl"
          >
            <span
              className={`bg-clip-text text-transparent ${sectionTitleGradient}`}
            >
              {content.sectionTitle}
            </span>
          </h2>
          <p
            className={`text-lg leading-8 ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {content.sectionSubtitle}
          </p>
        </div>

        <div
          className={`grid items-center gap-10 overflow-hidden rounded-[2rem] border p-6 shadow-2xl md:grid-cols-[1.1fr_0.9fr] md:p-8 lg:p-10 ${sectionCardClass}`}
        >
          <div>
            <div
              className={`mb-6 inline-flex items-center gap-3 rounded-2xl border px-4 py-3 ${projectBadgeClass}`}
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl">
                <Image
                  src={autoservice24Project.brandAssets.logo}
                  alt="AutoService24 Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${projectEyebrowClass}`}
                >
                  {content.detailEyebrow}
                </p>
                <h3
                  className={`text-2xl font-black ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {content.cardTitle}
                </h3>
              </div>
            </div>

            <p
              className={`mb-8 text-lg leading-8 ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {content.cardDescription}
            </p>

            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {content.cardStats.map((stat) => (
                <div
                  key={stat}
                  className={`rounded-2xl border px-4 py-4 text-sm font-semibold leading-6 ${statCardClass}`}
                >
                  {stat}
                </div>
              ))}
            </div>

            <div
              className={`flex flex-col gap-4 sm:flex-row ${
                isRTL ? "sm:flex-row-reverse" : ""
              }`}
            >
              <Link
                href="/projects/autoservice24"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-purple-500/20 transition-transform duration-300 hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(139,92,246,0.35)]"
              >
                <span>{content.cardCta}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[1.75rem]">
              <Image
                src={autoservice24Project.brandAssets.hero}
                alt="AutoService24 hero artwork"
                width={1200}
                height={1200}
                className="h-auto w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {previewShots.map((shot) => (
                <div
                  key={shot.key}
                  className={`overflow-hidden rounded-[1.5rem] border ${
                    isDarkMode
                      ? "border-white/10 bg-white/5"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.title[language.startsWith("ar") ? "ar" : "en"]}
                    width={1024}
                    height={1536}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
