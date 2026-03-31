export function initHeaderScroll() {
    // 1. Core Elements
    // Assuming your baseof.html wraps the partial in <header class="c-header">
    const header = document.querySelector('.c-header');

    // Dynamic TDP: Grabs the very first element inside the hero container (Category or Title)
    const tdpElement = document.querySelector('.c-hero__inner > *:first-child');

    // 2. Article / Reading Progress Elements
    const articleContainer = document.getElementById('article-container');
    const readingProgress = document.getElementById('reading-progress');

    // 3. Hero / Floating Title Elements
    const heroSection = document.querySelector('.c-hero');
    const floatingTitle = document.getElementById('floating-title-container');

    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
        const currentScrollY = window.scrollY;

        // --- A. Dynamic Header Transition (TDP Logic) ---
        if (tdpElement) {
            const headerHeight = header.offsetHeight;
            const tdpRect = tdpElement.getBoundingClientRect();

            // Scrolling down AND TDP top edge touches/passes the bottom of the header
            if (currentScrollY > lastScrollY && tdpRect.top <= headerHeight) {
                header.classList.add('is-hidden');
            }
            // Scrolling up AND TDP top edge drops below the bottom of the header
            else if (currentScrollY < lastScrollY && tdpRect.top > headerHeight) {
                header.classList.remove('is-hidden');
            }
        }

        // --- B. Reading Progress Logic ---
        if (articleContainer && readingProgress) {
            const articleHeight = articleContainer.offsetHeight;
            const scrollStart = articleContainer.offsetTop;

            // Calculate progress (starts tracking when article is 1/3rd into viewport)
            const scrolled = currentScrollY - scrollStart + (window.innerHeight / 3);
            let percent = (scrolled / articleHeight) * 100;

            // Clamp value between 0 and 100
            percent = Math.min(Math.max(percent, 0), 100);
            readingProgress.style.height = `${percent}%`;
        }

        // --- C. Floating Title Logic ---
        if (heroSection && floatingTitle) {
            const heroRect = heroSection.getBoundingClientRect();
            // If the bottom of the hero is scrolled out of view past the top
            if (heroRect.bottom < 0) {
                floatingTitle.classList.add('is-visible');
            } else {
                floatingTitle.classList.remove('is-visible');
            }
        }

        // Prevent negative scroll values from breaking logic (iOS Safari rubber-banding)
        lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        ticking = false;
    };

    // Attach scroll listener with requestAnimationFrame for 60fps performance
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    // Initial run on page load
    window.requestAnimationFrame(onScroll);

    // Smooth scroll for the floating title shortcut
    const floatingTitleLink = document.querySelector('#floating-title-container a');
    if (floatingTitleLink) {
        floatingTitleLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Smoothly scroll to the top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // 2. Clean the URL (Remove the hash)
            // This grabs the current path (e.g., /posts/markdown-test/) and strips any #hash
            const cleanUrl = window.location.pathname + window.location.search;
            
            // pushState updates the URL bar without reloading the page.
            // It also adds to the browser history, so hitting the "Back" button 
            // will take the user back to the header they were just reading!
            history.pushState(null, '', cleanUrl);
        });
    }
}