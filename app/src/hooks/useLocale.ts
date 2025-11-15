import i18n from "../i18n";

export const useLocale = () => {
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return {
    current: i18n.language,
    changeLanguage,
  };
};
