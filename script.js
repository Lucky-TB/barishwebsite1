// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (currentScroll === 0) {
            navbar.classList.remove('scrolled');
        } else {
            navbar.classList.add('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .price-card, .faq-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Show success message (in production, you'd send this to a server)
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Message Sent!';
        button.style.backgroundColor = '#2ecc71';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        
        question?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
            });
            
            // Open clicked item if it wasn't already open
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // Pricing toggle animation
    const priceCards = document.querySelectorAll('.price-card');
    
    priceCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            priceCards.forEach(c => c.classList.remove('featured'));
            card.classList.add('featured');
        });
    });

    // Add loading animation for scan simulation
    const addScanSimulation = () => {
        const scanButtons = document.querySelectorAll('.btn.primary');
        
        scanButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.classList.contains('scanning')) return;
                
                const originalText = this.textContent;
                this.classList.add('scanning');
                this.textContent = 'Scanning...';
                
                setTimeout(() => {
                    this.classList.remove('scanning');
                    this.textContent = originalText;
                }, 2000);
            });
        });
    };

    addScanSimulation();

    // Intersection Observer for lazy loading and animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .price-card, .faq-item, .achievement-card').forEach(element => {
        observer.observe(element);
    });

    // Add dynamic year to footer
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        yearSpan.textContent = yearSpan.textContent.replace('2024', new Date().getFullYear());
    }
});

// Helper function to debounce scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}