document.addEventListener('DOMContentLoaded', function() {
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
            
            // Activate transition
            pageTransition.classList.add('active');
            
            // Navigate after transition completes
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme on page load based on saved preference
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
    
    // Add click event to toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
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
        localStorage.setItem('theme', 'dark');
    }
    
    // Function to disable dark mode
    function disableDarkMode() {
        htmlElement.classList.remove('dark-theme');
        updateThemeIcons('moon');
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
    
    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navbar = document.querySelector('.main-nav');
    const navIcons = document.querySelector('.nav-icons');
    const navLinks = document.querySelector('.nav-links');
    
    // Append mobile menu toggle to nav-icons
    if (navIcons) {
        navIcons.appendChild(mobileMenuToggle);
        
        // Let CSS handle the display property
        mobileMenuToggle.style.fontSize = '1.2rem';
    } else {
        navbar.appendChild(mobileMenuToggle);
    }
    
    // Only create mobile dark mode toggle for mobile view
    function createMobileThemeToggle() {
        // Remove any existing mobile theme toggle first
        const existingToggle = document.querySelector('.mobile-theme-toggle');
        if (existingToggle) {
            existingToggle.remove();
        }
        
        if (window.innerWidth < 768 && navLinks) {
            // Create mobile dark mode toggle
            const mobileDarkModeToggle = document.createElement('div');
            mobileDarkModeToggle.className = 'mobile-theme-toggle';
            mobileDarkModeToggle.innerHTML = `<i class="fas fa-${htmlElement.classList.contains('dark-theme') ? 'sun' : 'moon'}"></i>Toggle Dark Mode`;
            
            // Add mobile dark mode toggle to the navigation links
            navLinks.appendChild(mobileDarkModeToggle);
            
            // Add click event to mobile theme toggle
            mobileDarkModeToggle.addEventListener('click', function() {
                toggleTheme();
            });
        }
    }
    
    // Initial creation of mobile theme toggle
    createMobileThemeToggle();
    
    // Update toggle on window resize
    window.addEventListener('resize', createMobileThemeToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
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