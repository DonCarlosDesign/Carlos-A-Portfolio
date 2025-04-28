document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme immediately before content is displayed
    const savedTheme = localStorage.getItem('theme') || 'light';
    const htmlElement = document.documentElement;
    
    // Apply saved theme class immediately
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark-theme');
    }
    
    // Create page transition element
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    document.body.appendChild(pageTransition);
    
    // Handle page transitions
    document.querySelectorAll('a').forEach(link => {
        // Skip links that open in new tabs, have no href, or are hash links
        if (link.getAttribute('target') === '_blank' || 
            !link.getAttribute('href') || 
            link.getAttribute('href').startsWith('#') ||
            link.getAttribute('href').startsWith('mailto:') ||
            link.getAttribute('href').startsWith('tel:')) {
            return;
        }

        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't run transition for external links
            if (href.startsWith('http') && !href.includes(window.location.hostname)) {
                return;
            }
            
            e.preventDefault();
            
            // Fade out content first
            document.body.style.opacity = '0.8';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Activate transition with a slight delay
            setTimeout(() => {
                pageTransition.classList.add('active');
                
                // Navigate after transition completes
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }, 100);
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
    
    // Add click event to toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }
    
    // Add click event to mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }
    
    // Function to toggle theme
    function toggleTheme() {
        if (htmlElement.classList.contains('dark-theme')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }
    
    // Function to enable dark mode
    function enableDarkMode() {
        htmlElement.classList.add('dark-theme');
        updateThemeIcons('sun');
        updateFooterLogo('white');
        localStorage.setItem('theme', 'dark');
    }
    
    // Function to disable dark mode
    function disableDarkMode() {
        htmlElement.classList.remove('dark-theme');
        updateThemeIcons('moon');
        updateFooterLogo('dark');
        localStorage.setItem('theme', 'light');
    }
    
    // Function to update all theme toggle icons
    function updateThemeIcons(iconName) {
        const themeToggles = document.querySelectorAll('.theme-toggle, .mobile-theme-toggle');
        themeToggles.forEach(toggle => {
            if (toggle.classList.contains('mobile-theme-toggle')) {
                toggle.innerHTML = `<i class="fas fa-${iconName}"></i>Toggle Dark Mode`;
            } else {
                toggle.innerHTML = `<i class="fas fa-${iconName}"></i>`;
            }
        });
    }
    
    // Add this new function to update footer logo
    function updateFooterLogo(theme) {
        const footerLogos = document.querySelectorAll('.footer-logo');
        footerLogos.forEach(logo => {
            if (theme === 'white') {
                // Use white logo for dark theme
                logo.src = logo.src.replace('Footer-Logo-Optimized-Simple.svg', 'Footer-Logo-White.svg')
                              .replace('Footer Logo Container-new.svg', 'Footer-Logo-White.svg');
            } else {
                // Use dark logo for light theme
                logo.src = logo.src.replace('Footer-Logo-White.svg', 'Footer-Logo-Optimized-Simple.svg')
                              .replace('Footer Logo Container-new.svg', 'Footer-Logo-Optimized-Simple.svg');
            }
        });
    }
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and times
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Handle active link based on current page and scrolling
    const links = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    // Set active state based on current page
    links.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // For homepage
        if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (linkPath === '#home' || linkPath === 'index.html') {
                link.classList.add('active');
            }
        }
        // For other pages
        else if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        }
    });
    
    // Special handling for home page scrolling
    if (currentPath === '/' || currentPath.endsWith('index.html')) {
        const homeLink = document.querySelector('.nav-links a[href="#home"]') || 
                        document.querySelector('.nav-links a[href="index.html"]');
        
        if (homeLink) {
            // Always keep home link active on home page
            homeLink.classList.add('active');
            
            // Remove other active states on scroll
            window.addEventListener('scroll', function() {
                links.forEach(link => {
                    if (link !== homeLink) {
                        link.classList.remove('active');
                    }
                });
            });
        }
    }
    
    // Highlight active section on scroll (only for index/home page with hash links)
    if (currentPath === '/' || currentPath.endsWith('index.html')) {
        const sections = document.querySelectorAll('section');
        const homeLink = document.querySelector('.nav-links a[href="#home"]') || 
                        document.querySelector('.nav-links a[href="index.html"]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            // Always keep the home link active
            if (homeLink) {
                homeLink.classList.add('active');
            }
            
            // For other pages that might have section-specific navigation
            links.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref && linkHref.startsWith('#') && link !== homeLink) {
                    link.classList.remove('active');
                    if (linkHref === `#${current}`) {
                        link.classList.add('active');
                    }
                }
            });
        });
    }
    
    // Check for hash in URL to animate skills section if direct link
    if (window.location.hash === '#detailed-skills') {
        setTimeout(() => {
            const detailedSkillsSection = document.getElementById('detailed-skills');
            if (detailedSkillsSection && !detailedSkillsSection.classList.contains('animated')) {
                animateSkillBars('#detailed-skills');
                detailedSkillsSection.classList.add('animated');
                
                // Smooth scroll to the section
                detailedSkillsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }
    
    // Function to animate skill bars
    function animateSkillBars(selector = '#skills') {
        const skillProgressBars = document.querySelectorAll(`${selector} .skill-progress`);
        const percentageElements = document.querySelectorAll(`${selector} .percentage`);
        
        // Animate progress bars
        skillProgressBars.forEach(progressBar => {
            const targetWidth = progressBar.getAttribute('data-width');
            setTimeout(() => {
                progressBar.style.width = targetWidth;
            }, 200); // Small delay for better visual effect
        });
        
        // Animate percentage numbers
        percentageElements.forEach(percentElement => {
            const targetValue = parseInt(percentElement.getAttribute('data-value'));
            animateValue(percentElement, 0, targetValue, 2250); // Slowed down from 1500ms to 2250ms
        });
    }
    
    // Function to animate counting
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = `${currentValue}%`;
            
            // If animation completes, change color to the brand color
            if (progress === 1) {
                element.style.color = 'var(--secondary-color)';
                element.style.fontWeight = '600';
                element.style.transition = 'color 0.3s, transform 0.5s, font-weight 0.3s';
                element.style.transform = 'scale(1.15)';
                setTimeout(() => {
                    element.style.transform = 'scale(1.1)';
                }, 300);
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Add scroll observer for both the skills section on index and detailed skills on about page
    const skillsSections = document.querySelectorAll('#skills, #detailed-skills');
    
    // Create Intersection Observer to detect when sections are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateSkillBars(`#${entry.target.id}`);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all skill sections
    skillsSections.forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });
});