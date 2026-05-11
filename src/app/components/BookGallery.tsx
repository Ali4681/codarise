"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import HTMLFlipBook from "react-pageflip";

interface Screenshot {
  src: string;
  key: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

interface BookGalleryProps {
  screenshots: readonly Screenshot[];
  lang: "en" | "ar";
  isDarkMode: boolean;
  isRTL: boolean;
}

interface PageMetaProps {
  shot: Screenshot;
  index: number;
  total: number;
  lang: "en" | "ar";
  isDarkMode: boolean;
  isRTL: boolean;
  compact: boolean;
  portrait: boolean;
}

interface ImagePageProps {
  shot: Screenshot;
  index: number;
  lang: "en" | "ar";
  isDarkMode: boolean;
  isRTL: boolean;
  compact: boolean;
}

interface FlipBookRef {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (page: number) => void;
    getBoundsRect?: () => {
      width: number;
      height: number;
    };
    getFlipController?: () => {
      showCorner: (point: { x: number; y: number }) => void;
      stopMove: () => void;
    };
  };
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const InfoPage = React.forwardRef<HTMLDivElement, PageMetaProps>(
  ({ shot, index, total, lang, isDarkMode, isRTL, compact, portrait }, ref) => {
    const accent = isDarkMode ? "#a78bfa" : "#7c3aed";
    const bg = isDarkMode ? "#0f172a" : "#f8fafc";
    const textColor = isDarkMode ? "#e2e8f0" : "#334155";
    const mutedColor = isDarkMode ? "#94a3b8" : "#64748b";
    const borderColor = isDarkMode
      ? "rgba(168,85,247,0.2)"
      : "rgba(124,58,237,0.2)";
    const badgeBg = isDarkMode
      ? "rgba(168,85,247,0.15)"
      : "rgba(124,58,237,0.08)";
    const lineColor = isDarkMode
      ? "rgba(148,163,184,0.08)"
      : "rgba(148,163,184,0.25)";
    const padding = compact ? "1rem" : "2rem";
    const dragHint =
      lang === "ar"
        ? portrait
          ? "اسحب للتقليب"
          : "اسحب أو انقر للتقليب"
        : portrait
          ? "Swipe to flip"
          : "Drag or click to flip";

    return (
      <div
        ref={ref}
        style={{
          background: bg,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding,
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 31px, ${lineColor} 31px, ${lineColor} 32px)`,
            backgroundPositionY: compact ? "52px" : "64px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            [isRTL ? "left" : "right"]: 0,
            bottom: 0,
            width: compact ? "18px" : "28px",
            pointerEvents: "none",
            background: isRTL
              ? "linear-gradient(to left, transparent, rgba(0,0,0,0.06))"
              : "linear-gradient(to right, transparent, rgba(0,0,0,0.06))",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: compact ? "0.75rem" : "1rem",
            marginBottom: compact ? "1rem" : "1.75rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: compact ? "8px" : "9px",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: accent,
                opacity: 0.65,
                margin: 0,
              }}
            >
              AutoService24
            </p>
            <div
              style={{
                marginTop: "8px",
                width: compact ? "16px" : "20px",
                height: "2px",
                borderRadius: "9999px",
                background: accent,
              }}
            />
          </div>

          <span
            style={{
              fontSize: compact ? "2.4rem" : "3.5rem",
              fontFamily: "monospace",
              fontWeight: 900,
              color: accent,
              opacity: 0.12,
              lineHeight: 1,
            }}
          >
            {(index + 1).toString().padStart(2, "0")}
          </span>
        </div>

        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              borderRadius: "9999px",
              padding: compact ? "4px 10px" : "4px 12px",
              fontSize: compact ? "8px" : "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: compact ? "0.85rem" : "1.25rem",
              background: badgeBg,
              border: `1px solid ${borderColor}`,
              color: accent,
              width: "fit-content",
            }}
          >
            <Sparkles style={{ width: compact ? "9px" : "10px", height: compact ? "9px" : "10px" }} />
            {lang === "ar" ? "معرض التطبيق" : "App Gallery"}
          </div>

          <h3
            style={{
              fontSize: compact ? "1rem" : "1.2rem",
              fontWeight: 900,
              lineHeight: 1.4,
              color: isDarkMode ? "#ffffff" : "#0f172a",
              margin: compact ? "0 0 0.75rem 0" : "0 0 1rem 0",
              overflowWrap: "anywhere",
            }}
          >
            {shot.title[lang]}
          </h3>

          <p
            style={{
              fontSize: compact ? "0.75rem" : "0.82rem",
              lineHeight: compact ? 1.7 : 1.85,
              color: textColor,
              margin: 0,
              overflow: "hidden",
              overflowWrap: "anywhere",
            }}
          >
            {shot.description[lang]}
          </p>
        </div>

        <div
          style={{
            position: "relative",
            marginTop: compact ? "1rem" : "1.5rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              background: borderColor,
              marginBottom: compact ? "0.6rem" : "0.75rem",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontSize: compact ? "8px" : "9px",
                fontFamily: "monospace",
                color: mutedColor,
              }}
            >
              {index + 1} / {total}
            </span>
            <span
              style={{
                fontSize: compact ? "8px" : "9px",
                color: mutedColor,
                textAlign: isRTL ? "left" : "right",
              }}
            >
              {dragHint}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

InfoPage.displayName = "InfoPage";

const ImagePage = React.forwardRef<HTMLDivElement, ImagePageProps>(
  ({ shot, index, lang, isDarkMode, isRTL, compact }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          background: isDarkMode ? "#0f172a" : "#ffffff",
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <Image
          src={shot.src}
          alt={shot.title[lang]}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 92vw, 420px"
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: compact ? "72px" : "96px",
            pointerEvents: "none",
            zIndex: 10,
            background: isDarkMode
              ? "linear-gradient(to top, rgba(15,23,42,0.6), transparent)"
              : "linear-gradient(to top, rgba(255,255,255,0.5), transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: compact ? "10px" : "12px",
            [isRTL ? "left" : "right"]: compact ? "10px" : "12px",
            borderRadius: "8px",
            padding: compact ? "4px 8px" : "4px 10px",
            fontSize: compact ? "11px" : "12px",
            fontWeight: 900,
            zIndex: 20,
            backdropFilter: "blur(8px)",
            background: isDarkMode
              ? "rgba(0,0,0,0.6)"
              : "rgba(255,255,255,0.85)",
            color: isDarkMode ? "#ffffff" : "#0f172a",
          }}
        >
          {index + 1}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            [isRTL ? "left" : "right"]: 0,
            width: compact ? "28px" : "40px",
            height: compact ? "28px" : "40px",
            pointerEvents: "none",
            zIndex: 20,
            background: isRTL
              ? `conic-gradient(from 135deg at 0% 100%, ${
                  isDarkMode ? "rgba(15,23,42,0.95)" : "rgba(248,250,252,0.98)"
                } 45deg, rgba(0,0,0,0.08) 90deg, transparent 135deg)`
              : `conic-gradient(from 225deg at 100% 100%, ${
                  isDarkMode ? "rgba(15,23,42,0.95)" : "rgba(248,250,252,0.98)"
                } 45deg, rgba(0,0,0,0.08) 90deg, transparent 135deg)`,
          }}
        />
      </div>
    );
  },
);

ImagePage.displayName = "ImagePage";

export default function BookGallery({
  screenshots,
  lang,
  isDarkMode,
  isRTL,
}: BookGalleryProps) {
  const total = screenshots.length;
  const [currentPage, setCurrentPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(960);
  const bookRef = useRef<FlipBookRef | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPreviewedCornerRef = useRef(false);
  const availableWidth = Math.max(containerWidth, 280);
  const portraitMode = availableWidth < 860;
  const narrowScreen = availableWidth < 520;
  const tinyScreen = availableWidth < 390;
  const portraitStagePaddingX = tinyScreen ? 2 : narrowScreen ? 6 : 10;
  const pageAspectRatio = portraitMode
    ? tinyScreen
      ? 1.34
      : narrowScreen
        ? 1.4
        : 1.46
    : 1.38;
  const pageWidth = portraitMode
    ? clamp(
        Math.round(
          availableWidth - portraitStagePaddingX * 2 - (tinyScreen ? 4 : 10),
        ),
        170,
        420,
      )
    : clamp(Math.round((availableWidth - 28) / 2), 250, 420);
  const pageHeight = Math.round(pageWidth * pageAspectRatio);
  const compactPage = pageWidth < 340;
  const stagePaddingX = portraitMode
    ? portraitStagePaddingX
    : compactPage
      ? 8
      : 12;
  const stagePaddingY = portraitMode
    ? tinyScreen
      ? 8
      : compactPage
        ? 10
        : 14
    : compactPage
      ? 12
      : 18;
  const stackMobileControls = availableWidth < 430;
  const muteText = isDarkMode ? "#64748b" : "#94a3b8";
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const updateWidth = () => {
      setContainerWidth(element.clientWidth || 960);
    };

    updateWidth();

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateWidth())
        : null;

    observer?.observe(element);
    window.addEventListener("resize", updateWidth);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const clearPreviewTimers = useCallback(() => {
    if (previewStartTimerRef.current !== null) {
      clearTimeout(previewStartTimerRef.current);
      previewStartTimerRef.current = null;
    }

    if (previewStopTimerRef.current !== null) {
      clearTimeout(previewStopTimerRef.current);
      previewStopTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const element = containerRef.current;

    if (
      !element ||
      typeof IntersectionObserver === "undefined" ||
      hasPreviewedCornerRef.current ||
      portraitMode
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry?.isIntersecting || hasPreviewedCornerRef.current) {
          return;
        }

        hasPreviewedCornerRef.current = true;
        clearPreviewTimers();
        previewStartTimerRef.current = setTimeout(() => {
          const flip = bookRef.current?.pageFlip();
          const rect = flip?.getBoundsRect?.();
          const controller = flip?.getFlipController?.();

          if (!rect || !controller) {
            return;
          }

          controller.showCorner({
            x: isRTL ? 6 : rect.width - 6,
            y: rect.height - 6,
          });

          previewStopTimerRef.current = setTimeout(() => {
            controller.stopMove();
          }, 1100);
        }, 450);
        observer.disconnect();
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [clearPreviewTimers, isRTL, portraitMode]);

  useEffect(() => {
    return () => {
      clearPreviewTimers();
    };
  }, [clearPreviewTimers]);

  const goNext = useCallback(() => {
    clearPreviewTimers();
    bookRef.current?.pageFlip()?.flipNext();
  }, [clearPreviewTimers]);

  const goPrev = useCallback(() => {
    clearPreviewTimers();
    bookRef.current?.pageFlip()?.flipPrev();
  }, [clearPreviewTimers]);

  const goTo = useCallback((pageIndex: number) => {
    clearPreviewTimers();
    bookRef.current?.pageFlip()?.flip(pageIndex * 2);
  }, [clearPreviewTimers]);

  const onFlip = useCallback((event: { data: number }) => {
    clearPreviewTimers();
    setCurrentPage(Math.floor(event.data / 2));
  }, [clearPreviewTimers]);

  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    borderRadius: "9999px",
    padding: tinyScreen
      ? "10px 12px"
      : compactPage
        ? "10px 14px"
        : "10px 20px",
    fontSize: compactPage ? "13px" : "14px",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    minWidth: stackMobileControls ? "0" : compactPage ? "120px" : "140px",
    width: stackMobileControls ? "100%" : undefined,
  };

  return (
    <div
      ref={containerRef}
      style={{
        userSelect: "none",
        width: "100%",
        maxWidth: portraitMode ? "100%" : "980px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          perspective: "2500px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          padding: `${stagePaddingY}px ${stagePaddingX}px ${stagePaddingY + 8}px`,
          boxSizing: "border-box",
        }}
      >
        <HTMLFlipBook
          ref={bookRef}
          width={pageWidth}
          height={pageHeight}
          size="fixed"
          minWidth={pageWidth}
          maxWidth={pageWidth}
          minHeight={pageHeight}
          maxHeight={pageHeight}
          showCover={false}
          flippingTime={700}
          usePortrait={portraitMode}
          startPage={0}
          drawShadow={true}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={false}
          onFlip={onFlip}
          className=""
          style={{
            boxShadow: isDarkMode
              ? "0 40px 100px rgba(0,0,0,0.7), 0 8px 32px rgba(0,0,0,0.5)"
              : "0 40px 100px rgba(0,0,0,0.22), 0 8px 32px rgba(0,0,0,0.1)",
            borderRadius: "4px",
          }}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          onChangeOrientation={() => {}}
          onChangeState={() => {}}
          showPageCorners={!portraitMode}
          disableFlipByClick={false}
        >
          {screenshots.flatMap((shot, index) => [
            <InfoPage
              key={`info-${index}`}
              shot={shot}
              index={index}
              total={total}
              lang={lang}
              isDarkMode={isDarkMode}
              isRTL={isRTL}
              compact={compactPage}
              portrait={portraitMode}
            />,
            <ImagePage
              key={`img-${index}`}
              shot={shot}
              index={index}
              lang={lang}
              isDarkMode={isDarkMode}
              isRTL={isRTL}
              compact={compactPage}
            />,
          ])}
        </HTMLFlipBook>
      </div>

      <div
        style={{
          marginTop: compactPage ? "1.5rem" : "2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: compactPage ? "1rem" : "1.25rem",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: compactPage ? "6px" : "8px",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: "100%",
            overflowX: "auto",
            padding: "0 4px",
          }}
        >
          {screenshots.map((shot, index) => (
            <button
              key={shot.key}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`${lang === "ar" ? "الصفحة" : "Page"} ${index + 1}`}
              title={`${lang === "ar" ? "الصفحة" : "Page"} ${index + 1}`}
              style={{
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                width: index === currentPage ? (compactPage ? "20px" : "24px") : "10px",
                height: "10px",
                background:
                  index === currentPage
                    ? isDarkMode
                      ? "#a78bfa"
                      : "#7c3aed"
                    : isDarkMode
                      ? "rgba(255,255,255,0.2)"
                      : "#cbd5e1",
                padding: 0,
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: stackMobileControls ? "stretch" : "center",
            justifyContent: "center",
            flexDirection: stackMobileControls ? "column" : "row",
            gap: compactPage ? "10px" : "16px",
            width: "100%",
          }}
        >
          <button
            type="button"
            onClick={goPrev}
            disabled={currentPage <= 0}
            style={{
              ...btnBase,
              background: isDarkMode ? "rgba(255,255,255,0.05)" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#1e293b",
              border: isDarkMode
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid #e2e8f0",
              opacity: currentPage <= 0 ? 0.3 : 1,
              cursor: currentPage <= 0 ? "not-allowed" : "pointer",
            }}
          >
            <PrevIcon style={{ width: "16px", height: "16px" }} />
            {lang === "ar" ? "السابق" : "Prev"}
          </button>

          <span
            style={{
              fontSize: compactPage ? "13px" : "14px",
              fontFamily: "monospace",
              fontWeight: 700,
              minWidth: "56px",
              textAlign: "center",
              color: muteText,
              order: stackMobileControls ? -1 : 0,
            }}
          >
            {currentPage + 1} / {total}
          </span>

          <button
            type="button"
            onClick={goNext}
            disabled={currentPage >= total - 1}
            style={{
              ...btnBase,
              background: isDarkMode
                ? "linear-gradient(to right, rgba(37,99,235,0.3), rgba(109,40,217,0.3))"
                : "linear-gradient(to right, #eff6ff, #f5f3ff)",
              color: isDarkMode ? "#c4b5fd" : "#6d28d9",
              border: isDarkMode
                ? "1px solid rgba(167,139,250,0.4)"
                : "1px solid #ddd6fe",
              opacity: currentPage >= total - 1 ? 0.3 : 1,
              cursor: currentPage >= total - 1 ? "not-allowed" : "pointer",
            }}
          >
            {lang === "ar" ? "التالي" : "Next"}
            <NextIcon style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
