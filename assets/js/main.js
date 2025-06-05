// JavaScript functionality will be added here 
console.log("Hello from JavaScript"); 

// Select the name heading and change its color
const nameHeading = document.querySelector('.about-text h2');
nameHeading.style.color = "blue"; 

// Add click event listener to the test button
const toggleButton = document.querySelector('#Name');
const toggleHeading = document.querySelector('#toggleHeading');
let isOriginalText = true;

toggleButton.addEventListener("click", function() {
    if (isOriginalText) {
        toggleHeading.innerText = "FRONTEND DEVELOPER";
    } else {
        toggleHeading.innerText = "MITHUN DUTTA";
    }
    isOriginalText = !isOriginalText;
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