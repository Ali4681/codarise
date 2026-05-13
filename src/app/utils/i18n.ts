// lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "../../../public/locales/en.json";
import ar from "../../../public/locales/ar.json";

const resources = {
  en: {
    translation: en,
    services: en,
    common: en,
  },
  ar: {
    translation: ar,
    services: ar,
    common: ar,
  },
};

if (!i18n.isInitialized) {
  i18n.use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    load: "languageOnly",
    ns: ["translation", "services", "common"],
    defaultNS: "translation",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });
}

export default i18n;
