// Responsive Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navLinks.classList.toggle('open');
});

// Close nav menu when a link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if(window.innerWidth <= 768) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});

// Booking Form Validation
const bookingForm = document.getElementById('bookingForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const destInput = document.getElementById('destination');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const destError = document.getElementById('destinationError');
const formSuccess = document.getElementById('formSuccess');

function validateEmail(email) {
  return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
}

bookingForm.addEventListener('submit', function(e) {
  let valid = true;
  nameError.textContent = '';
  emailError.textContent = '';
  destError.textContent = '';
  formSuccess.textContent = '';

  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Full name is required.';
    valid = false;
  }
  if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }
  if (destInput.value === '') {
    destError.textContent = 'Please select a destination.';
    valid = false;
  }
  if (!valid) {
    e.preventDefault();
    return;
  }
  e.preventDefault();
  formSuccess.textContent = 'Thank you for your inquiry! We will contact you soon.';
  bookingForm.reset();
});

// Keyboard accessibility for testimonials slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let currentTestimonial = 0;

function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}

prevBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
  prevBtn.focus();
});

nextBtn.addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
  nextBtn.focus();
});

// Keyboard left/right arrow navigation for slider
document.querySelector('.testimonials-slider').addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    prevBtn.click();
  }
  if (e.key === 'ArrowRight') {
    nextBtn.click();
  }
});

// Initial testimonial
showTestimonial(currentTestimonial);