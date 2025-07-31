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
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    // Add background blur when scrolling
    if (scrollTop > 50) {
        header.style.background = 'rgba(13, 20, 33, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'rgba(13, 20, 33, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollTop = scrollTop;
});

// Bitcoin price simulation with realistic fluctuations
let currentPrice = 67890.42;
let priceDirection = 1;
let priceChange = 2.34;

function updatePrice() {
    const priceElement = document.getElementById('btc-price');
    const priceChangeElement = document.getElementById('price-change');
    
    if (!priceElement || !priceChangeElement) return;
    
    // Simulate realistic price movements
    const randomChange = (Math.random() - 0.5) * 100; // -50 to +50
    const volatility = 0.001; // 0.1% volatility
    
    currentPrice += randomChange;
    currentPrice = Math.max(50000, Math.min(80000, currentPrice)); // Keep within realistic range
    
    // Calculate percentage change
    const basePrice = 67890.42;
    priceChange = ((currentPrice - basePrice) / basePrice) * 100;
    
    // Update display
    const [wholePart, decimalPart] = currentPrice.toFixed(2).split('.');
    priceElement.textContent = parseInt(wholePart).toLocaleString();
    
    // Update price change
    const changeSign = priceChange >= 0 ? '+' : '';
    priceChangeElement.textContent = `${changeSign}${priceChange.toFixed(2)}%`;
    priceChangeElement.className = priceChange >= 0 ? 'positive' : 'negative';
    
    // Add subtle animation
    priceElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
        priceElement.style.transform = 'scale(1)';
    }, 200);
}

// Update price every 3 seconds
setInterval(updatePrice, 3000);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animation for feature cards
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.animationDelay = `${Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.2}s`;
                entry.target.classList.add('fade-in-up');
            }
            
            // Special animation for stats
            if (entry.target.classList.contains('stat')) {
                animateCounter(entry.target.querySelector('.stat-value'));
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .stat, .about-text, .price-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element) {
    if (!element || element.dataset.animated) return;
    
    const finalValue = element.textContent;
    const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
    const suffix = finalValue.replace(/[\d.,]/g, '');
    
    if (isNaN(numericValue)) return;
    
    element.dataset.animated = 'true';
    let currentValue = 0;
    const increment = numericValue / 60; // 60 frames for 1 second at 60fps
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        if (numericValue >= 1000000) {
            element.textContent = (currentValue / 1000000).toFixed(1) + 'M' + suffix;
        } else if (numericValue >= 1000) {
            element.textContent = (currentValue / 1000).toFixed(1) + 'K' + suffix;
        } else {
            element.textContent = Math.floor(currentValue) + suffix;
        }
    }, 16); // ~60fps
}

// Particle animation for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #f7931a;
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            z-index: -1;
        `;
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation
        const duration = 3 + Math.random() * 4; // 3-7 seconds
        const delay = Math.random() * 2; // 0-2 seconds delay
        
        particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
        
        hero.appendChild(particle);
    }
}

// CSS for particle animation
const particleCSS = `
    @keyframes floatParticle {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
        }
        33% { 
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.6;
        }
        66% { 
            transform: translateY(-10px) translateX(-15px) scale(0.8);
            opacity: 0.4;
        }
    }
`;

// Add particle CSS
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize particles after DOM loads
document.addEventListener('DOMContentLoaded', createParticles);

// Button click effects
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
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
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Ripple animation CSS
const rippleCSS = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

style.textContent += rippleCSS;

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Mouse parallax effect for floating coins
document.addEventListener('mousemove', (e) => {
    const coins = document.querySelectorAll('.floating-coins .coin');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    coins.forEach((coin, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        coin.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Dark/Light theme toggle (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
});

// Form validation for newsletter signup (if added)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy loading for images (if any are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Additional scroll-based functionality can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Console welcome message
console.log(`
🚀 Welcome to BitcoinHub!
₿ Building the future of finance
💎 HODL strong!

Interested in the code? Check out our GitHub!
`);

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 BitcoinHub initialized successfully!');
    
    // Initialize lazy loading if needed
    lazyLoadImages();
    
    // Add any additional initialization here
});