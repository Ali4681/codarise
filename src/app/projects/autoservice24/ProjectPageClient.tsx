"use client";

import {
  ArrowLeft,
  CheckCircle2,
  Crown,
  Diamond,
  ExternalLink,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Wand2,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageToggle from "../../components/LanguageToggle";
import { useTheme } from "../../components/ThemeProvider";
import ThemeToggle from "../../components/ThemeToggle";
import { useDirection } from "../../components/useDirection";
import {
  autoservice24Project,
  getAutoservice24Content,
} from "../../data/autoservice24";
import {
  educationalInstituteProject,
  getEducationalInstituteContent,
} from "../../data/educationalInstitute";
import BookGallery from "@/app/components/BookGallery";

/* ── Types ────────────────────────────────────────────────────────────── */
interface MagicParticle {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  color: string;
}

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  color: string;
}

/* ── Feature data ─────────────────────────────────────────────────────── */
const featureIcons = [
  Wrench,
  ShieldCheck,
  MessageSquareText,
  Store,
  MapPinned,
  Smartphone,
];
const featureColors = ["cyan", "purple", "emerald", "pink", "yellow", "indigo"];

const effectPalette: Record<string, { dark: string; light: string }> = {
  cyan: { dark: "34, 211, 238", light: "8, 145, 178" },
  purple: { dark: "168, 85, 247", light: "126, 34, 206" },
  emerald: { dark: "52, 211, 153", light: "5, 150, 105" },
  pink: { dark: "244, 114, 182", light: "219, 39, 119" },
  yellow: { dark: "250, 204, 21", light: "202, 138, 4" },
  indigo: { dark: "129, 140, 248", light: "79, 70, 229" },
};

const getEffectColor = (color: string, isDarkMode: boolean, alpha = 1) => {
  const palette = effectPalette[color] ?? effectPalette.cyan;
  const rgb = isDarkMode ? palette.dark : palette.light;
  return `rgba(${rgb}, ${alpha})`;
};

/* ── Color system (verbatim from AboutSection5) ───────────────────────── */
const getColorClasses = (color: string, isDarkMode: boolean) => {
  const colorMap: Record<
    string,
    {
      primary: string;
      secondary: string;
      border: string;
      borderHover: string;
      bg: string;
      bgHover: string;
      shadow: string;
      gradient: string;
      dark: {
        primary: string;
        secondary: string;
        border: string;
        borderHover: string;
        bg: string;
        bgHover: string;
        shadow: string;
        gradient: string;
      };
      light: {
        primary: string;
        secondary: string;
        border: string;
        borderHover: string;
        bg: string;
        bgHover: string;
        shadow: string;
        gradient: string;
      };
    }
  > = {
    cyan: {
      primary: isDarkMode ? "text-cyan-400" : "text-cyan-600",
      secondary: isDarkMode ? "text-cyan-300" : "text-cyan-500",
      border: isDarkMode ? "border-cyan-500/30" : "border-cyan-400/50",
      borderHover: isDarkMode ? "border-cyan-400/60" : "border-cyan-500/80",
      bg: isDarkMode ? "bg-cyan-500/20" : "bg-cyan-400/20",
      bgHover: isDarkMode ? "bg-cyan-400/20" : "bg-cyan-500/30",
      shadow: isDarkMode ? "shadow-cyan-400/50" : "shadow-cyan-500/40",
      gradient: isDarkMode
        ? "from-cyan-500/20 to-cyan-600/20"
        : "from-cyan-400/20 to-cyan-500/30",
      dark: {
        primary: "text-cyan-400",
        secondary: "text-cyan-300",
        border: "border-cyan-500/30",
        borderHover: "border-cyan-400/60",
        bg: "bg-cyan-500/20",
        bgHover: "bg-cyan-400/20",
        shadow: "shadow-cyan-400/50",
        gradient: "from-cyan-500/20 to-cyan-600/20",
      },
      light: {
        primary: "text-cyan-600",
        secondary: "text-cyan-500",
        border: "border-cyan-400/50",
        borderHover: "border-cyan-500/80",
        bg: "bg-cyan-400/20",
        bgHover: "bg-cyan-500/30",
        shadow: "shadow-cyan-500/40",
        gradient: "from-cyan-400/20 to-cyan-500/30",
      },
    },
    purple: {
      primary: isDarkMode ? "text-purple-400" : "text-purple-600",
      secondary: isDarkMode ? "text-purple-300" : "text-purple-500",
      border: isDarkMode ? "border-purple-500/30" : "border-purple-400/50",
      borderHover: isDarkMode ? "border-purple-400/60" : "border-purple-500/80",
      bg: isDarkMode ? "bg-purple-500/20" : "bg-purple-400/20",
      bgHover: isDarkMode ? "bg-purple-400/20" : "bg-purple-500/30",
      shadow: isDarkMode ? "shadow-purple-400/50" : "shadow-purple-500/40",
      gradient: isDarkMode
        ? "from-purple-500/20 to-purple-600/20"
        : "from-purple-400/20 to-purple-500/30",
      dark: {
        primary: "text-purple-400",
        secondary: "text-purple-300",
        border: "border-purple-500/30",
        borderHover: "border-purple-400/60",
        bg: "bg-purple-500/20",
        bgHover: "bg-purple-400/20",
        shadow: "shadow-purple-400/50",
        gradient: "from-purple-500/20 to-purple-600/20",
      },
      light: {
        primary: "text-purple-600",
        secondary: "text-purple-500",
        border: "border-purple-400/50",
        borderHover: "border-purple-500/80",
        bg: "bg-purple-400/20",
        bgHover: "bg-purple-500/30",
        shadow: "shadow-purple-500/40",
        gradient: "from-purple-400/20 to-purple-500/30",
      },
    },
    emerald: {
      primary: isDarkMode ? "text-emerald-400" : "text-emerald-600",
      secondary: isDarkMode ? "text-emerald-300" : "text-emerald-500",
      border: isDarkMode ? "border-emerald-500/30" : "border-emerald-400/50",
      borderHover: isDarkMode
        ? "border-emerald-400/60"
        : "border-emerald-500/80",
      bg: isDarkMode ? "bg-emerald-500/20" : "bg-emerald-400/20",
      bgHover: isDarkMode ? "bg-emerald-400/20" : "bg-emerald-500/30",
      shadow: isDarkMode ? "shadow-emerald-400/50" : "shadow-emerald-500/40",
      gradient: isDarkMode
        ? "from-emerald-500/20 to-emerald-600/20"
        : "from-emerald-400/20 to-emerald-500/30",
      dark: {
        primary: "text-emerald-400",
        secondary: "text-emerald-300",
        border: "border-emerald-500/30",
        borderHover: "border-emerald-400/60",
        bg: "bg-emerald-500/20",
        bgHover: "bg-emerald-400/20",
        shadow: "shadow-emerald-400/50",
        gradient: "from-emerald-500/20 to-emerald-600/20",
      },
      light: {
        primary: "text-emerald-600",
        secondary: "text-emerald-500",
        border: "border-emerald-400/50",
        borderHover: "border-emerald-500/80",
        bg: "bg-emerald-400/20",
        bgHover: "bg-emerald-500/30",
        shadow: "shadow-emerald-500/40",
        gradient: "from-emerald-400/20 to-emerald-500/30",
      },
    },
    pink: {
      primary: isDarkMode ? "text-pink-400" : "text-pink-600",
      secondary: isDarkMode ? "text-pink-300" : "text-pink-500",
      border: isDarkMode ? "border-pink-500/30" : "border-pink-400/50",
      borderHover: isDarkMode ? "border-pink-400/60" : "border-pink-500/80",
      bg: isDarkMode ? "bg-pink-500/20" : "bg-pink-400/20",
      bgHover: isDarkMode ? "bg-pink-400/20" : "bg-pink-500/30",
      shadow: isDarkMode ? "shadow-pink-400/50" : "shadow-pink-500/40",
      gradient: isDarkMode
        ? "from-pink-500/20 to-pink-600/20"
        : "from-pink-400/20 to-pink-500/30",
      dark: {
        primary: "text-pink-400",
        secondary: "text-pink-300",
        border: "border-pink-500/30",
        borderHover: "border-pink-400/60",
        bg: "bg-pink-500/20",
        bgHover: "bg-pink-400/20",
        shadow: "shadow-pink-400/50",
        gradient: "from-pink-500/20 to-pink-600/20",
      },
      light: {
        primary: "text-pink-600",
        secondary: "text-pink-500",
        border: "border-pink-400/50",
        borderHover: "border-pink-500/80",
        bg: "bg-pink-400/20",
        bgHover: "bg-pink-500/30",
        shadow: "shadow-pink-500/40",
        gradient: "from-pink-400/20 to-pink-500/30",
      },
    },
    yellow: {
      primary: isDarkMode ? "text-yellow-400" : "text-yellow-600",
      secondary: isDarkMode ? "text-yellow-300" : "text-yellow-500",
      border: isDarkMode ? "border-yellow-500/30" : "border-yellow-400/50",
      borderHover: isDarkMode ? "border-yellow-400/60" : "border-yellow-500/80",
      bg: isDarkMode ? "bg-yellow-500/20" : "bg-yellow-400/20",
      bgHover: isDarkMode ? "bg-yellow-400/20" : "bg-yellow-500/30",
      shadow: isDarkMode ? "shadow-yellow-400/50" : "shadow-yellow-500/40",
      gradient: isDarkMode
        ? "from-yellow-500/20 to-yellow-600/20"
        : "from-yellow-400/20 to-yellow-500/30",
      dark: {
        primary: "text-yellow-400",
        secondary: "text-yellow-300",
        border: "border-yellow-500/30",
        borderHover: "border-yellow-400/60",
        bg: "bg-yellow-500/20",
        bgHover: "bg-yellow-400/20",
        shadow: "shadow-yellow-400/50",
        gradient: "from-yellow-500/20 to-yellow-600/20",
      },
      light: {
        primary: "text-yellow-600",
        secondary: "text-yellow-500",
        border: "border-yellow-400/50",
        borderHover: "border-yellow-500/80",
        bg: "bg-yellow-400/20",
        bgHover: "bg-yellow-500/30",
        shadow: "shadow-yellow-500/40",
        gradient: "from-yellow-400/20 to-yellow-500/30",
      },
    },
    indigo: {
      primary: isDarkMode ? "text-indigo-400" : "text-indigo-600",
      secondary: isDarkMode ? "text-indigo-300" : "text-indigo-500",
      border: isDarkMode ? "border-indigo-500/30" : "border-indigo-400/50",
      borderHover: isDarkMode ? "border-indigo-400/60" : "border-indigo-500/80",
      bg: isDarkMode ? "bg-indigo-500/20" : "bg-indigo-400/20",
      bgHover: isDarkMode ? "bg-indigo-400/20" : "bg-indigo-500/30",
      shadow: isDarkMode ? "shadow-indigo-400/50" : "shadow-indigo-500/40",
      gradient: isDarkMode
        ? "from-indigo-500/20 to-indigo-600/20"
        : "from-indigo-400/20 to-indigo-500/30",
      dark: {
        primary: "text-indigo-400",
        secondary: "text-indigo-300",
        border: "border-indigo-500/30",
        borderHover: "border-indigo-400/60",
        bg: "bg-indigo-500/20",
        bgHover: "bg-indigo-400/20",
        shadow: "shadow-indigo-400/50",
        gradient: "from-indigo-500/20 to-indigo-600/20",
      },
      light: {
        primary: "text-indigo-600",
        secondary: "text-indigo-500",
        border: "border-indigo-400/50",
        borderHover: "border-indigo-500/80",
        bg: "bg-indigo-400/20",
        bgHover: "bg-indigo-500/30",
        shadow: "shadow-indigo-500/40",
        gradient: "from-indigo-400/20 to-indigo-500/30",
      },
    },
  };
  return colorMap[color] || colorMap.cyan;
};

/* ── Component ────────────────────────────────────────────────────────── */
export default function ProjectPageClient() {
  const { isDarkMode } = useTheme();
  const { language } = useDirection();
  const pathname = usePathname();
  const isEducationalInstituteProject = pathname.includes(
    "educational-institute-management-system",
  );
  const project = isEducationalInstituteProject
    ? educationalInstituteProject
    : autoservice24Project;
  const content = isEducationalInstituteProject
    ? getEducationalInstituteContent(language)
    : getAutoservice24Content(language);
  const heroPreviewShots = isEducationalInstituteProject
    ? [
        educationalInstituteProject.screenshots[6],
        educationalInstituteProject.screenshots[7],
      ]
    : project.screenshots.slice(0, 2);
  const heroImageClass = isEducationalInstituteProject
    ? "h-[34rem] w-full object-contain transition-transform duration-500 group-hover:scale-[1.02] sm:h-[40rem] lg:h-[44rem]"
    : "h-[24rem] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-[30rem] lg:h-[34rem]";
  const lang = language.startsWith("ar") ? "ar" : "en";
  const layoutDir = lang === "ar" ? "rtl" : "ltr";
  const isRTL = layoutDir === "rtl";
  const heroGridClass = isEducationalInstituteProject
    ? isRTL
      ? "lg:grid-cols-[1.15fr_0.85fr]"
      : "lg:grid-cols-[0.85fr_1.15fr]"
    : isRTL
      ? "lg:grid-cols-[0.9fr_1.1fr]"
      : "lg:grid-cols-[1.1fr_0.9fr]";

  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [magicParticles, setMagicParticles] = useState<MagicParticle[]>([]);
  const [floatingOrbs, setFloatingOrbs] = useState<FloatingOrb[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* mobile detection */
  useEffect(() => {
    const handle = () => setIsMobile(window.innerWidth < 768);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  /* particles + orbs */
  useEffect(() => {
    const particles: MagicParticle[] = Array.from(
      { length: isMobile ? 15 : 30 },
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 3,
        color: ["cyan", "purple", "pink", "emerald", "yellow"][
          Math.floor(Math.random() * 5)
        ],
      }),
    );
    setMagicParticles(particles);

    const orbs: FloatingOrb[] = Array.from(
      { length: isMobile ? 4 : 8 },
      (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: isMobile ? 10 + Math.random() * 15 : 20 + Math.random() * 30,
        speed: 15 + Math.random() * 25,
        color: ["cyan", "purple", "emerald", "pink"][
          Math.floor(Math.random() * 4)
        ],
      }),
    );
    setFloatingOrbs(orbs);
  }, [isMobile]);

  /* pre-compute color sets — matched to main site palette (blue/purple/emerald) */
  const cyanC = getColorClasses("indigo", isDarkMode); // replaces cyan → site blue accent
  const purpleC = getColorClasses("purple", isDarkMode);
  const emeraldC = getColorClasses("emerald", isDarkMode);
  const gradientDirectionClass = isRTL
    ? "bg-gradient-to-l"
    : "bg-gradient-to-r";
  const headerStartClass = isRTL ? "justify-self-end" : "justify-self-start";
  const headerEndClass = isRTL ? "justify-self-start" : "justify-self-end";
  const heroContentOrderClass = isRTL ? "lg:order-2" : "lg:order-1";
  const heroVisualOrderClass = isRTL ? "lg:order-1" : "lg:order-2";
  const overviewOrderClass = isRTL ? "lg:order-2" : "lg:order-1";
  const challengeOrderClass = isRTL ? "lg:order-1" : "lg:order-2";
  const textAlignClass = isRTL ? "text-right" : "text-left";
  const heroLogoTitleClass = isEducationalInstituteProject
    ? `mb-4 flex min-w-0 flex-col gap-3 ${
        isRTL ? "items-end" : "items-start"
      }`
    : `mb-6 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 ${
        isRTL ? "items-end" : "items-start"
      } ${isRTL ? "sm:flex-row-reverse" : ""}`;
  const heroTitleClass = isEducationalInstituteProject
    ? "sr-only"
    : `min-w-0 break-words ${textAlignClass} ${gradientDirectionClass} bg-clip-text text-3xl font-bold leading-[1.05] text-transparent sm:text-5xl sm:leading-tight md:text-6xl ${
        isDarkMode
          ? "from-blue-400 via-purple-400 to-pink-400"
          : "from-blue-600 via-purple-600 to-pink-600"
      }`;
  const heroSubtitleClass = isEducationalInstituteProject
    ? `mb-8 max-w-2xl text-base leading-relaxed sm:text-lg ${textAlignClass} ${
        isDarkMode ? "text-purple-200" : "text-purple-800"
      }`
    : `mb-8 max-w-2xl text-base leading-relaxed sm:mb-10 sm:text-lg ${textAlignClass} ${
        isDarkMode ? "text-purple-200" : "text-purple-800"
      }`;

  const fixedActionButtonClass =
    "min-h-[3.5rem] sm:min-w-[13rem] justify-center text-center";
  const fixedLargeActionButtonClass =
    "min-h-[3.5rem] sm:min-w-[14rem] justify-center text-center";
  const autoProjectEyebrowClass = isDarkMode
    ? "border-cyan-400/30 bg-cyan-500/12 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
    : "border-cyan-200 bg-cyan-50 text-cyan-800";
  const autoProjectImageBadgeClass = isDarkMode
    ? "border-cyan-400/25 bg-slate-950/55 text-cyan-100"
    : "border-cyan-200 bg-white/88 text-cyan-800";

  /* shared card base classes */
  const cardBase = isDarkMode
    ? "bg-black/40 border-slate-700/50 backdrop-blur-sm"
    : "bg-white/80 border-slate-200 backdrop-blur-sm";
  const heroImageFrameClass = isEducationalInstituteProject
    ? `group relative mx-auto max-w-[28rem] overflow-hidden rounded-[2rem] border transition-all duration-500 ${
        isDarkMode
          ? "border-white/10 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.35)]"
          : "border-slate-200 bg-white shadow-[0_28px_70px_rgba(99,102,241,0.18)]"
      }`
    : `group relative overflow-hidden rounded-[1.5rem] border transition-all duration-500 sm:rounded-[2rem] ${cardBase} ${cyanC.border}`;

  return (
    <div
      ref={sectionRef}
      dir={layoutDir}
      className="relative isolate min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{
        background: isDarkMode
          ? "radial-gradient(ellipse at 20% 20%, rgba(59,130,246,0.2), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(168,85,247,0.2), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(236,72,153,0.15), transparent 50%), #020617"
          : "radial-gradient(ellipse at 20% 20%, rgba(59,130,246,0.1), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(168,85,247,0.1), transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(236,72,153,0.08), transparent 50%), #f8fafc",
      }}
    >
      {/* ── Animated background ───────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Aurora blobs — large slow-drifting colour fields */}
        <div
          className={`absolute -top-[20%] ${isRTL ? "-right-[15%]" : "-left-[15%]"} w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full blur-[140px] ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
          style={{
            opacity: isDarkMode ? 0.25 : 0.12,
            animationName: "auroraFloat",
            animationDuration: "22s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />
        <div
          className={`absolute -bottom-[15%] ${isRTL ? "-left-[15%]" : "-right-[15%]"} w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
          style={{
            opacity: isDarkMode ? 0.2 : 0.1,
            animationName: "auroraFloat",
            animationDuration: "28s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: "-10s",
          }}
        />
        <div
          className={`absolute top-[35%] ${isRTL ? "left-[10%]" : "right-[10%]"} w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-[110px] ${
            isDarkMode ? "bg-purple-600" : "bg-purple-400"
          }`}
          style={{
            opacity: isDarkMode ? 0.15 : 0.08,
            animationName: "auroraFloat",
            animationDuration: "35s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: "-18s",
          }}
        />

        {/* Pulsing gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isDarkMode ? 0.3 : 0.15,
            backgroundImage: isDarkMode
              ? "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.25), transparent 65%)"
              : "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.15), transparent 65%)",
            animationName: "gradientPulse",
            animationDuration: "8s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />

        {/* Magic particles */}
        {magicParticles.map((p) => (
          <div
            key={p.id}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: getEffectColor(
                p.color,
                isDarkMode,
                isDarkMode ? 0.75 : 0.6,
              ),
              boxShadow: `0 0 10px ${getEffectColor(
                p.color,
                isDarkMode,
                isDarkMode ? 0.45 : 0.35,
              )}`,
              animationName: "float",
              animationDuration: `${p.duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Floating orbs */}
        {floatingOrbs.map((o) => (
          <div
            key={o.id}
            className="absolute rounded-full blur-xl"
            style={{
              left: `${o.x}%`,
              top: `${o.y}%`,
              width: `${o.size}px`,
              height: `${o.size}px`,
              backgroundColor: getEffectColor(
                o.color,
                isDarkMode,
                isDarkMode ? 0.28 : 0.18,
              ),
              animationName: "drift",
              animationDuration: `${o.speed}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}

        {/* Mystical grid — desktop only */}
        {!isMobile && (
          <div
            className={`absolute inset-0 ${
              isDarkMode ? "opacity-5" : "opacity-10"
            }`}
          >
            <div className="grid h-full grid-cols-[repeat(20,minmax(0,1fr))] gap-2">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={i}
                  className={`border ${
                    isDarkMode ? "border-purple-500" : "border-blue-300"
                  } animate-pulse`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Geometric shapes — desktop only, RTL-aware */}
        {!isMobile && (
          <>
            <div
              className={`absolute top-10 ${
                isRTL ? "right-10" : "left-10"
              } w-32 h-32 border-2 ${
                isDarkMode ? "border-purple-400/20" : "border-purple-500/20"
              } rotate-45 animate-spin opacity-30`}
              style={{ animationDuration: "25s" }}
            />
            <div
              className={`absolute top-20 ${
                isRTL ? "left-20" : "right-20"
              } w-24 h-24 border-2 ${
                isDarkMode ? "border-blue-400/20" : "border-blue-500/20"
              } animate-bounce opacity-20`}
            />
            <div
              className={`absolute bottom-20 ${
                isRTL ? "right-1/3" : "left-1/3"
              } w-16 h-16 ${gradientDirectionClass} ${
                isDarkMode
                  ? "from-blue-500/20 to-purple-500/20"
                  : "from-blue-400/20 to-purple-400/20"
              } rotate-12 animate-pulse`}
            />
            <div
              className={`absolute bottom-40 ${
                isRTL ? "left-1/4" : "right-1/4"
              } w-20 h-20 border-2 ${
                isDarkMode ? "border-purple-400/20" : "border-purple-500/20"
              } rounded-full animate-ping opacity-30`}
            />
          </>
        )}
      </div>

      {/* ── Main content ──────────────────────────────────────────────── */}
      <div className="relative z-10" dir={layoutDir}>
        {/* ── Sticky header ─────────────────────────────────────────── */}
        <header
          className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-lg ${
            isDarkMode
              ? "bg-slate-900/90 border-purple-500/30 shadow-lg"
              : "bg-white/90 border-slate-200/50 shadow-sm"
          }`}
        >
          <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="/#projects"
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.03] ${headerStartClass} ${
                isRTL ? "flex-row-reverse" : ""
              } ${
                isDarkMode
                  ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  : "border-slate-200 bg-white text-slate-800 hover:bg-slate-100"
              }`}
            >
              <ArrowLeft
                className={`h-4 w-4 shrink-0 ${isRTL ? "rotate-180" : ""}`}
              />
              <span className="hidden sm:inline">{content.backHome}</span>
            </Link>

            <div
              className={`flex min-w-0 items-center justify-self-center gap-2.5 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={project.brandAssets.logo}
                  alt={content.detailTitle}
                  fill
                  className="object-cover"
                />
              </div>
              <span
                className={`hidden text-sm font-black sm:block ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {content.detailTitle}
              </span>
            </div>

            <div
              className={`flex items-center gap-1.5 sm:gap-2 ${headerEndClass} ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex items-center gap-2 border-s border-slate-200/60 ps-3 dark:border-white/10">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <div aria-hidden="true" className="h-[4.75rem] sm:h-[5.25rem]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Hero ──────────────────────────────────────────────────── */}
          <section className="py-10 sm:py-12 md:py-20">
            <div className={`grid items-center gap-8 ${heroGridClass} lg:gap-12`}>
              {/* Left: content */}
              <div
                className={`min-w-0 ${heroContentOrderClass} ${textAlignClass}`}
              >
                {/* Wand2 — desktop only */}
                {!isMobile && (
                  <div className="mb-6 animate-bounce inline-block">
                    <div className="relative">
                      <Wand2
                        className={`w-10 h-10 drop-shadow-lg ${
                          isDarkMode ? "text-purple-400" : "text-purple-600"
                        }`}
                      />
                      <div
                        className={`absolute inset-0 rounded-full blur-lg animate-pulse ${
                          isDarkMode ? "bg-purple-400/20" : "bg-purple-600/20"
                        }`}
                      />
                    </div>
                  </div>
                )}

                {/* Eyebrow badge */}
                <div
                  className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] ${autoProjectEyebrowClass}`}
                >
                  <Sparkles className="h-3 w-3" />
                  <span>{content.detailEyebrow}</span>
                </div>

                {/* Logo + title with magical aura */}
                <div className={heroLogoTitleClass}>
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[1.25rem] shadow-2xl sm:h-[68px] sm:w-[68px]">
                    <Image
                      src={project.brandAssets.logo}
                      alt={content.detailTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h1
                    className={heroTitleClass}
                  >
                    <span className="relative">
                      {content.detailTitle}
                      {!isMobile && !isEducationalInstituteProject && (
                        <div
                          className={`absolute -inset-4 ${gradientDirectionClass} blur-xl animate-pulse ${
                            isDarkMode
                              ? "from-blue-500/20 via-purple-500/20 to-pink-500/20"
                              : "from-blue-400/20 via-purple-400/20 to-pink-400/20"
                          }`}
                        />
                      )}
                    </span>
                  </h1>
                </div>

                {/* Subtitle */}
                <p
                  className={heroSubtitleClass}
                >
                  {content.detailSubtitle}
                </p>

                {!isEducationalInstituteProject && (
                  <div
                    className={`mb-10 flex flex-col gap-3 sm:mb-12 sm:flex-row sm:flex-wrap sm:gap-4 ${
                      isRTL ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    <a
                      href={project.storeLinks.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex w-full items-center gap-3 rounded-full border px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:scale-[1.04] sm:w-auto ${fixedActionButtonClass} ${
                        isRTL ? "flex-row-reverse" : ""
                      } ${
                        isDarkMode
                          ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                          : "border-slate-900 bg-slate-900 text-white hover:bg-slate-700"
                      }`}
                    >
                      <span>{content.appStoreLabel}</span>
                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </a>
                    <a
                      href={project.storeLinks.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex w-full items-center gap-3 rounded-full ${gradientDirectionClass} from-blue-600 to-purple-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_25px_5px_rgba(139,92,246,0.5)] sm:w-auto ${fixedActionButtonClass} ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <span>{content.googlePlayLabel}</span>
                      <ExternalLink className="h-4 w-4 shrink-0" />
                    </a>
                  </div>
                )}

                {/* Highlight cards — cyan */}
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {content.challengePoints.slice(0, 3).map((point) => (
                    <div key={point} className="group relative">
                      {!isMobile && (
                        <div
                          className={`absolute inset-0 ${gradientDirectionClass} ${cyanC.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}
                        />
                      )}
                      <div
                        className={`relative ${cardBase} border ${cyanC.border} rounded-2xl p-4 transition-all duration-300 min-h-[7.5rem] ${textAlignClass}`}
                      >
                        <Diamond
                          className={`mb-2 h-4 w-4 ${cyanC.primary} opacity-80`}
                        />
                        <p
                          className={`text-sm font-semibold ${
                            isDarkMode ? "text-slate-200" : "text-slate-700"
                          }`}
                        >
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: visuals */}
              <div className={`space-y-3 sm:space-y-4 ${heroVisualOrderClass}`}>
                <div className={heroImageFrameClass}>
                  <Image
                    src={project.brandAssets.hero}
                    alt={content.detailTitle}
                    width={1200}
                    height={1200}
                    className={heroImageClass}
                    priority
                  />
                  {!isEducationalInstituteProject && (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${
                          isDarkMode
                            ? "from-slate-950/50 to-transparent"
                            : "from-white/20 to-transparent"
                        }`}
                      />
                      <div
                        className={`absolute bottom-3 ${isRTL ? "right-3 sm:right-4" : "left-3 sm:left-4"} rounded-2xl border px-3 py-2 backdrop-blur-md ${autoProjectImageBadgeClass}`}
                      >
                        <p className="text-xs font-bold">
                          {content.cardEyebrow}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {heroPreviewShots.map((shot) => (
                    <div
                      key={shot.key}
                      className={`relative overflow-hidden rounded-[1.25rem] border transition-all duration-300 hover:scale-[1.03] sm:rounded-[1.5rem] ${cardBase} ${cyanC.border}`}
                    >
                      <Image
                        src={shot.src}
                        alt={shot.title[lang]}
                        width={1024}
                        height={1536}
                        className="h-[15rem] w-full object-cover sm:h-[18rem] lg:h-[19rem]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Overview + Challenges ─────────────────────────────────── */}
          <section className="py-6 sm:py-8 md:py-12">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Overview — purple */}
              <div className={`group relative ${overviewOrderClass}`}>
                {!isMobile && (
                  <div
                    className={`absolute inset-0 ${gradientDirectionClass} ${purpleC.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}
                  />
                )}
                <div
                  dir={layoutDir}
                  className={`relative ${cardBase} border ${purpleC.border} rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-500 h-full min-h-[23rem] md:min-h-[25rem] ${textAlignClass} ${!isMobile ? "group-hover:scale-[1.01]" : ""}`}
                >
                  {!isMobile && (
                    <div
                      className={`absolute -top-14 ${isRTL ? "-left-14" : "-right-14"} w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${purpleC.bg}`}
                    />
                  )}
                  <div
                    dir={layoutDir}
                    className="mb-5 flex w-full items-center gap-3"
                  >
                    <div
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${purpleC.bg} ${purpleC.border}`}
                    >
                      <Smartphone className={`h-5 w-5 ${purpleC.primary}`} />
                    </div>
                    <h2
                      className={`flex-1 text-2xl sm:text-3xl font-bold ${purpleC.primary} ${textAlignClass}`}
                    >
                      {content.overviewTitle}
                    </h2>
                  </div>
                  <div className="space-y-5" dir={layoutDir}>
                    {content.overviewParagraphs.map((p, i) => (
                      <p
                        key={i}
                        dir={layoutDir}
                        className={`text-sm sm:text-base leading-8 ${textAlignClass} ${
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                        style={{ unicodeBidi: "plaintext" }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Challenges — emerald */}
              <div className={`group relative ${challengeOrderClass}`}>
                {!isMobile && (
                  <div
                    className={`absolute inset-0 ${gradientDirectionClass} ${emeraldC.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}
                  />
                )}
                <div
                  dir={layoutDir}
                  className={`relative ${cardBase} border ${emeraldC.border} rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-500 h-full min-h-[23rem] md:min-h-[25rem] ${textAlignClass} ${!isMobile ? "group-hover:scale-[1.01]" : ""}`}
                >
                  {!isMobile && (
                    <div
                      className={`absolute -top-14 ${isRTL ? "-left-14" : "-right-14"} w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${emeraldC.bg}`}
                    />
                  )}
                  <div
                    dir={layoutDir}
                    className="mb-5 flex w-full items-center gap-3"
                  >
                    <div
                      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${emeraldC.bg} ${emeraldC.border}`}
                    >
                      <CheckCircle2 className={`h-5 w-5 ${emeraldC.primary}`} />
                    </div>
                    <h2
                      className={`flex-1 text-2xl sm:text-3xl font-bold ${emeraldC.primary} ${textAlignClass}`}
                    >
                      {content.challengeTitle}
                    </h2>
                  </div>
                  <div className="space-y-3" dir={layoutDir}>
                    {content.challengePoints.map((point) => (
                      <div
                        key={point}
                        dir={layoutDir}
                        className="flex w-full items-start gap-2"
                      >
                        <Diamond
                          className={`mt-1.5 h-3 w-3 shrink-0 opacity-60 ${emeraldC.primary}`}
                        />
                        <p
                          dir={layoutDir}
                          className={`flex-1 text-sm leading-7 ${textAlignClass} ${
                            isDarkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                          style={{ unicodeBidi: "plaintext" }}
                        >
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Features ──────────────────────────────────────────────── */}
          <section id="features" className="py-8 md:py-16">
            <div className="mb-10 md:mb-16 text-center">
              <div
                className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] ${cyanC.border} ${cyanC.bg}`}
              >
                <Sparkles className={`w-3 h-3 ${cyanC.primary}`} />
                <span className={cyanC.primary}>{content.featuresTitle}</span>
              </div>
              <h2
                className={`${
                  gradientDirectionClass
                } bg-clip-text text-3xl sm:text-4xl md:text-5xl font-bold text-transparent px-4 py-2 ${
                  isDarkMode
                    ? "from-cyan-400 via-purple-400 to-pink-400"
                    : "from-cyan-600 via-purple-600 to-pink-600"
                }`}
              >
                {content.featuresTitle}
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {content.features.map((feature, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                const color = featureColors[index % featureColors.length];
                const colors = getColorClasses(color, isDarkMode);
                const isHovered = hoveredFeature === index;

                return (
                  <div
                    key={feature.title}
                    className="group relative"
                    onMouseEnter={() => !isMobile && setHoveredFeature(index)}
                    onMouseLeave={() => !isMobile && setHoveredFeature(null)}
                    onClick={() =>
                      isMobile &&
                      setHoveredFeature(hoveredFeature === index ? null : index)
                    }
                  >
                    {/* Glow layer */}
                    {!isMobile && (
                      <div
                        className={`absolute inset-0 ${gradientDirectionClass} ${colors.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}
                      />
                    )}

                    <div
                      className={`relative ${cardBase} border ${colors.border} rounded-2xl p-5 sm:p-6 md:p-8 transition-all duration-500 h-full min-h-[18rem] md:min-h-[19rem] overflow-hidden ${textAlignClass} ${
                        !isMobile
                          ? "group-hover:scale-105"
                          : isHovered
                            ? "scale-[1.02]"
                            : ""
                      }`}
                    >
                      {/* Corner glow orb */}
                      {!isMobile && (
                        <div
                          className={`absolute -top-14 ${isRTL ? "-left-14" : "-right-14"} w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${colors.bg}`}
                        />
                      )}

                      <div
                        dir={layoutDir}
                        className="mb-4 flex items-start gap-4 md:mb-6"
                      >
                        <div className="relative shrink-0">
                          <Icon
                            className={`h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 ${colors.primary}`}
                          />
                          {isHovered && !isMobile && (
                            <div
                              className={`absolute inset-0 ${colors.bg} rounded-full blur-md animate-pulse`}
                            />
                          )}
                        </div>

                        <h3
                          className={`flex min-h-[3.5rem] flex-1 items-center text-lg font-bold sm:text-xl ${colors.primary} ${textAlignClass}`}
                        >
                          {feature.title}
                        </h3>
                      </div>

                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDarkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 4,
                          overflow: "hidden",
                        }}
                      >
                        {feature.description}
                      </p>

                      {/* Sparkle particles on hover — desktop */}
                      {isHovered && !isMobile && (
                        <div className="absolute inset-0 pointer-events-none">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute h-1 w-1 rounded-full"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                backgroundColor: getEffectColor(
                                  color,
                                  isDarkMode,
                                  isDarkMode ? 0.9 : 0.75,
                                ),
                                boxShadow: `0 0 8px ${getEffectColor(
                                  color,
                                  isDarkMode,
                                  isDarkMode ? 0.5 : 0.4,
                                )}`,
                                animationName: "sparkle",
                                animationDuration: `${1 + Math.random()}s`,
                                animationTimingFunction: "ease-in-out",
                                animationIterationCount: "infinite",
                                animationDelay: `${i * 0.1}s`,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── Gallery ───────────────────────────────────────────────── */}
          <section id="gallery" className="py-8 md:py-16">
            <div className="mb-10 md:mb-16 text-center">
              <div
                className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] ${cyanC.border} ${cyanC.bg}`}
              >
                <Sparkles className={`w-3 h-3 ${cyanC.primary}`} />
                <span className={cyanC.primary}>{content.galleryTitle}</span>
              </div>
              <h2
                className={`mb-3 ${gradientDirectionClass} bg-clip-text text-3xl sm:text-4xl md:text-5xl font-bold text-transparent px-4 py-2 ${
                  isDarkMode
                    ? "from-cyan-400 via-emerald-400 to-purple-400"
                    : "from-cyan-600 via-emerald-600 to-purple-600"
                }`}
              >
                {content.galleryTitle}
              </h2>
              <p
                className={`text-base ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {content.gallerySubtitle}
              </p>
            </div>

            <BookGallery
              screenshots={project.screenshots}
              lang={lang}
              isDarkMode={isDarkMode}
              isRTL={isRTL}
              projectLabel={content.detailTitle}
            />
          </section>

          {/* ── CTA / Stores ──────────────────────────────────────────── */}
          <section className="pb-20 pt-4 sm:pb-24 md:pb-32 md:pt-8">
            <div className="group relative">
              {!isMobile && (
                <div
                  className={`absolute inset-0 ${gradientDirectionClass} ${purpleC.gradient} rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}
                />
              )}

              <div
                className={`relative ${cardBase} border ${purpleC.border} rounded-[2rem] p-6 text-center overflow-hidden transition-all duration-500 sm:rounded-[2.5rem] sm:p-8 md:p-10`}
              >
                {/* Radial glow backdrop */}
                <div
                  className={`absolute inset-0 pointer-events-none ${
                    isDarkMode
                      ? "bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_70%)]"
                      : "bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_70%)]"
                  }`}
                />

                <div className="relative">
                  {/* Crown — desktop only */}
                  {!isMobile && (
                    <div className="mb-6 flex justify-center animate-bounce">
                      <div className="relative">
                        <Crown
                          className={`w-12 h-12 drop-shadow-lg ${
                            isDarkMode ? "text-purple-400" : "text-purple-600"
                          }`}
                        />
                        <div
                          className={`absolute inset-0 rounded-full blur-lg animate-pulse ${
                            isDarkMode ? "bg-purple-400/20" : "bg-purple-600/20"
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* App logo with aura */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative">
                      <div className="relative h-14 w-14 overflow-hidden rounded-[1.25rem] shadow-2xl sm:h-16 sm:w-16">
                        <Image
                          src={project.brandAssets.logo}
                          alt={content.detailTitle}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {!isMobile && (
                        <div
                          className={`absolute -inset-3 rounded-full blur-xl animate-pulse ${gradientDirectionClass} ${
                            isDarkMode
                              ? "from-purple-500/30 via-pink-500/30 to-cyan-500/30"
                              : "from-purple-400/30 via-pink-400/30 to-cyan-400/30"
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  <h2
                    className={`mb-3 ${gradientDirectionClass} bg-clip-text text-3xl sm:text-4xl font-bold text-transparent px-4 py-2 ${
                      isDarkMode
                        ? "from-purple-400 via-pink-400 to-cyan-400"
                        : "from-purple-600 via-pink-600 to-cyan-600"
                    }`}
                  >
                    {content.storesTitle}
                  </h2>
                  <p
                    className={`mx-auto mb-8 max-w-xl text-sm leading-8 sm:mb-10 sm:text-base ${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {content.storesSubtitle}
                  </p>

                  {!isEducationalInstituteProject && (
                    <div
                      className={`flex flex-col items-center justify-center gap-4 sm:flex-row ${
                        isRTL ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      <a
                        href={project.storeLinks.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex w-full items-center gap-3 rounded-full border px-6 py-4 text-sm font-bold transition-all duration-300 hover:scale-[1.04] hover:shadow-xl sm:w-auto sm:px-8 ${fixedLargeActionButtonClass} ${
                          isRTL ? "flex-row-reverse" : ""
                        } ${
                          isDarkMode
                            ? "border-white/20 bg-white/10 text-white hover:bg-white/20 hover:shadow-white/10"
                            : "border-slate-900 bg-slate-900 text-white hover:bg-slate-700 hover:shadow-slate-900/20"
                        }`}
                      >
                        <span>{content.appStoreLabel}</span>
                        <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                      <a
                        href={project.storeLinks.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex w-full items-center gap-3 rounded-full ${gradientDirectionClass} from-blue-600 to-purple-700 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_25px_5px_rgba(139,92,246,0.5)] sm:w-auto ${fixedActionButtonClass} ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                      >
                        <span>{content.googlePlayLabel}</span>
                        <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── Keyframes (verbatim from AboutSection5) ───────────────────── */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-40px);
            opacity: 0.9;
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes glow {
          0% {
            box-shadow: 0 0 5px rgba(52, 211, 153, 0.2);
          }
          100% {
            box-shadow: 0 0 20px rgba(52, 211, 153, 0.4);
          }
        }

        @keyframes auroraFloat {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(4%, -5%) scale(1.06);
          }
          50% {
            transform: translate(-3%, 6%) scale(0.96);
          }
          75% {
            transform: translate(5%, 3%) scale(1.03);
          }
        }

        @keyframes gradientPulse {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.35;
            transform: scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}
