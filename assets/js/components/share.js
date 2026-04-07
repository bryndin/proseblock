/**
 * Share Menu Logic
 * Handles social sharing, clipboard copying, and Web Share API.
 */
export function initShare() {
    const containers = document.querySelectorAll('.js-share-container');

    containers.forEach(container => {
        const btn = container.querySelector('.js-share-btn');
        const menu = container.querySelector('.js-share-menu');
        const closeBtn = container.querySelector('.js-share-close');
        const copyBtn = container.querySelector('.js-share-copy');
        const shareLinks = container.querySelectorAll('.js-share-link');

        if (!btn || !menu) return;

        // --- Toggle Logic ---
        const toggleMenu = (force) => {
            const isOpen = force !== undefined ? force : !menu.classList.contains('is-active');
            menu.classList.toggle('is-active', isOpen);
            btn.setAttribute('aria-expanded', isOpen);
            menu.setAttribute('aria-hidden', !isOpen);
        };

        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Try Web Share API on mobile
            if (navigator.share && window.innerWidth <= 768) {
                const url = window.location.href;
                const title = document.title;

                navigator.share({
                    title: title,
                    url: url
                }).catch(err => {
                    console.log('Error sharing:', err);
                    toggleMenu(true); // Fallback to custom menu
                });
            } else {
                toggleMenu();
            }
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => toggleMenu(false));
        }

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target) && menu.classList.contains('is-active')) {
                toggleMenu(false);
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('is-active')) {
                toggleMenu(false);
            }
        });

        // --- Social Sharing Logic ---
        shareLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('mailto:')) return;
                
                e.preventDefault();
                const url = link.getAttribute('href');
                const width = 600;
                const height = 400;
                const left = (window.innerWidth - width) / 2;
                const top = (window.innerHeight - height) / 2;

                window.open(
                    url,
                    'share-window',
                    `width=${width},height=${height},left=${left},top=${top},location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1`
                );
            });
        });

        // --- Copy Link Logic ---
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const url = copyBtn.dataset.url || window.location.href;

                navigator.clipboard.writeText(url).then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    copyBtn.classList.add('is-success');

                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                        copyBtn.classList.remove('is-success');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            });
        }
    });
}
