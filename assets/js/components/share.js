/**
 * Share Menu
 * Handles popover toggle, Web Share API (mobile), social sharing popups,
 * keyboard navigation, and focus management.
 */
export function initShare() {
    const containers = document.querySelectorAll('.js-share');

    containers.forEach(container => {
        const trigger = container.querySelector('.js-share-trigger');
        const menu = container.querySelector('.js-share-menu');
        const items = container.querySelectorAll('.js-share-item');

        if (!trigger || !menu || items.length === 0) return;

        // ── State helpers ──────────────────────────────────────────────
        const isOpen = () => menu.classList.contains('is-active');

        const open = () => {
            menu.classList.add('is-active');
            trigger.setAttribute('aria-expanded', 'true');
            // Focus the first item for keyboard users
            items[0]?.focus();
        };

        const close = () => {
            menu.classList.remove('is-active');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus();
        };

        const toggle = () => (isOpen() ? close() : open());

        // ── Trigger click ──────────────────────────────────────────────
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();

            // Attempt native Web Share API on narrow viewports
            if (navigator.share && window.innerWidth <= 768) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(() => {
                    // User cancelled or API failed — fall back to custom menu
                    toggle();
                });
                return;
            }

            toggle();
        });

        // ── Close on click outside ─────────────────────────────────────
        document.addEventListener('click', (e) => {
            if (isOpen() && !container.contains(e.target)) {
                close();
            }
        });

        // ── Keyboard handling ──────────────────────────────────────────
        container.addEventListener('keydown', (e) => {
            if (!isOpen()) return;

            if (e.key === 'Escape') {
                e.preventDefault();
                close();
                return;
            }

            // Arrow / Tab navigation within menu items
            const focusable = [...items];
            const idx = focusable.indexOf(document.activeElement);

            if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
                e.preventDefault();
                const next = idx < focusable.length - 1 ? idx + 1 : 0;
                focusable[next].focus();
            } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
                e.preventDefault();
                const prev = idx > 0 ? idx - 1 : focusable.length - 1;
                focusable[prev].focus();
            }
        });

        // ── Social sharing popups ──────────────────────────────────────
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href');

                // Let mailto: links open natively
                if (href.startsWith('mailto:')) return;

                e.preventDefault();
                const w = 600;
                const h = 500;
                const left = (screen.width - w) / 2;
                const top = (screen.height - h) / 2;

                window.open(
                    href,
                    'share',
                    `width=${w},height=${h},left=${left},top=${top},menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1`
                );

                close();
            });
        });
    });
}
