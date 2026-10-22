(()=>{const root=document.documentElement;root.classList.remove('no-js');
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
const K=window.KEV;
function features(){const el=document.getElementById('features');if(!el||!K)return;const L=K.L,esc=K.esc,T=(a,e)=>K.lang==='ar'?a:e;
 el.innerHTML=K.C.services.map((s,i)=>{const p=s.packages.find(x=>x.hl)||s.packages[0],min=Math.min(...s.packages.map(x=>x.price));
  return `<div class="svc rv"><div class="box big">${ICO[s.id]||''}<span class="num">0${i+1}</span><h3>${esc(L(s.name))}</h3><p>${esc(L(s.desc))}</p>
 <ul class="pills" aria-label="${T('يتضمن','Includes')}">${p.items.map(x=>`<li>${esc(L(x))}</li>`).join('')}</ul>
 <div class="row"><a class="btn sm" href="service-${s.id}.html">${T('الباقات والأسعار','Packages & prices')}<span class="sr"> — ${esc(L(s.name))}</span></a><span class="badge">${T('يبدأ من','From')} $${min}</span></div></div>
 <div class="media km" data-sid="${s.id}" data-img="svc_${s.id}" data-w="1280" data-h="720" data-sizes="(max-width:860px) 100vw, 45vw" data-alt-ar="${esc(s.name[0])} — صورة توضيحية" data-alt-en="${esc(s.name[1])} — illustrative image"></div></div>`}).join('');if(K.kmInit)K.kmInit(el);observe()}
const ICO={'voice-over':'<svg class="sv-ico i-mic" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle class="p" cx="24" cy="18" r="12" opacity=".5"/><rect x="18" y="6" width="12" height="22" rx="6"/><path d="M12 22a12 12 0 0 0 24 0M24 34v8M17 42h14"/></svg>',
'sound-engineering':'<svg class="sv-ico i-eq" viewBox="0 0 48 48" aria-hidden="true" fill="currentColor"><rect class="e" x="8" y="14" width="5" height="26" rx="2"/><rect class="e e2" x="17" y="8" width="5" height="32" rx="2"/><rect class="e e3" x="26" y="18" width="5" height="22" rx="2"/><rect class="e e4" x="35" y="11" width="5" height="29" rx="2"/></svg>',
'photography':'<svg class="sv-ico i-ap" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="24" cy="24" r="18"/><g class="bl"><path d="M24 6l6 14M42 24l-14 4M24 42l-6-14M6 24l14-4M36.7 11.3l-8.7 10.7M11.3 36.7l8.7-10.7"/></g></svg>',
'video-motion':'<svg class="sv-ico i-film" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="10" y="6" width="28" height="36" rx="3"/><g class="f" fill="currentColor" stroke="none"><rect x="13" y="6" width="3" height="4"/><rect x="13" y="14" width="3" height="4"/><rect x="13" y="22" width="3" height="4"/><rect x="13" y="30" width="3" height="4"/><rect x="13" y="38" width="3" height="4"/><rect x="32" y="6" width="3" height="4"/><rect x="32" y="14" width="3" height="4"/><rect x="32" y="22" width="3" height="4"/><rect x="32" y="30" width="3" height="4"/><rect x="32" y="38" width="3" height="4"/></g></svg>',
'web-app':'<svg class="sv-ico i-code" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M16 14L6 24l10 10M32 14l10 10-10 10"/><path class="c" d="M20 24h2"/><path class="c c2" d="M23 24h2"/><path class="c c3" d="M26 24h2"/></svg>',
'branding':'<svg class="sv-ico i-id" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="24" cy="24" r="8"/><path class="s" d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M10 38l4-4"/></svg>'};
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

/* P1c motion: variety, visibility gating, tilt, marquee, magnetic buttons, parallax motifs */
(()=>{const still=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
function init(){
 addEventListener('load',()=>setTimeout(()=>{const h=document.querySelector('.hero');h&&h.classList.add('ld')},2500));
 document.querySelectorAll('.work.rv').forEach((e,i)=>{if(i%2)e.classList.add('rv-l')});
 document.querySelectorAll('.tst.rv,.stat.rv').forEach(e=>e.classList.add('rv-s'));
 document.querySelectorAll('.flow li').forEach((e,i)=>{e.classList.add('rv','rv-l');e.style.setProperty('--i',i)});
 document.querySelectorAll('.studio').forEach(e=>e.setAttribute('data-px','.12'));
 const cl=document.querySelector('ul.clients');
 if(cl&&!still&&!cl.closest('.marq')){const w=document.createElement('div');w.className='marq';cl.parentNode.insertBefore(w,cl);w.appendChild(cl);
  [...cl.children].forEach(li=>{li.classList.add('in');const c=li.cloneNode(true);c.setAttribute('aria-hidden','true');c.querySelectorAll('.sr').forEach(x=>x.remove());cl.appendChild(c)})}
 const loops=[...document.querySelectorAll('[data-anim],.marq,#features,.band')];
 if('IntersectionObserver' in window){const o=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('anim-off',!e.isIntersecting)),{rootMargin:'80px'});loops.forEach(e=>o.observe(e))}
 if(still)return;
 const px=[...document.querySelectorAll('[data-px],.hero .motif')];let tk=false;
 function sc(){tk=false;const vh=innerHeight;px.forEach(e=>{const r=e.getBoundingClientRect();if(r.bottom<-100||r.top>vh+100)return;const k=e.classList.contains('motif')?.25:+e.dataset.px;
  e.style.translate=e.classList.contains('motif')?`0 ${(scrollY*k).toFixed(1)}px`:`0 ${((r.top+r.height/2-vh/2)*-k).toFixed(1)}px`})}
 addEventListener('scroll',()=>{if(!tk){tk=true;requestAnimationFrame(sc)}},{passive:true});sc();
 if(!fine)return;
 document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.box:not([data-scrub] .box),.tst,.work');
  document.querySelectorAll('.tilting').forEach(t=>{if(t!==c)t.classList.remove('tilting')});
  if(c){const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.classList.add('tilt','tilting');c.style.setProperty('--tx',(x*7).toFixed(2)+'deg');c.style.setProperty('--ty',(-y*6).toFixed(2)+'deg')}
  const b=e.target.closest&&e.target.closest('.btn');document.querySelectorAll('.btn.mag').forEach(m=>{if(m!==b)m.style.translate=''});
  if(b){const r=b.getBoundingClientRect();b.classList.add('mag');b.style.translate=`${((e.clientX-r.left-r.width/2)*.18).toFixed(1)}px ${((e.clientY-r.top-r.height/2)*.28).toFixed(1)}px`}},{passive:true});
 document.addEventListener('pointerleave',()=>document.querySelectorAll('.tilting').forEach(t=>t.classList.remove('tilting')));
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init):init()})();

(()=>{const t=document.querySelector('.k-tilt');if(!t||matchMedia('(prefers-reduced-motion: reduce)').matches||!matchMedia('(pointer:fine)').matches)return;let r=0;addEventListener('pointermove',e=>{if(r)return;r=requestAnimationFrame(()=>{r=0;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;t.style.setProperty('--rx',(x*8).toFixed(2)+'deg');t.style.setProperty('--ry',(-y*6).toFixed(2)+'deg')})},{passive:true})})();

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
