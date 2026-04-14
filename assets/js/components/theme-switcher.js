export function initThemeSwitcher() {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");

  if (!button) return;

  const themes = ["system", "light", "dark"];

  function getStoredTheme() {
    return localStorage.getItem("theme") || "system";
  }

  function applyTheme(theme) {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", theme);
    }

    root.setAttribute("data-theme-setting", theme);
    localStorage.setItem("theme", theme);
  }

  function updateAria(theme) {
    button.setAttribute("aria-label", `Theme: ${theme}`);
  }

  function cycleTheme() {
    const current = getStoredTheme();
    const next = themes[(themes.indexOf(current) + 1) % themes.length];
    applyTheme(next);
    updateAria(next);
  }

  function listenToOS() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (getStoredTheme() === "system") applyTheme("system");
    });
  }

  // Initialize UI state
  const initial = getStoredTheme();
  updateAria(initial);
  listenToOS();

  button.addEventListener("click", cycleTheme);
}
