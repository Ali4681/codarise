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
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [magicParticles, setMagicParticles] = useState<MagicParticle[]>([]);
  const [floatingOrbs, setFloatingOrbs] = useState<FloatingOrb[]>([]);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const timelineSteps = [
    {
      title: "Vision Conjuring",
      desc: "We peer into the ethereal realm to capture your deepest digital desires",
      icon: Eye,
      color: "cyan",
      particles: 12,
    },
    {
      title: "Spell Weaving",
      desc: "Ancient algorithms are woven together with modern incantations",
      icon: Wand2,
      color: "purple",
      particles: 15,
    },
    {
      title: "Digital Manifestation",
      desc: "Your vision takes form in the physical realm through mystical coding",
      icon: Sparkles,
      color: "emerald",
      particles: 20,
    },
    {
      title: "Power Channeling",
      desc: "The creation is imbued with lightning-fast performance and infinite scalability",
      icon: Zap,
      color: "pink",
      particles: 18,
    },
    {
      title: "Ascension Ritual",
      desc: "Your digital creation rises to claim its throne in the cloud kingdom",
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
      title: "Web Enchantment",
      subtitle: "Mystical Web Development",
      description:
        "We weave digital spells into responsive, lightning-fast web experiences that captivate souls and convert visitors into loyal disciples.",
      features: [
        "React Sorcery",
        "Next.js Mastery",
        "API Conjuring",
        "Performance Alchemy",
      ],
      color: "cyan",
      magicLevel: 99,
    },
    {
      icon: Smartphone,
      title: "Mobile Divination",
      subtitle: "Prophetic App Creation",
      description:
        "Forge powerful mobile applications that transcend platforms, bringing your vision to life across the digital multiverse.",
      features: [
        "Cross-Platform Magic",
        "Native iOS Spells",
        "Android Enchantments",
        "Flutter Wizardry",
      ],
      color: "purple",
      magicLevel: 96,
    },
    {
      icon: Brain,
      title: "AI Necromancy",
      subtitle: "Artificial Intelligence Awakening",
      description:
        "Breathe artificial life into your digital realm with intelligent systems that learn, adapt, and evolve beyond mortal comprehension.",
      features: [
        "Machine Learning",
        "Neural Networks",
        "Predictive Analytics",
        "Automation Spells",
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
      }
    > = {
      cyan: {
        primary: "text-cyan-400",
        secondary: "text-cyan-300",
        border: "border-cyan-500/30",
        borderHover: "border-cyan-400/60",
        bg: "bg-cyan-500/20",
        bgHover: "bg-cyan-400/20",
        shadow: "shadow-cyan-400/50",
        gradient: "from-cyan-500/20 to-cyan-600/20",
      },
      purple: {
        primary: "text-purple-400",
        secondary: "text-purple-300",
        border: "border-purple-500/30",
        borderHover: "border-purple-400/60",
        bg: "bg-purple-500/20",
        bgHover: "bg-purple-400/20",
        shadow: "shadow-purple-400/50",
        gradient: "from-purple-500/20 to-purple-600/20",
      },
      emerald: {
        primary: "text-emerald-400",
        secondary: "text-emerald-300",
        border: "border-emerald-500/30",
        borderHover: "border-emerald-400/60",
        bg: "bg-emerald-500/20",
        bgHover: "bg-emerald-400/20",
        shadow: "shadow-emerald-400/50",
        gradient: "from-emerald-500/20 to-emerald-600/20",
      },
      pink: {
        primary: "text-pink-400",
        secondary: "text-pink-300",
        border: "border-pink-500/30",
        borderHover: "border-pink-400/60",
        bg: "bg-pink-500/20",
        bgHover: "bg-pink-400/20",
        shadow: "shadow-pink-400/50",
        gradient: "from-pink-500/20 to-pink-600/20",
      },
      yellow: {
        primary: "text-yellow-400",
        secondary: "text-yellow-300",
        border: "border-yellow-500/30",
        borderHover: "border-yellow-400/60",
        bg: "bg-yellow-500/20",
        bgHover: "bg-yellow-400/20",
        shadow: "shadow-yellow-400/50",
        gradient: "from-yellow-500/20 to-yellow-600/20",
      },
      indigo: {
        primary: "text-indigo-400",
        secondary: "text-indigo-300",
        border: "border-indigo-500/30",
        borderHover: "border-indigo-400/60",
        bg: "bg-indigo-500/20",
        bgHover: "bg-indigo-400/20",
        shadow: "shadow-indigo-400/50",
        gradient: "from-indigo-500/20 to-indigo-600/20",
      },
    };
    return colorMap[color] || colorMap.cyan;
  };

  return (
    <div
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Magic Particles */}
        {magicParticles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-1.5 h-1.5 bg-${particle.color}-400 rounded-full opacity-60`}
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
            className={`absolute rounded-full opacity-10 bg-${orb.color}-500 blur-xl`}
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
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-20 gap-2 h-full">
            {Array.from({ length: 200 }).map((_, i) => (
              <div
                key={i}
                className="border border-cyan-500 animate-pulse"
                style={{ animationDelay: `${i * 0.05}s` }}
              />
            ))}
          </div>
        </div>

        {/* Geometric Shapes */}
        <div
          className="absolute top-10 left-10 w-32 h-32 border-2 border-purple-400/20 rotate-45 animate-spin opacity-30"
          style={{ animationDuration: "25s" }}
        />
        <div className="absolute top-20 right-20 w-24 h-24 border-2 border-cyan-400/20 animate-bounce opacity-20" />
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-purple-500/20 rotate-12 animate-pulse" />
        <div className="absolute bottom-40 right-1/4 w-20 h-20 border-2 border-pink-400/20 rounded-full animate-ping opacity-30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Enchanted Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              <span className="relative">
                Mystical Services
                {/* Magical Aura */}
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse" />
              </span>
            </h1>

            {/* Floating Magic Wand */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce">
              <Wand2 className="w-16 h-16 text-purple-400 drop-shadow-lg" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg animate-pulse" />
            </div>
          </div>

          <p className="text-xl md:text-2xl text-purple-200 max-w-4xl mx-auto leading-relaxed font-light">
            Behold our arsenal of
            <span className="text-cyan-400 font-semibold">
              {" "}
              digital sorcery
            </span>{" "}
            - each service forged in the fires of innovation and blessed by the
            ancient codes of excellence.
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
                  className={`relative bg-black/40 backdrop-blur-sm border ${colors.border} rounded-2xl p-8 hover:${colors.borderHover} transition-all duration-500 transform hover:scale-105 h-full`}
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
                      <span className="text-xs text-slate-400">PWR</span>
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
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
                  <h3 className={`text-2xl font-bold ${colors.secondary} mb-2`}>
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 font-medium">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center space-x-2">
                        <Diamond
                          className={`w-3 h-3 ${colors.primary} opacity-60`}
                        />
                        <span className="text-slate-400 text-sm">
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
                          className={`absolute w-1 h-1 bg-${service.color}-400 rounded-full opacity-80`}
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
            <h2 className="text-5xl font-bold text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text mb-6">
              The Sacred Ritual of Creation
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Witness the ancient ceremony through which ideas transcend into
              digital reality, following the mystical path of transformation.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central Animated Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full">
              <div className="w-full h-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full opacity-60" />
            </div>

            {/* Timeline Steps */}
            <div className="space-y-24">
              {timelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isLeft = index % 2 === 0;
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
                        isLeft ? "pr-8 text-right" : "pl-8 text-left"
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
                          className={`relative bg-black/40 backdrop-blur-sm border rounded-xl p-6 transition-all duration-700 transform ${
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
                                ? "text-slate-200"
                                : isPassed
                                ? "text-slate-300 opacity-70"
                                : isUpcoming
                                ? "text-slate-400 opacity-40"
                                : "text-slate-300"
                            }`}
                          >
                            {step.desc}
                          </p>

                          {/* Step completion indicator */}
                          {isPassed && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full">
                              <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            </div>
                          )}

                          {/* Active step indicator */}
                          {isActive && (
                            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse" />
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
                            ? `bg-slate-800 border-slate-600 scale-90 opacity-50`
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
