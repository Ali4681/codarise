import { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "./ThemeProvider";

type MysticalOrb = {
  id: number;
  size: number;
  x: number;
  y: number;
  color: string;
  duration: number;
  delay: number;
};

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  twinkleDelay: number;
  brightness: number;
};

type MagicRune = {
  id: number;
  x: number;
  y: number;
  symbol: string;
  rotation: number;
  floatDuration: number;
  delay: number;
};

export const AnimatedBackground = () => {
  const { isDarkMode } = useTheme();
  const [mysticalOrbs, setMysticalOrbs] = useState<MysticalOrb[]>([]);
  const [starField, setStarField] = useState<Star[]>([]);
  const [magicRunes, setMagicRunes] = useState<MagicRune[]>([]);

  useEffect(() => {
    // Generate floating mystical orbs
    const orbs = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: 200 + Math.random() * 300,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: [
        "cyan",
        "purple",
        "pink",
        "indigo",
        "violet",
        "blue",
        "fuchsia",
        "emerald",
      ][i % 8],
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
    }));
    setMysticalOrbs(orbs);

    // Generate twinkling stars
    const stars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      twinkleDelay: Math.random() * 5,
      brightness: Math.random() * 0.8 + 0.2,
    }));
    setStarField(stars);

    // Generate floating magical runes
    const runes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      symbol: ["◊", "◈", "◇", "※", "✦", "✧", "✩", "✪", "✫", "✬", "✭", "✮"][i],
      rotation: Math.random() * 360,
      floatDuration: 20 + Math.random() * 15,
      delay: Math.random() * 8,
    }));
    setMagicRunes(runes);
  }, []);

  // Theme-based color configurations
  const themeColors = {
    dark: {
      baseGradient: "from-slate-950 via-indigo-950 via-purple-950 to-black",
      gridPattern: "%23a855f7",
      gridOpacity: "0.08",
      constellationPattern: "%2306b6d4",
      constellationOpacity: "0.1",
      starColor: "bg-white",
      runeColor: "text-purple-400",
      runeOpacity: "opacity-30",
      energyStreams: {
        cyan: "via-cyan-400/20",
        purple: "via-purple-400/20",
        pink: "via-pink-400/20",
      },
      portalBorders: {
        cyan: "border-cyan-400/30",
        purple: "border-purple-400/30",
      },
      rifts: {
        cyan: "from-cyan-400/40",
        purple: "from-purple-400/40",
        pink: "from-pink-400/40",
      },
    },
    light: {
      baseGradient: "from-sky-100 via-indigo-100 via-purple-100 to-white",
      gridPattern: "%236366f1",
      gridOpacity: "0.15",
      constellationPattern: "%23059669",
      constellationOpacity: "0.2",
      starColor: "bg-yellow-400",
      runeColor: "text-indigo-600",
      runeOpacity: "opacity-40",
      energyStreams: {
        cyan: "via-cyan-600/30",
        purple: "via-purple-600/30",
        pink: "via-pink-600/30",
      },
      portalBorders: {
        cyan: "border-cyan-600/40",
        purple: "border-purple-600/40",
      },
      rifts: {
        cyan: "from-cyan-600/50",
        purple: "from-purple-600/50",
        pink: "from-pink-600/50",
      },
    },
  };

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Mystical Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentTheme.baseGradient}`}
      >
        {/* Magical Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${currentTheme.gridPattern}' fill-opacity='${currentTheme.gridOpacity}'%3E%3Cpath d='M40 40L20 20h40L40 40zm0 0L20 60h40L40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Enchanted Constellation Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${currentTheme.constellationPattern}' fill-opacity='${currentTheme.constellationOpacity}'%3E%3Cpolygon points='50,0 60,35 100,35 70,57 80,92 50,70 20,92 30,57 0,35 40,35'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Twinkling Star Field */}
        {starField.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${currentTheme.starColor} animate-pulse`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.brightness,
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: "3s",
              boxShadow: isDarkMode
                ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`
                : `0 0 ${star.size * 2}px rgba(251, 191, 36, 0.6)`,
            }}
          />
        ))}

        {/* Floating Magical Runes */}
        {magicRunes.map((rune) => (
          <div
            key={rune.id}
            className={`absolute ${currentTheme.runeColor} ${currentTheme.runeOpacity} font-bold text-2xl animate-pulse`}
            style={{
              left: `${rune.x}%`,
              top: `${rune.y}%`,
              transform: `rotate(${rune.rotation}deg)`,
              animation: `mysticalFloat ${rune.floatDuration}s ease-in-out infinite ${rune.delay}s, runeRotate 8s linear infinite`,
              textShadow: isDarkMode
                ? "0 0 10px rgba(168, 85, 247, 0.5)"
                : "0 0 10px rgba(99, 102, 241, 0.6)",
            }}
          >
            {rune.symbol}
          </div>
        ))}

        {/* Large Mystical Energy Orbs */}
        {mysticalOrbs.map((orb) => {
          const orbColors = {
            cyan: isDarkMode ? "6, 182, 212" : "8, 145, 178",
            purple: isDarkMode ? "147, 51, 234" : "126, 34, 206",
            pink: isDarkMode ? "236, 72, 153" : "219, 39, 119",
            indigo: isDarkMode ? "99, 102, 241" : "79, 70, 229",
            violet: isDarkMode ? "139, 92, 246" : "124, 58, 237",
            blue: isDarkMode ? "59, 130, 246" : "37, 99, 235",
            fuchsia: isDarkMode ? "217, 70, 239" : "192, 38, 211",
            emerald: isDarkMode ? "16, 185, 129" : "5, 150, 105",
          };

          return (
            <div
              key={orb.id}
              className={`absolute rounded-full mix-blend-screen filter blur-2xl animate-pulse`}
              style={{
                left: `${orb.x}%`,
                top: `${orb.y}%`,
                width: `${orb.size}px`,
                height: `${orb.size}px`,
                background: `radial-gradient(circle, rgba(${
                  orbColors[orb.color as keyof typeof orbColors]
                }, ${isDarkMode ? 0.4 : 0.3}) 0%, rgba(${
                  orbColors[orb.color as keyof typeof orbColors]
                }, ${isDarkMode ? 0.1 : 0.05}) 40%, transparent 70%)`,
                animation: `mysticalBlob ${orb.duration}s ease-in-out infinite ${orb.delay}s`,
              }}
            />
          );
        })}

        {/* Magical Aura Layers */}
        <div
          className={`absolute top-1/4 left-1/6 w-96 h-96 ${
            isDarkMode
              ? "bg-gradient-radial from-cyan-500/20 via-cyan-500/10"
              : "bg-gradient-radial from-cyan-600/15 via-cyan-600/8"
          } to-transparent rounded-full animate-spin`}
          style={{ animationDuration: "30s" }}
        />
        <div
          className={`absolute top-3/4 right-1/6 w-80 h-80 ${
            isDarkMode
              ? "bg-gradient-radial from-purple-500/25 via-purple-500/10"
              : "bg-gradient-radial from-purple-600/20 via-purple-600/8"
          } to-transparent rounded-full animate-spin`}
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />
        <div
          className={`absolute bottom-1/3 left-1/2 w-72 h-72 ${
            isDarkMode
              ? "bg-gradient-radial from-pink-500/20 via-pink-500/8"
              : "bg-gradient-radial from-pink-600/15 via-pink-600/6"
          } to-transparent rounded-full animate-spin`}
          style={{ animationDuration: "35s" }}
        />

        {/* Enchanted Portal Effects */}
        <div
          className={`absolute top-10 right-10 w-32 h-32 border-2 ${currentTheme.portalBorders.cyan} rounded-full animate-spin opacity-40`}
          style={{ animationDuration: "12s" }}
        >
          <div
            className={`absolute inset-4 border ${currentTheme.portalBorders.cyan
              .replace("border-", "border-")
              .replace("/30", "/20")} rounded-full animate-spin`}
            style={{ animationDuration: "8s", animationDirection: "reverse" }}
          />
          <div
            className={`absolute inset-8 border ${currentTheme.portalBorders.cyan
              .replace("border-", "border-")
              .replace("/30", "/10")} rounded-full animate-spin`}
            style={{ animationDuration: "6s" }}
          />
        </div>

        <div
          className={`absolute bottom-20 left-20 w-24 h-24 border-2 ${currentTheme.portalBorders.purple} rounded-full animate-spin opacity-30`}
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        >
          <div
            className={`absolute inset-2 border ${currentTheme.portalBorders.purple
              .replace("border-", "border-")
              .replace("/30", "/20")} rounded-full animate-spin`}
            style={{ animationDuration: "10s" }}
          />
        </div>

        {/* Mystical Energy Streams */}
        <div
          className={`absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent ${currentTheme.energyStreams.cyan} to-transparent animate-pulse`}
        />
        <div
          className={`absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent ${currentTheme.energyStreams.purple} to-transparent animate-pulse`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className={`absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent ${currentTheme.energyStreams.pink} to-transparent animate-pulse`}
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Geometric Shapes */}
        <div
          className={`absolute top-1/4 left-10 w-16 h-16 border ${currentTheme.portalBorders.cyan} transform rotate-45 animate-bounce opacity-30`}
          style={{ animationDuration: "4s" }}
        />
        <div
          className={`absolute top-2/3 right-16 w-12 h-12 ${
            isDarkMode ? "bg-purple-500/20" : "bg-purple-600/15"
          } transform rotate-12 animate-pulse`}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-8 h-8 ${
            isDarkMode ? "bg-pink-500/30" : "bg-pink-600/25"
          } rounded-full animate-ping`}
          style={{ animationDuration: "3s" }}
        />

        {/* Sacred Geometry */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
          <div
            className={`w-80 h-80 border ${
              isDarkMode ? "border-yellow-400/20" : "border-yellow-600/30"
            } rounded-full animate-spin`}
            style={{ animationDuration: "60s" }}
          >
            <div
              className={`absolute top-0 left-1/2 w-px h-full ${
                isDarkMode ? "bg-yellow-400/10" : "bg-yellow-600/20"
              } transform -translate-x-1/2`}
            />
            <div
              className={`absolute left-0 top-1/2 w-full h-px ${
                isDarkMode ? "bg-yellow-400/10" : "bg-yellow-600/20"
              } transform -translate-y-1/2`}
            />
            <div
              className={`absolute top-1/2 left-1/2 w-40 h-40 border ${
                isDarkMode ? "border-yellow-400/10" : "border-yellow-600/15"
              } rounded-full transform -translate-x-1/2 -translate-y-1/2`}
            />
          </div>
        </div>

        {/* Dimensional Rifts */}
        <div
          className={`absolute top-1/6 right-1/3 w-1 h-20 bg-gradient-to-b ${currentTheme.rifts.cyan} to-transparent animate-pulse transform rotate-12`}
        />
        <div
          className={`absolute bottom-1/4 left-1/4 w-1 h-16 bg-gradient-to-b ${currentTheme.rifts.purple} to-transparent animate-pulse transform -rotate-12`}
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className={`absolute top-1/2 right-1/6 w-1 h-12 bg-gradient-to-b ${currentTheme.rifts.pink} to-transparent animate-pulse transform rotate-45`}
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes mysticalBlob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            transform: translate(30px, -50px) scale(1.1) rotate(90deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9) rotate(180deg);
            opacity: 0.4;
          }
          75% {
            transform: translate(50px, 10px) scale(1.05) rotate(270deg);
            opacity: 0.7;
          }
        }

        @keyframes mysticalFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) translateX(-15px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-30px) translateX(5px) scale(1.05);
            opacity: 0.5;
          }
        }

        @keyframes runeRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

// Demo Component with Theme Toggle
const ThemedAnimatedDemo = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-white dark:text-white">
              Mystical Animated Background
            </h1>
            <p className="text-lg text-white/80 dark:text-white/80">
              Adapts to light and dark themes
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
