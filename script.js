/* ================================
   SCRIPT.JS - Main JavaScript File
   ================================ */

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Mobile Menu
    setupMobileMenu();

    // Filter Functionality
    setupFilterButtons();

    // FAQ Accordion
    setupFAQAccordion();

    // Contact Form
    setupContactForm();

    // Smooth Scroll
    setupSmoothScroll();

    // Navbar Active Link
    updateNavbarActiveLink();
});

/* ================================
   MOBILE MENU FUNCTIONALITY
   ================================ */

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger) return;

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

/* ================================
   FILTER FUNCTIONALITY
   ================================ */

function setupFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('[data-filter]');

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filter cards
            destinationCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-filter') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    });
}

/* ================================
   FAQ ACCORDION
   ================================ */

function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

/* ================================
   CONTACT FORM HANDLING
   ================================ */

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        showNotification('Merci! Votre message a été envoyé avec succès.', 'success');

        // Reset form
        contactForm.reset();
    });
}

/* ================================
   EMAIL VALIDATION
   ================================ */

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ================================
   NOTIFICATION SYSTEM
   ================================ */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles if not already in CSS
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-in-out;
    `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/* ================================
   SMOOTH SCROLL
   ================================ */

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/* ================================
   NAVBAR ACTIVE LINK UPDATE
   ================================ */

function updateNavbarActiveLink() {
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/* ================================
   SCROLL TO TOP BUTTON
   ================================ */

function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scrollToTop';
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Create scroll to top button when DOM is ready
if (document.readyState !== 'loading') {
    createScrollToTopButton();
} else {
    document.addEventListener('DOMContentLoaded', createScrollToTopButton);
}

/* ================================
   NAVBAR STYLING ON SCROLL
   ================================ */

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

/* ================================
   COUNTER ANIMATION FOR STATS
   ================================ */

function setupCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.textContent.replace(/\D/g, ''));
                let current = 0;
                const increment = target / 50;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = element.textContent;
                        clearInterval(counter);
                    } else {
                        element.textContent = Math.floor(current) + element.textContent.replace(/\d/g, '');
                    }
                }, 30);

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => observer.observe(number));
}

// Initialize counter animation
if (document.querySelectorAll('.stat-number').length > 0) {
    setupCounterAnimation();
}

/* ================================
   KEYBOARD NAVIGATION
   ================================ */

document.addEventListener('keydown', function(e) {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

/* ================================
   UTILITY FUNCTIONS
   ================================ */

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Log initialization
console.log('TravelPro Website - All scripts loaded successfully!');
