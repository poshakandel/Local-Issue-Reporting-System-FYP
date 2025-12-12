import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../public/locales/en/translation.json";
import np from "../public/locales/np/translation.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    
    resources: {
      en: { translation: en },
      np: { translation: np }
    }
  });

export default i18n;
