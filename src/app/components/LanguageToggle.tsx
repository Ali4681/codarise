"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

interface LanguageOption {
  value: string;
  label: string;
}

const DEFAULT_LANGUAGES = [
  { value: "en", label: "English (en)" },
  { value: "ar", label: "العربية (ar)" },
];

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [availableLanguages, setAvailableLanguages] =
    useState<LanguageOption[]>(DEFAULT_LANGUAGES);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageOption | null>(null);

  useEffect(() => {
    // Try to load languages from manifest
    const loadLanguages = async () => {
      try {
        const response = await fetch("/locales/languages.json");
        const languages = await response.json();
        const langOptions = Object.entries(languages).map(([code, name]) => ({
          value: code,
          label: `${name} (${code})`,
        }));
        setAvailableLanguages(langOptions);
      } catch (error) {
        console.error("Failed to load languages:", error);
        // Fallback to default languages
        setAvailableLanguages(DEFAULT_LANGUAGES);
      }
    };

    loadLanguages();
  }, []);

  useEffect(() => {
    if (availableLanguages.length > 0) {
      // Get current language from i18n or use first available as fallback
      const currentLang =
        availableLanguages.find((lang) => lang.value === i18n.language) ||
        availableLanguages[0];
      setSelectedLanguage(currentLang);
    }
  }, [availableLanguages, i18n.language]);

  const handleLanguageChange = (option: LanguageOption | null) => {
    if (option && i18n) {
      setSelectedLanguage(option);
      i18n.changeLanguage(option.value).catch((error) => {
        console.error("Language change failed:", error);
      });
    }
  };

  if (!selectedLanguage) return null;

  return (
    <div className="w-48">
      <Select
        options={availableLanguages}
        value={selectedLanguage}
        onChange={handleLanguageChange}
        isSearchable={false}
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            border: "1px solid #e2e8f0",
            borderRadius: "0.375rem",
            minHeight: "auto",
            padding: "0.125rem 0",
            fontSize: "0.875rem",
            backgroundColor: "transparent",
          }),
          option: (base, { isSelected }) => ({
            ...base,
            fontSize: "0.875rem",
            backgroundColor: isSelected ? "#3b82f6" : "white",
            color: isSelected ? "white" : "#1a202c",
            ":hover": {
              backgroundColor: isSelected ? "#3b82f6" : "#f1f5f9",
            },
          }),
          singleValue: (base) => ({
            ...base,
            color: "#1a202c",
            fontSize: "0.875rem",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            padding: "0 0.5rem",
          }),
        }}
      />
    </div>
  );
};

export default LanguageToggle;
