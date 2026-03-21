import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Language } from "../utils/translations";

const STORAGE_KEY = "mbar-lang";

function readLanguageFromStorage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "pl" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return "pl";
}

/** URL `?lang=en` / `?lang=pl` overrides localStorage (shareable EN links, SEO hreflang). */
function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "pl";
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q === "en" || q === "pl") return q;
  } catch {
    /* ignore */
  }
  return readLanguageFromStorage();
}

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore */
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  /** Keep `?lang=` in sync for sharing + Google hreflang target URL. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (language === "en") {
      url.searchParams.set("lang", "en");
    } else {
      url.searchParams.delete("lang");
    }
    const next =
      url.pathname + (url.search ? url.search : "") + (url.hash || "");
    const cur =
      window.location.pathname +
      window.location.search +
      (window.location.hash || "");
    if (next !== cur) {
      window.history.replaceState({}, "", next);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
