/* ========================================
   GIKANIX ROSHAN - Portfolio Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Theme Toggle ----------
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });

  // ---------- Mobile Navigation ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ---------- Typing Effect ----------
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'Building Smart Systems with Code & Creativity',
    'Turning Ideas into Functional Applications',
    'Exploring IoT, Web Dev & Beyond'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // ---------- Scroll Reveal ----------
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // ---------- Skill Bar Animation ----------
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.getAttribute('data-width');
      }
    });
  }, {
    threshold: 0.3
  });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ---------- Smooth Scroll for Navigation ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Navbar Background on Scroll ----------
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // ---------- Contact Form (Front-end only) ----------
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#formName').value;
      const email = form.querySelector('#formEmail').value;
      const message = form.querySelector('#formMessage').value;

      // Show simple confirmation
      const btn = form.querySelector('.form-submit .btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent!';
      btn.style.pointerEvents = 'none';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.pointerEvents = 'auto';
        form.reset();
      }, 3000);
    });
  }

});
