import { Code } from "lucide-react";
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

  return (
    <footer
      className={`relative py-10 border-t ${currentTheme.border} ${currentTheme.background} shadow-inner backdrop-blur-md z-10`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col ${
            isRTL ? "md:flex-row-reverse" : "md:flex-row"
          } justify-between items-center gap-6 md:gap-0`}
        >
          {/* Logo + Name */}
          <div className="flex items-center gap-3 group">
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
            <div className="text-2xl font-extrabold tracking-wider">
              <span className={currentTheme.text.company}>CODAR</span>
              <span className="text-cyan-400">ISE</span>
            </div>
          </div>

          {/* Text */}
          <div
            className={`text-center ${
              isRTL ? "md:text-left" : "md:text-right"
            }`}
          >
            <p
              className={`${currentTheme.text.copyright} text-sm uppercase tracking-widest font-medium`}
            >
              {t("footer.copyright")}
            </p>
            <p
              className={`${currentTheme.text.tagline} italic text-xs mt-1 tracking-wide animate-pulse`}
            >
              {t("footer.tagline")}
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Glow Line */}
      <div
        className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r ${currentTheme.glow} blur-sm animate-gradient-x`}
      />

      {/* Extra Animation Keyframe */}
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
        .animate-gradient-x {
          background-size: 200% 100%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
