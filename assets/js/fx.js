(()=>{const root=document.documentElement;root.classList.remove('no-js');
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const K=window.KEV;
function features(){const el=document.getElementById('features');if(!el||!K)return;const L=K.L,esc=K.esc,T=(a,e)=>K.lang==='ar'?a:e;
 el.innerHTML=K.C.services.map((s,i)=>{const p=s.packages.find(x=>x.hl)||s.packages[0],min=Math.min(...s.packages.map(x=>x.price));
  return `<div class="svc rv"><div class="box big"><span class="num">0${i+1}</span><h3>${esc(L(s.name))}</h3><p>${esc(L(s.desc))}</p>
 <ul class="pills" aria-label="${T('يتضمن','Includes')}">${p.items.map(x=>`<li>${esc(L(x))}</li>`).join('')}</ul>
 <div class="row"><a class="btn sm" href="service-${s.id}.html">${T('الباقات والأسعار','Packages & prices')}<span class="sr"> — ${esc(L(s.name))}</span></a><span class="badge">${T('يبدأ من','From')} $${min}</span></div></div>
 <div class="media km" data-sid="${s.id}" data-img="svc_${s.id}" data-w="1280" data-h="720" data-sizes="(max-width:860px) 100vw, 45vw" data-alt-ar="${esc(s.name[0])} — صورة توضيحية" data-alt-en="${esc(s.name[1])} — illustrative image"></div></div>`}).join('');if(K.kmInit)K.kmInit(el);observe()}
let counted=false;
function stats(){const el=document.getElementById('stats');if(!el||!K)return;const S=K.C.stats||[];el.closest('section').hidden=!S.length;
 el.innerHTML=S.map((s,i)=>{const n=String(s.n),m=n.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);const pre=m?m[1]:'',num=m?m[2]:n,post=(m?m[3]:'');
  return `<div class="stat rv" style="--i:${i}"><b>${K.esc(pre)}<span class="cn" style="min-width:${num.length}ch" data-to="${K.esc(num)}">${K.esc(num)}</span>${K.esc(post)}<em>${K.esc(s.suf)}</em></b><span>${K.esc(K.L(s.l))}</span></div>`}).join('');
 observe();count(el)}
function count(box){const cs=[...box.querySelectorAll('.cn')];if(!cs.length||counted||still||!('IntersectionObserver' in window))return;
 cs.forEach(c=>c.textContent=fmt(c.dataset.to,0));
 const o=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;o.disconnect();counted=true;const t0=performance.now(),D=1800;
  (function f(t){const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,4);box.querySelectorAll('.cn').forEach(c=>c.textContent=fmt(c.dataset.to,e));if(k<1)requestAnimationFrame(f)})(t0)},{threshold:.35});
 o.observe(box)}
function fmt(s,p){const dec=(s.split('.')[1]||'').length,grp=s.includes(','),v=parseFloat(s.replace(/,/g,''))*p;
 return v.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec,useGrouping:grp})}
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

/* principles: scroll-linked blur/fade + parallax per card (reversible) */
(()=>{const g=document.querySelector('[data-scrub]');if(!g||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
const cards=[...g.children],rates=[1,1.4,.75,1.2,.9,1.5],mob=matchMedia('(max-width:760px)');
g.classList.add('scrub-on');const cl=(v,a,b)=>v<a?a:v>b?b:v;let tk=false;
function upd(){tk=false;const vh=innerHeight,small=mob.matches;
 for(let i=0;i<cards.length;i++){const c=cards[i],r=c.getBoundingClientRect();
  if(r.bottom<-200||r.top>vh+200)continue;
  const p=cl((vh-r.top)/(vh+r.height),0,1),q=cl((vh-r.top)/(vh*.55),0,1),k=rates[i%rates.length]*(small?.6:1);
  const y=(p<.5?60*(1-p/.5):-30*((p-.5)/.5))*k,s=.96+.04*q;
  c.style.transform=`translate3d(0,${y.toFixed(1)}px,0) scale(${s.toFixed(4)})`;
  const o=(.15+.85*q).toFixed(3),b=small?0:(8*(1-q));
  for(const ch of c.children){ch.style.opacity=o;ch.style.filter=b>.05?`blur(${b.toFixed(2)}px)`:'none'}}}
addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
})();
