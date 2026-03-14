
// Mobile menu
function toggleMenu(){
  const m=document.getElementById('mobileMenu');
  const h=document.getElementById('hamburger');
  const open=m.classList.toggle('open');
  h.querySelectorAll('span').forEach((s,i)=>{
    if(open){
      if(i===0)s.style.transform='rotate(45deg) translate(5px,5px)';
      if(i===1)s.style.opacity='0';
      if(i===2)s.style.transform='rotate(-45deg) translate(5px,-5px)';
    }else{s.style.transform='';s.style.opacity='';}
  });
}

// Scroll reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:.08});
document.querySelectorAll('.sr').forEach(el=>obs.observe(el));

// Back to top
const btt=document.getElementById('btt');
window.addEventListener('scroll',()=>{
  btt.classList.toggle('show',scrollY>400);
},{passive:true});

// Filter tools
function filterTools(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const cards=document.querySelectorAll('.tool-card');
  let count=0;
  cards.forEach(c=>{
    const cats=c.dataset.cat||'';
    const isFree=c.dataset.free==='true';
    const rating=parseFloat(c.dataset.rating||0);
    let show=false;
    if(cat==='all') show=true;
    else if(cat==='free') show=isFree;
    else if(cat==='top') show=rating>=9.0;
    else show=cats.includes(cat);
    c.style.display=show?'flex':'none';
    if(show) count++;
  });
  // always show dividers
  document.querySelectorAll('.cat-divider').forEach(d=>d.style.display=cat==='all'?'flex':'none');
  document.getElementById('resultsCount').textContent=`Showing ${count} tool${count!==1?'s':''}`;
}

// Search tools
function searchTools(val){
  const v=val.toLowerCase();
  const cards=document.querySelectorAll('.tool-card');
  let count=0;
  cards.forEach(c=>{
    const name=(c.querySelector('.tc-name')||{}).textContent||'';
    const desc=(c.querySelector('.tc-tagline')||{}).textContent||'';
    const cat=(c.querySelector('.tc-cat')||{}).textContent||'';
    const show=!v||name.toLowerCase().includes(v)||desc.toLowerCase().includes(v)||cat.toLowerCase().includes(v);
    c.style.display=show?'flex':'none';
    if(show) count++;
  });
  document.getElementById('resultsCount').textContent=`Showing ${count} tool${count!==1?'s':''}`;
}

// FAQ toggle
function toggleFaq(btn){
  const item=btn.parentElement;
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
  if(!isOpen) item.classList.add('open');
}

// Newsletter
function subscribeNewsletter(btn){
  const input=btn.previousElementSibling;
  if(!input.value||!input.value.includes('@')){
    input.style.borderColor='var(--acc2)';
    input.focus();return;
  }
  btn.textContent='✓ Subscribed!';
  btn.style.background='var(--acc3)';
  input.value='';
  setTimeout(()=>{btn.textContent='Get Weekly Reviews →';btn.style.background='';},3000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+scrollY-80,behavior:'smooth'});}
  });
});

