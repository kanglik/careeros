// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import {
  applyThemePreference,
  getInitialThemePreference,
  themePreferenceScript,
} from "./theme-preference";

describe("theme preference", () => {
  it("defaults to light instead of following system dark mode", () => {
    expect(getInitialThemePreference(null)).toBe("light");
    expect(themePreferenceScript).not.toContain("matchMedia");
  });

  it("accepts only supported stored theme values", () => {
    expect(getInitialThemePreference("dark")).toBe("dark");
    expect(getInitialThemePreference("light")).toBe("light");
    expect(getInitialThemePreference("system")).toBe("light");
    expect(getInitialThemePreference("unexpected")).toBe("light");
  });

  it("applies dark class and color scheme to the document root", () => {
    const root = document.createElement("html");

    applyThemePreference(root, "dark");
    expect(root.classList.contains("dark")).toBe(true);
    expect(root.style.colorScheme).toBe("dark");

    applyThemePreference(root, "light");
    expect(root.classList.contains("dark")).toBe(false);
    expect(root.style.colorScheme).toBe("light");
  });
});
