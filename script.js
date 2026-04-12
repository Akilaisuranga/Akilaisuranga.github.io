// ===== PARTICLE BACKGROUND (floating dots like Nisal's) =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

const dots = Array.from({length: 80}, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  r: Math.random() * 1.5 + 0.3,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3,
  a: Math.random() * 0.5 + 0.1
}));

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  dots.forEach(d => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,127,${d.a})`;
    ctx.fill();
    d.x += d.dx; d.y += d.dy;
    if (d.x < 0 || d.x > W) d.dx *= -1;
    if (d.y < 0 || d.y > H) d.dy *= -1;
  });
  // Draw connecting lines
  dots.forEach((a, i) => {
    dots.slice(i + 1).forEach(b => {
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,255,127,${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

window.addEventListener('resize', () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

// ===== TYPING EFFECT =====
const roles = [
  'Cybersecurity Student',
  'Ethical Hacker',
  'Penetration Tester',
  'CTF Player',
  'Red Team Analyst'
];
let ri = 0, ci = 0, del = false;
const el = document.getElementById('typed');

function type() {
  const cur = roles[ri];
  el.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
  if (!del && ci === cur.length) { del = true; setTimeout(type, 2000); return; }
  if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, del ? 45 : 80);
}
type();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', scrollY > 30);
  // active link
  document.querySelectorAll('section[id]').forEach(sec => {
    if (scrollY >= sec.offsetTop - 120) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id);
      });
    }
  });
});

// ===== HAMBURGER =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.proj-card, .cert-card, .about-card, .contact-card, .skill-col, .sbar');
revealEls.forEach(el => el.classList.add('reveal'));

const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.12 });
revealEls.forEach(el => revObs.observe(el));

// ===== SKILL BAR ANIMATE ON SCROLL =====
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.querySelector('.sbar-fill')?.classList.add('animate');
  });
}, { threshold: 0.4 });
document.querySelectorAll('.sbar').forEach(b => barObs.observe(b));
