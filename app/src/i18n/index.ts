import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./resources/en/common.json";
import enAuth from "./resources/en/auth.json";
import enDashboard from "./resources/en/dashboard.json";

import hiCommon from "./resources/hi/common.json";
import hiAuth from "./resources/hi/auth.json";
import hiDashboard from "./resources/hi/dashboard.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "hi"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        dashboard: enDashboard,
      },
      hi: {
        common: hiCommon,
        auth: hiAuth,
        dashboard: hiDashboard,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
