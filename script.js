// Динамика и интерактивность для hero-секции

document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка при клике на кнопку
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const skillsSection = document.getElementById('skills');
            
            if (skillsSection) {
                e.preventDefault();
                skillsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Создание частиц на фоне
    createParticles();
    
    // Интерактивный элемент, следующий за курсором
    initCursorFollower();
    
    console.log('Hero-секция загружена с динамическими эффектами!');
});

// Функция создания частиц
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Количество частиц (меньше на мобильных устройствах)
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайная позиция по горизонтали
        particle.style.left = Math.random() * 100 + '%';
        
        // Случайная задержка анимации
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Случайная длительность анимации
        const duration = 10 + Math.random() * 10;
        particle.style.animationDuration = duration + 's';
        
        // Случайный размер
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particlesContainer.appendChild(particle);
    }
}

// Функция инициализации интерактивного элемента, следующего за курсором
function initCursorFollower() {
    const cursorFollower = document.querySelector('.cursor-follower');
    const hero = document.querySelector('.hero');
    
    if (!cursorFollower || !hero) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Отслеживание движения мыши
    hero.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Плавное следование за курсором
    function animateFollower() {
        // Интерполяция для плавного движения
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    // Инициализация позиции при загрузке
    hero.addEventListener('mouseenter', function() {
        animateFollower();
    });
    
    // Скрытие элемента при выходе курсора
    hero.addEventListener('mouseleave', function() {
        cursorFollower.style.opacity = '0';
    });
    
    hero.addEventListener('mouseenter', function() {
        cursorFollower.style.opacity = '1';
    });
}

