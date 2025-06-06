// Loading Screen functionality
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after animation completes
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000); // Show loading screen for at least 1 second
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

// Check for saved theme preference, otherwise use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.dataset.theme = savedTheme;
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.dataset.theme = 'light';
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const newTheme = root.dataset.theme === 'light' ? '' : 'light';
    root.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
});

// Live Clock functionality
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    document.getElementById('clock').textContent = timeString;
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// Highlight active navigation section on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active-nav');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', updateActiveNavLink);

// Call once on page load to set initial active state
updateActiveNavLink();

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scroll-to-top');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 800) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    // Reset any existing error styles
    [name, email, message].forEach(field => {
        field.classList.remove('error-field');
        const errorSpan = document.getElementById(`${field.id}-error`);
        errorSpan.textContent = '';
        errorSpan.classList.remove('visible');
    });

    // Validate fields
    let isValid = true;
    
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }
    
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }

    if (isValid) {
        // If form is valid, you can submit it here
        alert('Form submitted successfully!');
        contactForm.reset();
        
        // Clear any remaining error states
        [name, email, message].forEach(field => {
            field.classList.remove('error-field');
            const errorSpan = document.getElementById(`${field.id}-error`);
            errorSpan.textContent = '';
            errorSpan.classList.remove('visible');
        });
    }
});

function showError(field, message) {
    field.classList.add('error-field');
    const errorSpan = document.getElementById(`${field.id}-error`);
    errorSpan.textContent = message;
    errorSpan.classList.add('visible');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Typewriter effect
const titles = [
    "Frontend Developer",
    "DSA Enthusiast",
    "Competitive Programmer"
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterElement = document.getElementById('typewriter');

function typeWriter() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        // Removing characters
        typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Adding characters
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }

    // Typing speed variables
    let typeSpeed = 100;

    if (isDeleting) {
        typeSpeed /= 2; // Faster when deleting
    }

    // Check if word is complete
    if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length; // Move to next word
        typeSpeed = 500; // Pause before starting new word
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start the typewriter effect
typeWriter(); 