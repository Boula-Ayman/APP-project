import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json";
import ar from "./ar.json";

const i18n = new I18n({ en, ar });
i18n.enableFallback = true;

// Get the device locale
const locales = getLocales();
const deviceLocale =
  locales.length > 0 && locales[0].languageCode
    ? locales[0].languageCode
    : "en";
i18n.locale = deviceLocale as string;

export default i18n;
