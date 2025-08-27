// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Button click handlers
document.addEventListener('DOMContentLoaded', () => {
    // Join Now buttons
    document.querySelectorAll('.btn-primary, .btn-plan').forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.textContent.includes('Join') || btn.textContent.includes('Choose')) {
                e.preventDefault();
                showNotification('🎉 Welcome to CityStarGym! Redirecting to membership...', 'success');
                setTimeout(() => {
                    window.location.href = btn.getAttribute('href') || 'pages/membership.html';
                }, 1500);
            }
        });
    });
    
    // Learn More / About buttons
    document.querySelectorAll('a[href*="about"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('📖 Loading about information...', 'info');
            setTimeout(() => {
                window.location.href = btn.getAttribute('href');
            }, 1000);
        });
    });
    
    // Meet Trainers buttons
    document.querySelectorAll('a[href*="trainers"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('💪 Meet our expert trainers...', 'info');
            setTimeout(() => {
                window.location.href = btn.getAttribute('href');
            }, 1000);
        });
    });
    
    // View Gallery buttons
    document.querySelectorAll('a[href*="gallery"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('🏋️ Loading gym gallery...', 'info');
            setTimeout(() => {
                window.location.href = btn.getAttribute('href');
            }, 1000);
        });
    });
    
    // Services buttons
    document.querySelectorAll('a[href*="services"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('⚡ Exploring our services...', 'info');
            setTimeout(() => {
                window.location.href = btn.getAttribute('href');
            }, 1000);
        });
    });
    
    // Contact buttons
    document.querySelectorAll('a[href*="contact"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('📞 Opening contact form...', 'info');
            setTimeout(() => {
                window.location.href = btn.getAttribute('href');
            }, 1000);
        });
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <div class="notification-progress"></div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Add click effects to all buttons
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary, .btn-plan').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });
    
    // Service card interactions
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.05)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
            showNotification('🔥 Service selected! Contact us for more details.', 'info');
        });
    });
    
    // Feature card interactions
    document.querySelectorAll('.feature').forEach(feature => {
        feature.addEventListener('click', () => {
            feature.style.transform = 'scale(1.1) rotate(5deg)';
            setTimeout(() => {
                feature.style.transform = '';
            }, 300);
        });
    });
    
    // Instagram link interactions
    document.querySelectorAll('.instagram-link, .nav-instagram').forEach(link => {
        link.addEventListener('click', (e) => {
            showNotification('📱 Opening Instagram...', 'info');
            // Let the default behavior continue (opening the link)
        });
    });
    
    // Plan card interactions
    document.querySelectorAll('.plan').forEach(plan => {
        plan.addEventListener('mouseenter', () => {
            plan.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        plan.addEventListener('mouseleave', () => {
            plan.style.transform = plan.classList.contains('featured') ? 'scale(1.05)' : '';
        });
    });
    
    // Trainer and Manager card interactions
    document.querySelectorAll('.trainer-card, .manager-card').forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('h3').textContent;
            showNotification(`💪 Learn more about ${name}!`, 'info');
            createParticleExplosion(card);
        });
    });
    
    // Initialize advanced features
    initDynamicCounters();
    initSoundEffects();
    initFloatingElements();
});

// Particle explosion effect
function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #00ffff;
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (i / 15) * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}



// Dynamic counters
function initDynamicCounters() {
    const counters = document.querySelectorAll('.stat h3, .achievement h4');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.textContent) || 500;
                animateCounter(entry.target, target);
                entry.target.dataset.animated = 'true';
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
    }, 20);
}



// Sound effects
function initSoundEffects() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playTone(frequency, duration) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', () => playTone(800, 0.2));
    });
    
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', () => playTone(600, 0.15));
    });
}

// Floating elements
function initFloatingElements() {
    const floatingElements = ['💪', '🏋️', '⚡', '🔥', '💯'];
    
    setInterval(() => {
        if (Math.random() < 0.3) {
            createFloatingElement(floatingElements[Math.floor(Math.random() * floatingElements.length)]);
        }
    }, 3000);
}

function createFloatingElement(emoji) {
    const element = document.createElement('div');
    element.textContent = emoji;
    element.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 50}px;
    `;
    
    document.body.appendChild(element);
    
    element.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 8000,
        easing: 'linear'
    }).onfinish = () => element.remove();
}

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!name || !email || !phone || !message) {
            showNotification('❌ Please fill in all fields', 'error');
            return;
        }
        
        showNotification(`✅ Thank you ${name}! We'll contact you soon.`, 'success');
        contactForm.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.animate-card, .service-card, .plan, .stat, .trainer-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Add staggered animation delay
document.querySelectorAll('.trainers-grid .trainer-card, .gallery-grid .gallery-item').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// Parallax effect for hero sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero, .trainers-hero, .gallery-hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add active class to current section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation link, animations, and notifications
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #00ffff !important;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    }
    
    .nav-brand a {
        color: inherit;
        text-decoration: none;
    }
    
    .animate-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(15px);
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border-left: 4px solid #00ffff;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: all 0.3s ease;
        z-index: 10000;
        min-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left-color: #00ff88;
    }
    
    .notification.error {
        border-left-color: #ff4444;
    }
    
    .notification.info {
        border-left-color: #00ffff;
    }
    
    .notification-content {
        position: relative;
    }
    
    .notification-progress {
        position: absolute;
        bottom: -8px;
        left: -1.5rem;
        right: -1.5rem;
        height: 3px;
        background: rgba(0, 255, 255, 0.3);
        border-radius: 0 0 10px 10px;
    }
    
    .notification-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: #00ffff;
        border-radius: inherit;
        animation: progress 2s linear;
    }
    
    @keyframes progress {
        from { width: 100%; }
        to { width: 0%; }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary:active, .btn-secondary:active, .btn-plan:active {
        transform: scale(0.95);
    }
    
    .service-card {
        cursor: pointer;
        user-select: none;
    }
    
    .feature {
        cursor: pointer;
        user-select: none;
    }
    
    .service-card:hover {
        cursor: pointer;
    }
    
    .trainer-card, .manager-card {
        cursor: pointer;
        user-select: none;
    }
    
    .interactive-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 255, 0.05) 0%, transparent 50%);
        transition: all 0.3s ease;
    }
    
    .service-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent);
        transform: rotate(45deg);
        transition: all 0.5s ease;
        opacity: 0;
    }
    
    .service-card:hover::before {
        animation: rotate 1s linear;
        opacity: 1;
    }
    
    .trainer-card::after {
        content: '💪';
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.5rem;
        opacity: 0;
        transition: all 0.3s ease;
        transform: scale(0);
    }
    
    .trainer-card:hover::after {
        opacity: 1;
        transform: scale(1);
        animation: bounce 0.6s ease;
    }
    
    .gallery-item::before {
        content: '📸';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 2;
    }
    
    .gallery-item:hover::before {
        opacity: 1;
        animation: bounce 0.6s ease;
    }
    
    .contact-form input:focus,
    .contact-form textarea:focus {
        transform: scale(1.02);
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    }
    
    .info-item {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .info-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 255, 255, 0.1);
    }
    
    .plan {
        transition: all 0.3s ease;
    }
    

`;
document.head.appendChild(style);