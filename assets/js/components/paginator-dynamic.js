// ==========================================================================
// Client-Side Pagination Component
// Uses hardcoded HTML structure + templates for dynamic content only
// @see _partials/paginator.html (mode: "csr") for templates
// ==========================================================================

/**
 * Render pagination numbers into the paginator structure
 * Structure (prev/next buttons) must exist in DOM, this only renders numbers
 * @param {Object} config - Configuration
 * @param {number} config.totalPages - Total number of pages
 * @param {number} config.currentPage - Currently active page (1-indexed)
 * @param {Function} config.onPageChange - Callback(page) when page clicked
 */
export function renderPaginator(config) {
  const { totalPages, currentPage, onPageChange } = config;

  // Find nav (always rendered by partial with this ID)
  const nav = document.getElementById('dynamic-paginator');
  if (!nav) return;

  // Toggle visibility
  nav.hidden = totalPages <= 1;
  if (totalPages <= 1) return;

  // Get hardcoded elements
  const prev = nav.querySelector('#paginator-prev');
  const prevDisabled = nav.querySelector('#paginator-prev-disabled');
  const next = nav.querySelector('#paginator-next');
  const nextDisabled = nav.querySelector('#paginator-next-disabled');
  const numbers = nav.querySelector('#paginator-numbers');

  // Toggle prev/next button states
  prev.hidden = currentPage === 1;
  prevDisabled.hidden = currentPage > 1;
  next.hidden = currentPage === totalPages;
  nextDisabled.hidden = currentPage < totalPages;

  // Update prev/next data-page attributes
  if (currentPage > 1) prev.dataset.page = currentPage - 1;
  if (currentPage < totalPages) next.dataset.page = currentPage + 1;

  // Read templates for dynamic numbers
  const tplNum = document.getElementById('tpl-paginator-number').innerHTML;
  const tplNumActive = document.getElementById('tpl-paginator-number-active').innerHTML;

  // Generate numbers HTML
  let html = '';
  for (let i = 1; i <= totalPages; i++) {
    const numStr = String(i).padStart(2, '0');
    html += (i === currentPage)
      ? tplNumActive.replace(/{PAGE}/g, numStr)
      : tplNum.replace(/{PAGE}/g, i).replace(`>${i}<`, `>${numStr}<`);
  }
  numbers.innerHTML = html;

  // Single event listener with delegation
  nav.onclick = (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn) return;
    e.preventDefault();
    const page = btn.dataset.page;
    const newPage = page === 'prev' ? currentPage - 1
                  : page === 'next' ? currentPage + 1
                  : parseInt(page, 10);
    onPageChange(newPage);
  };
}
