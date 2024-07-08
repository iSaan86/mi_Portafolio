// Funciones para activar los enlaces del menú de navegacion al hacer scroll o click en ellos:

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section, main');

    // Función para establecer el enlace activo basado en el desplazamiento
    const setActiveLink = () => {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        if (index >= 0) {
            navLinks[index].classList.add('active');
        }
    };

    // Función para manejar el clic en los enlaces de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });

            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
        });

        link.addEventListener('mouseover', () => {
            link.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        });

        link.addEventListener('mouseout', () => {
            if (!link.classList.contains('active')) {
                link.style.color = 'white';
            }
        });
    });

    // Efecto de bienvenida en la home
    const introText = document.querySelector('.intro-text');
    if (introText) {
        introText.style.opacity = 0;
        setTimeout(() => {
            introText.style.transition = 'opacity 1s ease-in-out';
            introText.style.opacity = 1;
        }, 500);
    }

    // Configurar enlace activo al hacer scroll
    window.addEventListener('scroll', setActiveLink);

    // Inicializar el enlace activo
    setActiveLink();
});


// Funciones para los Slider de Proyectos:

document.addEventListener('DOMContentLoaded', function () {
    const slideshows = document.querySelectorAll('.slider');

    slideshows.forEach(slideshow => {
        const slides = slideshow.querySelectorAll('.slide');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }

        slideshow.querySelector('.next').addEventListener('click', function () {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        slideshow.querySelector('.prev').addEventListener('click', function () {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        slides.forEach(slide => {
            slide.addEventListener('click', function () {
                const modal = document.createElement('div');
                modal.classList.add('modal');
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <div class="modal-slider">
                            ${Array.from(slides).map(s => `<div class="modal-slide">${s.innerHTML}</div>`).join('')}
                        </div>
                        <button class="modal-prev">❮</button>
                        <button class="modal-next">❯</button>
                    </div>
                `;
                document.body.appendChild(modal);

                const modalSlides = modal.querySelectorAll('.modal-slide');
                modalSlides[currentSlide].classList.add('active');

                modal.querySelector('.close').addEventListener('click', function () {
                    modal.remove();
                });

                modal.querySelector('.modal-next').addEventListener('click', function () {
                    modalSlides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide + 1) % modalSlides.length;
                    modalSlides[currentSlide].classList.add('active');
                });

                modal.querySelector('.modal-prev').addEventListener('click', function () {
                    modalSlides[currentSlide].classList.remove('active');
                    currentSlide = (currentSlide - 1 + modalSlides.length) % modalSlides.length;
                    modalSlides[currentSlide].classList.add('active');
                });
            });
        });
    });
});
