import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CodeLanguage, Environment } from "@/data/config";

type DocsContextValue = { environment: Environment; setEnvironment: (value: Environment) => void; language: CodeLanguage; setLanguage: (value: CodeLanguage) => void; theme: "light" | "dark"; toggleTheme: () => void };
const DocsContext = createContext<DocsContextValue | undefined>(undefined);

export function DocsProvider({ children }: { children: ReactNode }) {
  const [environment, setEnvironmentState] = useState<Environment>("sandbox");
  const [language, setLanguageState] = useState<CodeLanguage>("curl");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const storedEnvironment = window.localStorage.getItem("rahapay-environment");
    if (storedEnvironment === "live" || storedEnvironment === "sandbox") setEnvironmentState(storedEnvironment);
    const storedLanguage = window.localStorage.getItem("rahapay-language");
    if (storedLanguage === "curl" || storedLanguage === "node" || storedLanguage === "python" || storedLanguage === "php") setLanguageState(storedLanguage);
    const storedTheme = window.localStorage.getItem("rahapay-theme");
    const nextTheme = storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);
  const value = useMemo(() => ({
    environment,
    setEnvironment: (next: Environment) => { setEnvironmentState(next); window.localStorage.setItem("rahapay-environment", next); },
    language,
    setLanguage: (next: CodeLanguage) => { setLanguageState(next); window.localStorage.setItem("rahapay-language", next); },
    theme,
    toggleTheme: () => setTheme((current) => { const next = current === "light" ? "dark" : "light"; document.documentElement.classList.toggle("dark", next === "dark"); window.localStorage.setItem("rahapay-theme", next); return next; }),
  }), [environment, language, theme]);
  return <DocsContext.Provider value={value}>{children}</DocsContext.Provider>;
}

export function useDocs() {
  const value = useContext(DocsContext);
  if (!value) throw new Error("useDocs must be used within DocsProvider");
  return value;
}
