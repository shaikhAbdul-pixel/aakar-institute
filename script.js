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

// Rotate all supplied posters every two seconds; respect pause and reduced motion.
const track=document.querySelector('.poster-track');
const slides=[...document.querySelectorAll('.poster-slide')];
const viewport=document.querySelector('.poster-viewport');
const pauseButton=document.getElementById('poster-pause');
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
let slideIndex=0,paused=motionPreference.matches,timer;
function showPoster(next){
  slideIndex=(next+slides.length)%slides.length;
  track.style.transform=`translateX(-${slideIndex*100}%)`;
  slides.forEach((slide,i)=>slide.setAttribute('aria-hidden',String(i!==slideIndex)));
  document.getElementById('poster-count').textContent=`${slideIndex+1} / ${slides.length}`;
}
function restartSlideshow(){
  clearInterval(timer);
  pauseButton.textContent=paused?'Play slideshow':'Pause slideshow';
  if(!paused&&!document.hidden)timer=setInterval(()=>showPoster(slideIndex+1),2000);
}
function movePoster(direction){showPoster(slideIndex+direction);restartSlideshow()}
document.getElementById('poster-prev').addEventListener('click',()=>movePoster(-1));
document.getElementById('poster-next').addEventListener('click',()=>movePoster(1));
pauseButton.addEventListener('click',()=>{paused=!paused;restartSlideshow()});
viewport.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();movePoster(event.key==='ArrowLeft'?-1:1)}});
let touchX=null,touchY=null;
viewport.addEventListener('touchstart',event=>{touchX=event.changedTouches[0].clientX;touchY=event.changedTouches[0].clientY},{passive:true});
viewport.addEventListener('touchend',event=>{if(touchX===null)return;const dx=event.changedTouches[0].clientX-touchX,dy=event.changedTouches[0].clientY-touchY;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))movePoster(dx<0?1:-1);touchX=null},{passive:true});
document.addEventListener('visibilitychange',restartSlideshow);
motionPreference.addEventListener('change',event=>{paused=event.matches;restartSlideshow()});
restartSlideshow();
document.querySelectorAll('[data-course]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('[name="course"]').value=link.dataset.course}));
document.querySelectorAll('.featured-links a').forEach(link=>link.addEventListener('click',()=>document.querySelector('[data-filter="all"]').click()));
