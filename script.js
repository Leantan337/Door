// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
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

// Door selection functionality
document.querySelectorAll('.door-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const doorCard = this.closest('.door-card');
        const doorName = doorCard.querySelector('h4').textContent;
        const doorPrice = doorCard.querySelector('.door-price').textContent;
        
        // Add selection animation
        doorCard.style.transform = 'scale(0.95)';
        setTimeout(() => {
            doorCard.style.transform = 'scale(1)';
        }, 150);
        
        // Show selection feedback
        showSelectionModal(doorName, doorPrice);
    });
});

// Selection modal
function showSelectionModal(doorName, doorPrice) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 12px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #10b981;"></i>
        </div>
        <h3 style="margin-bottom: 1rem; color: #1e293b;">Door Selected!</h3>
        <p style="margin-bottom: 1rem; color: #64748b;">You've selected: <strong>${doorName}</strong></p>
        <p style="margin-bottom: 2rem; color: #2563eb; font-size: 1.2rem; font-weight: 600;">${doorPrice}</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="btn btn-secondary" onclick="closeModal()" style="background: #64748b; color: white; border: none;">Continue Shopping</button>
            <button class="btn btn-primary" onclick="proceedToPayment('${doorName}', '${doorPrice}')">Proceed to Payment</button>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate modal in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// Close modal function
function closeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.opacity = '0';
        modalOverlay.querySelector('div').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modalOverlay.remove();
        }, 300);
    }
}

// Proceed to payment function
function proceedToPayment(doorName, doorPrice) {
    closeModal();
    
    // Scroll to payment section
    const paymentSection = document.querySelector('.payment-section');
    paymentSection.scrollIntoView({ behavior: 'smooth' });
    
    // Highlight payment section
    paymentSection.style.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)';
    setTimeout(() => {
        paymentSection.style.background = 'linear-gradient(135deg, #1e293b 0%, #334155 100%)';
    }, 2000);
    
    // Show payment info
    showPaymentInfo(doorName, doorPrice);
}

// Show payment information
function showPaymentInfo(doorName, doorPrice) {
    const paymentCard = document.querySelector('.payment-card');
    const originalContent = paymentCard.innerHTML;
    
    paymentCard.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <i class="fas fa-shopping-cart" style="font-size: 2rem; color: #10b981;"></i>
        </div>
        <h3>Order Summary</h3>
        <div style="background: rgba(255, 255, 255, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            <p style="margin-bottom: 0.5rem;"><strong>Item:</strong> ${doorName}</p>
            <p style="font-size: 1.2rem; font-weight: 600;"><strong>Total:</strong> ${doorPrice}</p>
        </div>
        <p style="margin-bottom: 2rem; opacity: 0.9;">Pay securely with Chap payment system</p>
        <button class="btn btn-primary" onclick="initiateChapPayment('${doorName}', '${doorPrice}')" style="margin-bottom: 1rem;">Pay with Chap</button>
        <button class="btn btn-secondary" onclick="restorePaymentCard()" style="background: transparent; color: white; border: 1px solid white;">Back to Options</button>
    `;
}

// Restore payment card
function restorePaymentCard() {
    const paymentCard = document.querySelector('.payment-card');
    paymentCard.innerHTML = `
        <div class="payment-icon">
            <i class="fas fa-shield-alt"></i>
        </div>
        <h3>Chap Payment</h3>
        <p>Secure, fast, and reliable payment processing</p>
        <ul class="payment-features">
            <li><i class="fas fa-check"></i> Instant payment confirmation</li>
            <li><i class="fas fa-check"></i> Local currency support</li>
            <li><i class="fas fa-check"></i> 24/7 customer support</li>
            <li><i class="fas fa-check"></i> Mobile-friendly interface</li>
        </ul>
        <button class="btn btn-primary">Proceed to Payment</button>
    `;
}

// Initiate Chap payment (placeholder)
function initiateChapPayment(doorName, doorPrice) {
    // This would integrate with the actual Chap payment system
    alert(`Redirecting to Chap payment for ${doorName} - ${doorPrice}\n\nIn a real implementation, this would redirect to the Chap payment gateway.`);
}

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Show success message
    showSuccessMessage('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    this.reset();
});

// Success message function
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    successDiv.innerHTML = `
        <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
        ${message}
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        successDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}

// Scroll animations
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

// Observe elements for scroll animations
document.querySelectorAll('.door-category, .feature-card, .about-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('btn-primary') && !this.onclick) {
            const originalText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const doorShowcase = document.querySelector('.door-showcase');
    
    if (hero && doorShowcase) {
        const rate = scrolled * -0.5;
        doorShowcase.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to door cards
document.querySelectorAll('.door-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Gallery functionality
function toggleCategory(categoryName) {
    const content = document.getElementById(`${categoryName}-content`);
    const icon = document.getElementById(`${categoryName}-icon`);
    
    if (content.classList.contains('expanded')) {
        content.classList.remove('expanded');
        icon.classList.remove('rotated');
    } else {
        content.classList.add('expanded');
        icon.classList.add('rotated');
    }
}

// Door modal functionality
function openDoorModal(doorName, doorPrice, doorImage) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'door-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 16px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        position: relative;
    `;
    
    modalContent.innerHTML = `
        <div style="position: relative;">
            <img src="${doorImage}" alt="${doorName}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 16px 16px 0 0;">
            <button onclick="closeDoorModal()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 1.2rem;">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div style="padding: 2rem;">
            <h2 style="margin-bottom: 1rem; color: #1e293b;">${doorName}</h2>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <div>
                    <p style="color: #64748b; margin-bottom: 0.5rem;">Premium Imported Door</p>
                    <p style="font-size: 2rem; font-weight: 700; color: #2563eb;">${doorPrice}</p>
                </div>
                <div style="text-align: right;">
                    <p style="color: #10b981; font-weight: 600; margin-bottom: 0.5rem;">✓ In Stock</p>
                    <p style="color: #64748b; font-size: 0.9rem;">Ready for Import</p>
                </div>
            </div>
            
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                <h4 style="margin-bottom: 1rem; color: #1e293b;">Features:</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #64748b;">
                        <i class="fas fa-check" style="color: #10b981;"></i> Premium Quality Materials
                    </li>
                    <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #64748b;">
                        <i class="fas fa-check" style="color: #10b981;"></i> International Import
                    </li>
                    <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #64748b;">
                        <i class="fas fa-check" style="color: #10b981;"></i> Custom Sizing Available
                    </li>
                    <li style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; color: #64748b;">
                        <i class="fas fa-check" style="color: #10b981;"></i> Professional Installation
                    </li>
                </ul>
            </div>
            
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-primary" onclick="selectDoor('${doorName}', '${doorPrice}')" style="flex: 1;">
                    <i class="fas fa-shopping-cart" style="margin-right: 0.5rem;"></i>
                    Select This Door
                </button>
                <button class="btn btn-secondary" onclick="closeDoorModal()" style="background: #64748b; color: white; border: none;">
                    Close
                </button>
            </div>
        </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate modal in
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeDoorModal();
        }
    });
}

// Close door modal
function closeDoorModal() {
    const modalOverlay = document.querySelector('.door-modal-overlay');
    if (modalOverlay) {
        modalOverlay.style.opacity = '0';
        modalOverlay.querySelector('div').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modalOverlay.remove();
        }, 300);
    }
}

// Select door function
function selectDoor(doorName, doorPrice) {
    closeDoorModal();
    showSelectionModal(doorName, doorPrice);
}

// Image Slider Functionality
let currentSlideIndex = 0;
const totalSlides = 4;
let slideInterval;

function initSlider() {
    updateSlider();
    startAutoSlide();
    
    // Pause auto-slide on hover
    const slider = document.querySelector('.image-slider');
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateSlider();
}

function currentSlide(slideNumber) {
    currentSlideIndex = slideNumber - 1;
    updateSlider();
}

function updateSlider() {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const currentSlideElement = document.getElementById('current-slide');
    
    // Update track position
    track.style.transform = `translateX(-${currentSlideIndex * 25}%)`;
    
    // Update active slide
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlideIndex);
    });
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlideIndex);
    });
    
    // Update counter
    if (currentSlideElement) {
        currentSlideElement.textContent = currentSlideIndex + 1;
    }
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Touch/Swipe support for mobile
let startX = 0;
let endX = 0;
let startY = 0;
let endY = 0;

function initTouchSupport() {
    const slider = document.querySelector('.slider-container');
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    // Add touch support for gallery items
    const galleryItems = document.querySelectorAll('.gallery-door-item');
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', (e) => {
            item.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        item.addEventListener('touchend', (e) => {
            item.style.transform = 'scale(1)';
        }, { passive: true });
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Only handle horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Prevent zoom on double tap for buttons
    const buttons = document.querySelectorAll('.btn, .slider-btn, .indicator');
    buttons.forEach(button => {
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
        });
    });
    
    // Improve touch targets
    const touchTargets = document.querySelectorAll('.gallery-door-item, .door-card, .category-header');
    touchTargets.forEach(target => {
        target.style.minHeight = '44px'; // Minimum touch target size
    });
    
    // Add haptic feedback simulation for mobile
    if ('vibrate' in navigator) {
        const interactiveElements = document.querySelectorAll('.btn, .slider-btn, .indicator, .gallery-door-item');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                navigator.vibrate(10); // Short vibration
            });
        });
    }
}

// Keyboard navigation
function initKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        }
    });
}

// Countdown Timer
function initCountdownTimer() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement) return;
    
    // Set target date (15 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15);
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Timer expired, reset to 15 days
            targetDate.setDate(targetDate.getDate() + 15);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Contact Modal Functions
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Scroll to Gallery Function
function scrollToGallery() {
    const gallerySection = document.getElementById('gallery');
    gallerySection.scrollIntoView({ behavior: 'smooth' });
}

// Quote Form Handling
function initQuoteForm() {
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            showSuccessMessage('Thank you! We\'ll contact you within 24 hours with your free quote.');
            
            // Close modal
            closeContactModal();
            
            // Reset form
            this.reset();
        });
    }
}

// Stock Scarcity Simulation
function initStockScarcity() {
    const stockIndicators = document.querySelectorAll('.stock-indicator');
    
    stockIndicators.forEach((indicator, index) => {
        // Random stock numbers between 1-5
        const stockCount = Math.floor(Math.random() * 5) + 1;
        const stockText = indicator.querySelector('span');
        
        if (stockText) {
            stockText.textContent = `Only ${stockCount} left!`;
        }
        
        // Randomly update stock every 30 seconds
        setInterval(() => {
            const currentStock = parseInt(stockText.textContent.match(/\d+/)[0]);
            if (currentStock > 1 && Math.random() < 0.3) { // 30% chance to decrease
                const newStock = currentStock - 1;
                stockText.textContent = `Only ${newStock} left!`;
                
                // Add urgency animation
                indicator.style.animation = 'pulse 0.5s ease 3';
            }
        }, 30000);
    });
}

// Social Proof Animation
function initSocialProof() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Trust Indicators Animation
function initTrustIndicators() {
    const trustItems = document.querySelectorAll('.trust-item');
    
    trustItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, (index * 100) + 1000);
    });
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeContactModal();
    }
});

// Initialize animations on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateX(-50px)';
    heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateX(0)';
    }, 300);
    
    // Initialize all features
    initSlider();
    initTouchSupport();
    initKeyboardSupport();
    initMobileOptimizations();
    initCountdownTimer();
    initQuoteForm();
    initStockScarcity();
    initSocialProof();
    initTrustIndicators();
});
