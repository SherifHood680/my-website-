// Loading screen
window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 500);
});

// Scroll progress bar
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// Simple smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-nav-active');
        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('mobile-nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-nav-active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Active link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Stats counter animation
function animateCounter(element, target) {
    let count = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(count) + '+';
        }
    }, 16);
}

// Initialize counters when about section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(document.getElementById('codingHours'), 100);
            animateCounter(document.getElementById('projectsCount'), 50);
            animateCounter(document.getElementById('technologiesCount'), 15);
            animateCounter(document.getElementById('interestsCount'), 7);
            observer.disconnect(); // Stop observing after first trigger
        }
    });
}, { threshold: 0.1 });

observer.observe(document.getElementById('about'));

// Project Modal
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');
const viewProjectLinks = document.querySelectorAll('.view-project');

viewProjectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectCard = this.closest('.project-card');
        const projectData = JSON.parse(projectCard.getAttribute('data-project'));
        
        document.getElementById('modalTitle').textContent = projectData.title;
        document.getElementById('modalDescription').textContent = projectData.description;
        
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = '';
        projectData.tech.forEach(tech => {
            const techSpan = document.createElement('span');
            techSpan.textContent = tech;
            techContainer.appendChild(techSpan);
        });
        
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // This is just for demo - replace with actual form action
        e.preventDefault();
        alert('Form submitted successfully! (In production, this would send to your email)');
        this.reset();
    });
}

// Add animation on scroll for project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    projectObserver.observe(el);
});