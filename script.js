/* ==========================================================================
   ADV. PREETI S. RANJANE (BHARATI) — script.js
   Vanilla JS: nav toggle, scroll reveal, ripple buttons, magnetic buttons,
   hero cursor spotlight/parallax, scrollspy, back-to-top, vCard download,
   contact form (placeholder handler).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky header shadow + scroll progress bar ---------- */
  const header = document.getElementById('siteHeader');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
    backToTop.classList.toggle('visible', window.scrollY > 500);

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${pct}%`;
  };

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal (fade-in on scroll) with cascading stagger ---------- */
  const staggerGroups = ['.feature-grid', '.practice-grid', '.service-grid', '.chip-row', '.stat-row'];
  staggerGroups.forEach(selector => {
    document.querySelectorAll(`${selector} > *`).forEach((child, i) => {
      child.style.setProperty('--delay', `${Math.min(i * 90, 450)}ms`);
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-in').forEach(item => revealObserver.observe(item));

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------- Magnetic buttons (desktop only) ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Hero cursor spotlight + parallax orbit ---------- */
  const heroSection = document.getElementById('profile');
  const heroSpotlight = document.getElementById('heroSpotlight');
  const heroOrbit = document.getElementById('heroOrbit');
  if (heroSection && window.matchMedia('(hover: hover)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      heroSpotlight.style.setProperty('--sx', `${px}%`);
      heroSpotlight.style.setProperty('--sy', `${py}%`);
      const dx = (px - 50) * 0.15;
      const dy = (py - 50) * 0.15;
      heroOrbit.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }

  /* ---------- Subtle card tilt on hover (desktop only) ---------- */
  const tiltEls = document.querySelectorAll('[data-tilt]');
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  if (supportsHover) {
    tiltEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- WhatsApp buttons/links ---------- */
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '919969625914'; // Adv. Preeti S. Ranjane (Bharati) — WhatsApp number
      const message = encodeURIComponent('Hello, I need legal advice from Shree Associates.');
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank', 'noopener');
    });
  });

  /* ---------- vCard download ---------- */
  const vcardBtn = document.getElementById('vcardBtn');
  if (vcardBtn) {
    vcardBtn.addEventListener('click', () => {
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Ranjane;Preeti;;Adv.;',
        'FN:Adv. Preeti S. Ranjane (Bharati)',
        'ORG:Shree Associates',
        'TITLE:Advocate & Legal Advisor',
        'TEL;TYPE=WORK,VOICE:+91-99696-25914',
        'ADR;TYPE=WORK:;;Shop No. 2, Bhosale Tulip, Plot No. 13, Sec. 21, Ulwe;Navi Mumbai;Maharashtra;410206;India',
        'NOTE:Legal Advisor — Civil, Criminal, Co-operative Society & Property Law',
        'END:VCARD'
      ].join('\n');
      const blob = new Blob([vcard], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'adv-preeti-ranjane.vcf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  /* ---------- Scrollspy: highlight the active nav link as sections pass ---------- */
  const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
  const spySections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = navLinks.find(a => a.getAttribute('href') === `#${entry.target.id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
  spySections.forEach(section => spyObserver.observe(section));

  /* ---------- Back to top ---------- */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Contact form (placeholder handler — wire up to your backend) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = 'Thank you for reaching out! We will get back to you shortly.';
      contactForm.reset();
    });
  }

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
