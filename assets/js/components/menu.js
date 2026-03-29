export function initMenu() {
  const openBtn = document.querySelector('.c-header__btn--menu');
  const closeBtn = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('.c-menu');

  if (!openBtn || !closeBtn || !menu) return;

  const openMenu = () => {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
  };

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Optional but recommended: close menu when clicking outside (on the body)
  document.addEventListener('click', (event) => {
    if (menu.classList.contains('is-open') && !menu.contains(event.target) && !openBtn.contains(event.target)) {
      closeMenu();
    }
  });

  // Optional but recommended: close menu on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      openBtn.focus(); // Return focus to hamburger for accessibility
    }
  });
}