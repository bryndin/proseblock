/**
 * Featured Article Carousel
 * Handles the pagination logic for the featured block on the home page.
 */
export function initPaginatorCompact() {
  const carousels = document.querySelectorAll('.js-featured-carousel');

  carousels.forEach(carousel => {
    const prevBtn = carousel.querySelector('.js-featured-prev');
    const nextBtn = carousel.querySelector('.js-featured-next');
    const indicator = carousel.querySelector('.js-featured-indicator');
    const items = carousel.querySelectorAll('.js-featured-item');
    const total = parseInt(carousel.dataset.total, 10);
    let currentIndex = 0;

    if (!items.length || total <= 1) return;

    const updateCarousel = (newIndex) => {
      // Hide current item
      items[currentIndex].style.display = 'none';

      // Update index with wrap-around logic
      currentIndex = newIndex;
      if (currentIndex < 0) currentIndex = total - 1;
      if (currentIndex >= total) currentIndex = 0;

      // Show new item (using flex to match c-featured__content original display)
      items[currentIndex].style.display = 'flex';

      // Update indicator text (e.g., "01 / 03")
      const currentText = String(currentIndex + 1).padStart(2, '0');
      const totalText = String(total).padStart(2, '0');
      indicator.textContent = `${currentText} / ${totalText}`;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(currentIndex + 1);
      });
    }
  });
}
