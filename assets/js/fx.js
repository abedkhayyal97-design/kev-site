(()=>{const root=document.documentElement;root.classList.remove('no-js');
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const K=window.KEV;
function features(){const el=document.getElementById('features');if(!el||!K)return;const L=K.L,esc=K.esc,T=(a,e)=>K.lang==='ar'?a:e;
 el.innerHTML=K.C.services.map((s,i)=>{const p=s.packages.find(x=>x.hl)||s.packages[0],min=Math.min(...s.packages.map(x=>x.price));
 const bars=Array.from({length:24},(_,k)=>{const h=20+Math.abs(Math.sin(k*.7+i))*70;return `<rect x="${k*17+4}" y="${100-h}" width="8" height="${h}" rx="4" fill="#12D9E8" opacity="${.3+(k%3)*.2}"/>`}).join('');
 return `<div class="svc rv"><div class="box big"><span class="num">0${i+1}</span><h3>${esc(L(s.name))}</h3><p>${esc(L(s.desc))}</p>
 <ul class="pills" aria-label="${T('يتضمن','Includes')}">${p.items.map(x=>`<li>${esc(L(x))}</li>`).join('')}</ul>
 <div class="row"><a class="btn sm" href="service-${s.id}.html">${T('الباقات والأسعار','Packages & prices')}<span class="sr"> — ${esc(L(s.name))}</span></a><span class="badge">${T('يبدأ من','From')} $${min}</span></div></div>
 <div class="media" role="img" aria-label="${T('مكان عيّنة عمل','Work sample placeholder')}"><div>${T('مكان عيّنة عمل','Work sample placeholder')}<small>${T('استبدلها بصورة أو مقطع حقيقي','Replace with a real image or clip')}</small></div><svg viewBox="0 0 410 100" preserveAspectRatio="none" aria-hidden="true">${bars}</svg></div></div>`}).join('');observe()}
function stats(){const el=document.getElementById('stats');if(!el||!K)return;const S=K.C.stats||[];el.closest('section').hidden=!S.length;
 el.innerHTML=S.map((s,i)=>`<div class="stat rv" style="--i:${i}"><b>${K.esc(s.n)}<em>${K.esc(s.suf)}</em></b><span>${K.esc(K.L(s.l))}</span></div>`).join('');
 const n=document.getElementById('stats-note');if(n)n.hidden=!K.C.statsAreExamples;observe()}
/* reveal */
let io=null;function observe(){const els=[...document.querySelectorAll('.rv:not(.in)')];
 if(still||!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
 io=io||new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
 els.forEach(e=>io.observe(e))}
/* progress, header band, parallax */
const bar=document.querySelector('.progress i'),hd=document.querySelector('header.top'),px=[...document.querySelectorAll('[data-parallax]')];let tick=false;
function onScroll(){tick=false;const h=root.scrollHeight-innerHeight;if(bar)bar.style.setProperty('--p',h>0?scrollY/h:0);
 if(hd){const y=hd.offsetHeight+1;const el=document.elementFromPoint(innerWidth/2,y);const b=el&&el.closest('[data-band]');hd.classList.toggle('on-dark',!!b&&b.dataset.band==='dark')}
 if(!still)px.forEach(e=>{const r=e.getBoundingClientRect();e.style.transform=`translate3d(0,${(r.top+r.height/2-innerHeight/2)*(+e.dataset.parallax||.1)}px,0)`})}
addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll)}},{passive:true});addEventListener('resize',onScroll);
document.addEventListener('kev:lang',()=>{features();stats();onScroll()});
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('[data-stagger]').forEach(g=>[...g.children].forEach((c,i)=>{c.classList.add('rv');c.style.setProperty('--i',i)}));observe();onScroll()});
})();

(()=>{const t=document.querySelector('.k-tilt');if(!t||matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(pointer:fine)').matches)return;let r=0;addEventListener('pointermove',e=>{if(r)return;r=requestAnimationFrame(()=>{r=0;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;t.style.setProperty('--rx',(x*8).toFixed(2)+'deg');t.style.setProperty('--ry',(-y*6).toFixed(2)+'deg')})},{passive:true})})();

/* scroll stage: pinned hero fade/scale, inertia wheel, cue scroll */
(()=>{const still=matchMedia('(prefers-reduced-motion: reduce)').matches;if(still)return;
const R=document.documentElement,hero=document.querySelector('.hero');
const fine=matchMedia('(pointer:fine) and (min-width:761px)').matches;
const ease=t=>1-Math.pow(1-t,3);
let tgt=scrollY,cur=scrollY,run=false,own=false,anim=null;
function to(y){y=Math.max(0,Math.min(y,R.scrollHeight-innerHeight));own=true;R.style.scrollBehavior='auto';scrollTo(0,y)}
function loop(){cur+=(tgt-cur)*.11;if(Math.abs(tgt-cur)<.5){cur=tgt;run=false}to(cur);if(run)requestAnimationFrame(loop)}
function glide(y,d){anim&&cancelAnimationFrame(anim);run=false;const s=scrollY,t0=performance.now();d=d||1100;
 const st=n=>{const k=Math.min(1,(n-t0)/d);to(s+(y-s)*ease(k));if(k<1)anim=requestAnimationFrame(st);else{anim=null;tgt=cur=scrollY;R.style.scrollBehavior=''}};anim=requestAnimationFrame(st)}
if(fine){addEventListener('wheel',e=>{if(e.ctrlKey||e.defaultPrevented)return;
 for(let n=e.target;n&&n!==document.body;n=n.parentElement){const cs=getComputedStyle(n);if(/(auto|scroll)/.test(cs.overflowY)&&n.scrollHeight>n.clientHeight)return}
 e.preventDefault();if(anim){cancelAnimationFrame(anim);anim=null}if(!run){tgt=cur=scrollY}
 tgt=Math.max(0,Math.min(tgt+e.deltaY*(e.deltaMode===1?40:1),R.scrollHeight-innerHeight));if(!run){run=true;requestAnimationFrame(loop)}},{passive:false});
 addEventListener('scroll',()=>{if(own){own=false;return}if(!run&&!anim){tgt=cur=scrollY}},{passive:true});}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.classList.contains('skip')||a.getAttribute('href').length<2)return;const el=document.getElementById(a.getAttribute('href').slice(1));if(!el)return;
 e.preventDefault();const off=a.classList.contains('cue')?0:90;glide(el.getBoundingClientRect().top+scrollY-off);history.replaceState(null,'',a.getAttribute('href'))});
if(!hero)return;R.classList.add('js-stage');
const w=hero.querySelector(':scope>.wrap'),m=hero.querySelector('.k-tilt'),c=hero.querySelector('.cue');
let tk=false;function upd(){tk=false;const h=hero.offsetHeight||innerHeight,p=Math.max(0,Math.min(1,scrollY/h));
 if(w){w.style.transform=`translate3d(0,${(-p*(fine?90:40)).toFixed(1)}px,0) scale(${(1-p*.06).toFixed(4)})`;w.style.opacity=(1-p*1.15).toFixed(3);w.style.filter=fine&&p>0?`blur(${(p*6).toFixed(1)}px)`:''}
 if(m)m.style.opacity=(1-p*.9).toFixed(3);if(c)c.style.opacity=(1-p*3).toFixed(3);hero.style.setProperty('--dim',(p*.55).toFixed(3))}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
})();
