import Vue from "vue";
import VueI18n from "vue-i18n";

import arLocale from "./ar.json";
import enLocale from "./en.json";

import Cookies from "js-cookie";

Vue.use(VueI18n);

export const messages = {
  en: {
    ...enLocale
  },
  ar: {
    ...arLocale
  }
};

const i18n = new VueI18n({
  // set locale
  // options: en | ar
  locale: Cookies.get("language") || "en",
  sync: true,
  dateTimeFormats: "ar",
  fallbackLocale: "ar",
  locales: ["ar"],
  // set locale messages
  messages
});
if (!Cookies.get("language")) {
  Cookies.set("language", "en")
}

document.documentElement.lang = Cookies.get("language") || 'en'
document.documentElement.dir = Cookies.get("language") == 'en' ? 'ltr' : 'rtl'
export default i18n;
