/* Green Clean — quiet interaction layer */

(() => {
  // Year stamp
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav: add `group` so Tailwind group-[.scrolled]: variants resolve; toggle .scrolled on scroll
  const nav = document.getElementById('nav');
  if (nav) {
    nav.classList.add('group');
    const onScroll = () => {
      if (window.scrollY > 20) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  }

  // Reveal-on-scroll using IntersectionObserver
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Hero parallax: subtle vertical drift on the hero image
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    const onScrollHero = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroImg.style.transform = `translateY(${y * 0.18}px) scale(1.05)`;
      }
    };
    window.addEventListener('scroll', onScrollHero, { passive: true });
  }

  // Generic parallax for elements with .parallax
  const parallaxEls = document.querySelectorAll('.parallax');
  if (parallaxEls.length) {
    const onScrollPar = () => {
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.bottom > 0 && rect.top < vh) {
          const progress = (vh - rect.top) / (vh + rect.height);
          const shift = (progress - 0.5) * 60;
          el.style.transform = `translateY(${shift}px)`;
        }
      });
    };
    window.addEventListener('scroll', onScrollPar, { passive: true });
    onScrollPar();
  }

  // Smooth-scroll for in-page anchors (older Safari/Edge fallback)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Form submission (front-end only)
  const form = document.getElementById('eligibilityForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('formSuccess');
      if (success) success.classList.remove('hidden');
      form.querySelectorAll('input, textarea, select').forEach((el) => { el.value = ''; });
    });
  }

  // Mark images loaded for fade-in
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'));
  });
})();
