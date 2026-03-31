import { initPaginatorCompact } from "./components/paginator-compact.js";
import { initHeaderScroll } from "./components/header-scroll.js";
import { initMenu } from "./components/menu.js";

document.addEventListener("DOMContentLoaded", () => {
  initPaginatorCompact();
  initHeaderScroll();
  initMenu();
});