// Mega Menu & Mobile Navbar Logic
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Hamburger/mobile menu
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });

  // Mega menu (desktop)
  const megaParents = document.querySelectorAll('.has-mega');

  // Desktop: hover/focus shows mega menu
  megaParents.forEach(parent => {
    const link = parent.querySelector('a');
    const megaMenu = parent.querySelector('.mega-menu');
    link.addEventListener('focus', () => {
      parent.classList.add('open');
      link.setAttribute('aria-expanded', 'true');
    });
    link.addEventListener('blur', () => {
      setTimeout(() => {
        parent.classList.remove('open');
        link.setAttribute('aria-expanded', 'false');
      }, 100);
    });
    parent.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        parent.classList.add('open');
        link.setAttribute('aria-expanded', 'true');
      }
    });
    parent.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        parent.classList.remove('open');
        link.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Mobile: show/hide mega menu on click
  if (window.innerWidth <= 768) {
    megaParents.forEach(parent => {
      const link = parent.querySelector('a');
      link.addEventListener('click', function (e) {
        e.preventDefault();
        // toggle only this mega menu
        parent.classList.toggle('open');
        link.setAttribute('aria-expanded', parent.classList.contains('open').toString());
      });
    });
  }

  // Close nav on link click (mobile)
  navLinks.querySelectorAll('a:not(.has-mega > a)').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      }
    });
  });
});

// Booking Form Validation
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
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
}

// Keyboard accessibility for testimonials slider
const testimonialsSlider = document.querySelector('.testimonials-slider');
if (testimonialsSlider) {
  const testimonials = testimonialsSlider.querySelectorAll('.testimonial');
  const prevBtn = testimonialsSlider.querySelector('.testimonial-prev');
  const nextBtn = testimonialsSlider.querySelector('.testimonial-next');
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
  testimonialsSlider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    }
    if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });

  // Initial testimonial
  showTestimonial(currentTestimonial);
}