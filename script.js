// ========================================
// Navigation & Smooth Scrolling
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
});

// Initialize navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Scroll to section
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const navLinksContainer = document.querySelector('.nav-links');
            navLinksContainer.style.display = 
                navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
        revealElementsOnScroll();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Reveal elements on scroll
function revealElementsOnScroll() {
    const elements = document.querySelectorAll('.project-card, .stat, .skill-category');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        if (elementTop < window.innerHeight && elementTop + elementHeight > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial opacity and transform for elements
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.project-card, .stat, .skill-category');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// ========================================
// Form Handling
// ========================================

function initializeFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(contactForm);
        });
    }
}

function handleFormSubmit(form) {
    const formData = new FormData(form);
    
    // Collect form data
    const data = {
        name: form.querySelector('input[placeholder="Your Name"]').value,
        email: form.querySelector('input[placeholder="Your Email"]').value,
        message: form.querySelector('textarea[placeholder="Your Message"]').value
    };

    // Validate form data
    if (!validateForm(data)) {
        showNotification('Please fill in all fields correctly', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        // Reset form
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Message sent successfully! Thanks for reaching out!', 'success');
    }, 1500);
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return (
        data.name.trim() !== '' &&
        emailRegex.test(data.email) &&
        data.message.trim() !== ''
    );
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// Utility Functions
// ========================================

// Smooth scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer && navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.display = 'none';
        }
    }
});

// Log portfolio loaded
console.log('%c Portfolio Loaded Successfully! 🚀', 'color: #3498db; font-size: 16px; font-weight: bold;');
