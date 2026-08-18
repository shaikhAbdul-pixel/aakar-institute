const menuBtn=document.querySelector('.menu-btn');const navLinks=document.querySelector('.nav-links');menuBtn.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));
document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelector('.filters .active').classList.remove('active');btn.classList.add('active');const filter=btn.dataset.filter;document.querySelectorAll('.course-card').forEach(card=>card.classList.toggle('hidden',filter!=='all'&&card.dataset.cat!==filter))}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('enquiryForm').addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.target);
  const message=`Hello Aakar Computer Institute,\n\nI am interested in a course.\n\nName: ${data.get('name')}\nMobile: ${data.get('phone')}\nCourse: ${data.get('course')}\n\nPlease contact me with more details.`;
  const toast=document.querySelector('.toast');
  toast.classList.add('show');
  window.open(`https://wa.me/919821085899?text=${encodeURIComponent(message)}`,'_blank','noopener');
  setTimeout(()=>toast.classList.remove('show'),3500);
});
