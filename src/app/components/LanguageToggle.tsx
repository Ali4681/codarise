"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./ThemeProvider"; // Adjust path as needed

const DEFAULT_LANGUAGES = [
  { value: "en", label: "EN", fullLabel: "English" },
  { value: "ar", label: "AR", fullLabel: "العربية" },
];

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGES[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Set initial language based on i18n current language
    const foundLang = DEFAULT_LANGUAGES.find(
      (lang) => lang.value === i18n.language
    );
    if (foundLang) {
      setCurrentLanguage(foundLang);
    }
  }, [i18n.language]);

  const toggleLanguage = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const currentIndex = DEFAULT_LANGUAGES.findIndex(
      (lang) => lang.value === currentLanguage.value
    );
    const nextIndex = (currentIndex + 1) % DEFAULT_LANGUAGES.length;
    const nextLanguage = DEFAULT_LANGUAGES[nextIndex];

    // Delay the language change for smooth animation
    setTimeout(() => {
      setCurrentLanguage(nextLanguage);
      i18n.changeLanguage(nextLanguage.value).catch((error) => {
        console.error("Language change failed:", error);
      });

      setTimeout(() => {
        setIsAnimating(false);
      }, 150);
    }, 150);
  };

  // Theme-based colors
  const colors = {
    light: {
      background: "#ffffff",
      backgroundHover: "#f8fafc",
      border: "#e2e8f0",
      borderHover: "#cbd5e1",
      text: "#1a202c",
      textSecondary: "#64748b",
      shadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      shadowHover:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      tooltip: "#1f2937",
      tooltipText: "#ffffff",
    },
    dark: {
      background: "#320559",
      backgroundHover: "#4c1d95",
      border: "#4c1d95",
      borderHover: "#7c3aed",
      text: "#f3e8ff",
      textSecondary: "#c4b5fd",
      shadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      shadowHover:
        "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
      tooltip: "#f3e8ff",
      tooltipText: "#320559",
    },
  };

  const currentColors = colors[isDarkMode ? "dark" : "light"];
  const nextLanguage = DEFAULT_LANGUAGES.find(
    (lang) => lang.value !== currentLanguage.value
  );

  return (
    <div className="relative">
      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all duration-200 opacity-100 z-10"
          style={{
            backgroundColor: currentColors.tooltip,
            color: currentColors.tooltipText,
            boxShadow: currentColors.shadow,
          }}
        >
          Switch to {nextLanguage?.fullLabel}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
            style={{
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: `4px solid ${currentColors.tooltip}`,
            }}
          />
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={toggleLanguage}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={isAnimating}
        className="relative w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 ease-out hover:scale-110 active:scale-95 focus:outline-none disabled:cursor-not-allowed overflow-hidden group"
        style={{
          backgroundColor: currentColors.background,
          borderColor: currentColors.border,
          color: currentColors.text,
          boxShadow: currentColors.shadow,
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = `${currentColors.shadowHover}, 0 0 0 4px ${currentColors.border}40`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = currentColors.shadow;
        }}
      >
        {/* Background Animation */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"
          style={{
            backgroundColor: currentColors.backgroundHover,
          }}
        />

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-30 transition-opacity duration-150">
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: currentColors.border,
            }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Language Code */}
          <div
            className={`text-lg font-bold leading-none  transition-all duration-300 ${
              isAnimating ? "scale-0 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            {currentLanguage.label}
          </div>
        </div>

        {/* Loading Spinner */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"
              style={{
                borderColor: currentColors.text,
                borderTopColor: "transparent",
              }}
            />
          </div>
        )}

        {/* Hover Border Animation */}
        <div
          className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
          style={{
            borderColor: currentColors.borderHover,
          }}
        />
      </button>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-1000 ease-out ${
              isAnimating ? "animate-bounce" : ""
            }`}
            style={{
              backgroundColor: currentColors.border,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;
