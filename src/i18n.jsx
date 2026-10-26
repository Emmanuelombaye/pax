"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import es from "./es.json";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pax-lang");
      if (saved === "es" || saved === "en") setLang(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("pax-lang", lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang === "es" ? "es" : "en";
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (text) => (lang === "es" && es[text] ? es[text] : text),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
