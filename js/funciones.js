
// Funciones para activar los enlaces del menú de navegacion al hacer scroll o click en ellos:
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');

    function updateActiveLink() {
        let fromTop = window.scrollY;

        navLinks.forEach(link => {
            let section = document.querySelector(link.hash);

            if (
                section.offsetTop <= fromTop + 50 && // Ajuste para cuando se hace clic y se desplaza
                section.offsetTop + section.offsetHeight > fromTop + 50
            ) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Añade el comportamiento de scroll para actualizar el enlace activo
    window.addEventListener('scroll', updateActiveLink);

    // Añade el comportamiento de clic para el desplazamiento suave
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50, // Ajuste de 50px para la altura del header
                behavior: 'smooth'
            });

            // Quita la clase activa de todos los enlaces
            navLinks.forEach(link => link.classList.remove('active'));

            // Añade la clase activa al enlace clicado
            link.classList.add('active');
        });
    });

    // Llama a updateActiveLink al cargar la página para establecer el enlace activo correcto
    updateActiveLink();

    // Efecto de bienvenida en la home
    const introText = document.querySelector('main');
    if (introText) {
        introText.style.opacity = 0;
        window.requestAnimationFrame(() => {
            introText.style.transition = 'opacity 1s ease-in-out';
            introText.style.opacity = 1;
        });
    }

    // Activar sombra del header al hacer scroll
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 1) {
            header.classList.add('header-shadow');
        } else {
            header.classList.remove('header-shadow');
        }
    });
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

