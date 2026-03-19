// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Smooth active nav highlighting
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});

// Contact form
function handleContact(e) {
  e.preventDefault();
  alert('Thank you for your enquiry! We will contact you within 24 hours.');
  e.target.reset();
}

// Counter animation
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.textContent.replace(/\D/g, ''));
    const suffix = el.textContent.replace(/[\d]/g, '');
    let count = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 25);
  });
}

// Intersection Observer for counters
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) animateCounters();
  }, { threshold: 0.5 }).observe(statsSection);
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.course-card, .why-card, .testi-card, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.course-card, .why-card, .testi-card, .step').forEach(el => {
    el.classList.add('visible');
  });
});

// Add visible class to style
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
