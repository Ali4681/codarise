// components/LanguageToggle.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

interface LanguageOption {
  value: string;
  label: string;
}

const LanguageToggle = () => {
  const { t, i18n } = useTranslation();
  const [availableLanguages, setAvailableLanguages] = useState<
    LanguageOption[]
  >([]);

  useEffect(() => {
    // Load available languages from manifest
    fetch("/locales/languages.json")
      .then((response) => response.json())
      .then((languages) => {
        const langArray = Object.entries(languages).map(([code, name]) => ({
          value: code,
          label: `${name} (${code})`, // Changed format to "Name (code)"
        }));
        setAvailableLanguages(langArray);
      });
  }, []);

  const changeLanguage = (selectedOption: LanguageOption | null) => {
    if (selectedOption) {
      i18n.changeLanguage(selectedOption.value);
    }
  };

  if (availableLanguages.length === 0) return null;

  const currentLanguage = availableLanguages.find(
    (lang) => lang.value === i18n.language
  );

  return (
    <div className="w-48">
      {" "}
      {/* Slightly wider to accommodate the new format */}
      <Select
        options={availableLanguages}
        value={currentLanguage}
        onChange={changeLanguage}
        isSearchable={false}
        classNamePrefix="react-select"
        placeholder={t("language")}
        styles={{
          control: (base) => ({
            ...base,
            border: "1px solid #e2e8f0",
            borderRadius: "0.375rem",
            minHeight: "auto",
            padding: "0.125rem 0",
            fontSize: "0.875rem",
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
