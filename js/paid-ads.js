// Paid acquisition landing page (paid-ads.html, paid-ads-thanks.html).
// Standalone: does not depend on main.js.

// Set this to a scheduling link (Calendly, Cal.com, Google Calendar booking
// page, etc.) to show the "Book a call" button next to the form. Leave it
// empty to keep the button hidden.
const BOOKING_URL = '';

const LEAD_ENDPOINT = '/api/lead';
const THANK_YOU_URL = 'paid-ads-thanks.html';
const REQUEST_TIMEOUT_MS = 15000;

document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initYear();
    initBooking();
    initStickyCta();
    initLeadForm();
});

function initTheme() {
    const root = document.documentElement;
    const toggle = document.querySelector('.lp-theme-toggle');
    if (!toggle) return;

    const sync = () => {
        const dark = root.classList.contains('dark-theme');
        toggle.setAttribute('aria-pressed', String(dark));
        toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    };

    toggle.addEventListener('click', function () {
        const dark = root.classList.toggle('dark-theme');
        try {
            localStorage.setItem('theme', dark ? 'dark' : 'light');
        } catch (e) { /* storage unavailable: theme just won't persist */ }
        sync();
    });

    sync();
}

function initYear() {
    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
}

function initBooking() {
    const wrap = document.querySelector('.lp-booking');
    const link = document.querySelector('[data-booking-link]');
    if (!wrap || !link || !BOOKING_URL) return;
    link.href = BOOKING_URL;
    wrap.hidden = false;
}

// Mobile-only bar that appears once the hero is scrolled past and hides
// again while the inquiry form is on screen.
function initStickyCta() {
    const bar = document.querySelector('[data-sticky-cta]');
    const hero = document.querySelector('.lp-hero');
    const inquiry = document.getElementById('inquiry');
    if (!bar || !hero || !inquiry) return;

    bar.hidden = false;
    document.body.classList.add('has-sticky');

    let shown = null;
    const update = () => {
        const pastHero = hero.getBoundingClientRect().bottom < 0;
        // Treat the form as on screen once its top reaches the lower 20% of the viewport
        const formVisible = inquiry.getBoundingClientRect().top < window.innerHeight * 0.8;
        const show = pastHero && !formVisible;
        if (show === shown) return;
        shown = show;
        bar.classList.toggle('is-visible', show);
        // Keep the off-screen link out of the tab order and accessibility tree
        bar.toggleAttribute('inert', !show);
        bar.setAttribute('aria-hidden', String(!show));
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

function initLeadForm() {
    const form = document.getElementById('lead-form');
    if (!form) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const submitLabel = submitBtn.querySelector('.lp-btn__label');
    const formError = form.querySelector('[data-form-error]');
    const defaultLabel = submitLabel.textContent;
    let sending = false;

    const rules = {
        name: v => v ? '' : 'Please enter your name.',
        company: v => v ? '' : 'Please enter your business name.',
        email: v => {
            if (!v) return 'Please enter your email address.';
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Please enter a valid email address, like name@business.com.';
        },
        phone: v => !v || /^[0-9+().\-\s]{7,40}$/.test(v) ? '' : 'Please enter a valid phone number, or leave it blank.',
        website: v => !v || /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(v) ? '' : 'Please enter a valid web address, or leave it blank.',
        industry: v => v ? '' : 'Please choose your type of business.',
        ad_spend: v => v ? '' : 'Please choose your current monthly ad spend.',
        budget: v => v ? '' : 'Please choose a management budget range.',
        goals: v => {
            if (!v) return 'Please tell me a little about what you want ads to do.';
            return v.length >= 10 ? '' : 'Please add a little more detail (at least 10 characters).';
        }
    };

    const fieldFor = name => form.elements.namedItem(name);

    function showError(name, message) {
        const field = fieldFor(name);
        const errorEl = document.getElementById(field.id + '-err');
        if (message) {
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.removeAttribute('aria-invalid');
        }
        if (errorEl) errorEl.textContent = message;
    }

    function validateField(name) {
        const field = fieldFor(name);
        const message = rules[name](field.value.trim());
        showError(name, message);
        return message;
    }

    // Validate on blur, then live once a field has been flagged
    Object.keys(rules).forEach(name => {
        const field = fieldFor(name);
        field.addEventListener('blur', () => {
            if (field.value.trim() || field.hasAttribute('aria-invalid')) validateField(name);
        });
        field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', () => {
            if (field.hasAttribute('aria-invalid')) validateField(name);
        });
    });

    function setSending(state) {
        sending = state;
        submitBtn.setAttribute('aria-disabled', String(state));
        submitLabel.textContent = state ? 'Sending…' : defaultLabel;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (sending) return;
        formError.hidden = true;

        // Validate every field so all errors show at once, then focus the first
        const invalid = Object.keys(rules).filter(name => validateField(name));
        const firstInvalid = invalid[0];
        if (firstInvalid) {
            fieldFor(firstInvalid).focus();
            return;
        }

        const data = new FormData(form);
        const payload = {
            name: data.get('name').trim(),
            company: data.get('company').trim(),
            email: data.get('email').trim(),
            phone: data.get('phone').trim(),
            website: data.get('website').trim(),
            industry: data.get('industry'),
            ad_spend: data.get('ad_spend'),
            budget: data.get('budget'),
            platforms: data.getAll('platforms'),
            goals: data.get('goals').trim(),
            extra_info: data.get('extra_info'),
            page: window.location.pathname + window.location.search
        };

        setSending(true);
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

        try {
            const res = await fetch(LEAD_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
            const body = await res.json().catch(() => ({}));

            if (res.ok && body.ok) {
                // Conversion event for Google Tag Manager / GA4 if a tag is added later
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ event: 'generate_lead', form_id: 'paid-ads-inquiry' });
                window.location.assign(THANK_YOU_URL);
                return;
            }

            // Server-side validation errors map back onto the fields
            if (res.status === 400 && body.errors) {
                let first = null;
                Object.entries(body.errors).forEach(([name, message]) => {
                    if (rules[name]) {
                        showError(name, message);
                        first = first || name;
                    }
                });
                if (first) {
                    fieldFor(first).focus();
                    setSending(false);
                    return;
                }
            }
            throw new Error('Lead submission failed with status ' + res.status);
        } catch (err) {
            formError.hidden = false;
            formError.focus();
            setSending(false);
        } finally {
            clearTimeout(timer);
        }
    });
}
