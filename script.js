// Простая анимация при загрузке страницы
// Все анимации уже настроены через CSS, но здесь можно добавить дополнительную логику

document.addEventListener('DOMContentLoaded', function() {
    // Можно добавить плавную прокрутку при клике на кнопку
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Если есть секция с id="skills", плавно прокручиваем к ней
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
    
    // Можно добавить дополнительные эффекты при загрузке
    console.log('Hero-секция загружена!');
});

