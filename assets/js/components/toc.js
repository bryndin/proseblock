/**
 * toc.js — Table of Contents interactivity.
 * Ensures the TOC <details> element is technically 'open' on desktop screens
 * for reliable visibility across all browsers.
 */

export function initTOC() {
  const toc = document.querySelector('.c-toc');
  if (!toc) return;

  const DESKTOP_BREAKPOINT = 768;

  const updateState = () => {
    const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

    if (isDesktop) {
      // Force open on desktop to bypass browser hidden-state logic
      if (!toc.hasAttribute('open')) {
        toc.setAttribute('open', '');
      }
    }
  };

  // Initial check
  updateState();

  // Handle window resizing
  window.addEventListener('resize', () => {
    updateState();
  });
}
