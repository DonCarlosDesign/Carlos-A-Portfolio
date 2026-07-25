// Shared click-to-enlarge lightbox for case-study galleries.
// Auto-initializes on any page with #case-lightbox. Triggers on every
// .case-figure img (gallery pieces) plus any image explicitly opted in
// with the .lightbox-trigger class (e.g. a dense hero shot).
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('case-lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('case-lightbox-img');
    const lightboxClose = document.getElementById('case-lightbox-close');

    function openLightbox(src, alt) {
        lightboxImg.setAttribute('src', src);
        lightboxImg.setAttribute('alt', alt || '');
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.case-figure img, .lightbox-trigger').forEach(img => {
        img.addEventListener('click', function() {
            const fullSrc = this.getAttribute('data-full') || this.getAttribute('src');
            openLightbox(fullSrc, this.getAttribute('alt'));
        });
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
});
