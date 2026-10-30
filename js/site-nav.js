// Shared disclosure navigation for the portfolio and paid acquisition pages.
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('[data-site-menu-toggle]');
    const menu = document.querySelector('[data-site-menu]');
    if (!toggle || !menu) return;
    const header = toggle.closest('header');
    const mobile = window.matchMedia(`(max-width: ${toggle.dataset.menuBreakpoint || 768}px)`);
    header.classList.add('site-menu-ready');

    function setOpen(open, restoreFocus = false) {
        menu.classList.toggle('active', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-times', open);
        }
        if (restoreFocus) toggle.focus();
    }

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    header.addEventListener('keydown', event => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setOpen(false, true);
        }
    });
    menu.addEventListener('click', event => {
        if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('click', event => {
        if (!header.contains(event.target)) setOpen(false);
    });
    mobile.addEventListener('change', () => {
        const focusWasInMenu = menu.contains(document.activeElement);
        setOpen(false, mobile.matches && focusWasInMenu);
    });
});
