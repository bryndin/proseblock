import { initPaginatorCompact } from "./components/paginator-compact.js";
import { initHeaderScroll } from "./components/header-scroll.js";
import { initMenu } from "./components/menu.js";
import { initSearchPage } from "./components/search.js";
import { initThemeSwitcher } from "./components/theme-switcher.js";
import { initCodeCopy } from './components/code-copy.js';
import { initShare } from './components/share.js';
import { initNewsletter } from './components/newsletter.js';

document.addEventListener("DOMContentLoaded", () => {
  initThemeSwitcher();
  initPaginatorCompact();
  initHeaderScroll();
  initMenu();
  initSearchPage();
  initCodeCopy();
  initShare();
  initNewsletter();
});