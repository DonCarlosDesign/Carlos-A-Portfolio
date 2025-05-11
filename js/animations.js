document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations when the DOM is loaded
    initScrollAnimations();
    initSmoothScrolling();
    createBackToTopButton();
    updateSectionVisibility();
    
    // Setup scroll event listener
    window.addEventListener('scroll', function() {
        updateSectionVisibility();
    });
    
    // Setup resize event listener
    window.addEventListener('resize', function() {
        updateSectionVisibility();
    });

    // Observer for section titles
    const sectionTitleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all section titles
    document.querySelectorAll('.section-title').forEach(title => {
        sectionTitleObserver.observe(title);
    });
});

// Function to initialize scroll-based animations
function initScrollAnimations() {
    // Add fade-in animation classes to elements
    addAnimationClasses();
    
    // Create intersection observers for animations
    initIntersectionObservers();
    
    // Add staggered animation for groups
    initStaggeredAnimations();
}

// Function to add animation classes to elements
function addAnimationClasses() {
    // Add fade-in animation to section headings
    document.querySelectorAll('section h2').forEach(heading => {
        if (!heading.classList.contains('section-title')) {
            heading.classList.add('section-title');
        }
    });
    
    // Add fade-in animations to different elements
    document.querySelectorAll('.hero-text, .about-text, .section-intro, .contact-form-container, .contact-details').forEach(element => {
        if (!element.classList.contains('fade-in')) {
            element.classList.add('fade-in');
        }
    });
    
    // Add fade-in-left animation to left-side elements
    document.querySelectorAll('.project-image, .about-image, .featured-project-image').forEach(element => {
        if (!element.classList.contains('fade-in-left')) {
            element.classList.add('fade-in-left');
        }
    });
    
    // Add fade-in-right animation to right-side elements
    document.querySelectorAll('.project-details, .featured-project-details').forEach(element => {
        if (!element.classList.contains('fade-in-right')) {
            element.classList.add('fade-in-right');
        }
    });
    
    // Add fade-in-up animation to various content elements
    document.querySelectorAll('.skills-container, .timeline-item, .education-item, .approach-item, .faq-item, .cta-content').forEach(element => {
        if (!element.classList.contains('fade-in-up')) {
            element.classList.add('fade-in-up');
        }
    });
    
    // Add image-zoom class to images that should have zoom effect
    document.querySelectorAll('.project-thumbnail, .portfolio-thumbnail').forEach(element => {
        element.classList.add('image-zoom-container');
        const img = element.querySelector('img');
        if (img && !img.classList.contains('image-zoom')) {
            img.classList.add('image-zoom');
        }
    });
}

// Initialize intersection observers for animations
function initIntersectionObservers() {
    // Options for the Intersection Observer
    const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0.15 // Trigger when 15% of the element is visible
    };
    
    // Create observer for fade-in elements
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a small delay based on the index to create a natural feeling
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
                
                // Once animated, no need to observe anymore
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up, .section-title').forEach(element => {
        fadeInObserver.observe(element);
    });
}

// Initialize staggered animations for grid items
function initStaggeredAnimations() {
    // Select grid containers
    const gridContainers = document.querySelectorAll('.services-grid, .projects-grid, .education-grid, .approach-grid, .faq-grid');
    
    gridContainers.forEach(container => {
        // Get all direct children
        const items = container.children;
        
        // Add stagger-item class to each child
        Array.from(items).forEach((item, index) => {
            if (!item.classList.contains('stagger-item')) {
                item.classList.add('stagger-item');
            }
        });
        
        // Create observer for this container
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                // Stagger the animation of each item
                Array.from(items).forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 100 + (index * 100)); // Delay increases with each item
                });
                
                // Once animated, no need to observe anymore
                observer.unobserve(container);
            }
        }, options);
        
        // Observe the container
        observer.observe(container);
    });
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    // Select all anchor links that point to IDs on the page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Get the target element
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') {
                return;
            }
            
            // Find the target element
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Get header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // Calculate the target position with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Scroll smoothly to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without reloading the page
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Add smooth scrolling for back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Function to update element visibility based on scroll position
function updateSectionVisibility() {
    // Show/hide back to top button based on scroll position
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Check if elements are in viewport and should be animated
    const elementsToAnimate = document.querySelectorAll('.fade-in:not(.visible), .fade-in-left:not(.visible), .fade-in-right:not(.visible), .fade-in-up:not(.visible), .section-title:not(.visible)');
    
    elementsToAnimate.forEach(element => {
        if (isElementInViewport(element)) {
            // Add a small delay to make it more natural
            setTimeout(() => {
                element.classList.add('visible');
            }, 100);
        }
    });
}

// Helper function to check if element is in viewport
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to create a back to top button
function createBackToTopButton() {
    // Create the button element
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    // Append to the body
    document.body.appendChild(backToTopButton);
    
    // Add click event listener
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}