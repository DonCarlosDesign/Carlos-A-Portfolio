document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.querySelector('.form-message.success');
    const errorMessage = document.querySelector('.form-message.error');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if honeypot field is filled (bot submission)
            const honeypot = document.getElementById('website');
            if (honeypot && honeypot.value) {
                return false;
            }
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showMessage(errorMessage, 'Please fill all required fields.');
                return;
            }
            
            if (name.length < 2) {
                showMessage(errorMessage, 'Name must be at least 2 characters long.');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage(errorMessage, 'Please enter a valid email address.');
                return;
            }
            
            if (message.length < 10) {
                showMessage(errorMessage, 'Message must be at least 10 characters long.');
                return;
            }
            
            // Create form data object for sending
            const formData = {
                name: name,
                email: email,
                subject: subject || 'Contact Form Inquiry',
                message: message
            };
            
            // Display a loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission with a delay (replace with actual API call in production)
            setTimeout(function() {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Show success message
                showMessage(successMessage, 'Your message has been sent successfully!');
                
                // Log form data to console (for demonstration)
                console.log('Form submitted with data:', formData);
            }, 1500);
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Show message helper
    function showMessage(element, text) {
        // Hide all messages first
        document.querySelectorAll('.form-message').forEach(msg => {
            msg.style.display = 'none';
        });
        
        // Update message text if provided
        if (text) {
            const messageText = element.querySelector('span');
            if (messageText) {
                messageText.textContent = text;
            }
        }
        
        // Show the message
        element.style.display = 'flex';
        
        // Hide after 5 seconds
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items (uncomment to make it work like an accordion)
            /*
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            */
        });
    });

    // Initialize animations specific to the contact page
    document.querySelectorAll('.section-title').forEach(title => {
        if (!title.classList.contains('visible')) {
            title.classList.add('visible');
        }
    });
});