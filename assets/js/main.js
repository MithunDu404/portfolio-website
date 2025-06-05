// JavaScript functionality will be added here 
console.log("Hello from JavaScript"); 

// Select the name heading and change its color
const nameHeading = document.querySelector('.about-text h2');
nameHeading.style.color = "blue"; 

// Add click event listener to the test button
const testButton = document.querySelector('#testButton');
testButton.addEventListener("click", function() {
    alert("Button clicked!");
}); 