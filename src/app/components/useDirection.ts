import { useTranslation } from "react-i18next";

export const useDirection = () => {
  const { i18n } = useTranslation();
  return i18n.dir();
};
