// ========================================
// Partículas de Fondo
// ========================================
function createParticles() {
    const container = document.getElementById('particles-container');
    const particleCount = 50;
    const colors = ['#ff6b9d', '#9c27b0', '#ff9800', '#ffd700', '#4facfe'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (Math.random() * 6 + 3) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ========================================
// Confeti
// ========================================
function createConfetti() {
    const container = document.getElementById('confetti-container');
    const confettiCount = 100;
    const colors = ['#ff6b9d', '#9c27b0', '#ff9800', '#ffd700', '#4facfe', '#00f2fe', '#f5576c'];
    const shapes = ['square', 'circle'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.borderRadius = '2px';
        }
        
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        
        container.appendChild(confetti);
    }
    
    // Limpiar confeti después de la animación
    setTimeout(() => {
        container.innerHTML = '';
    }, 4000);
}

// ========================================
// Animaciones al hacer Scroll (AOS)
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
}

// ========================================
// Efecto Parallax en Hero
// ========================================
function initParallax() {
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('mousemove', (e) => {
        if (!hero) return;
        
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 0) return; // No aplicar si el hero no es visible
        
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        floatingElements.forEach((el, index) => {
            const speed = (index + 1) * 10;
            el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

// ========================================
// Botón de Celebración
// ========================================
function initCelebrateButton() {
    const btn = document.getElementById('celebrateBtn');
    
    if (btn) {
        btn.addEventListener('click', () => {
            // Crear confeti
            createConfetti();
            
            // Feedback visual
            btn.style.transform = 'scale(1.1)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
            
            // Efecto de vibración si está disponible
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            
            // Crear más confeti después de un momento
            setTimeout(createConfetti, 1000);
            setTimeout(createConfetti, 2000);
        });
    }
}

// ========================================
// Contador de Días (si aplica)
// ========================================
function updateCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;
    
    const birthday = new Date('2025-01-07T00:00:00');
    const now = new Date();
    const diff = birthday - now;
    
    if (diff <= 0) {
        countdownElement.innerHTML = '¡Hoy es el día! 🎉';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m`;
}

// ========================================
// Smooth Scroll para enlaces internos
// ========================================
function initSmoothScroll() {
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
}

// ========================================
// Efecto de Typing para el mensaje
// ========================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========================================
// Inicialización
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    // Crear partículas de fondo
    createParticles();
    
    // Iniciar confeti al cargar
    setTimeout(createConfetti, 500);
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
    
    // Inicializar parallax
    initParallax();
    
    // Inicializar botón de celebración
    initCelebrateButton();
    
    // Inicializar smooth scroll
    initSmoothScroll();
    
    // Actualizar countdown si existe
    updateCountdown();
    setInterval(updateCountdown, 60000);
    
    // Añadir clase de carga completada
    document.body.classList.add('loaded');
    
    console.log('🎂 ¡Feliz Cumpleaños! - Página cargada con éxito');
});

// ========================================
// Efecto de estrellas brillantes al click
// ========================================
document.addEventListener('click', (e) => {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        pointer-events: none;
        font-size: 2rem;
        z-index: 9999;
        animation: sparkle-fade 0.6s ease-out forwards;
        transform: translate(-50%, -50%);
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 600);
});

// Añadir estilos de animación para el sparkle
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-fade {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -100%) scale(1.5) rotate(180deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);
