// ===== CONFIGURATION =====
const ALSAFSAF_CONFIG = {
    social: {
        facebook: "FACEBOOK_URL",           // ضع رابط صفحة Facebook هنا
        whatsappCommunity: "WHATSAPP_COMMUNITY_URL", // ضع رابط مجتمع WhatsApp هنا
        whatsappGroup: "WHATSAPP_GROUP_URL"         // ضع رابط مجموعة WhatsApp هنا
    },
    currency: "ر.س",
    emptyCartMessage: "السلة فارغة حالياً. تصفح منتجاتنا وأضف ما يعجبك!",
    whatsappNumber: "966500000000" // ضع رقم واتساب المشروع هنا بدون +
};

// ===== LOADER =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});
document.querySelectorAll('a, button, .service-card, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ===== FALLING LEAVES =====
const leavesContainer = document.getElementById('leavesContainer');
const leafColors = ['#124837', '#A8BFA9', '#E67E22', '#7A5A42'];
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    const size = Math.random() * 20 + 15;
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    leaf.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 50 50"><path d="M25 5 C35 15, 40 30, 25 45 C10 30, 15 15, 25 5" fill="${color}"/></svg>`;
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.animationDuration = Math.random() * 8 + 6 + 's';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    leavesContainer.appendChild(leaf);
    setTimeout(() => { leaf.remove(); }, 15000);
}
setInterval(createLeaf, 2000);
for (let i = 0; i < 8; i++) { setTimeout(createLeaf, i * 500); }

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        scrollTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        scrollTop.classList.remove('visible');
    }
});
scrollTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => { navLinks.classList.remove('active'); });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
let counterAnimated = false;
function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        updateCounter();
    });
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (!counterAnimated && entry.target.closest('.hero')) {
                counterAnimated = true;
                animateCounters();
            }
        }
    });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));
setTimeout(() => { counterAnimated = true; animateCounters(); }, 2000);

// ===== TESTIMONIALS SLIDER =====
const track = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(${index * 100}%)`;
    dots.forEach((dot, i) => { dot.classList.toggle('active', i === index); });
}
dots.forEach(dot => {
    dot.addEventListener('click', () => { goToSlide(+dot.getAttribute('data-index')); });
});
setInterval(() => {
    currentSlide = (currentSlide + 1) % 3;
    goToSlide(currentSlide);
}, 5000);

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) { heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`; }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.service-card, .product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== SHOPPING CART =====
const cart = [];
const cartToggle = document.getElementById('cartToggle');
const cartClose = document.getElementById('cartClose');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');

function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartCount.textContent = totalItems;
    cartTotal.textContent = `${totalPrice} ${ALSAFSAF_CONFIG.currency}`;
    
    cartItems.innerHTML = cart.length ? cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-info">
                <strong>${item.name} × ${item.quantity}</strong>
                <span>${item.price * item.quantity} ${ALSAFSAF_CONFIG.currency}</span>
            </div>
            <button class="cart-item-remove" data-index="${index}" aria-label="حذف ${item.name}">
                <i class="fas fa-trash"></i>
            </button>
        </div>`).join('') : `<div class="cart-empty"><i class="fas fa-basket-shopping"></i>${ALSAFSAF_CONFIG.emptyCartMessage}</div>`;
        
    cartItems.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', () => {
            cart.splice(+button.dataset.index, 1);
            renderCart();
        });
    });
}

function toggleCart(isOpen) {
    cartOverlay.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

cartToggle.addEventListener('click', () => toggleCart(true));
cartClose.addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', event => {
    if (event.target === cartOverlay) toggleCart(false);
});

document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const existing = cart.find(item => item.name === button.dataset.name);
        if (existing) existing.quantity += 1;
        else cart.push({ name: button.dataset.name, price: +button.dataset.price, icon: button.dataset.icon, quantity: 1 });
        renderCart();
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#124837';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-plus"></i>';
            button.style.background = '';
        }, 1500);
    });
});

// ===== CHECKOUT VIA WHATSAPP =====
document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (cart.length === 0) return;
    
    let message = "مرحباً مجمع الصفصاف، أرغب بطلب المنتجات التالية:%0A";
    let total = 0;
    
    cart.forEach(item => {
        message += `- ${item.name} (عدد: ${item.quantity}) - ${item.price * item.quantity} ${ALSAFSAF_CONFIG.currency}%0A`;
        total += item.price * item.quantity;
    });
    
    message += `%0Aالإجمالي: ${total} ${ALSAFSAF_CONFIG.currency}`;
    window.open(`https://wa.me/${ALSAFSAF_CONFIG.whatsappNumber}?text=${message}`, '_blank');
});

// ===== TYPING EFFECT FOR HERO BADGE =====
const badge = document.querySelector('.hero-badge');
if (badge) {
    badge.style.opacity = '0';
    setTimeout(() => {
        badge.style.opacity = '1';
        badge.style.transition = 'opacity 0.5s ease';
    }, 1000);
}
