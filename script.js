// translation setup
const translations = {
    es: {
        "page-title": "Portafolio de Julián",
        "greeting": "Hola, soy Julián",
        "description": "Estudiante de Ingeniería en Sistemas con sólida formación en programación. Interés en desarrollo de software y análisis de datos. Rápido aprendizaje, orientación a resultados y motivación por aportar en proyectos de innovación tecnológica.",
        "project1-title": "CRUD de usuarios con PHP y MySQL. Responsive y con panel administrativo.",
        "project1-desc": "Proyecto Backend en Node.js + Express",
        "project2-title": "Recetario utilizando HTML, CSS, JavaScript y frameworks",
        "project2-desc": "Proyecto Frontend + Rest API",
        "project3-title": "Supermarket Demo con React, Bootstrap y API externa",
        "project3-desc": "Aplicación Fullstack con Frontend y Backend simulando un comercio virtual",
        "project4-title": "Gestor de tareas tipo TO DO LIST en Python ejecutado como CLI",
        "project4-desc": "Gestor de tareas simple hecho en Python",
        "view-project": "Ver proyecto",
        "view-code": "Ver código",
        "footer-text": "© 2025 - Julito"
    },
    en: {
        "page-title": "Julián's Portfolio",
        "greeting": "Hello, I'm Julián",
        "description": "Systems Engineering student with strong programming background. Interested in software development and data analysis. Fast learner, results-oriented and motivated to contribute to technological innovation projects.",
        "project1-title": "User CRUD with PHP and MySQL. Responsive with admin panel.",
        "project1-desc": "Backend Project with Node.js + Express",
        "project2-title": "Recipe Book using HTML, CSS, JavaScript and frameworks",
        "project2-desc": "Frontend + REST API Project",
        "project3-title": "Supermarket Demo with React, Bootstrap and external API",
        "project3-desc": "Fullstack Application with Frontend and Backend simulating e-commerce",
        "project4-title": "TO DO LIST Task Manager in Python running as CLI",
        "project4-desc": "Simple task manager built with Python",
        "view-project": "View project",
        "view-code": "View code",
        "footer-text": "© 2025 - Julito"
    }
};

let currentLanguage = 'es';

function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // updating every text (including carousel ones)
    updateAllTexts(lang);
    
    // updating current project cards
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
}

function updateAllTexts(lang) {
    // updating every single element
    Object.keys(translations[lang]).forEach(id => {
        const elements = document.querySelectorAll(`[id="${id}"]`);
        elements.forEach(element => {
            if (element.id === id) {
                element.textContent = translations[lang][id];
            }
        });
    });
    
    // updating project buttons
    const viewProjectButtons = document.querySelectorAll('[id^="view-project"], .card-buttons a:first-child');
    const viewCodeButtons = document.querySelectorAll('[id^="view-code"], .card-buttons a:last-child');
    
    viewProjectButtons.forEach(btn => {
        if (btn.textContent.includes('Ver proyecto') || btn.textContent.includes('View project')) {
            btn.textContent = translations[lang]['view-project'];
        }
    });
    
    viewCodeButtons.forEach(btn => {
        if (btn.textContent.includes('Ver código') || btn.textContent.includes('View code')) {
            btn.textContent = translations[lang]['view-code'];
        }
    });
}

// initializing the translation system
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('lang-es').addEventListener('click', () => changeLanguage('es'));
    document.getElementById('lang-en').addEventListener('click', () => changeLanguage('en'));
    
    changeLanguage('es');

    // carousel setup
    const track = document.querySelector(".carousel-track");
    const btnLeft = document.querySelector(".carousel-btn.left");
    const btnRight = document.querySelector(".carousel-btn.right");

    let cards = Array.from(track.children);
    const originalCardsCount = cards.length;

    const clonesBefore = cards.map(card => card.cloneNode(true));
    const clonesAfter = cards.map(card => card.cloneNode(true));
    
    clonesBefore.forEach(clone => track.appendChild(clone));
    clonesAfter.forEach(clone => track.insertBefore(clone, track.firstChild));

    cards = Array.from(track.children);
    
    let currentIndex = originalCardsCount; 
    let cardWidth = cards[0].getBoundingClientRect().width + 20; 
    
    updateCarousel();

    function updateCarousel() {
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function moveToNext() {
        currentIndex++;
        updateCarousel();
    }

    function moveToPrev() {
        currentIndex--;
        updateCarousel();
    }

    btnRight.addEventListener("click", moveToNext);
    btnLeft.addEventListener("click", moveToPrev);

    track.addEventListener("transitionend", () => {
        if (currentIndex >= originalCardsCount * 2) {
            track.style.transition = "none";
            currentIndex = originalCardsCount;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        if (currentIndex < originalCardsCount) {
            track.style.transition = "none";
            currentIndex = originalCardsCount * 2 - 1;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    });

    window.addEventListener("resize", () => {
        cardWidth = cards[0].getBoundingClientRect().width + 20;
        track.style.transition = "none";
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        void track.offsetWidth;
    });
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        track.style.transition = "none";
    });

    track.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        track.style.transform = `translateX(calc(-${currentIndex * cardWidth}px - ${diff}px))`;
    });

    track.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diff = startX - currentX;
        const threshold = 50; 
        
        if (diff > threshold) {
            moveToNext();
        } else if (diff < -threshold) {
            moveToPrev();
        } else {
            updateCarousel();
        }
    });
});
