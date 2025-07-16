import {
  Globe,
  Smartphone,
  Brain,
  Sparkles,
  Zap,
  Eye,
  Wand2,
  Crown,
  Diamond,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";

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

const ServicesSection = () => {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation("services");
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [magicParticles, setMagicParticles] = useState<MagicParticle[]>([]);
  const [floatingOrbs, setFloatingOrbs] = useState<FloatingOrb[]>([]);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const isRTL = i18n.dir() === "rtl";

  const timelineSteps = [
    {
      title: t("timeline.steps.0.title"),
      desc: t("timeline.steps.0.desc"),
      icon: Eye,
      color: "cyan",
      particles: 12,
    },
    {
      title: t("timeline.steps.1.title"),
      desc: t("timeline.steps.1.desc"),
      icon: Wand2,
      color: "purple",
      particles: 15,
    },
    {
      title: t("timeline.steps.2.title"),
      desc: t("timeline.steps.2.desc"),
      icon: Sparkles,
      color: "emerald",
      particles: 20,
    },
    {
      title: t("timeline.steps.3.title"),
      desc: t("timeline.steps.3.desc"),
      icon: Zap,
      color: "pink",
      particles: 18,
    },
    {
      title: t("timeline.steps.4.title"),
      desc: t("timeline.steps.4.desc"),
      icon: Crown,
      color: "yellow",
      particles: 25,
    },
  ];

  useEffect(() => {
    // Generate floating magic particles
    const particles: MagicParticle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 3,
      color: ["cyan", "purple", "pink", "emerald", "yellow"][
        Math.floor(Math.random() * 5)
      ],
    }));
    setMagicParticles(particles);

    // Generate floating orbs
    const orbs: FloatingOrb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 20 + Math.random() * 30,
      speed: 15 + Math.random() * 25,
      color: ["cyan", "purple", "emerald", "pink"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setFloatingOrbs(orbs);

    // Scroll-based timeline activation
    const handleScroll = () => {
      if (!timelineRef.current || !sectionRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const windowCenter = windowHeight / 2;

      // Check if timeline is in view
      const isInView =
        timelineRect.top < windowHeight && timelineRect.bottom > 0;

      if (isInView) {
        // Calculate scroll progress through the timeline section
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const scrollStart = Math.max(0, windowCenter - timelineTop);
        const scrollEnd = Math.min(
          timelineHeight,
          windowHeight + windowCenter - timelineTop
        );
        const scrollRange = scrollEnd - scrollStart;
        const currentScroll = Math.max(
          0,
          Math.min(scrollRange, windowCenter - timelineTop)
        );
        const progress = scrollRange > 0 ? currentScroll / scrollRange : 0;

        // Determine active step based on scroll progress
        const stepIndex = Math.floor(progress * timelineSteps.length);
        const clampedStepIndex = Math.max(
          0,
          Math.min(timelineSteps.length - 1, stepIndex)
        );
        setActiveTimelineStep(clampedStepIndex);
      }
    };

    // Throttled scroll handler
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [timelineSteps.length]);

  const services = [
    {
      icon: Globe,
      title: t("services.0.title"),
      subtitle: t("services.0.subtitle"),
      description: t("services.0.description"),
      features: [
        t("services.0.features.0"),
        t("services.0.features.1"),
        t("services.0.features.2"),
        t("services.0.features.3"),
      ],
      color: "cyan",
      magicLevel: 99,
    },
    {
      icon: Smartphone,
      title: t("services.1.title"),
      subtitle: t("services.1.subtitle"),
      description: t("services.1.description"),
      features: [
        t("services.1.features.0"),
        t("services.1.features.1"),
        t("services.1.features.2"),
        t("services.1.features.3"),
      ],
      color: "purple",
      magicLevel: 96,
    },
    {
      icon: Brain,
      title: t("services.2.title"),
      subtitle: t("services.2.subtitle"),
      description: t("services.2.description"),
      features: [
        t("services.2.features.0"),
        t("services.2.features.1"),
        t("services.2.features.2"),
        t("services.2.features.3"),
      ],
      color: "emerald",
      magicLevel: 90,
    },
  ];

  const getColorClasses = (color: string) => {
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
        borderHover: isDarkMode
          ? "border-purple-400/60"
          : "border-purple-500/80",
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
        borderHover: isDarkMode
          ? "border-yellow-400/60"
          : "border-yellow-500/80",
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
        borderHover: isDarkMode
          ? "border-indigo-400/60"
          : "border-indigo-500/80",
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

  return (
    <div
      id="about"
      ref={sectionRef}
      className={`relative min-h-screen transition-colors duration-500 ${
        isDarkMode ? "" : ""
      }`}
      dir={i18n.dir()}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Magic Particles */}
        {magicParticles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-1.5 h-1.5 bg-${particle.color}-${
              isDarkMode ? "400" : "600"
            } rounded-full ${isDarkMode ? "opacity-60" : "opacity-40"}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationName: "float",
              animationDuration: `${particle.duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        {/* Floating Orbs */}
        {floatingOrbs.map((orb) => (
          <div
            key={orb.id}
            className={`absolute rounded-full ${
              isDarkMode ? "opacity-10" : "opacity-5"
            } bg-${orb.color}-${isDarkMode ? "500" : "400"} blur-xl`}
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              animationName: "drift",
              animationDuration: `${orb.speed}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}

        {/* Mystical Grid */}
        <div
          className={`absolute inset-0 ${
            isDarkMode ? "opacity-5" : "opacity-10"
          }`}
        >
          <div className="grid grid-cols-20 gap-2 h-full">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className={`border ${
                  isDarkMode ? "border-cyan-500" : "border-cyan-300"
                } animate-pulse`}
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        </div>

        {/* Geometric Shapes */}
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
            isDarkMode ? "border-cyan-400/20" : "border-cyan-500/20"
          } animate-bounce opacity-20`}
        />
        <div
          className={`absolute bottom-20 ${
            isRTL ? "right-1/3" : "left-1/3"
          } w-16 h-16 bg-gradient-to-r ${
            isDarkMode
              ? "from-emerald-500/20 to-purple-500/20"
              : "from-emerald-400/20 to-purple-400/20"
          } rotate-12 animate-pulse`}
        />
        <div
          className={`absolute bottom-40 ${
            isRTL ? "left-1/4" : "right-1/4"
          } w-20 h-20 border-2 ${
            isDarkMode ? "border-pink-400/20" : "border-pink-500/20"
          } rounded-full animate-ping opacity-30`}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Enchanted Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h1
              className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${
                isDarkMode
                  ? "from-cyan-400 via-purple-400 to-pink-400"
                  : "from-cyan-600 via-purple-600 to-pink-600"
              } bg-clip-text text-transparent mb-6`}
            >
              <span className="relative">
                {t("title")}
                {/* Magical Aura */}
                <div
                  className={`absolute -inset-6 bg-gradient-to-r ${
                    isDarkMode
                      ? "from-cyan-500/20 via-purple-500/20 to-pink-500/20"
                      : "from-cyan-400/20 via-purple-400/20 to-pink-400/20"
                  } blur-xl animate-pulse`}
                />
              </span>
            </h1>

            {/* Floating Magic Wand */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce">
              <Wand2
                className={`w-16 h-16 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                } drop-shadow-lg`}
              />
              <div
                className={`absolute inset-0 ${
                  isDarkMode ? "bg-purple-400/20" : "bg-purple-600/20"
                } rounded-full blur-lg animate-pulse`}
              />
            </div>
          </div>

          <p
            className={`text-xl md:text-2xl ${
              isDarkMode ? "text-purple-200" : "text-purple-800"
            } max-w-4xl mx-auto leading-relaxed font-light`}
          >
            {t("subtitle.part1")}
            <span
              className={`${
                isDarkMode ? "text-cyan-400" : "text-cyan-600"
              } font-semibold`}
            >
              {t("subtitle.highlight")}
            </span>{" "}
            {t("subtitle.part2")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const colors = getColorClasses(service.color);
            const isHovered = hoveredService === index;

            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700`}
                />

                {/* Main Card */}
                <div
                  className={`relative ${
                    isDarkMode
                      ? "bg-black/40 border-slate-700/50"
                      : "bg-white/80 border-slate-200"
                  } backdrop-blur-sm border ${
                    colors.border
                  } rounded-2xl p-8 hover:${
                    colors.borderHover
                  } transition-all duration-500 transform hover:scale-105 h-full`}
                >
                  {/* Service Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative">
                      <IconComponent
                        className={`w-12 h-12 ${colors.primary}`}
                      />
                      {isHovered && (
                        <div
                          className={`absolute inset-0 ${colors.bg} rounded-full blur-md animate-pulse`}
                        />
                      )}
                    </div>

                    {/* Magic Level Indicator */}
                    <div className="flex items-center space-x-1">
                      <span
                        className={`text-xs ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {t("powerLabel")}
                      </span>
                      <div
                        className={`w-16 h-2 ${
                          isDarkMode ? "bg-slate-700" : "bg-slate-200"
                        } rounded-full overflow-hidden`}
                      >
                        <div
                          className={`h-full bg-gradient-to-r ${colors.gradient} transition-all duration-1000`}
                          style={{ width: `${service.magicLevel}%` }}
                        />
                      </div>
                      <span className={`text-xs ${colors.primary} font-bold`}>
                        {service.magicLevel}%
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`text-2xl font-bold ${colors.primary} mb-2`}>
                    {service.title}
                  </h3>
                  <p
                    className={`${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    } text-sm mb-4 font-medium`}
                  >
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    className={`${
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    } text-sm leading-relaxed mb-6`}
                  >
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center space-x-2">
                        <Diamond
                          className={`w-3 h-3 ${colors.primary} opacity-60`}
                        />
                        <span
                          className={`${
                            isDarkMode ? "text-slate-400" : "text-slate-600"
                          } text-sm`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Magic Particles for Hovered Card */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-1 h-1 bg-${service.color}-${
                            isDarkMode ? "400" : "600"
                          } rounded-full opacity-80`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
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

        {/* Magical Process Timeline */}
        <div ref={timelineRef} className="relative mt-32">
          <div className="text-center mb-16">
            <h2
              className={`text-5xl font-bold text-transparent bg-gradient-to-r ${
                isDarkMode
                  ? "from-emerald-400 via-cyan-400 to-purple-400"
                  : "from-emerald-600 via-cyan-600 to-purple-600"
              } bg-clip-text mb-6 px-4 py-2`} // Added padding
            >
              {t("timeline.title")}
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              } max-w-3xl mx-auto`}
            >
              {t("timeline.subtitle")}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central Animated Line */}
            <div
              className={`absolute ${
                isRTL ? "right-1/2" : "left-1/2"
              } transform ${
                isRTL ? "translate-x-1/2" : "-translate-x-1/2"
              } w-1 h-full`}
            >
              <div
                className={`w-full h-full bg-gradient-to-b ${
                  isDarkMode
                    ? "from-cyan-400 via-purple-400 to-pink-400"
                    : "from-cyan-500 via-purple-500 to-pink-500"
                } rounded-full opacity-60`}
              />
            </div>

            {/* Timeline Steps */}
            <div className="space-y-24">
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isLeft = isRTL ? index % 2 !== 0 : index % 2 === 0;
                const colors = getColorClasses(step.color);
                const isActive = activeTimelineStep === index;
                const isPassed = activeTimelineStep > index;
                const isUpcoming = activeTimelineStep < index;

                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      isLeft ? "flex-row" : "flex-row-reverse"
                    } group`}
                    onClick={() => setActiveTimelineStep(index)}
                  >
                    {/* Content */}
                    <div
                      className={`w-5/12 ${
                        isLeft
                          ? isRTL
                            ? "pl-8 text-left"
                            : "pr-8 text-right"
                          : isRTL
                          ? "pr-8 text-right"
                          : "pl-8 text-left"
                      }`}
                    >
                      <div className="relative cursor-pointer">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${
                            colors.gradient
                          } rounded-xl blur-xl transition-all duration-700 ${
                            isActive
                              ? "opacity-100"
                              : isPassed
                              ? "opacity-30"
                              : "opacity-0 group-hover:opacity-50"
                          }`}
                        />
                        <div
                          className={`relative ${
                            isDarkMode
                              ? "bg-black/40 border-slate-700/50"
                              : "bg-white/80 border-slate-200"
                          } backdrop-blur-sm border rounded-xl p-6 transition-all duration-700 transform ${
                            isActive
                              ? `${colors.borderHover} scale-105 ${colors.shadow} shadow-lg`
                              : isPassed
                              ? `${colors.border} opacity-80 scale-95`
                              : isUpcoming
                              ? `${colors.border} opacity-50 scale-90`
                              : `${colors.border} hover:${colors.borderHover} hover:scale-102`
                          }`}
                        >
                          <h3
                            className={`text-2xl font-bold mb-3 transition-all duration-500 ${
                              isActive
                                ? `${colors.primary} text-shadow-lg`
                                : isPassed
                                ? `${colors.secondary} opacity-70`
                                : isUpcoming
                                ? `${colors.primary} opacity-40`
                                : `${colors.primary}`
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`leading-relaxed transition-all duration-500 ${
                              isActive
                                ? isDarkMode
                                  ? "text-slate-200"
                                  : "text-slate-700"
                                : isPassed
                                ? isDarkMode
                                  ? "text-slate-300 opacity-70"
                                  : "text-slate-600 opacity-70"
                                : isUpcoming
                                ? isDarkMode
                                  ? "text-slate-400 opacity-40"
                                  : "text-slate-500 opacity-40"
                                : isDarkMode
                                ? "text-slate-300"
                                : "text-slate-600"
                            }`}
                          >
                            {step.desc}
                          </p>

                          {/* Step completion indicator */}
                          {isPassed && (
                            <div
                              className={`absolute -top-2 ${
                                isLeft
                                  ? isRTL
                                    ? "-left-2"
                                    : "-right-2"
                                  : isRTL
                                  ? "-right-2"
                                  : "-left-2"
                              } w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full`}
                            >
                              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                          )}

                          {/* Active step indicator */}
                          {isActive && (
                            <div
                              className={`absolute -top-2 ${
                                isLeft
                                  ? isRTL
                                    ? "-left-2"
                                    : "-right-2"
                                  : isRTL
                                  ? "-right-2"
                                  : "-left-2"
                              } w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse`}
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Center Icon */}
                    <div className="relative w-2/12 flex justify-center">
                      <div
                        className={`relative w-16 h-16 border-4 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-700 cursor-pointer ${
                          isActive
                            ? `${colors.bg} ${colors.borderHover} scale-125 ${colors.shadow} shadow-lg`
                            : isPassed
                            ? `${colors.bg} ${colors.border} scale-110 opacity-80`
                            : isUpcoming
                            ? `${
                                isDarkMode
                                  ? "bg-slate-800 border-slate-600"
                                  : "bg-slate-100 border-slate-300"
                              } scale-90 opacity-50`
                            : `${colors.bg} ${colors.border} hover:scale-110`
                        }`}
                        onClick={() => setActiveTimelineStep(index)}
                      >
                        <IconComponent
                          className={`w-8 h-8 transition-all duration-500 ${
                            isActive
                              ? `${colors.primary} drop-shadow-lg`
                              : isPassed
                              ? `${colors.secondary} opacity-80`
                              : isUpcoming
                              ? `text-slate-500 opacity-50`
                              : `${colors.primary}`
                          }`}
                        />
                        <div
                          className={`absolute inset-0 rounded-full blur-md animate-pulse transition-all duration-500 ${
                            isActive
                              ? `${colors.bg} opacity-100`
                              : isPassed
                              ? `${colors.bg} opacity-40`
                              : isUpcoming
                              ? `bg-slate-700 opacity-20`
                              : `${colors.bg} opacity-50`
                          }`}
                        />

                        {/* Active step particles */}
                        {isActive && (
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(step.particles)].map((_, i) => (
                              <div
                                key={i}
                                className={`absolute w-1 h-1 bg-${step.color}-400 rounded-full opacity-80`}
                                style={{
                                  left: `${20 + Math.random() * 60}%`,
                                  top: `${20 + Math.random() * 60}%`,
                                  animationName: "sparkle",
                                  animationDuration: `${0.5 + Math.random()}s`,
                                  animationTimingFunction: "ease-in-out",
                                  animationIterationCount: "infinite",
                                  animationDelay: `${i * 0.05}s`,
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spacer */}
                    <div className="w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline Controls */}
          <div className="flex justify-center mt-12 space-x-4">
            {timelineSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTimelineStep(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeTimelineStep === index
                    ? "bg-gradient-to-r from-cyan-400 to-purple-400 scale-125"
                    : "bg-slate-600 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

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

        @keyframes timelinePulse {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
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
      `}</style>
    </div>
  );
};

export default ServicesSection;
