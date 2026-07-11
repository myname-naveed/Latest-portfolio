/**
 * ============================================
 * PREMIUM SEO PORTFOLIO - COMPLETE JAVASCRIPT
 * ============================================
 */

// ============================================
// 1. NAVBAR SCROLL EFFECT
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});


// ============================================
// 2. MOBILE HAMBURGER MENU
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }
});


// ============================================
// 3. ACTIVE NAV LINK HIGHLIGHT (for single page)
//    Note: For multi-page, this is handled by .active class in HTML
//    This function is kept for future use if needed
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Get all sections that have an ID
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    
    // Only run if there are sections (single page mode)
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
});


// ============================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
//    (For single page anchor links)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// ============================================
// 5. ANIMATED COUNTERS (Optional)
//    For future use when adding stats animations
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.stat h3, .number');
    
    if (counters.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const num = parseInt(text.replace(/[^0-9]/g, ''));
                    
                    if (!isNaN(num)) {
                        animateCounter(target, num);
                    }
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }
});

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const duration = 1500;
    const stepTime = Math.floor(duration / 60);
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = current + '+';
        }
    }, stepTime);
}


// ============================================
// 6. SCROLL REVEAL ANIMATIONS (Optional)
//    For fade-in effects on scroll
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.service-card, .exp-item, .project-card, .case-card, .skill-tag, .tool-item');
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
});


// ============================================
// 7. CONTACT FORM VALIDATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(function(input) {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                    input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
                } else {
                    input.style.borderColor = '';
                    input.style.boxShadow = '';
                }
            });
            
            if (isValid) {
                // Success message
                const btn = contactForm.querySelector('.btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.disabled = true;
                
                // Simulate sending (replace with actual form submission)
                setTimeout(function() {
                    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
                    
                    setTimeout(function() {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.disabled = false;
                        contactForm.reset();
                    }, 3000);
                }, 1500);
            }
        });
    }
});


// ============================================
// 8. TOOLTIP INITIALIZATION (Optional)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Add title attribute to tool items for better UX
    document.querySelectorAll('.tool-item').forEach(function(item) {
        const text = item.textContent.trim();
        if (text && !item.getAttribute('title')) {
            item.setAttribute('title', text);
        }
    });
});


// ============================================
// 9. KEYBOARD ACCESSIBILITY
//    Close menu with Escape key
// ============================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        }
    }
});


// ============================================
// 10. PAGE LOAD ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});


// ============================================
// 11. CONSOLE WELCOME MESSAGE (Optional)
// ============================================
console.log('%c🚀 Muhammad Naveed · SEO Specialist Portfolio', 'font-size:20px; font-weight:bold; color:#c9a84c;');
console.log('%c📧 hafizmuhammadnaveedo6@gmail.com', 'font-size:12px; color:#6f6580;');


// ============================================
// 12. PREVENT DEFAULT FOR EMPTY LINKS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href="#"]').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});
