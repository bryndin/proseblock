export function initPaginatorCompact() {
  const carousels = document.querySelectorAll('.js-featured-carousel');

  carousels.forEach(carousel => {
    const prevBtn = carousel.querySelector('.js-featured-prev');
    const nextBtn = carousel.querySelector('.js-featured-next');
    const indicator = carousel.querySelector('.js-featured-indicator');
    const items = carousel.querySelectorAll('.js-featured-item');
    const total = parseInt(carousel.dataset.total, 10);
    const autorotate = carousel.dataset.autorotate === 'true';
    const interval = parseInt(carousel.dataset.interval, 10) || 5000;
    
    let currentIndex = 0;
    let rotationInterval = null;

    if (!items.length || total <= 1) return;

    const updateCarousel = (newIndex) => {
      // Hide current item
      items[currentIndex].classList.remove('is-active');

      // Update index with wrap-around logic
      currentIndex = newIndex;
      if (currentIndex < 0) currentIndex = total - 1;
      if (currentIndex >= total) currentIndex = 0;

      // Show new item
      items[currentIndex].classList.add('is-active');

      // Update indicator text (e.g., "01 / 03")
      if (indicator) {
        const currentText = String(currentIndex + 1).padStart(2, '0');
        const totalText = String(total).padStart(2, '0');
        indicator.textContent = `${currentText} / ${totalText}`;
      }
    };

    const startRotation = () => {
      if (!autorotate) return;
      stopRotation();
      rotationInterval = setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, interval);
    };

    const stopRotation = () => {
      if (rotationInterval) {
        clearInterval(rotationInterval);
        rotationInterval = null;
      }
    };

    // Manual navigation handles
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(currentIndex - 1);
        startRotation(); // Reset timer on click
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(currentIndex + 1);
        startRotation(); // Reset timer on click
      });
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', stopRotation);
    carousel.addEventListener('mouseleave', startRotation);

    // Initial start
    startRotation();
  });
}
