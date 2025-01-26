import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import en from "./en.json"; // Fix the import path
import ar from "./ar.json";

const i18n = new I18n({ en, ar });
i18n.enableFallback = true;
i18n.locale = getLocales()[0].languageCode || "en";

export default i18n;
