import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import enTranslation from "../public/locales/en/translation.json";
import teTranslation from "../public/locales/te/translation.json";

const resources = {
  en: { translation: enTranslation },
  te: { translation: teTranslation },
};

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
