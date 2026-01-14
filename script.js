// ========================================
// ENHANCED REAL ESTATE WEBSITE SCRIPTS
// ========================================

// ----- Mobile Menu Toggle -----
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// ----- Smooth Scrolling -----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ----- Header Scroll Effect -----
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ----- Scroll to Top Button -----
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ----- Form Submission -----
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showNotification('Thank you for your message! We will contact you shortly.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real implementation, you would send the data to a server
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     showNotification('Thank you! We will contact you shortly.', 'success');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     showNotification('Something went wrong. Please try again.', 'error');
        // });
    });
}

// ----- Notification System -----
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : type === 'error' ? '#e74c3c' : '#C9A96E'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        font-weight: 600;
        max-width: 400px;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 5000);
}

// ----- Search Form Handler -----
const searchForm = document.querySelector('.search-form');

if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const location = this.querySelector('select[name="location"]')?.value || '';
        const propertyType = this.querySelector('select[name="type"]')?.value || '';
        
        // Show notification (in real implementation, this would redirect to search results)
        showNotification('Searching for properties... This will be connected to a property database.', 'info');
        
        // In a real implementation, you would redirect to a search results page or API
        // Example:
        // window.location.href = `/search?location=${location}&type=${propertyType}`;
    });
}

// ----- Intersection Observer for Animations -----
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.section-header, .about-content > *, .sold-item, .service-card, .gallery-item').forEach(el => {
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        observer.observe(el);
    }
});

// ----- Gallery Item Hover Effect Enhancement -----
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach((item, index) => {
    item.style.setProperty('--i', index);
    
    item.addEventListener('mouseenter', () => {
        // Add subtle parallax effect
        item.addEventListener('mousemove', handleParallax);
    });
    
    item.addEventListener('mouseleave', () => {
        item.removeEventListener('mousemove', handleParallax);
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
});

function handleParallax(e) {
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    item.style.transform = `
        translateY(-10px) 
        scale(1.02) 
        rotateX(${deltaY * 5}deg) 
        rotateY(${deltaX * 5}deg)
    `;
}

// ----- Number Counter Animation -----
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElements = entry.target.querySelectorAll('.stat-inline-number');
            numberElements.forEach(el => {
                const text = el.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    el.textContent = '0';
                    animateCounter(el, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-inline');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ----- Lazy Loading for Images -----
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ----- Prevent Form Resubmission on Page Refresh -----
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ----- Add Active State to Navigation -----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ----- Console Message -----
console.log('%c🏡 Marci Metzger Real Estate', 'color: #C9A96E; font-size: 20px; font-weight: bold;');
console.log('%cWebsite designed with excellence in mind', 'color: #6B6B6B; font-size: 12px;');

// ----- Performance Monitoring -----
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    }
});