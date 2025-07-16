"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
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
      const scrollPos = window.scrollY + navHeight + 10; // Adjusted for nav height

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
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "team", label: "Team" },
    { id: "contact", label: "Contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(sectionId);
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/90 backdrop-blur-lg border-b border-purple-500/30 shadow-lg"
          : "bg-transparent"
      }`}
      aria-label="Primary Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Enhanced Logo Section with Text */}
          <div className="flex items-center">
            <div
              className="relative group cursor-pointer flex items-center gap-2"
              onClick={() => scrollToSection("hero")}
            >
              <div className="relative w-12 h-12 overflow-hidden rounded-lg p-0.5 shadow-lg hover:shadow-purple-500/30 transition-all duration-300">
                <div className="w-full h-full rounded-lg flex items-center justify-center">
                  <Image
                    src="/logo 2.PNG"
                    alt="Company Logo"
                    width={40}
                    height={40}
                    className="object-contain w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>

              {/* Logo Text matching CODARISE style */}
              <div className="text-xl font-bold tracking-wide">
                <span className="text-white">CODAR</span>
                <span className="text-cyan-400">ISE</span>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative group text-white font-medium text-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-md px-2 py-1
                  ${
                    activeSection === id
                      ? "text-purple-400"
                      : "hover:text-purple-400"
                  }`}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 ${
                    activeSection === id ? "w-full" : "group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-md hover:bg-purple-600/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-lg rounded-lg mt-2 p-4 shadow-lg border border-purple-500/30"
            role="menu"
          >
            {navItems.map(({ id, label }, index) => (
              <m.button
                key={id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onClick={() => scrollToSection(id)}
                className={`block w-full text-left py-3 px-4 text-lg font-semibold rounded-md transition-all duration-300 ${
                  activeSection === id
                    ? "bg-purple-600/30 text-purple-400 shadow-lg"
                    : "text-white hover:bg-purple-600/30 hover:text-purple-300"
                }`}
                role="menuitem"
              >
                {label}
              </m.button>
            ))}
          </m.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
