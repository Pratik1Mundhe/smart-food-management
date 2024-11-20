import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import { getItemLocalStorage } from "./utils/localStorageUtils/getItem";

const currentLanguage = getItemLocalStorage("language");

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Specify your default language
    lng: currentLanguage || "en",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to translation files
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
