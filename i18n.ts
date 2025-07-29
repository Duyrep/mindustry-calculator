import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nData from "@/public/data/i18n.json";

export const resources = i18nData;

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n