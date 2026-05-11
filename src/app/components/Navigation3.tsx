"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { getAutoservice24Content } from "../data/autoservice24";
import { useDirection } from "./useDirection";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SECTION_IDS = [
  "hero",
  "about",
  "services",
  "team",
  "projects",
  "contact",
] as const;

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const { t } = useTranslation();
  const { dir, language } = useDirection();
  const projectContent = getAutoservice24Content(language);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const navHeight = navRef.current?.offsetHeight ?? 0;
      const scrollPos = window.scrollY + navHeight + 10;

      for (let index = SECTION_IDS.length - 1; index >= 0; index--) {
        const sectionId = SECTION_IDS[index];
        const section = document.getElementById(sectionId);

        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [setActiveSection]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { id: "hero", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "services", label: t("nav.services") },
    { id: "team", label: t("nav.team") },
    { id: "projects", label: projectContent.navLabel },
    { id: "contact", label: t("nav.contact") },
  ] as const;
  const mobileMenuExpanded: "true" | "false" = isOpen ? "true" : "false";
  const mobileMenuLabel = isOpen ? t("nav.closeMenu") : t("nav.openMenu");

  const scrollToSection = (sectionId: string) => {
    const navHeight = navRef.current?.offsetHeight ?? 0;
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const top =
      section.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        .nav-logo-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .nav-link-underline {
          position: absolute;
          bottom: -2px;
          inset-inline-start: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #3b82f6, #a855f7);
          transition: width 0.3s ease;
          border-radius: 999px;
        }

        [dir="rtl"] .nav-link-underline {
          background: linear-gradient(to left, #3b82f6, #a855f7);
        }

        .nav-link:hover .nav-link-underline,
        .nav-link[aria-current="page"] .nav-link-underline {
          width: 100%;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          inset-block: 0;
          inset-inline-end: -100%;
          width: min(320px, 85vw);
          z-index: 49;
          overflow-y: auto;
          transition: inset-inline-end 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-drawer.open {
          inset-inline-end: 0;
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 48;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(2px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }

        .mobile-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-nav-item-bar {
          position: absolute;
          inset-block: 0;
          inset-inline-start: 0;
          width: 3px;
          border-radius: 999px;
          background: linear-gradient(to bottom, #3b82f6, #a855f7);
          transform: scaleY(0);
          transition: transform 0.2s ease;
        }

        .mobile-nav-item.active .mobile-nav-item-bar {
          transform: scaleY(1);
        }

        .brand-text {
          unicode-bidi: isolate;
          direction: ltr;
        }

        [dir="rtl"] .hamburger-icon {
          transform: scaleX(-1);
        }

        @property --scroll-pct {
          syntax: "<percentage>";
          inherits: false;
          initial-value: 0%;
        }

        .scroll-progress {
          position: fixed;
          top: 0;
          inset-inline-start: 0;
          z-index: 51;
          height: 2px;
          width: var(--sw, 0%);
          background: linear-gradient(to right, #3b82f6, #a855f7, #06b6d4);
          transition: width 0.1s linear;
        }

        [dir="rtl"] .scroll-progress {
          background: linear-gradient(to left, #3b82f6, #a855f7, #06b6d4);
        }
      `}</style>

      <ScrollProgress />

      <div
        className={`mobile-overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <div
        id="nav-mobile-drawer"
        className={`mobile-drawer bg-white dark:bg-slate-900 border-s border-slate-200/60 dark:border-purple-500/30 shadow-2xl ${
          isOpen ? "open" : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.mobileMenu")}
        dir={dir}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200/60 dark:border-purple-500/30">
          <div className="nav-logo-row">
            <Image
              src="/logo 2.PNG"
              alt={t("nav.logoAlt")}
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="brand-text text-lg font-bold">
              <span className="text-slate-800 dark:text-white">CODAR</span>
              <span className="text-blue-600 dark:text-cyan-400">ISE</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
            aria-label={t("nav.closeMenu")}
          >
            <X size={20} />
          </button>
        </div>

        <nav
          className="p-3 flex flex-col gap-1"
          aria-label={t("nav.ariaLabel")}
        >
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={`mobile-nav-item relative flex items-center text-start w-full px-4 py-3 rounded-xl font-semibold text-base transition-all duration-200 ${
                activeSection === id
                  ? "active bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-purple-600 dark:hover:text-purple-300"
              }`}
              aria-current={activeSection === id ? "page" : undefined}
            >
              <span className="mobile-nav-item-bar" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-slate-200/60 dark:border-purple-500/30 flex items-center justify-center gap-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      <nav
        ref={navRef}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200/50 dark:border-purple-500/30 shadow-lg"
            : "bg-transparent"
        }`}
        aria-label={t("nav.ariaLabel")}
        dir={dir}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <button
              type="button"
              className="nav-logo-row group cursor-pointer"
              onClick={() => scrollToSection("hero")}
              aria-label={t("nav.home")}
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md group-hover:shadow-purple-500/30 transition-shadow duration-300">
                <Image
                  src="/logo 2.PNG"
                  alt={t("nav.logoAlt")}
                  width={48}
                  height={48}
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                  priority
                />
              </div>
              <span className="brand-text text-xl font-bold tracking-wide">
                <span className="text-slate-800 dark:text-white">CODAR</span>
                <span className="text-blue-600 dark:text-cyan-400">ISE</span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`nav-link relative px-3 py-2 rounded-md font-medium text-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 ${
                    activeSection === id
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-slate-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  {label}
                  <span className="nav-link-underline" aria-hidden="true" />
                </button>
              ))}

              <div className="ms-3 flex items-center gap-2 border-s border-slate-200/60 dark:border-purple-500/30 ps-3">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-200/50 dark:hover:bg-purple-600/30 transition-colors text-slate-700 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-expanded={mobileMenuExpanded}
              aria-controls="nav-mobile-drawer"
              aria-haspopup="dialog"
              aria-label={mobileMenuLabel}
              title={mobileMenuLabel}
            >
              <span className="hamburger-icon">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const element = document.documentElement;
      const pct =
        (element.scrollTop / (element.scrollHeight - element.clientHeight)) *
          100 || 0;
      ref.current?.style.setProperty("--sw", `${pct.toFixed(1)}%`);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress"
      role="progressbar"
      aria-hidden="true"
    />
  );
}

export default Navigation;
