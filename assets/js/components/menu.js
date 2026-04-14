export function initMenu() {
  // Look for the new drawer ID
  const menu = document.getElementById('site-menu');
  const menuToggleBtn = document.getElementById('menu-toggle'); // The hamburger in the header
  const closeBtns = document.querySelectorAll('.js-menu-close'); // Hits the close btn AND the backdrop

  if (!menu || !menuToggleBtn) return;

  function openMenu() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    menuToggleBtn.setAttribute('aria-expanded', 'true');

    // Lock body scrolling
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    menuToggleBtn.setAttribute('aria-expanded', 'false');

    // Restore body scrolling
    document.body.style.overflow = '';
  }

  // Toggle menu from Header Hamburger
  menuToggleBtn.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close buttons (X button and Backdrop click)
  closeBtns.forEach(btn => {
    btn.addEventListener('click', closeMenu);
  });

  // Close menu on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}