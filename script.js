// Toggle Navigation Menu for Mobile
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Availability Form Submission
const availabilityForm = document.getElementById('availability-form');
const resultDiv = document.getElementById('result');

availabilityForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pickup = document.getElementById('pickup').value;
  const drop = document.getElementById('drop').value;

  // Simulate availability check
  if (pickup && drop) {
    resultDiv.textContent = `Service is available from ${pickup} to ${drop}.`;
  } else {
    resultDiv.textContent = 'Please enter both locations.';
  }
});