"use client";

import { Moon, Sun } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import {
  applyThemePreference,
  getInitialThemePreference,
  themePreferenceStorageKey,
  type ThemePreference,
} from "@/lib/theme-preference";

function getThemeSnapshot(): ThemePreference {
  return getInitialThemePreference(window.localStorage.getItem(themePreferenceStorageKey));
}

function getServerSnapshot(): ThemePreference {
  return "light";
}

function subscribeToTheme(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("careeros-theme-updated", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("careeros-theme-updated", onStoreChange);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerSnapshot,
  );
  const darkMode = theme === "dark";

  const toggleTheme = useCallback(() => {
    const nextTheme: ThemePreference = darkMode ? "light" : "dark";
    window.localStorage.setItem(themePreferenceStorageKey, nextTheme);
    applyThemePreference(document.documentElement, nextTheme);
    window.dispatchEvent(new Event("careeros-theme-updated"));
  }, [darkMode]);

  return (
    <button
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      onClick={toggleTheme}
      type="button"
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
