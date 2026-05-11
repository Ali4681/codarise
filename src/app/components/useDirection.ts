"use client";

import { useTranslation } from "react-i18next";

export const useDirection = () => {
  const { i18n } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage || i18n.language;
  const dir = i18n.dir(activeLanguage);
  const isRTL = dir === "rtl";

  return {
    dir,
    isRTL,
    language: activeLanguage,
  };
};
