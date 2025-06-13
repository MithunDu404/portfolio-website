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

// Typewriter effect
const titles = [
    "Full Stack Developer",
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




// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit')
const successMessage = document.getElementById('successMessage');


contactForm.addEventListener('submit', async (e) => { 
    e.preventDefault(); 

    if (!validateForm()) return; 

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
     
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
 
    try {  
        // Send request to backend 
        const response = await fetch('http://localhost:5001/api/comment', { 
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(data) 
        }); 

        if (!response.ok) throw new Error('Submission failed');    
        
        showSuccess();
    } catch (error) { 
        console.error('Error:', error); 
        alert('Failed to send message. Please try again.'); 
    } finally { 
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false; 
    } 
});

function validateForm() {
    let valid = true;
    const fields = ['name', 'email', 'message'];

    fields.forEach(id => {
        const input = document.getElementById(id);
        const error = document.getElementById(id + '-error');
        const value = input.value.trim();

        input.classList.remove('input-error');
        error.classList.remove('visible');

        if (!value || (id === 'message' && value.length < 10)) {
            input.classList.add('input-error');
            error.classList.add('visible');
            error.textContent = id === 'message' ? 'Message must be at least 10 characters' : 'This field is required';
            valid = false;
        }

        if (id === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            input.classList.add('input-error');
            error.textContent = 'Please enter a valid email address';
            error.classList.add('visible');
            valid = false;
        }
    });

    return valid;
}


    function showSuccess() {
        successMessage.style.display = 'block';
        contactForm.reset();
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
        successMessage.scrollIntoView({ behavior: 'smooth' });
    }