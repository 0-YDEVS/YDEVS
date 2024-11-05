document.addEventListener('DOMContentLoaded', () => {

    // Modal functionality for "Learn More" button
    const projectModal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const projectImage = document.getElementById('projectImage');
    const projectTitle = document.getElementById('projectTitle');
    const projectDescription = document.getElementById('projectDescription');
    const projectLink = document.getElementById('projectLink');

    // Project data
    const projects = [
        {
            title: "CarRental - Streamlined Vehicle Rental Solutions",
            image: "img/PRJ1.png",
            description: "CarRental is an innovative platform designed to simplify the vehicle rental process for both individuals and businesses. With an intuitive interface and advanced features, users can effortlessly browse, select, and reserve vehicles that suit their specific needs, whether for personal travel, corporate rentals, or long-term leases. The platform provides real-time availability, transparent pricing, and flexible options, ensuring a seamless rental experience from start to finish. CarRental’s commitment to quality service and user convenience makes it the go-to choice for reliable, efficient car rentals.",
            link: "https://0-ydevs.github.io/CarRental/"
        },
        {
            title: "Printing Solutions - Precision Printing for Professional Needs",
            image: "img/PRJ2.png",
            description: "Printing Solutions offers top-tier printing services tailored for professionals seeking high-quality, fast, and reliable solutions. From business cards and marketing materials to large-format prints and custom designs, our platform streamlines the ordering process with intuitive tools and customizable options. Dedicated to combining exceptional quality with speed, Printing Solutions empowers businesses and individuals to make a lasting impression with print materials crafted to meet the highest standards.",
            link: "https://0-ydevs.github.io/PRINTING-SOLUTIONS/"
        },
        {
            title: "Chocolate Delight - Exquisite Gourmet Chocolates Delivered to You",
            image: "img/PRJ3.png",
            description: "Chocolate Delight is a premier online platform dedicated to the art of fine chocolate. We specialize in offering a diverse selection of gourmet chocolates crafted by master chocolatiers using the finest ingredients. Our user-friendly website provides an immersive shopping experience, complete with detailed product descriptions, high-resolution images, and customer reviews. Whether you're seeking the perfect gift or a luxurious treat for yourself, Chocolate Delight ensures a seamless ordering process and prompt delivery. Indulge in the richness of premium chocolates and let us bring a touch of sweetness to your doorstep.",
            link: "https://0-ydevs.github.io/Chocolate-Delight/"
        }
    ];

    // Open modal on "Learn More" click
    document.querySelectorAll('.project .btn').forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const project = projects[index];
            projectImage.src = project.image;
            projectTitle.textContent = project.title;
            projectDescription.textContent = project.description;
            projectLink.href = project.link;
            projectModal.style.display = 'block';
        });
    });

    // Close modal on "x" click
    closeBtn.addEventListener('click', () => {
        projectModal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });
    

    // Set "Accueil" as active on page load
    document.querySelector('nav ul li a[href="#home"]').classList.add('active');

    // Smooth scrolling for anchor links (internal links only)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ensure href starts with '#' for internal links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
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

            if (navLink && scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else if (navLink) {
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

});
