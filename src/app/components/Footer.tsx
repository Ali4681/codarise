import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";

interface FooterProps {
  theme?: "light" | "dark";
}

const Footer = ({ theme: themeOverride }: FooterProps) => {
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Use override if provided, otherwise use theme context
  const theme = themeOverride || (isDarkMode ? "dark" : "light");

  // Theme styles
  const themeStyles = {
    light: {
      background: "bg-gradient-to-t from-gray-50/90 to-white",
      border: "border-purple-500/30",
      text: {
        primary: "text-gray-800",
        secondary: "text-gray-600",
        company: "text-gray-900",
        tagline: "text-purple-600",
        copyright: "text-gray-500",
      },
      logoBg: "bg-gray-100",
      glow: "from-cyan-400/20 via-purple-500/20 to-cyan-400/20",
    },
    dark: {
      background: "bg-gradient-to-t from-slate-900/90 to-slate-950/40",
      border: "border-purple-500/20",
      text: {
        primary: "text-white",
        secondary: "text-gray-400",
        company: "text-white",
        tagline: "text-purple-400",
        copyright: "text-gray-400",
      },
      logoBg: "bg-slate-800/50",
      glow: "from-cyan-400/10 via-purple-500/30 to-cyan-400/10",
    },
  };

  const currentTheme = themeStyles[theme];

  // RTL-aware classes
  const rtlClasses = {
    container: isRTL ? "md:flex-row-reverse" : "md:flex-row",
    logoContainer: isRTL ? "flex-row-reverse" : "flex-row",
    textContainer: isRTL ? "md:text-left" : "md:text-right",
    logoSpacing: isRTL ? "gap-3" : "gap-3",
    gradientDirection: isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r",
    animationDirection: isRTL ? "animate-gradient-x-rtl" : "animate-gradient-x",
  };

  return (
    <footer
      className={`relative py-10 border-t ${currentTheme.border} ${currentTheme.background} shadow-inner backdrop-blur-md z-10`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col ${rtlClasses.container} justify-between items-center gap-6 md:gap-0`}
        >
          {/* Logo + Name */}
          <div className={`flex items-center ${rtlClasses.logoSpacing} group`}>
            <div
              className={`relative w-12 h-12 p-0.5 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-105 ${
                theme === "dark"
                  ? "group-hover:shadow-purple-500/40"
                  : "group-hover:shadow-purple-500/20"
              }`}
            >
              <div
                className={`w-full h-full ${currentTheme.logoBg} rounded-xl flex items-center justify-center`}
              >
                <Image
                  src="/logo 2.PNG"
                  alt={t("footer.logoAlt")}
                  width={40}
                  height={40}
                  className="object-contain w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
            <div
              className={`text-2xl font-extrabold tracking-wider ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              <span
                className={`${currentTheme.text.company} ${
                  isRTL ? "ml-1" : "mr-1"
                }`}
              >
                CODAR
              </span>
              <span className="text-cyan-400">ISE</span>
            </div>
          </div>

          {/* Text Content */}
          <div className={`text-center ${rtlClasses.textContainer}`}>
            <p
              className={`${
                currentTheme.text.copyright
              } text-sm uppercase tracking-widest font-medium ${
                isRTL ? "font-arabic tracking-normal" : ""
              }`}
            >
              {t("footer.copyright")}
            </p>
            <p
              className={`${
                currentTheme.text.tagline
              } italic text-xs mt-1 tracking-wide animate-pulse ${
                isRTL ? "font-arabic tracking-normal not-italic" : ""
              }`}
            >
              {t("footer.tagline")}
            </p>
          </div>
        </div>

        {/* Additional RTL-aware decorative elements */}
        <div className="relative mt-8">
          <div
            className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${currentTheme.glow} opacity-50`}
          />

          {/* RTL-aware decorative dots */}
          <div
            className={`flex justify-center items-center gap-2 mt-4 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-1 h-1 rounded-full ${
                theme === "dark" ? "bg-purple-400/60" : "bg-purple-500/60"
              } animate-pulse`}
              style={{ animationDelay: "0s" }}
            />
            <div
              className={`w-1 h-1 rounded-full ${
                theme === "dark" ? "bg-cyan-400/60" : "bg-cyan-500/60"
              } animate-pulse`}
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className={`w-1 h-1 rounded-full ${
                theme === "dark" ? "bg-purple-400/60" : "bg-purple-500/60"
              } animate-pulse`}
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>
      </div>

      {/* Subtle Glow Line with RTL support */}
      <div
        className={`absolute inset-x-0 bottom-0 h-0.5 ${rtlClasses.gradientDirection} ${currentTheme.glow} blur-sm ${rtlClasses.animationDirection}`}
      />

      {/* Enhanced Animation Keyframes with RTL support */}
      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }

        @keyframes gradient-x-rtl {
          0%,
          100% {
            background-position: 100% center;
          }
          50% {
            background-position: 0% center;
          }
        }

        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 5s ease infinite;
        }

        .animate-gradient-x-rtl {
          background-size: 200% 100%;
          animation: gradient-x-rtl 5s ease infinite;
        }

        /* Arabic font support */
        .font-arabic {
          font-family: "Amiri", "Noto Sans Arabic", "Arabic UI Text", sans-serif;
        }

        /* RTL-specific adjustments */
        [dir="rtl"] .group:hover .group-hover\\:scale-105 {
          transform: scale(1.05);
        }

        [dir="rtl"] .transition-transform {
          transform-origin: center;
        }

        /* Enhanced RTL typography */
        [dir="rtl"] .tracking-widest {
          letter-spacing: 0.1em;
        }

        [dir="rtl"] .tracking-wide {
          letter-spacing: 0.05em;
        }

        /* RTL-aware animations */
        [dir="rtl"] .animate-pulse {
          animation-direction: reverse;
        }

        /* Responsive RTL adjustments */
        @media (max-width: 768px) {
          [dir="rtl"] .text-center {
            text-align: center;
          }

          [dir="rtl"] .flex-col {
            align-items: center;
          }
        }

        /* Enhanced hover effects for RTL */
        [dir="rtl"] .group:hover {
          transform: translateX(-2px);
        }

        [dir="ltr"] .group:hover {
          transform: translateX(2px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
