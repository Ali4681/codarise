import Image from "next/image";
import { useTheme } from "./ThemeProvider";
import { useTranslation } from "react-i18next";
import { useDirection } from "./useDirection";

interface FooterProps {
  theme?: "light" | "dark";
}

const Footer = ({ theme: themeOverride }: FooterProps) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation();
  const { dir } = useDirection();

  const theme = themeOverride || (isDarkMode ? "dark" : "light");

  const isDark = theme === "dark";

  return (
    <>
      {/* ─── Styles ──────────────────────────────────────────────── */}
      <style jsx>{`
        /*
         * All directional properties use CSS logical properties so that
         * the browser auto-flips them based on the [dir] attribute.
         * Zero manual RTL class-switching required.
         */

        .footer-root {
          position: relative;
          padding-block: 2.5rem;
          border-block-start: 1px solid
            ${isDark ? "rgba(168,85,247,.2)" : "rgba(168,85,247,.3)"};
          background: ${isDark
            ? "linear-gradient(to top, rgba(15,23,42,.9), rgba(2,6,23,.4))"
            : "linear-gradient(to top, rgba(249,250,251,.9), #ffffff)"};
          backdrop-filter: blur(12px);
          z-index: 10;
        }

        .footer-inner {
          max-width: 80rem;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 2rem);
        }

        /* ── Row: logo + tagline ───────────────────────────────── */
        .footer-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        /* Logo block: always reads inline-start → inline-end */
        .logo-block {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: default;
        }

        .logo-img-wrap {
          flex-shrink: 0;
          width: 3rem;
          height: 3rem;
          padding: 2px;
          border-radius: 0.75rem;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background: ${isDark ? "rgba(30,41,59,.5)" : "rgba(243,244,246,1)"};
          transition:
            box-shadow 0.3s ease,
            transform 0.3s ease;
        }

        .logo-block:hover .logo-img-wrap {
          transform: scale(1.05);
          box-shadow: 0 6px 20px
            ${isDark ? "rgba(168,85,247,.4)" : "rgba(168,85,247,.2)"};
        }

        /* Brand text always LTR */
        .brand-text {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          unicode-bidi: isolate;
          direction: ltr;
        }

        /* ── Text block: copyright + tagline ──────────────────── */
        .text-block {
          text-align: center;
        }

        /*
         * On wide screens we want the text aligned to the inline-end.
         * logical property: text-align: end  → right in LTR, left in RTL.
         */
        @media (min-width: 768px) {
          .text-block {
            text-align: end;
          }
        }

        .copyright-text {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-weight: 500;
          color: ${isDark ? "rgba(156,163,175,1)" : "rgba(107,114,128,1)"};
        }

        /*
         * In RTL, uppercase Latin tracking looks odd alongside Arabic text.
         * Reduce it automatically.
         */
        [dir="rtl"] .copyright-text {
          letter-spacing: 0.04em;
          text-transform: none;
        }

        .tagline-text {
          margin-block-start: 0.25rem;
          font-size: 0.75rem;
          font-style: italic;
          letter-spacing: 0.05em;
          animation: pulse 3s ease-in-out infinite;
          color: ${isDark ? "rgba(192,132,252,1)" : "rgba(147,51,234,1)"};
        }

        /* RTL: remove italic + adjust tracking for Arabic */
        [dir="rtl"] .tagline-text {
          font-style: normal;
          letter-spacing: 0.02em;
        }

        /* ── Gradient direction: driven by dir attribute, no JS needed ── */
        .divider-line,
        .bottom-glow {
          background: linear-gradient(
            to right,
            ${isDark
              ? "rgba(34,211,238,.1), rgba(168,85,247,.3), rgba(34,211,238,.1)"
              : "rgba(34,211,238,.2), rgba(168,85,247,.2), rgba(34,211,238,.2)"}
          );
        }

        [dir="rtl"] .divider-line,
        [dir="rtl"] .bottom-glow {
          background: linear-gradient(
            to left,
            ${isDark
              ? "rgba(34,211,238,.1), rgba(168,85,247,.3), rgba(34,211,238,.1)"
              : "rgba(34,211,238,.2), rgba(168,85,247,.2), rgba(34,211,238,.2)"}
          );
        }

        /* ── Brand text color classes ─────────────────────────────── */
        .brand-company {
          color: ${isDark ? "#ffffff" : "#111827"};
          margin-inline-end: 2px;
        }

        .brand-accent {
          color: #22d3ee;
        }

        /* ── Dot animation delays via CSS custom property ─────────── */
        .dot-delay-0 {
          animation-delay: 0s;
        }
        .dot-delay-1 {
          animation-delay: 0.5s;
        }
        .dot-delay-2 {
          animation-delay: 1s;
        }

        /* ── Divider wrap + line ──────────────────────────────── */
        .divider-wrap {
          position: relative;
          margin-block-start: 2rem;
        }

        .divider-line {
          position: absolute;
          inset-block-start: 0;
          inset-inline: 0;
          height: 1px;
          opacity: 0.6;
        }

        /* ── Decorative dots ──────────────────────────────────── */
        .dots-row {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-block-start: 1rem;
          /*
           * No flex-direction reversal needed — dots are symmetric,
           * and the staggered pulse handles the visual rhythm.
           */
        }

        .dot {
          width: 0.25rem;
          height: 0.25rem;
          border-radius: 9999px;
          animation: pulse 2s ease-in-out infinite;
        }

        .dot-purple {
          background: ${isDark
            ? "rgba(192,132,252,.6)"
            : "rgba(147,51,234,.6)"};
        }

        .dot-cyan {
          background: ${isDark ? "rgba(34,211,238,.6)" : "rgba(6,182,212,.6)"};
        }

        /* ── Bottom glow strip ────────────────────────────────── */
        .bottom-glow {
          position: absolute;
          inset-block-end: 0;
          inset-inline: 0;
          height: 2px;
          background-size: 200% 100%;
          filter: blur(2px);
          animation: glow-slide 5s ease infinite alternate;
        }

        /* ── Keyframes ────────────────────────────────────────── */
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
        }

        /*
         * The glow strip animates background-position.
         * Because we use a CSS variable for gradient direction,
         * the animation looks correct in both LTR and RTL without
         * separate keyframes.
         */
        @keyframes glow-slide {
          from {
            background-position: 0% center;
          }
          to {
            background-position: 100% center;
          }
        }
      `}</style>

      {/* ─── Footer markup ──────────────────────────────────────────── */}
      <footer className="footer-root" dir={dir}>
        <div className="footer-inner">
          <div className="footer-row">
            {/* Logo + brand */}
            <div className="logo-block">
              <div className="logo-img-wrap">
                <Image
                  src="/logo 2.PNG"
                  alt={t("footer.logoAlt")}
                  width={40}
                  height={40}
                  className="object-contain w-10 h-10"
                  priority
                />
              </div>
              <span className="brand-text">
                <span className="brand-company">CODAR</span>
                <span className="brand-accent">ISE</span>
              </span>
            </div>

            {/* Copyright + tagline */}
            <div className="text-block">
              <p className="copyright-text">{t("footer.copyright")}</p>
              <p className="tagline-text">{t("footer.tagline")}</p>
            </div>
          </div>

          {/* Divider + dots */}
          <div className="divider-wrap">
            <div className="divider-line" />
            <div className="dots-row">
              <span className="dot dot-purple dot-delay-0" />
              <span className="dot dot-cyan dot-delay-1" />
              <span className="dot dot-purple dot-delay-2" />
            </div>
          </div>
        </div>

        {/* Bottom glow strip */}
        <div className="bottom-glow" aria-hidden="true" />
      </footer>
    </>
  );
};

export default Footer;
