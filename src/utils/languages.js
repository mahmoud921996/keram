import Cookies from "js-cookie";

const Language = "language";

export function getLanguage() {
  return Cookies.get(Language);
}

export function setLanguage(language) {
  return Cookies.set(Language, language);
}

