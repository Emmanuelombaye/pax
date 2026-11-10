"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [es, setEs] = useState(null);

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
    if (lang === "es" && !es) {
      import("./es.json").then((mod) => setEs(mod.default));
    }
  }, [lang, es]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (text) => (lang === "es" && es && es[text] ? es[text] : text),
    }),
    [lang, es]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}
