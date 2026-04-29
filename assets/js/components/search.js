import { renderPaginator } from './paginator-dynamic.js';

export function initSearchPage() {
  const targetElement = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results-container');
  if (!targetElement || !resultsContainer) return;

  // ==========================================================================
  // 1. Custom Dropdown UI Logic
  // ==========================================================================
  const dropdowns = document.querySelectorAll('.c-dropdown');
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.c-dropdown__toggle');
    const valueDisplay = dropdown.querySelector('.c-dropdown__value');
    const hiddenInput = dropdown.querySelector('input[type="hidden"]');

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('is-open');

      document.querySelectorAll('.c-dropdown').forEach(d => {
        d.classList.remove('is-open');
        d.querySelector('.c-dropdown__toggle').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        dropdown.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });

    dropdown.querySelectorAll('.c-dropdown__option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = option.getAttribute('data-value');
        const text = option.textContent.trim();

        valueDisplay.textContent = text;
        dropdown.querySelectorAll('.c-dropdown__option').forEach(opt => opt.setAttribute('aria-selected', 'false'));
        option.setAttribute('aria-selected', 'true');
        dropdown.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');

        if (hiddenInput && hiddenInput.value !== val) {
          hiddenInput.value = val;
          hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.c-dropdown').forEach(d => {
      d.classList.remove('is-open');
      d.querySelector('.c-dropdown__toggle').setAttribute('aria-expanded', 'false');
    });
  });

  // ==========================================================================
  // 2. Live Filtering Logic
  // ==========================================================================
  const searchUrl = resultsContainer.getAttribute('data-search-url') || '/index.json';
  const filterCategory = document.getElementById('filter-category');
  const filterDate = document.getElementById('filter-date');
  let indexData = [];
  let currentPage = 1;
  const resultsPerPage = parseInt(resultsContainer.getAttribute('data-max-results'), 10) || 8;

  const urlParams = new URLSearchParams(window.location.search);
  targetElement.value = urlParams.get('q') || '';

  fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
      indexData = data;
      applyFiltersAndSearch();
    })
    .catch(err => console.error("Search index failed to load.", err));

  function applyFiltersAndSearch() {
    const query = targetElement.value.trim().toLowerCase();
    const selectedCat = filterCategory.value;
    const selectedDateOffset = filterDate.value;
    const currentUnixTime = Math.floor(Date.now() / 1000);

    const filteredData = indexData.filter(item => {
      const matchesText = !query ||
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.summary && item.summary.toLowerCase().includes(query)) ||
        (item.content && item.content.toLowerCase().includes(query));

      const matchesCat = selectedCat === 'all' ||
        (item.categories && item.categories.map(c => c.toLowerCase()).includes(selectedCat));

      let matchesDate = true;
      if (selectedDateOffset !== 'all') {
        const timeLimit = currentUnixTime - parseInt(selectedDateOffset, 10);
        matchesDate = item.timestamp >= timeLimit;
      }

      return matchesText && matchesCat && matchesDate;
    });

    const newUrl = new URL(window.location);
    if (query) newUrl.searchParams.set('q', query);
    else newUrl.searchParams.delete('q');
    window.history.replaceState({}, '', newUrl);

    currentPage = 1;
    renderPage(filteredData);
    updateSuggestions(filteredData);
  }

  function renderPage(data) {
    resultsContainer.innerHTML = '';
    const paginationNav = document.getElementById('dynamic-paginator');
    if (paginationNav) paginationNav.hidden = true;

    if (data.length === 0) {
      // Empty state uses the dedicated CSS class we added to utilities
      resultsContainer.innerHTML = '<p class="c-search-empty">No articles match your criteria.</p>';
      return;
    }

    const startIdx = (currentPage - 1) * resultsPerPage;
    const endIdx = startIdx + resultsPerPage;
    const pageItems = data.slice(startIdx, endIdx);

    resultsContainer.innerHTML = pageItems.map(item => item.html).join('');

    const totalPages = Math.ceil(data.length / resultsPerPage);
    if (totalPages > 1) {
      renderPaginator({
        totalPages,
        currentPage,
        onPageChange: (newPage) => {
          currentPage = newPage;
          renderPage(data);
          document.getElementById('search-results-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
      });
    }
  }

  // ==========================================================================
  // 4. Intelligent Suggestions
  // ==========================================================================
  function updateSuggestions(data) {
    const catContainer = document.getElementById('dynamic-categories-container');
    const tagContainer = document.getElementById('dynamic-tags-container');
    if (!catContainer || !tagContainer) return;

    const catLimit = parseInt(catContainer.getAttribute('data-limit'), 10) || 5;
    const tagLimit = parseInt(tagContainer.getAttribute('data-limit'), 10) || 4;

    const catTpl = document.getElementById('tpl-suggested-category').innerHTML;
    const tagTpl = document.getElementById('tpl-suggested-tag').innerHTML;

    const catCounts = {};
    const tagCounts = {};

    data.forEach(item => {
      if (item.categories) item.categories.forEach(c => catCounts[c] = (catCounts[c] || 0) + 1);
      if (item.tags) item.tags.forEach(t => tagCounts[t] = (tagCounts[t] || 0) + 1);
    });

    const sortedCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, catLimit);
    const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, tagLimit);

    catContainer.innerHTML = sortedCats.map(([name, count]) => {
      return catTpl
        .replace(/{NAME}/g, name)
        .replace(/{NAME_LOWER}/g, name.toLowerCase())
        .replace(/{COUNT}/g, String(count).padStart(2, '0')); // Match designer's zero-padded counts
    }).join('');

    tagContainer.innerHTML = sortedTags.map(([name, count]) => {
      return tagTpl
        .replace(/{NAME}/g, name)
        .replace(/{NAME_LOWER}/g, name.toLowerCase())
        .replace(/{COUNT}/g, String(count).padStart(2, '0'));
    }).join('');

    // Attach dynamic click events
    catContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.getAttribute('data-filter-category');
        const dropdownValueSpan = document.querySelector('#dropdown-category .c-dropdown__value');
        if (dropdownValueSpan) dropdownValueSpan.textContent = e.currentTarget.querySelector('.c-widget-categories__name').textContent;

        filterCategory.value = val;
        applyFiltersAndSearch();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    tagContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const val = e.currentTarget.getAttribute('data-filter-tag');
        targetElement.value = '#' + val;
        applyFiltersAndSearch();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // Input debouncing & Listener attachment
  let debounceTimer;
  targetElement.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(applyFiltersAndSearch, 300);
  });

  filterCategory.addEventListener('change', applyFiltersAndSearch);
  filterDate.addEventListener('change', applyFiltersAndSearch);
}