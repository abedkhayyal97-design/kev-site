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

/* hero scroll-out (native scroll): content y 0->320px over 0..1000px, opacity 1->.05 over 0..850px, linear+clamped */
(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const hero=document.querySelector('.hero');if(!hero)return;
const mo=hero.querySelector(':scope>.motif');const els=[hero.querySelector(':scope>.wrap'),hero.querySelector('.cue')].filter(Boolean);
const cl=(v,a,b)=>v<a?a:v>b?b:v;let tk=false,last=-1;
function upd(){tk=false;const y=scrollY;if(y===last)return;last=y;if(y>1400)return;
 const ty=(cl(y/1000,0,1)*320).toFixed(1),op=(1-cl(y/850,0,1)*.95).toFixed(3);
 for(const e of els){e.style.translate=`0 ${ty}px`;e.style.opacity=op}if(mo){mo.style.translate=`0 ${ty}px`;mo.style.setProperty('--fade',op)}}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});upd();
})();
