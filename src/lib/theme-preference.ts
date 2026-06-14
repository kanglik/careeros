export type ThemePreference = "light" | "dark";

export const themePreferenceStorageKey = "careerOSTheme";

export function getInitialThemePreference(storedValue: string | null): ThemePreference {
  return storedValue === "dark" || storedValue === "light" ? storedValue : "light";
}

export function applyThemePreference(root: HTMLElement, theme: ThemePreference) {
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  root.dataset.theme = theme;
}

export const themePreferenceScript = `
(() => {
  try {
    const storedTheme = window.localStorage.getItem("${themePreferenceStorageKey}");
    const theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : "light";
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    root.dataset.theme = theme;
  } catch {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
    document.documentElement.dataset.theme = "light";
  }
})();
`;
