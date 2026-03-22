// Progress bar
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('progress').style.width = (scrollY / h * 100) + '%';
}, { passive: true });

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: .06 });
document.querySelectorAll('.sr').forEach(el => obs.observe(el));

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

// Filter by category
function filterCat(cat, btn) {
  // Update active button
  document.querySelectorAll('.cf-btn, .ct-tag').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Filter posts
  document.querySelectorAll('.post-card, .featured-post').forEach(card => {
    const cardCat = card.dataset.cat || '';
    const show = cat === 'all' || cardCat === cat;
    card.classList.toggle('hidden', !show);
    if (show && !card.classList.contains('visible')) card.classList.add('visible');
  });

  // Update count
  const visible = document.querySelectorAll('.post-card:not(.hidden)').length;
  const counter = document.getElementById('resultsCount');
  if (counter) counter.textContent = `Showing ${visible} posts`;
}

// Search posts
function searchPosts(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.post-card').forEach(card => {
    const title = card.querySelector('.pc-title')?.textContent.toLowerCase() || '';
    const excerpt = card.querySelector('.pc-excerpt')?.textContent.toLowerCase() || '';
    const tags = card.querySelector('.pc-tags')?.textContent.toLowerCase() || '';
    const match = !q || title.includes(q) || excerpt.includes(q) || tags.includes(q);
    card.classList.toggle('hidden', !match);
  });
  // Sync search boxes
  document.querySelectorAll('.bhs-input, .sbs-input').forEach(inp => {
    if (inp.value !== query) inp.value = query;
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 76, behavior: 'smooth' }); }
  });
});
