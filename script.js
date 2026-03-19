// ── Mobile Nav ──────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (navLinks && !document.querySelector('.nav-close')) {
  const closeBtn = document.createElement('button');
  closeBtn.className = 'nav-close';
  closeBtn.innerHTML = '✕';
  closeBtn.setAttribute('aria-label', 'Close menu');
  document.body.appendChild(closeBtn);

  const openNav = () => {
    navLinks.classList.add('open');
    closeBtn.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };
  const closeNav = () => {
    navLinks.classList.remove('open');
    closeBtn.classList.remove('visible');
    document.body.style.overflow = '';
  };

  hamburger && hamburger.addEventListener('click', openNav);
  closeBtn.addEventListener('click', closeNav);
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target) &&
        !closeBtn.contains(e.target)) closeNav();
  });
}

// ── Active nav link ──────────────────────────────────
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});

// ── Contact form ─────────────────────────────────────
function handleContact(e) {
  e.preventDefault();
  showToast('✅ Thank you! We will contact you within 24 hours.');
  e.target.reset();
}

// ── Toast ─────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position:'fixed', bottom:'2rem', left:'50%',
    transform:'translateX(-50%) translateY(20px)',
    background:'#1e4db7', color:'#fff',
    padding:'1rem 2rem', borderRadius:'50px',
    fontFamily:'DM Sans,sans-serif', fontWeight:'600',
    fontSize:'0.92rem', boxShadow:'0 8px 32px rgba(30,77,183,0.4)',
    zIndex:'9999', opacity:'0', transition:'all 0.4s ease',
    whiteSpace:'nowrap', maxWidth:'90vw', textAlign:'center'
  });
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity='1'; t.style.transform='translateX(-50%) translateY(0)'; });
  setTimeout(() => {
    t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)';
    setTimeout(() => t.remove(), 400);
  }, 3500);
}

// ── Counter animation ─────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const raw = el.textContent;
    const target = parseInt(raw.replace(/\D/g, ''));
    const suffix = raw.replace(/[\d]/g, '');
    let count = 0;
    const step = Math.max(1, Math.ceil(target / 70));
    const timer = setInterval(() => {
      count = Math.min(count + step, target);
      el.textContent = count + suffix;
      if (count >= target) clearInterval(timer);
    }, 20);
  });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
  }, { threshold: 0.4 });
  obs.observe(statsSection);
}

// ── Scroll fade-in ────────────────────────────────────
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
  .fade-in.visible { opacity: 1 !important; transform: translateY(0) !important; }
`;
document.head.appendChild(fadeStyle);

const fadeEls = document.querySelectorAll(
  '.course-card, .why-card, .testi-card, .step, .fac-card, .mission-card, .team-card, .adm-box, .cinfo-box'
);
fadeEls.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

fadeEls.forEach(el => fadeObs.observe(el));
