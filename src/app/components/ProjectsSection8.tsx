"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent } from "react";
import { useEffect, useState } from "react";
import { getAutoservice24Content } from "../data/autoservice24";
import { getEducationalInstituteContent } from "../data/educationalInstitute";
import { useTheme } from "./ThemeProvider";
import { useDirection } from "./useDirection";

const hexToRgb = (hex: string) =>
  `${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)}`;

/* ─── per-project config ─────────────────────────────────────────── */
const PROJECT_CONFIG = [
  {
    color: "#3b82f6",
    stack: ["Flutter", "NestJS", "MongoDB", "WebSocket"],
    tags: [
      "Geolocation",
      "Push notifications",
      "Multi-role auth",
      "Real-time updates",
      "App Store",
      "Google Play",
    ],
  },
  {
    color: "#a855f7",
    stack: ["Next.js", "Flutter", "NestJS", "PostgreSQL"],
    tags: ["Multi-tenant", "Role-based access", "REST API", "Reports"],
  },
] as const;

/* ─── component ─────────────────────────────────────────────────── */
const ProjectsSection = () => {
  const router = useRouter();
  const { isDarkMode } = useTheme();
  const { dir, isRTL, language } = useDirection();
  const [active, setActive] = useState(0);
  const [openingProject, setOpeningProject] = useState<{
    href: string;
    title: string;
    color: string;
    colorRgb: string;
  } | null>(null);
  const sectionContent = getAutoservice24Content(language);

  useEffect(() => {
    if (sessionStorage.getItem("returnToProjects")) {
      sessionStorage.removeItem("returnToProjects");
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, []);

  const projects = [
    {
      num: "01",
      cat: language === "ar" ? "تطبيق موبايل" : "Mobile Application",
      content: getAutoservice24Content(language),
      href: "/projects/autoservice24",
      cfg: PROJECT_CONFIG[0],
    },
    {
      num: "02",
      cat: language === "ar" ? "منصة ويب وتطبيقات" : "Web Platform & Apps",
      content: getEducationalInstituteContent(language),
      href: "/projects/educational-institute-management-system",
      cfg: PROJECT_CONFIG[1],
    },
  ];

  const openProject = (
    event: MouseEvent<HTMLAnchorElement>,
    project: (typeof projects)[number],
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (openingProject) {
      return;
    }

    setOpeningProject({
      href: project.href,
      title: project.content.cardTitle,
      color: project.cfg.color,
      colorRgb: hexToRgb(project.cfg.color),
    });

    sessionStorage.setItem("returnToProjects", "1");

    window.setTimeout(() => {
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      root.style.scrollBehavior = previousScrollBehavior;
      router.push(project.href);
    }, 900);
  };

  return (
    <section
      id="projects"
      dir={dir}
      className={`relative overflow-hidden py-24 lg:py-32 ${
        isDarkMode
          ? "bg-[radial-gradient(ellipse_at_20%_20%,rgba(59,130,246,0.20),transparent_48%),radial-gradient(ellipse_at_80%_30%,rgba(168,85,247,0.18),transparent_45%),radial-gradient(ellipse_at_50%_100%,rgba(236,72,153,0.10),transparent_42%),#020617]"
          : "bg-[radial-gradient(ellipse_at_18%_18%,rgba(59,130,246,0.13),transparent_48%),radial-gradient(ellipse_at_82%_28%,rgba(168,85,247,0.12),transparent_44%),radial-gradient(ellipse_at_50%_100%,rgba(6,182,212,0.10),transparent_42%),#f8fafc]"
      }`}
      aria-labelledby="projects-title"
      style={{ fontFamily: "'Geist', 'Inter', sans-serif" }}
    >
      {/*
        ─── SETUP ───────────────────────────────────────────────────
        1. Add to globals.css:
           @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Geist:wght@300;400;500&display=swap');

        2. Nothing else needed — no cardIn keyframe required.
        ─────────────────────────────────────────────────────────────
      */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.16),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(168,85,247,0.15),transparent_30%)]"
              : "bg-[radial-gradient(circle_at_18%_12%,rgba(59,130,246,0.11),transparent_34%),radial-gradient(circle_at_86%_36%,rgba(168,85,247,0.10),transparent_30%)]"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-[linear-gradient(rgba(96,165,250,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.045)_1px,transparent_1px)]"
              : "bg-[linear-gradient(rgba(59,130,246,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.045)_1px,transparent_1px)]"
          } bg-[size:48px_48px]`}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="project-heading mx-auto mb-12 max-w-3xl text-center">
          <h2
            id="projects-title"
            className="mb-4 text-5xl font-black leading-[1.1] sm:text-6xl"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {sectionContent.sectionTitle}
            </span>
          </h2>
          <p
            className={`text-lg leading-8 ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {sectionContent.sectionSubtitle}
          </p>
        </div>

        <div
          className={`project-card-shell rounded-[2rem] border px-4 py-8 shadow-2xl sm:px-6 lg:px-8 ${
            isDarkMode
              ? "border-white/10 bg-slate-950/70 shadow-black/45 backdrop-blur-xl"
              : "border-white/70 bg-white/80 shadow-blue-200/45 backdrop-blur-xl"
          }`}
        >
          {/* ══════════════════════════════════════════
            TOP BAR
        ══════════════════════════════════════════ */}
          <div
            aria-hidden="true"
            className={`hidden ${
              isDarkMode ? "border-white/10" : "border-blue-100"
            }`}
          >
            {/* left: title block */}
            <div>
              <h2
                className={`leading-[.95] tracking-tight ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 900,
                }}
              >
                {language === "ar" ? (
                  <>
                    مشاريعي{" "}
                    <em style={{ fontStyle: "italic", fontWeight: 700 }}>
                      المميزة
                    </em>
                  </>
                ) : (
                  <>
                    My{" "}
                    <em style={{ fontStyle: "italic", fontWeight: 700 }}>
                      Projects
                    </em>
                  </>
                )}
              </h2>
            </div>

            {/* right: ghost count + subtitle */}
            <div className={isRTL ? "text-left" : "text-right"}>
              <p
                aria-hidden
                className={`leading-none tracking-[-0.04em] opacity-[0.07] select-none ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "3.5rem",
                  fontWeight: 900,
                }}
              >
                {String(projects.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* ══════════════════════════════════════════
            PROJECT LIST
        ══════════════════════════════════════════ */}
          <ul className="flex flex-col gap-4" role="list">
            {projects.map((project, idx) => {
              const isSelected = idx === active;
              return (
                <li
                  key={idx}
                  className="project-row relative"
                  style={{ animationDelay: `${idx * 120 + 180}ms` }}
                >
                  {/* left color bar — active indicator */}
                  <div
                    aria-hidden
                    className="project-active-line absolute inset-x-4 top-0 h-[2px] rounded-full transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${project.cfg.color}, transparent)`,
                      opacity: isSelected ? 1 : 0,
                    }}
                  />

                  <button
                    onClick={() => setActive(idx)}
                    className={`project-item relative w-full overflow-hidden rounded-[1.35rem] border p-4 text-${isRTL ? "right" : "left"} transition-all duration-300 sm:p-5 ${
                      isSelected
                        ? isDarkMode
                          ? "border-white/15 bg-white/[0.07] shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
                          : "border-indigo-200 bg-white shadow-[0_18px_45px_rgba(99,102,241,0.16)]"
                        : isDarkMode
                          ? "border-white/10 bg-white/[0.025] hover:border-white/15 hover:bg-white/[0.045]"
                          : "border-indigo-100 bg-white/70 hover:border-indigo-200 hover:bg-white"
                    }`}
                    aria-expanded={isSelected}
                    aria-controls={`project-detail-${idx}`}
                  >
                    {isSelected && (
                      <span
                        aria-hidden
                        className="project-shine pointer-events-none absolute inset-0"
                      />
                    )}
                    <span
                      aria-hidden
                      className={`absolute ${isRTL ? "left-5" : "right-5"} top-2 text-7xl font-black leading-none transition-opacity duration-300 ${
                        isSelected
                          ? isDarkMode
                            ? "text-white/[0.06]"
                            : "text-indigo-950/[0.05]"
                          : isDarkMode
                            ? "text-white/[0.035]"
                            : "text-indigo-950/[0.035]"
                      }`}
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                      }}
                    >
                      {project.num}
                    </span>
                    <div
                      className={`relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 ${
                        isRTL ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div
                          className={`flex min-w-0 items-start gap-3 sm:gap-5 ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          {/* index */}
                          <span
                            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-[12px] font-bold tracking-[.02em] transition-colors duration-200 sm:h-10 sm:w-10 sm:text-[13px] ${
                              isSelected
                                ? isDarkMode
                                  ? "border-purple-300/30 bg-purple-500/10 text-purple-100"
                                  : "border-indigo-200 bg-indigo-50 text-indigo-700"
                                : isDarkMode
                                  ? "border-white/10 text-slate-400"
                                  : "border-indigo-100 text-slate-500"
                            }`}
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                            }}
                          >
                            {project.num}
                          </span>

                          {/* middle */}
                          <div className="min-w-0 flex-1">
                            <p
                              className={`mb-1.5 max-w-full text-[8px] font-medium uppercase tracking-[.14em] [overflow-wrap:anywhere] sm:text-[9px] sm:tracking-[.22em] ${
                                isDarkMode ? "text-purple-200" : "text-indigo-700"
                              }`}
                            >
                              {project.cat}
                            </p>
                            <h3
                              className={`max-w-full leading-[1.12] transition-colors duration-200 [overflow-wrap:anywhere] sm:leading-[1.1] ${
                                isDarkMode ? "text-white" : "text-slate-900"
                              }`}
                              style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: "clamp(1.05rem, 4.8vw, 1.5rem)",
                                fontWeight: 700,
                              }}
                            >
                              {project.content.cardTitle}
                            </h3>
                          </div>
                        </div>

                        {/* expandable detail */}
                        <div
                          id={`project-detail-${idx}`}
                          className="project-detail min-w-0 overflow-hidden transition-all duration-300 ease-in-out"
                          style={{
                            maxHeight: isSelected ? "620px" : "0px",
                            opacity: isSelected ? 1 : 0,
                            marginTop: isSelected ? "12px" : "0px",
                          }}
                        >
                          {/* description */}
                          <p
                            className={`mb-3 max-w-full text-[12px] leading-[1.7] [overflow-wrap:anywhere] sm:text-[12.5px] sm:leading-[1.75] ${
                              isDarkMode ? "text-slate-300" : "text-slate-700"
                            }`}
                          >
                            {project.content.cardDescription}
                          </p>

                        {/* tags */}
                        <div
                          className={`mb-4 flex flex-wrap gap-1.5 ${
                            isRTL ? "flex-row-reverse" : ""
                          }`}
                        >
                          {project.cfg.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`max-w-full rounded-[3px] border px-2 py-1 text-[9px] font-medium tracking-[.03em] [overflow-wrap:anywhere] sm:px-2.5 sm:text-[9.5px] sm:tracking-[.06em] ${
                                isDarkMode
                                  ? "bg-white/[0.06] text-slate-200 border-white/10"
                                  : "bg-indigo-50 text-indigo-800 border-indigo-100"
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                          {/* CTAs */}
                          <div
                            className={`flex items-center gap-3 ${
                              isRTL ? "flex-row-reverse" : ""
                            }`}
                          >
                            <Link
                              href={project.href}
                              onClick={(e) => openProject(e, project)}
                              className="project-cta inline-flex max-w-full items-center gap-1.5 rounded-full px-3.5 py-2 text-[10.5px] font-semibold text-white transition-opacity duration-200 hover:opacity-85 sm:px-4 sm:text-[11px]"
                              style={{ background: project.cfg.color }}
                              aria-label={`${project.content.cardCta}: ${project.content.cardTitle}`}
                            >
                              <span className="min-w-0 [overflow-wrap:anywhere]">
                                {project.content.cardCta}
                              </span>
                              <ArrowUpRight className="h-3 w-3 flex-shrink-0" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* right: stack + arrow */}
                      <div
                        className={`flex min-w-0 flex-shrink-0 flex-row items-center justify-between gap-2.5 sm:flex-col ${
                          isRTL ? "sm:items-start" : "sm:items-end"
                        }`}
                      >
                        <div
                          className={`flex max-w-full flex-1 flex-wrap gap-1 sm:max-w-[160px] ${
                            isRTL ? "justify-start" : "sm:justify-end"
                          }`}
                        >
                          {project.cfg.stack.map((s) => (
                            <span
                              key={s}
                              className={`max-w-full rounded-[3px] border px-2 py-1 text-[8.5px] font-medium tracking-[.03em] [overflow-wrap:anywhere] sm:text-[9px] sm:tracking-[.05em] ${
                                isDarkMode
                                  ? "bg-white/[0.05] text-slate-300 border-white/10"
                                  : "bg-white/85 text-slate-700 border-indigo-100"
                              }`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* arrow */}
                        <div
                          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                            isSelected
                              ? isDarkMode
                                ? "border-purple-300/50 text-purple-100 bg-purple-500/10"
                                : "border-indigo-300 text-indigo-700 bg-indigo-50"
                              : isDarkMode
                                ? "border-white/10 text-slate-400"
                                : "border-indigo-100 text-slate-500"
                          }`}
                          style={{
                            transform: isSelected
                              ? "rotate(45deg)"
                              : "rotate(0deg)",
                            transition:
                              "transform 0.2s ease, border-color 0.2s ease",
                          }}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ══════════════════════════════════════════
            BOTTOM BAR
        ══════════════════════════════════════════ */}
          <div
            className={`flex items-center justify-end mt-8 pt-5 border-t ${
              isDarkMode ? "border-white/10" : "border-blue-100"
            }`}
          >
            <button
              hidden
              className={`group inline-flex items-center gap-2 text-[11.5px] font-medium transition-colors duration-150 bg-transparent border-none cursor-pointer ${
                isDarkMode
                  ? "text-slate-300 hover:text-white"
                  : "text-slate-700 hover:text-slate-950"
              } ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <span>
                {language === "ar" ? "عرض كل الأعمال" : "View all work"}
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* dot nav */}
            <div className="project-dots flex items-center gap-1.5">
              {projects.map((project, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Go to project ${idx + 1}: ${project.content.cardTitle}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full border-none cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-80"
                  style={{
                    background: "transparent",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="h-[5px] rounded-full transition-all duration-300 ease-in-out"
                    style={{
                      width: active === idx ? "18px" : "5px",
                      background:
                        active === idx
                          ? project.cfg.color
                          : isDarkMode
                            ? "rgba(255,255,255,0.2)"
                            : "#CBD5E1",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {openingProject ? (
        <div
          className="ppt-root"
          role="status"
          aria-label={`${openingProject.title}`}
          style={{
            "--pc": openingProject.color,
            "--pcr": openingProject.colorRgb,
          } as CSSProperties}
        >
          {/* Dark backdrop */}
          <div className="ppt-backdrop" aria-hidden="true" />

          {/* Color flood from center */}
          <div className="ppt-flood" aria-hidden="true" />

          {/* Expanding rings */}
          <div className="ppt-rings" aria-hidden="true">
            {([0, 55, 110, 165, 220] as const).map((delay) => (
              <div
                key={delay}
                className="ppt-ring"
                style={{ animationDelay: `${delay}ms` } as CSSProperties}
              />
            ))}
          </div>

          {/* Rotating conic sweeps */}
          <div className="ppt-conic ppt-conic-1" aria-hidden="true" />
          <div className="ppt-conic ppt-conic-2" aria-hidden="true" />

          {/* Particle burst */}
          <div className="ppt-particles" aria-hidden="true">
            {Array.from({ length: 20 }, (_, i) => (
              <span
                key={i}
                className="ppt-particle"
                style={{
                  "--pa": `${i * 18}deg`,
                  "--pd": `${85 + (i % 5) * 42}px`,
                  "--ps": `${2 + (i % 3)}px`,
                  "--pde": `${i * 14}ms`,
                } as CSSProperties}
              />
            ))}
          </div>

          {/* Center content */}
          <div className="ppt-content">
            <div className="ppt-orb" aria-hidden="true">
              <div className="ppt-orb-glow" />
              <div className="ppt-orb-core" />
            </div>
            <div className="ppt-title-block">
              <p className="ppt-eyebrow">
                {language === "ar" ? "جارٍ الفتح" : "Opening"}
              </p>
              <p className="ppt-title">{openingProject.title}</p>
              <div className="ppt-bar" aria-hidden="true">
                <div className="ppt-bar-fill" />
              </div>
            </div>
          </div>

          {/* Scan line */}
          <div className="ppt-scanline" aria-hidden="true" />
        </div>
      ) : null}

      <style jsx>{`
        .project-heading {
          animation: projectFadeUp 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .project-card-shell {
          animation: projectCardIn 820ms 120ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
          transform-origin: 50% 20%;
        }

        .project-row {
          animation: projectFadeUp 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .project-item {
          will-change: transform, box-shadow;
        }

        .project-item:hover {
          transform: translateY(-3px);
        }

        .project-active-line {
          background-size: 220% 100% !important;
          animation: projectLineFlow 2.2s linear infinite;
        }

        .project-shine {
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0.16) 38%,
            transparent 58%
          );
          transform: translateX(-120%);
          animation: projectShine 2.8s ease-in-out infinite;
        }

        .project-detail {
          animation: projectSoftReveal 360ms ease both;
        }

        .project-cta {
          box-shadow: 0 10px 24px rgba(99, 102, 241, 0.26);
        }

        .project-cta:hover {
          animation: projectButtonPulse 900ms ease both;
        }

        /* ── Cosmic Portal Transition ───────────────── */

        .ppt-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          display: grid;
          place-items: center;
        }

        .ppt-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(2, 6, 23, 0.97);
          animation: pptBdIn 200ms ease forwards;
        }

        .ppt-flood {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          background: radial-gradient(
            circle,
            rgba(var(--pcr), 0.65) 0%,
            rgba(var(--pcr), 0.22) 52%,
            transparent 100%
          );
          animation: pptFlood 820ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .ppt-rings {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
        }

        .ppt-ring {
          position: absolute;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 2px solid var(--pc);
          box-shadow:
            0 0 14px 3px rgba(var(--pcr), 0.45),
            inset 0 0 14px 3px rgba(var(--pcr), 0.2);
          animation: pptRingBurst 820ms ease-out forwards;
        }

        .ppt-conic {
          position: absolute;
          width: 220vmax;
          height: 220vmax;
          border-radius: 50%;
          top: 50%;
          left: 50%;
        }

        .ppt-conic-1 {
          background: conic-gradient(
            from 0deg,
            transparent 0%,
            rgba(var(--pcr), 0.22) 14%,
            transparent 28%,
            rgba(var(--pcr), 0.13) 54%,
            transparent 68%
          );
          animation: pptConic1 820ms ease-out forwards;
        }

        .ppt-conic-2 {
          background: conic-gradient(
            from 90deg,
            rgba(var(--pcr), 0.12) 0%,
            transparent 22%,
            rgba(var(--pcr), 0.16) 50%,
            transparent 72%
          );
          animation: pptConic2 820ms ease-out forwards;
        }

        .ppt-particles {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
        }

        .ppt-particle {
          position: absolute;
          width: var(--ps, 3px);
          height: var(--ps, 3px);
          border-radius: 50%;
          background: var(--pc);
          box-shadow: 0 0 7px 2px rgba(var(--pcr), 0.65);
          opacity: 0;
          animation: pptParticle 680ms var(--pde, 0ms) cubic-bezier(0, 0.55, 0.45, 1) forwards;
        }

        .ppt-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.35rem;
          animation: pptContentIn 500ms 220ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .ppt-orb {
          position: relative;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          animation: pptOrbFloat 1.4s ease-in-out infinite;
        }

        .ppt-orb-glow {
          position: absolute;
          inset: -14px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(var(--pcr), 0.32) 0%,
            transparent 70%
          );
          animation: pptOrbGlow 1.4s ease-in-out infinite;
        }

        .ppt-orb-core {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: radial-gradient(
            circle at 32% 32%,
            rgba(255, 255, 255, 0.95),
            var(--pc) 48%,
            rgba(var(--pcr), 0.45) 100%
          );
          box-shadow:
            0 0 28px 10px rgba(var(--pcr), 0.55),
            0 0 70px 24px rgba(var(--pcr), 0.22),
            inset 0 -5px 14px rgba(0, 0, 0, 0.28);
        }

        .ppt-title-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
        }

        .ppt-eyebrow {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.42);
          margin: 0;
        }

        .ppt-title {
          font-size: clamp(1.15rem, 4.5vw, 1.65rem);
          font-weight: 800;
          color: #fff;
          text-align: center;
          text-shadow:
            0 0 32px rgba(var(--pcr), 0.85),
            0 0 64px rgba(var(--pcr), 0.38);
          letter-spacing: -0.02em;
          margin: 0;
          max-width: min(78vw, 400px);
          overflow-wrap: anywhere;
        }

        .ppt-bar {
          width: 110px;
          height: 2px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.1);
          overflow: hidden;
          position: relative;
        }

        .ppt-bar-fill {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 0;
          background: linear-gradient(90deg, var(--pc), rgba(255, 255, 255, 0.85));
          box-shadow: 0 0 10px rgba(var(--pcr), 0.9);
          animation: pptBar 780ms 80ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .ppt-scanline {
          position: absolute;
          top: -4px;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(var(--pcr), 0.3) 14%,
            var(--pc) 38%,
            rgba(255, 255, 255, 0.95) 50%,
            var(--pc) 62%,
            rgba(var(--pcr), 0.3) 86%,
            transparent 100%
          );
          box-shadow:
            0 0 18px 5px rgba(var(--pcr), 0.55),
            0 0 44px 10px rgba(var(--pcr), 0.2);
          animation: pptScan 820ms 60ms ease-in-out forwards;
        }

        @keyframes pptBdIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pptFlood {
          from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          18% { opacity: 1; }
          to { transform: translate(-50%, -50%) scale(32); opacity: 0.1; }
        }

        @keyframes pptRingBurst {
          from { transform: scale(0.7); opacity: 1; }
          to { transform: scale(28); opacity: 0; }
        }

        @keyframes pptConic1 {
          from { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
          22% { opacity: 0.9; }
          to { transform: translate(-50%, -50%) scale(1) rotate(265deg); opacity: 0; }
        }

        @keyframes pptConic2 {
          from { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
          32% { opacity: 0.6; }
          to { transform: translate(-50%, -50%) scale(1) rotate(-195deg); opacity: 0; }
        }

        @keyframes pptParticle {
          from { transform: rotate(var(--pa)) translateX(0); opacity: 0; }
          16% { opacity: 1; }
          to { transform: rotate(var(--pa)) translateX(var(--pd, 120px)); opacity: 0; }
        }

        @keyframes pptContentIn {
          from { opacity: 0; transform: translateY(18px) scale(0.93); filter: blur(7px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        @keyframes pptOrbFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-5px) scale(1.06); }
        }

        @keyframes pptOrbGlow {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.22); }
        }

        @keyframes pptBar {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes pptScan {
          from { top: -4px; opacity: 0; }
          9% { opacity: 1; }
          91% { opacity: 1; }
          to { top: 100vh; opacity: 0; }
        }

        .project-dots button[style*="18px"] {
          animation: projectDotPulse 1.8s ease-in-out infinite;
        }

        @keyframes projectFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes projectCardIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes projectLineFlow {
          from {
            background-position: 0% 50%;
          }
          to {
            background-position: 220% 50%;
          }
        }

        @keyframes projectShine {
          0%,
          42% {
            transform: translateX(-120%);
            opacity: 0;
          }
          55% {
            opacity: 1;
          }
          78%,
          100% {
            transform: translateX(120%);
            opacity: 0;
          }
        }

        @keyframes projectSoftReveal {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes projectButtonPulse {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          45% {
            transform: translateY(-1px) scale(1.035);
          }
        }

        @keyframes projectDotPulse {
          0%,
          100% {
            opacity: 1;
            transform: scaleX(1);
          }
          50% {
            opacity: 0.78;
            transform: scaleX(1.12);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-heading,
          .project-card-shell,
          .project-row,
          .project-active-line,
          .project-shine,
          .project-detail,
          .project-cta:hover,
          .ppt-root,
          .ppt-backdrop,
          .ppt-flood,
          .ppt-ring,
          .ppt-conic-1,
          .ppt-conic-2,
          .ppt-particle,
          .ppt-content,
          .ppt-orb,
          .ppt-orb-glow,
          .ppt-bar-fill,
          .ppt-scanline,
          .project-dots button[style*="18px"] {
            animation: none !important;
          }

          .project-item:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
