// components/I18nProvider.tsx
"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const syncDocumentDirection = (lng?: string) => {
      const language = lng || i18n.resolvedLanguage || i18n.language || "en";
      const dir = i18n.dir(language);

      document.documentElement.lang = language;
      document.documentElement.dir = dir;
      document.body.dir = dir;
      document.body.classList.toggle("rtl", dir === "rtl");
      document.body.classList.toggle("ltr", dir !== "rtl");
    };

    syncDocumentDirection();
    i18n.on("languageChanged", syncDocumentDirection);

    return () => {
      i18n.off("languageChanged", syncDocumentDirection);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
