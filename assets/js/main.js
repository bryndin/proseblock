import { initPaginatorCompact } from "./components/paginator-compact.js";
import { initHeaderScroll } from "./components/header-scroll.js";
import { initMenu } from "./components/menu.js";
import { initSearchPage } from "./components/search.js";
import { initThemeSwitcher } from "./components/theme-switcher.js";

document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  initPaginatorCompact();
  initHeaderScroll();
  initMenu();
  initSearchPage();
});