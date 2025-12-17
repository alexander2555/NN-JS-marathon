// Динамика и интерактивность для hero-секции и блока навыков

document.addEventListener('DOMContentLoaded', function () {
  // Плавная прокрутка при клике на кнопку в hero
  const ctaButton = document.querySelector('.cta-button')

  if (ctaButton) {
    ctaButton.addEventListener('click', function (e) {
      const skillsSection = document.getElementById('skills')

      if (skillsSection) {
        e.preventDefault()
        skillsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    })
  }

  // Создание частиц на фоне
  createParticles()

  // Интерактивный элемент, следующий за курсором
  initCursorFollower()

  // Инициализация блока "Мои навыки"
  initSkillsSection()

  console.log('Страница загружена с динамическими эффектами и блоком навыков!')
})

// Функция создания частиц
function createParticles() {
  const particlesContainer = document.querySelector('.particles-container')
  if (!particlesContainer) return

  // Количество частиц (меньше на мобильных устройствах)
  const particleCount = window.innerWidth < 768 ? 15 : 30

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'

    // Случайная позиция по горизонтали
    particle.style.left = Math.random() * 100 + '%'

    // Случайная задержка анимации
    particle.style.animationDelay = Math.random() * 15 + 's'

    // Случайная длительность анимации
    const duration = 10 + Math.random() * 10
    particle.style.animationDuration = duration + 's'

    // Случайный размер
    const size = 2 + Math.random() * 4
    particle.style.width = size + 'px'
    particle.style.height = size + 'px'

    particlesContainer.appendChild(particle)
  }
}

// Функция инициализации интерактивного элемента, следующего за курсором
function initCursorFollower() {
  const cursorFollower = document.querySelector('.cursor-follower')
  const hero = document.querySelector('.hero')

  if (!cursorFollower || !hero) return

  let mouseX = 0
  let mouseY = 0
  let followerX = 0
  let followerY = 0

  // Отслеживание движения мыши
  hero.addEventListener('mousemove', function (e) {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  // Плавное следование за курсором
  function animateFollower() {
    // Интерполяция для плавного движения
    followerX += (mouseX - followerX) * 0.1
    followerY += (mouseY - followerY) * 0.1

    cursorFollower.style.left = followerX + 'px'
    cursorFollower.style.top = followerY + 'px'

    requestAnimationFrame(animateFollower)
  }

  // Инициализация позиции при загрузке
  hero.addEventListener('mouseenter', function () {
    animateFollower()
  })

  // Скрытие элемента при выходе курсора
  hero.addEventListener('mouseleave', function () {
    cursorFollower.style.opacity = '0'
  })

  hero.addEventListener('mouseenter', function () {
    cursorFollower.style.opacity = '1'
  })
}

// =======================
//  БЛОК "МОИ НАВЫКИ"
// =======================

const SKILLS_STORAGE_KEY = 'am_skills_cards_v1'

// Инициализация блока навыков
function initSkillsSection() {
  const skillsGrid = document.getElementById('skillsGrid')
  const addSkillBtn = document.querySelector('.skills-add-btn')

  if (!skillsGrid || !addSkillBtn) return

  // Загружаем навыки из localStorage или создаём базовые
  let skills = loadSkillsFromStorage()

  if (skills.length === 0) {
    skills = getDefaultSkills()
    saveSkillsToStorage(skills)
  }

  renderSkills(skillsGrid, skills)

  // Кнопка "Добавить навык"
  addSkillBtn.addEventListener('click', function () {
    const newSkill = promptNewSkill()
    if (!newSkill) return

    skills.push(newSkill)
    saveSkillsToStorage(skills)
    renderSkills(skillsGrid, skills)
  })
}

// Базовые навыки по умолчанию
function getDefaultSkills() {
  return [
    {
      title: 'JavaScript / TypeScript',
      description:
        'Пишу современный, читаемый код, использую ES6+, работаю с асинхронностью и типизацией.',
    },
    {
      title: 'React / Frontend',
      description:
        'Создаю компонентные интерфейсы, работаю с хуками, маршрутизацией и управлением состоянием.',
    },
    {
      title: 'Работа с API и AI-сервисами',
      description:
        'Интегрирую REST / GraphQL API, подключаю AI-сервисы и модели для реальных задач.',
    },
  ]
}

// Сохранение навыков в localStorage
function saveSkillsToStorage(skills) {
  try {
    localStorage.setItem(SKILLS_STORAGE_KEY, JSON.stringify(skills))
  } catch (e) {
    console.warn('Не удалось сохранить навыки в localStorage', e)
  }
}

// Загрузка навыков из localStorage
function loadSkillsFromStorage() {
  try {
    const raw = localStorage.getItem(SKILLS_STORAGE_KEY)
    if (!raw) return []

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (item) =>
        item &&
        typeof item.title === 'string' &&
        typeof item.description === 'string'
    )
  } catch (e) {
    console.warn('Не удалось загрузить навыки из localStorage', e)
    return []
  }
}

// Рендеринг всех карточек навыков
function renderSkills(container, skills) {
  container.innerHTML = ''

  skills.forEach(function (skill, index) {
    const card = document.createElement('article')
    card.className = 'skill-card'
    card.dataset.index = String(index)

    // Заголовок навыка
    const titleEl = document.createElement('h3')
    titleEl.className = 'skill-title'
    titleEl.textContent = skill.title

    // Индикатор раскрытия
    const indicator = document.createElement('span')
    indicator.className = 'skill-card-indicator'
    indicator.textContent = '›'

    // Описание навыка
    const descEl = document.createElement('p')
    descEl.className = 'skill-description'
    descEl.textContent = skill.description

    card.appendChild(titleEl)
    card.appendChild(indicator)
    card.appendChild(descEl)

    // Клик по карточке — разворачиваем/сворачиваем
    card.addEventListener('click', function () {
      card.classList.toggle('expanded')
    })

    container.appendChild(card)
  })
}

// Создание нового навыка через prompt()
function promptNewSkill() {
  const title = prompt('Введите название навыка:')
  if (!title || !title.trim()) {
    return null
  }

  const description = prompt(
    'Введите короткое описание навыка (1–2 предложения):'
  )

  if (!description || !description.trim()) {
    return null
  }

  return {
    title: title.trim(),
    description: description.trim(),
  }
}
