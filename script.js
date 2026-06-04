// ---------- Word-by-word reveal ----------
const wordObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const words = entry.target.querySelectorAll('.word');
        words.forEach((w, i) => {
          w.style.transitionDelay = i * 60 + 'ms';
          w.classList.add('animate');
        });
        wordObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll('.split-words').forEach((el) => {
  const text = el.textContent;
  el.textContent = '';
  text.split(/\s+/).forEach((word, i, arr) => {
    if (!word) return;
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    el.appendChild(span);
    if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
  });
  wordObserver.observe(el);
});

const lateRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        lateRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll('.split-words-late').forEach((el) => lateRevealObserver.observe(el));

// ---------- Photo parallax (mouse + scroll) ----------
const photoFrame = document.querySelector('.photo-frame');
let photoMouseX = 0, photoMouseY = 0;
let photoTargetX = 0, photoTargetY = 0;
let photoScrollY = 0;

if (photoFrame) {
  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    photoTargetX = ((e.clientX - cx) / cx) * 6;
    photoTargetY = ((e.clientY - cy) / cy) * -6;
  });

  window.addEventListener(
    'scroll',
    () => {
      photoScrollY = Math.min(window.scrollY * 0.18, 120);
    },
    { passive: true }
  );

  function animatePhoto() {
    photoMouseX += (photoTargetX - photoMouseX) * 0.08;
    photoMouseY += (photoTargetY - photoMouseY) * 0.08;
    photoFrame.style.transform = `perspective(1200px) rotateY(${photoMouseX}deg) rotateX(${photoMouseY}deg) translateY(${photoScrollY}px)`;
    requestAnimationFrame(animatePhoto);
  }
  animatePhoto();
}

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Card 3D tilt ----------
document.querySelectorAll('.gap, .service').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    card.style.transform = `translateY(-6px) perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---------- Scroll progress bar ----------
const progress = document.querySelector('.scroll-progress');
let ticking = false;
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = pct + '%';
  ticking = false;
}
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  },
  { passive: true }
);
updateProgress();

// ---------- Floating CTA visibility ----------
const floatingCta = document.querySelector('.floating-cta');
const heroSection = document.getElementById('top');
const finalSection = document.getElementById('contact');
function updateFloatingCta() {
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  const finalTop = finalSection.getBoundingClientRect().top;
  const inMiddle = heroBottom < 80 && finalTop > window.innerHeight * 0.6;
  floatingCta.classList.toggle('visible', inMiddle);
}
window.addEventListener('scroll', updateFloatingCta, { passive: true });
updateFloatingCta();

// ---------- Cursor spotlight ----------
const spotlight = document.querySelector('.cursor-spotlight');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let spotX = mouseX;
let spotY = mouseY;
let spotlightActive = false;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (!spotlightActive) {
    spotlight.classList.add('active');
    spotlightActive = true;
  }
});
window.addEventListener('mouseleave', () => {
  spotlight.classList.remove('active');
  spotlightActive = false;
});

function animateSpotlight() {
  spotX += (mouseX - spotX) * 0.18;
  spotY += (mouseY - spotY) * 0.18;
  spotlight.style.left = spotX + 'px';
  spotlight.style.top = spotY + 'px';
  requestAnimationFrame(animateSpotlight);
}
animateSpotlight();

// ---------- Magnetic buttons ----------
document.querySelectorAll('.btn-magnetic').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.22;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    btn.style.transform = `translate(${x}px, ${y - 3}px) scale(1.05)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// ---------- Animated counters ----------
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.floor(target * eased);
    el.textContent = prefix + value.toLocaleString() + suffix;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = prefix + target.toLocaleString() + suffix;
  }
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));

// ---------- Sparkle field ----------
const sparklesEl = document.querySelector('.sparkles');
if (sparklesEl) {
  for (let i = 0; i < 32; i++) {
    const s = document.createElement('span');
    s.style.top = Math.random() * 100 + '%';
    s.style.left = Math.random() * 100 + '%';
    s.style.setProperty('--delay', Math.random() * 5 + 's');
    s.style.setProperty('--dur', 2.5 + Math.random() * 3 + 's');
    sparklesEl.appendChild(s);
  }
}

// ---------- Confetti burst ----------
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let confettiParticles = [];
let confettiRunning = false;

function sizeCanvas() {
  canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
  canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);

const confettiColors = ['#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b', '#84cc16', '#ffffff'];

function fireConfetti(originX, originY, count = 90) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 6 + Math.random() * 10;
    confettiParticles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 6,
      gravity: 0.35,
      drag: 0.992,
      life: 1,
      decay: 0.008 + Math.random() * 0.01,
      size: 5 + Math.random() * 7,
      ratio: 0.4 + Math.random() * 0.4,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.3,
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(stepConfetti);
  }
}

function stepConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles = confettiParticles.filter((p) => p.life > 0);
  confettiParticles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= p.drag;
    p.rotation += p.rotSpeed;
    p.life -= p.decay;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = p.color;
    ctx.fillRect(-p.size / 2, -(p.size * p.ratio) / 2, p.size, p.size * p.ratio);
    ctx.restore();
  });
  if (confettiParticles.length > 0) {
    requestAnimationFrame(stepConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

document.querySelectorAll('.btn-primary, .floating-cta, .nav-cta').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const rect = btn.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 100);
  });
});
