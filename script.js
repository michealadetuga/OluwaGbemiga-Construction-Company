// Initialize Lucide Icons
lucide.createIcons();

// Modern Mobile Menu Toggle with Animation
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            mobileMenu.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            mobileMenu.style.opacity = '1';
            mobileMenu.style.transform = 'translateY(0)';
        }, 10);
    } else {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 400);
    }
});

// Close mobile menu when clicking on a link with smooth transition
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuOpen = false;
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 400);
    });
});

// Enhanced Navbar Scroll Effect with Parallax
const navbar = document.getElementById('navbar');
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow and background opacity on scroll
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
        // Slightly hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

// Smooth Scroll for Anchor Links with Easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                
                // Easing function for smooth scroll
                const ease = t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                
                window.scrollTo(0, startPosition + distance * ease(progress));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }
            
            requestAnimationFrame(animation);
        }
    });
});

// Contact Form Handling with Loading State
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="inline-flex items-center">Sending...<div class="ml-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div></span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    // Simulate API call with progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="inline-flex items-center"><i data-lucide="check" class="w-5 h-5 mr-2"></i>Sent Successfully!</span>';
                lucide.createIcons();
                
                setTimeout(() => {
                    alert('Thank you for your message! We will get back to you within 24 hours.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 500);
            }, 300);
        }
    }, 200);
});

// Advanced Scroll Reveal Animation System
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add staggered delay based on data attribute or index
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('active');
            }, delay * 100);
            
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '-50px'
});

revealElements.forEach((el, index) => {
    el.dataset.delay = index % 3; // Stagger by groups of 3
    revealObserver.observe(el);
});

// Enhanced Stats Counter Animation with Intersection Observer
const animateCounter = (element, target, suffix = '') => {
    let current = 0;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            
            // Add pulse effect on completion
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 300);
            
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepDuration);
};

const statsSection = document.querySelector('.bg-amber-600');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.text-4xl, .text-5xl');
                counters.forEach((counter, index) => {
                    const text = counter.textContent;
                    const target = parseInt(text);
                    const suffix = text.includes('+') ? '+' : (text.includes('%') ? '%' : '');
                    
                    setTimeout(() => {
                        animateCounter(counter, target, suffix);
                    }, index * 200); // Stagger counters
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Enhanced Navigation Active State with Smooth Transition
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

function updateActiveNav() {
    let current = '';
    const scrollPos = window.pageYOffset + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-amber-600');
        link.style.transform = 'scale(1)';
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-amber-600');
            link.style.transform = 'scale(1.05)';
        }
    });
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateActiveNav);
}, { passive: true });

// Parallax Effect for Hero Background
const heroSection = document.getElementById('home');
const heroImage = heroSection?.querySelector('img');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        heroImage.style.transform = `translateY(${rate}px) scale(1.1)`;
    }, { passive: true });
}

// Magnetic Button Effect
const magneticBtns = document.querySelectorAll('.magnetic-btn, .btn-primary');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// Initialize Lucide Icons after dynamic content
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Add initial animations
    document.querySelectorAll('.animate-fade-in-up').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, i * 100);
    });
});

// Smooth Image Loading with Fade In
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transform = 'scale(1.1)';
                
                const tempImage = new Image();
                tempImage.src = img.src;
                tempImage.onload = () => {
                    img.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                };
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
}

// Mouse Move Parallax Effect for Cards
const cards = document.querySelectorAll('.card-hover');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)';
    });
});

// Typing Effect for Hero Text (Optional Enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = 'position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, #d97706, #f59e0b); z-index: 9999; width: 0%; transition: width 0.1s;';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
}, { passive: true });

// Console greeting with style
console.log('%c🏗️ OluwaGbemiga Construction Company', 'color: #d97706; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 0 #000;');
console.log('%cBuilding Nigeria\'s Future with Excellence', 'color: #64748b; font-size: 16px; font-style: italic;');
console.log('%c© 2024 - All Rights Reserved', 'color: #94a3b8; font-size: 12px;');