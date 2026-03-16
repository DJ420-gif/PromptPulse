// Mobile menu
function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  const h = document.getElementById('hamburger');
  const open = m.classList.toggle('open');
  h.querySelectorAll('span').forEach((s, i) => {
    if (open) {
      if (i === 0) s.style.transform = 'rotate(45deg) translate(5px,5px)';
      if (i === 1) s.style.opacity = '0';
      if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else { s.style.transform = ''; s.style.opacity = ''; }
  });
}

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .08 });
document.querySelectorAll('.sr').forEach(el => obs.observe(el));

// FAQ toggle
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Copy featured prompt
function copyFeatured(btn) {
  const text = `## ROLE
You are a senior [frontend/backend/fullstack] engineer with 10+ years building production SaaS. You think like a founder. No shortcuts. No partial code. Ever.

## CONTEXT
Project: [App name and description]
Users: [Who uses it, tech level, age range]
Scale: [Expected users]

## STACK
Next.js 15 · TypeScript 5.4 strict · Tailwind 3.4
Prisma 5 · Supabase · Clerk · Vercel

## NEVER
any · var · console.log · inline styles · partial code

## TASK
[Describe exactly what you want built]`;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copied!';
    btn.style.color = 'var(--acc3)';
    btn.style.borderColor = 'var(--acc3)';
    setTimeout(() => { btn.textContent = '⌘ Copy'; btn.style.color = ''; btn.style.borderColor = ''; }, 2500);
  });
}

// Back to top
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  btt.classList.toggle('show', scrollY > 400);
}, { passive: true });

// Nav active on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-mid a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 100) current = s.id; });
  navLinks.forEach(a => {
    a.style.color = (a.getAttribute('href') === '#' + current) ? 'var(--acc)' : '';
  });
}, { passive: true });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' }); }
  });
});
