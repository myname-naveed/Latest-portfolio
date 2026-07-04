/* ============================================
   CLEAN WHITE + EMERALD GREEN THEME
   Complete JavaScript for Muhammad Naveed Portfolio
   Updated: Case Studies, Tools, Certifications
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

        // Optional: Hide navbar on scroll down, show on scroll up
        // (Commented out for better UX - keeping navbar always visible)
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

    // Use Intersection Observer for better performance
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

            // Close mobile menu if open
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('navLinks');
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
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
        // Track WhatsApp button clicks (for Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'WhatsApp',
                'event_label': 'Floating Button',
                'value': 1
            });
        }
        console.log('✅ WhatsApp Floating Button Clicked');
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
        console.log('✅ Netlify form detected - will be handled by Netlify');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[placeholder*="Name"]')?.value?.trim() || '';
        const email = this.querySelector('input[placeholder*="Email"]')?.value?.trim() || '';
        const subject = this.querySelector('input[placeholder*="Subject"]')?.value?.trim() || '';
        const select = this.querySelector('select')?.value || '';
        const message = this.querySelector('textarea')?.value?.trim() || '';

        // Validation
        if (!name || !email || !message) {
            alert('⚠️ Please fill in all required fields (Name, Email, and Message).');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('⚠️ Please enter a valid email address.');
            return;
        }

        // Log form data (for debugging)
        console.log('📧 Form submitted:', { 
            name, 
            email, 
            subject, 
            service: select || 'Not specified',
            message 
        });

        // Show success message
        const originalHTML = this.innerHTML;
        this.innerHTML = `
            <div style="text-align: center; padding: 50px 20px;">
                <i class="fas fa-check-circle" style="font-size: 3.5rem; color: #0d9488; margin-bottom: 16px;"></i>
                <h3 style="color: #0f172a; font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem;">Message Sent! 🎉</h3>
                <p style="color: #475569; margin: 12px 0 20px;">Thanks for reaching out, ${name}! I'll get back to you within <strong>24 hours</strong>.</p>
                <button onclick="this.closest('.contact-form').innerHTML = this.closest('.contact-form').dataset.originalHTML" 
                        style="margin-top: 8px; padding: 12px 32px; border-radius: 100px; background: #0d9488; color: #fff; border: none; cursor: pointer; font-weight: 600; font-size: 0.9rem; transition: all 0.3s;"
                        onmouseover="this.style.background='#0f766e'"
                        onmouseout="this.style.background='#0d9488'">
                    <i class="fas fa-redo"></i> Send Another Message
                </button>
            </div>
        `;
        this.dataset.originalHTML = originalHTML;

        // Optional: Send to your email via Formspree
        // Replace the action URL in HTML with: https://formspree.io/your-email
    });
})();


// ============================================
// 7. ANIMATED STATS COUNTERS
// ============================================
(function() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    if (!counters.length) return;

    let animated = false;

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateCounters() {
        if (animated) return;
        
        counters.forEach(counter => {
            if (!isInViewport(counter) || counter.dataset.animated === 'true') return;
            
            counter.dataset.animated = 'true';
            const target = parseInt(counter.dataset.count);
            if (!target) return;
            
            let current = 0;
            const duration = 2000;
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
            
            animated = true;
        });
    }

    // Check on scroll and load
    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', animateCounters);
    setTimeout(animateCounters, 500);
})();


// ============================================
// 8. PROJECT CASE STUDY EXPAND (Optional)
// ============================================
(function() {
    // Add click functionality to project cards if needed
    // Currently just hover effects via CSS, but can add expand functionality
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Optional: Expand/collapse details
            // Currently just log for analytics
            const title = this.querySelector('h3')?.textContent?.trim() || 'Unknown Project';
            console.log(`📂 Project viewed: ${title}`);
            
            // Track with Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_project', {
                    'event_category': 'Portfolio',
                    'event_label': title
                });
            }
        });
    });
})();


// ============================================
// 9. TOOL ITEMS INTERACTION
// ============================================
(function() {
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('click', function() {
            const toolName = this.textContent?.trim() || 'Unknown Tool';
            console.log(`🛠️ Tool clicked: ${toolName}`);
            
            // Track with Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'tool_click', {
                    'event_category': 'Tools',
                    'event_label': toolName
                });
            }
        });
    });
})();


// ============================================
// 10. PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for resize events
function debounce(func, wait = 250) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Handle resize events - close mobile menu on desktop
window.addEventListener('resize', debounce(() => {
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
// 11. KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', function(e) {
    // Trap focus in mobile menu
    const navLinks = document.getElementById('navLinks');
    if (navLinks && navLinks.classList.contains('open')) {
        const focusable = navLinks.querySelectorAll('a, button');
        if (focusable.length) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            
            if (e.key === 'Tab') {
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
    
    // Escape key closes mobile menu (already handled above)
});


// ============================================
// 12. PAGE LOAD INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Muhammad Naveed Portfolio Loaded Successfully');
    console.log('🎨 Theme: Clean White + Emerald Green');
    console.log('📱 Responsive: Yes');
    console.log('💬 WhatsApp Integration: Active');
    console.log('📂 Case Studies: Active');
    console.log('🛠️ Tools Section: Active');
    console.log('📜 Certifications: Active');
    
    // Check for any broken images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`⚠️ Image failed to load: ${this.src}`);
            // Set a fallback color
            this.style.background = '#e2e8f0';
            this.alt = 'Image not available';
        });
    });
});


// ============================================
// 13. CONSOLE WELCOME MESSAGE (For Recruiters)
// ============================================
console.log('%c🚀 Muhammad Naveed - SEO Executive', 'font-size: 24px; font-weight: bold; color: #0d9488;');
console.log('%c🔍 Available for Onsite · Remote · Freelance SEO Roles', 'font-size: 14px; color: #475569;');
console.log('%c📧 hafizmuhammadnaveedo6@gmail.com', 'font-size: 14px; color: #94a3b8;');
console.log('%c💬 WhatsApp: +92 309 4669054', 'font-size: 14px; color: #94a3b8;');
console.log('%c🌐 Portfolio: https://myname-naveed.github.io/Latest-portfolio/', 'font-size: 14px; color: #94a3b8;');
console.log('%c🔗 LinkedIn: https://www.linkedin.com/in/hafiz-muhammad-naveed-410291384', 'font-size: 14px; color: #94a3b8;');
console.log('%c📊 2000+ Backlinks | 150+ Pages Optimized | 40% Avg. Growth', 'font-size: 14px; color: #0d9488;');


// ============================================
// 14. SMOOTH SCROLL FOR DOWNLOAD CV BUTTON
// ============================================
(function() {
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Track download button click
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download_cv', {
                    'event_category': 'Resume',
                    'event_label': 'CV Download'
                });
            }
            console.log('📄 CV Download button clicked');
            // The href already points to #contact, so smooth scroll will work
        });
    }
})();


// ============================================
// 15. CERTIFICATION BADGE INTERACTION
// ============================================
(function() {
    const certBadges = document.querySelectorAll('.cert-badge');
    certBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const certName = this.textContent?.trim() || 'Unknown Certification';
            console.log(`📜 Certification viewed: ${certName}`);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_certification', {
                    'event_category': 'Certifications',
                    'event_label': certName
                });
            }
        });
    });
})();


// ============================================
// 16. TESTIMONIAL CARDS INTERACTION
// ============================================
(function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('click', function() {
            const author = this.querySelector('cite')?.textContent?.trim() || 'Unknown Client';
            console.log(`⭐ Testimonial viewed: ${author}`);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_testimonial', {
                    'event_category': 'Testimonials',
                    'event_label': author
                });
            }
        });
    });
})();


// ============================================
// 17. SERVICE CARD INTERACTION
// ============================================
(function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3')?.textContent?.trim() || 'Unknown Service';
            console.log(`💼 Service viewed: ${serviceName}`);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'view_service', {
                    'event_category': 'Services',
                    'event_label': serviceName
                });
            }
        });
    });
})();
