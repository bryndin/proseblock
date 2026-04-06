(function() {
    const root = document.documentElement;
    function getStoredTheme() { return localStorage.getItem("theme") || "system"; }
    function applyTheme(theme) {
        if (theme === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            root.setAttribute("data-theme", prefersDark ? "dark" : "light");
        } else {
            root.setAttribute("data-theme", theme);
        }
        root.setAttribute("data-theme-setting", theme);
    }
    applyTheme(getStoredTheme());
})();
