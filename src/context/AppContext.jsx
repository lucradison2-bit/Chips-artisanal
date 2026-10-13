import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "fr");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  const t = translations[lang];

  return (
    <AppContext.Provider value={{ lang, setLang, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
