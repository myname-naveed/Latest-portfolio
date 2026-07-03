/* ============================================
   LUXURY GOLD + DARK ROYAL THEME
   Complete JavaScript for Muhammad Naveed Portfolio
   ============================================ */

// ============================================
// 1. NAVBAR SCROLL EFFECT
// ============================================
(function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 60;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class based on scroll position
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Optional: Hide navbar on scroll down, show on scroll up (uncomment if needed)
        // if (currentScroll > lastScroll && currentScroll > 200) {
        //     navbar.style.transform = 'translateY(-100%)';
        // } else {
        //     navbar.style.transform = 'translateY(0)';
        // }
        // lastScroll = currentScroll;
    });
})();


// ============================================
// 2. MOBILE HAMBURGER MENU
// ============================================
(function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (!hamburger || !navLinks) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('open') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
})();


// ============================================
// 3. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
// ============================================
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-100px 0px -100px 0px',
        threshold: 0.3
    });

    sections.forEach(section => {
        observer.observe(section);
    });
})();


// ============================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            e.preventDefault();

            // Check if it's a nav-cta link (already has special styling)
            if (this.classList.contains('nav-cta')) {
                // Close mobile menu if open
                const hamburger = document.getElementById('hamburger');
                const navLinks = document.getElementById('navLinks');
                if (hamburger && navLinks) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.style.overflow = '';
                }
            }

            const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
})();


// ============================================
// 5. WHATSAPP FLOATING BUTTON - TRACK CLICKS
// ============================================
(function() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (!whatsappFloat) return;

    whatsappFloat.addEventListener('click', function(e) {
        // Track WhatsApp button clicks (for analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'WhatsApp',
                'event_label': 'Floating Button'
            });
        }
        console.log('WhatsApp Floating Button Clicked');
    });
})();


// ============================================
// 6. CONTACT FORM HANDLING
// ============================================
(function() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    // For Netlify Forms (if deployed on Netlify)
    if (contactForm.getAttribute('data-netlify') === 'true') {
        console.log('Netlify form detected - will be handled by Netlify');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[placeholder*="Name"]')?.value || '';
        const email = this.querySelector('input[placeholder*="Email"]')?.value || '';
        const subject = this.querySelector('input[placeholder*="Subject"]')?.value || '';
        const message = this.querySelector('textarea')?.value || '';

        if (!name || !email || !message) {
            alert('Please fill in all required fields (Name, Email, and Message).');
            return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success message
        const originalHTML = this.innerHTML;
        this.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--gold, #d4a853); margin-bottom: 16px;"></i>
                <h3 style="color: #fff; font-family: var(--font-heading, serif);">Message Sent!</h3>
                <p style="color: var(--text-secondary, #c4b8a8);">Thanks for reaching out, ${name}. I'll get back to you within 24 hours.</p>
                <button onclick="this.closest('.contact-form').innerHTML = this.closest('.contact-form').dataset.originalHTML" 
                        style="margin-top: 16px; padding: 10px 24px; border-radius: 100px; background: var(--gold, #d4a853); color: #0a0806; border: none; cursor: pointer; font-weight: 600;">
                    Send Another Message
                </button>
            </div>
        `;
        this.dataset.originalHTML = originalHTML;

        // Log form data (for debugging)
        console.log('Form submitted:', { name, email, subject, message });

        // Optional: Send to your email via Formspree or similar service
        // You can replace the action URL in HTML with: https://formspree.io/your-email
    });
})();


// ============================================
// 7. UTILITY FUNCTIONS
// ============================================

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to animate stats counters
function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const target = parseInt(counter.dataset.count);
        if (!target || counter.dataset.animated === 'true') return;
        
        // Check if counter is in viewport
        if (!isInViewport(counter)) return;
        
        counter.dataset.animated = 'true';
        let current = 0;
        const duration = 2000; // ms
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (target >= 1000 ? '+' : '');
                clearInterval(interval);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, stepTime);
    });
}

// Initialize counter animation on scroll
(function() {
    if (!document.querySelector('.stat-number[data-count]')) return;

    // Check on scroll
    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', animateCounters);
    // Check after a short delay for slower loading
    setTimeout(animateCounters, 500);
})();


// ============================================
// 8. PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for resize events
function debounce(func, wait = 250) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
}));


// ============================================
// 9. PAGE LOAD INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Muhammad Naveed Portfolio Loaded Successfully');
    console.log('🌟 Theme: Luxury Gold + Dark Royal');
    console.log('📱 Responsive: Yes');
    console.log('💬 WhatsApp Integration: Active');
    
    // Check for any broken images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`⚠️ Image failed to load: ${this.src}`);
            // You could set a fallback here if needed
        });
    });

    // Initialize any dynamic elements
    animateCounters();
});


// ============================================
// 10. KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu (already handled above)
    // Tab key handling for better accessibility
    if (e.key === 'Tab') {
        // This ensures focus remains within visible elements
        // when mobile menu is open
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('open')) {
            const focusable = navLinks.querySelectorAll('a, button');
            if (focusable.length) {
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    }
});


// ============================================
// 11. CONSOLE WELCOME MESSAGE (for recruiters)
// ============================================
console.log('%c🚀 Muhammad Naveed - SEO Executive', 'font-size: 20px; font-weight: bold; color: #d4a853;');
console.log('%c🔍 Available for Onsite · Remote · Freelance SEO Roles', 'font-size: 14px; color: #c4b8a8;');
console.log('%c📧 hafizmuhammadnaveedo6@gmail.com', 'font-size: 14px; color: #8a7e6e;');
console.log('%c💬 WhatsApp: +92 309 4669054', 'font-size: 14px; color: #8a7e6e;');
console.log('%c🌐 https://myname-naveed.github.io/Latest-portfolio/', 'font-size: 14px; color: #8a7e6e;');
