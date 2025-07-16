"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  // Get navbar height once on mount
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      setNavHeight(nav.offsetHeight);
    }
  }, []);

  // Scroll listener for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["hero", "about", "services", "team", "contact"];
      const scrollPos = window.scrollY + navHeight + 10;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [setActiveSection, navHeight]);

  const navItems = [
    { id: "hero", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "services", label: t("nav.services") },
    { id: "team", label: t("nav.team") },
    { id: "contact", label: t("nav.contact") },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      // For mobile, use a more aggressive scroll behavior
      if (window.innerWidth < 768) {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Additional fallback for mobile browsers that might not support smooth scrolling
        setTimeout(() => {
          window.scrollTo(0, offsetPosition);
        }, 100);
      } else {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      setActiveSection(sectionId);
      setIsOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200/50 dark:border-purple-500/30 shadow-lg"
          : "bg-transparent"
      }`}
      aria-label={t("nav.ariaLabel")}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo Section */}
          <div className="flex items-center">
            <div
              className="relative group cursor-pointer flex items-center gap-2"
              onClick={() => scrollToSection("hero")}
            >
              <div className="relative w-12 h-12 overflow-hidden rounded-lg p-0.5 shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                <div className="w-full h-full rounded-lg flex items-center justify-center">
                  <Image
                    src="/logo 2.PNG"
                    alt={t("nav.logoAlt")}
                    width={40}
                    height={40}
                    className="object-contain w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>

              <div className="text-xl font-bold tracking-wide">
                <span className="text-slate-800 dark:text-white">CODAR</span>
                <span className="text-blue-600 dark:text-cyan-400">ISE</span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative group text-slate-700 dark:text-white font-medium text-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 rounded-md px-2 py-1
                  ${
                    activeSection === id
                      ? "text-purple-600 dark:text-purple-400"
                      : "hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 transition-all duration-300 ${
                    activeSection === id ? "w-full" : "group-hover:w-full"
                  }`}
                />
              </button>
            ))}
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-700 dark:text-white p-2 rounded-md hover:bg-slate-200/50 dark:hover:bg-purple-600/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-expanded={isOpen}
            aria-label={isOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Scrollable dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-lg rounded-lg mt-2 shadow-lg border border-slate-200/50 dark:border-purple-500/30 max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="p-4">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left py-3 px-4 text-lg font-semibold rounded-md transition-all duration-300 mb-2 last:mb-0 ${
                    activeSection === id
                      ? "bg-purple-100 dark:bg-purple-600/30 text-purple-700 dark:text-purple-400 shadow-lg"
                      : "text-slate-700 dark:text-white hover:bg-purple-50 dark:hover:bg-purple-600/30 hover:text-purple-600 dark:hover:text-purple-300"
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* Mobile Theme and Language Toggles */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-200/50 dark:border-purple-500/30">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
