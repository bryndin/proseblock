/**
 * Newsletter Subscription Component
 * Handles AJAX submission for the newsletter form.
 */

export const initNewsletter = () => {
    const forms = document.querySelectorAll('.js-newsletter-form');

    forms.forEach(form => {
        // Handle different button selectors for sidebar vs block
        const submitBtn = form.querySelector('button[type="submit"]');

        const submitText = submitBtn.querySelector('[class*="__submit-text"]');
        const submitIcon = submitBtn.querySelector('[class*="__submit-icon"]');
        const submitSpinner = submitBtn.querySelector('[class*="__submit-spinner"]');

        // Find feedback container - it's either a sibling or within a parent
        const parent = form.parentElement;
        const feedbackContainer = parent.querySelector('[class*="__feedback"]');

        if (!feedbackContainer) return;

        const successMsg = feedbackContainer.querySelector('[class*="--success"]');
        const errorMsg = feedbackContainer.querySelector('[class*="--error"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Reset state
            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';

            const action = form.getAttribute('action');
            if (!action || action === 'https://formspree.io/f/your-form-id') {
                console.error('Newsletter: No valid action URL configured.');
                errorMsg.textContent = 'Newsletter configuration missing. Please check hugo.toml.';
                errorMsg.style.display = 'block';
                return;
            }

            // Loading state
            submitBtn.disabled = true;
            if (submitText) submitText.style.opacity = '0.5';
            if (submitIcon) submitIcon.style.display = 'none';
            if (submitSpinner) submitSpinner.style.display = 'inline-block';

            try {
                const formData = new FormData(form);
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    successMsg.style.display = 'block';
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        errorMsg.textContent = data.errors.map(error => error.message).join(", ");
                    }
                    errorMsg.style.display = 'block';
                }
            } catch (error) {
                console.error('Newsletter Error:', error);
                errorMsg.style.display = 'block';
            } finally {
                // Restoration
                submitBtn.disabled = false;
                if (submitText) submitText.style.opacity = '1';
                if (submitIcon) submitIcon.style.display = 'inline-block';
                if (submitSpinner) submitSpinner.style.display = 'none';
            }
        });
    });
};

