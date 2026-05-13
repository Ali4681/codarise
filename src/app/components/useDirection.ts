"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const useDirection = () => {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeLanguage = mounted
    ? i18n.resolvedLanguage || i18n.language || "en"
    : "en";
  const dir = mounted ? i18n.dir(activeLanguage) : "ltr";
  const isRTL = dir === "rtl";

  return {
    dir,
    isRTL,
    language: activeLanguage,
  };
};
