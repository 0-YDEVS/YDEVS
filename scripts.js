document.addEventListener('DOMContentLoaded', () => {
    // Set "Accueil" as active on page load
    document.querySelector('nav ul li a[href="#home"]').classList.add('active');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Show back-to-top button when scrolling down
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        // Update active link based on scroll position
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    });

    // Back-to-top button smooth scroll to top
    backToTopButton.addEventListener('click', () => {
        backToTopButton.classList.add('bounce');
        setTimeout(() => backToTopButton.classList.remove('bounce'), 300);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

   // Menu toggle for mobile
   const menuToggle = document.querySelector('.menu-toggle');
   const menu = document.querySelector('.menu');

   // Toggle menu open/close on button click
   menuToggle.addEventListener('click', () => {
       menu.classList.toggle('open');
   });

   // Close the menu when clicking on any menu link
   document.querySelectorAll('.menu a').forEach(link => {
       link.addEventListener('click', () => {
           menu.classList.remove('open');
       });
   });

    // Add styles dynamically for smooth back-to-top button visibility
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .back-to-top.visible {
            opacity: 1;
            pointer-events: auto;
        }
        .back-to-top.bounce {
            animation: bounce 0.3s ease;
        }
        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.append(style);

    // Fade-in effect for sections
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Contact form submission - Redirect to WhatsApp
    const contactForm = document.querySelector('#contactForm');
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert('Veuillez remplir tous les champs.');
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        const whatsappMessage = `Hello,%0A%0AFull Name: ${encodeURIComponent(name)}%0AEmail Address: ${encodeURIComponent(email)}%0ADescription: ${encodeURIComponent(message)}%0A%0ARegards,`;
        const whatsappURL = `https://wa.me/+212629422435?text=${whatsappMessage}`;
        
        window.open(whatsappURL, "_blank");
    });

    // Hide loading screen when page is fully loaded
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading');
        loadingScreen.style.opacity = 0;
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500); // Adjust delay for fade-out effect
    });

    // Testimonials carousel
    const testimonials = document.querySelector('.testimonial-list');
    const testimonialsCount = document.querySelectorAll('.testimonial').length;
    let currentIndex = 0;

    document.querySelector('.nav-button.left').addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialsCount - 1;
        testimonials.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    document.querySelector('.nav-button.right').addEventListener('click', () => {
        currentIndex = (currentIndex < testimonialsCount - 1) ? currentIndex + 1 : 0;
        testimonials.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
});
