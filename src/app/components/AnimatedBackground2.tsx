import { useState, useEffect } from "react";

// Type definitions
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

const AnimatedBackground = () => {
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

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Mystical Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 via-purple-950 to-black">
        {/* Magical Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a855f7' fill-opacity='0.08'%3E%3Cpath d='M40 40L20 20h40L40 40zm0 0L20 60h40L40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Enchanted Constellation Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2306b6d4' fill-opacity='0.1'%3E%3Cpolygon points='50,0 60,35 100,35 70,57 80,92 50,70 20,92 30,57 0,35 40,35'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Twinkling Star Field */}
        {starField.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.brightness,
              animationDelay: `${star.twinkleDelay}s`,
              animationDuration: "3s",
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.5)`,
            }}
          />
        ))}

        {/* Floating Magical Runes */}
        {magicRunes.map((rune) => (
          <div
            key={rune.id}
            className="absolute text-purple-400 opacity-30 font-bold text-2xl animate-pulse"
            style={{
              left: `${rune.x}%`,
              top: `${rune.y}%`,
              transform: `rotate(${rune.rotation}deg)`,
              animation: `mysticalFloat ${rune.floatDuration}s ease-in-out infinite ${rune.delay}s, runeRotate 8s linear infinite`,
              textShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
            }}
          >
            {rune.symbol}
          </div>
        ))}

        {/* Large Mystical Energy Orbs */}
        {mysticalOrbs.map((orb) => (
          <div
            key={orb.id}
            className={`absolute rounded-full mix-blend-screen filter blur-2xl animate-pulse`}
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle, rgba(${
                {
                  cyan: "6, 182, 212",
                  purple: "147, 51, 234", 
                  pink: "236, 72, 153",
                  indigo: "99, 102, 241",
                  violet: "139, 92, 246"
                }[orb.color]
              }, 0.4) 0%, rgba(${
                {
                  cyan: "6, 182, 212",
                  purple: "147, 51, 234",
                  pink: "236, 72, 153", 
                  indigo: "99, 102, 241",
                  violet: "139, 92, 246"
                }[orb.color]
              }, 0.1) 40%, transparent 70%)`,
              animation: `mysticalBlob ${orb.duration}s ease-in-out infinite ${orb.delay}s`,
            }}
          />
        ))}

        {/* Magical Aura Layers */}
        <div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-radial from-cyan-500/20 via-cyan-500/10 to-transparent rounded-full animate-spin"
          style={{ animationDuration: "30s" }}
        />
        <div
          className="absolute top-3/4 right-1/6 w-80 h-80 bg-gradient-radial from-purple-500/25 via-purple-500/10 to-transparent rounded-full animate-spin"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />
        <div
          className="absolute bottom-1/3 left-1/2 w-72 h-72 bg-gradient-radial from-pink-500/20 via-pink-500/8 to-transparent rounded-full animate-spin"
          style={{ animationDuration: "35s" }}
        />

        {/* Enchanted Portal Effects */}
        <div
          className="absolute top-10 right-10 w-32 h-32 border-2 border-cyan-400/30 rounded-full animate-spin opacity-40"
          style={{ animationDuration: "12s" }}
        >
          <div
            className="absolute inset-4 border border-cyan-400/20 rounded-full animate-spin"
            style={{ animationDuration: "8s", animationDirection: "reverse" }}
          />
          <div
            className="absolute inset-8 border border-cyan-400/10 rounded-full animate-spin"
            style={{ animationDuration: "6s" }}
          />
        </div>

        <div
          className="absolute bottom-20 left-20 w-24 h-24 border-2 border-purple-400/30 rounded-full animate-spin opacity-30"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        >
          <div
            className="absolute inset-2 border border-purple-400/20 rounded-full animate-spin"
            style={{ animationDuration: "10s" }}
          />
        </div>

        {/* Mystical Energy Streams */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-pulse" />
        <div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/20 to-transparent animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-transparent via-pink-400/20 to-transparent animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Floating Geometric Shapes */}
        <div
          className="absolute top-1/4 left-10 w-16 h-16 border border-cyan-400/30 transform rotate-45 animate-bounce opacity-30"
          style={{ animationDuration: "4s" }}
        />
        <div className="absolute top-2/3 right-16 w-12 h-12 bg-purple-500/20 transform rotate-12 animate-pulse" />
        <div
          className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-pink-500/30 rounded-full animate-ping"
          style={{ animationDuration: "3s" }}
        />

        {/* Sacred Geometry */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
          <div
            className="w-80 h-80 border border-yellow-400/20 rounded-full animate-spin"
            style={{ animationDuration: "60s" }}
          >
            <div className="absolute top-0 left-1/2 w-px h-full bg-yellow-400/10 transform -translate-x-1/2" />
            <div className="absolute left-0 top-1/2 w-full h-px bg-yellow-400/10 transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-yellow-400/10 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Dimensional Rifts */}
        <div className="absolute top-1/6 right-1/3 w-1 h-20 bg-gradient-to-b from-cyan-400/40 to-transparent animate-pulse transform rotate-12" />
        <div
          className="absolute bottom-1/4 left-1/4 w-1 h-16 bg-gradient-to-b from-purple-400/40 to-transparent animate-pulse transform -rotate-12"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute top-1/2 right-1/6 w-1 h-12 bg-gradient-to-b from-pink-400/40 to-transparent animate-pulse transform rotate-45"
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

export default AnimatedBackground;
