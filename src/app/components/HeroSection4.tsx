import { Code, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import FloatingParticles from "./FloatingParticles1";

const HeroSection = () => {
  const [text, setText] = useState("");
  const fullText = "We Rise Through Code";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br"
      aria-label="Hero section"
    >
      <FloatingParticles />

      <div className="relative z-10 max-w-4xl px-6 text-center">
        <div className="mb-12 animate-float-slow">
          <div className="relative w-36 h-36 mx-auto mb-10">
            {/* Outer glowing spinning ring */}
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600
                         shadow-[0_0_30px_8px_rgba(139,92,246,0.6)] animate-spin-slow"
            />
            {/* Inner circle with icon */}
            <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center shadow-lg">
              <Code className="text-white w-20 h-20 drop-shadow-lg" />
            </div>
          </div>
        </div>

        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-8
                     bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
                     bg-clip-text text-transparent
                     animate-fade-in"
          aria-live="polite"
        >
          {text}
          <span
            className="inline-block ml-1 w-6 animate-blink"
            aria-hidden="true"
          >
            |
          </span>
        </h1>

        <p className="max-w-xl mx-auto text-lg sm:text-xl text-gray-300 mb-12 tracking-wide animate-slide-up-fade">
          Building Digital Futures with Magical Code
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 animate-slide-up-delay">
          <button
            type="button"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-700
                       text-white font-semibold shadow-lg
                       hover:scale-110 hover:shadow-[0_0_25px_5px_rgba(139,92,246,0.7)]
                       transition-transform duration-400 ease-in-out"
          >
            Start Your Journey
          </button>
          <button
            type="button"
            className="px-10 py-4 rounded-full border-2 border-purple-500
                       text-purple-400 font-semibold
                       hover:bg-purple-500 hover:text-white
                       transition-colors duration-300"
          >
            View Our Magic
          </button>
        </div>

        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce"
          aria-hidden="true"
        >
          <ChevronDown className="text-purple-400 w-10 h-10 drop-shadow-lg" />
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1.2s steps(2, start) infinite;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease forwards;
        }
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-fade {
          animation: slideUpFade 1.2s ease forwards;
        }
        .animate-slide-up-delay {
          animation: slideUpFade 1.5s ease forwards;
          animation-delay: 0.4s;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
