/* KEV studio media: waveform player, before/after slider, device frame, viewfinder card */
(()=>{const K=window.KEV;if(!K)return;
const T=(a,e)=>K.lang==='ar'?a:e,BI=(a,e)=>`<span class="ar" lang="ar">${a}</span><span class="en" lang="en">${e}</span>`;
const RM=matchMedia('(prefers-reduced-motion: reduce)'),COARSE=matchMedia('(hover: none)');
const P='assets/img/work/';
const pic=(n,w,h,sizes,ar,en,cls='')=>`<picture class="pic ${cls}"><source type="image/webp" srcset="${P}${n}-640.webp 640w, ${P}${n}.webp ${w}w" sizes="${sizes}"><img src="${P}${n}.jpg" srcset="${P}${n}-640.jpg 640w, ${P}${n}.jpg ${w}w" sizes="${sizes}" width="${w}" height="${h}" loading="lazy" decoding="async" alt="${T(ar,en)}" data-alt-ar="${ar}" data-alt-en="${en}"></picture>`;
const KIND={'voice-over':'wp','sound-engineering':'wp',photography:'ba','video-motion':'ba','web-app':'dev',branding:'vf'};
const AUD={'voice-over':['vo-concept','موسيقى خلفية هادئة لتعليق صوتي','Ambient bed for a voice-over'],'sound-engineering':['mix-concept','مزج إيقاع وباص وخلفية','Beat, bass and pad mix']};
const VF='<svg class="vf" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M3 14V3h11M86 3h11v11M97 86v11H86M14 97H3V86" vector-effect="non-scaling-stroke"/><path d="M47 50h6M50 47v6" vector-effect="non-scaling-stroke"/></svg>';
const PLAY='<svg viewBox="0 0 24 24" class="i-play" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg><svg viewBox="0 0 24 24" class="i-pause" aria-hidden="true"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z" fill="currentColor"/></svg>';
/* render a component into a .km host. data: sid, img, w, h, sizes, alt-ar, alt-en */
function render(el){const d=el.dataset,k=d.kind||KIND[d.sid];if(!k||el.dataset.kmOn)return;el.dataset.kmOn='1';
 const sz=d.sizes||'(max-width:760px) 100vw, 50vw',ar=d.altAr||'',en=d.altEn||'';el.classList.add('km-'+k);
 if(k==='wp'){const[a,lar,len]=AUD[d.sid];
  el.innerHTML=pic(d.img,+d.w,+d.h,sz,ar,en,'wp-bg')+`<div class="wp" data-src="assets/audio/${a}" data-name-ar="${lar}" data-name-en="${len}">
  <button class="wp-btn" type="button">${PLAY}</button>
  <div class="wp-main"><div class="wp-top"><span class="wp-lbl">${BI('عيّنة توضيحية','Concept demo')}</span><span class="wp-time" dir="ltr"><b>0:00</b> / <span class="wp-dur">0:18</span></span></div>
  <div class="wp-wave" dir="ltr" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="18" aria-valuenow="0"><svg class="wp-s0" preserveAspectRatio="none" aria-hidden="true"></svg><svg class="wp-s1" preserveAspectRatio="none" aria-hidden="true"></svg><i class="wp-head" aria-hidden="true"></i></div></div></div>`;
  wp(el.querySelector('.wp'))}
 else if(k==='ba'){el.innerHTML=`<div class="ba" style="--x:50">${pic(d.img,+d.w,+d.h,sz,d.aAltAr||ar+' — بعد التلوين',d.aAltEn||en+' — after grading')}<div class="ba-before">${pic(d.before||d.img+'_before',+d.w,+d.h,sz,d.bAltAr||ar+' — قبل التلوين',d.bAltEn||en+' — before grading')}</div>
  <span class="ba-tag ba-b" aria-hidden="true">${BI(d.bAr||'قبل',d.bEn||'Before')}</span><span class="ba-tag ba-a" aria-hidden="true">${BI(d.aAr||'بعد',d.aEn||'After')}</span>
  <div class="ba-h" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6l-5 6 5 6M15 6l5 6-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></i></div></div>`;
  ba(el.querySelector('.ba'),d)}
 else if(k==='dev'){el.innerHTML=`<div class="dev" role="img"><div class="dev-lap"><div class="dev-scr"><img src="${P}${d.lap||'ui_laptop'}.webp" width="1000" height="${d.lapH||1289}" loading="lazy" decoding="async" alt=""></div><i class="dev-base"></i></div>
  <div class="dev-ph"><div class="dev-scr"><img src="${P}${d.ph||'ui_phone'}.webp" width="600" height="${d.phH||4003}" loading="lazy" decoding="async" alt=""></div></div></div>`;
  dev(el.querySelector('.dev'),ar,en)}
 else{el.innerHTML=pic(d.img,+d.w,+d.h,sz,ar,en)+(k==='vf'?VF:'')}
 if(d.tag!=='0')el.insertAdjacentHTML('beforeend',`<span class="ctag">${BI('تصوّر','Concept')}</span>`);
 labels(el)}
/* ---------- waveform player ---------- */
let cur=null;const fmt=s=>{s=Math.max(0,Math.round(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const peaksCache={};
function wp(w){const src=w.dataset.src,wave=w.querySelector('.wp-wave'),btn=w.querySelector('.wp-btn'),s0=w.querySelector('.wp-s0'),s1=w.querySelector('.wp-s1'),tb=w.querySelector('.wp-time b');
 let au=null,dur=18,raf=0;
 const draw=pk=>{const n=pk.length,vb=`0 0 ${n*4} 40`;let r='';pk.forEach((v,i)=>{const h=Math.max(2,v*38);r+=`<rect x="${i*4+.6}" y="${20-h/2}" width="2.4" height="${h}" rx="1.2"/>`});s0.setAttribute('viewBox',vb);s1.setAttribute('viewBox',vb);s0.innerHTML=s1.innerHTML=r};
 (peaksCache[src]||(peaksCache[src]=fetch(src+'.json').then(r=>r.json()).catch(()=>({duration:18,peaks:Array(96).fill(.35)})))).then(j=>{dur=j.duration||18;w.querySelector('.wp-dur').textContent=fmt(dur);wave.setAttribute('aria-valuemax',Math.round(dur));draw(j.peaks);aria(0)});
 const set=t=>{const p=Math.min(1,Math.max(0,t/dur));wave.style.setProperty('--p',p);tb.textContent=fmt(t);aria(t)};
 function aria(t){wave.setAttribute('aria-valuenow',Math.round(t));wave.setAttribute('aria-valuetext',T(`${fmt(t)} من ${fmt(dur)}`,`${fmt(t)} of ${fmt(dur)}`))}
 let ready=null,pend=null;
 const get=()=>{if(!au){au=new Audio();au.preload='auto';
   au.addEventListener('ended',()=>{stop();set(0);au.currentTime=0});au.addEventListener('loadedmetadata',()=>{if(isFinite(au.duration))dur=au.duration;if(pend!==null){au.currentTime=pend;pend=null}})
   /* load as blob so seeking works even on hosts without HTTP range support */
   ready=fetch(src+'.mp3').then(r=>{if(!r.ok)throw 0;return r.blob()}).then(bl=>{au.src=URL.createObjectURL(bl)}).catch(()=>{au.src=src+'.mp3'})}
  return au};
 const loop=()=>{if(au&&pend===null)set(au.currentTime);raf=requestAnimationFrame(loop)};
 function stop(){w.classList.remove('on');cancelAnimationFrame(raf);if(cur===api)cur=null;lab()}
 const api={pause(){if(au)au.pause();stop()}};w._api=api;
 function play(){if(cur&&cur!==api)cur.pause();cur=api;const a=get();ready.then(()=>a.play()).then(()=>{w.classList.add('on');cancelAnimationFrame(raf);loop();lab()}).catch(()=>stop())}
 btn.addEventListener('click',()=>w.classList.contains('on')?api.pause():play());
 const seek=t=>{const a=get();t=Math.min(dur,Math.max(0,t));if(a.readyState>0){try{a.currentTime=t}catch(e){}}else pend=t;set(t)};
 const at=e=>{const r=wave.getBoundingClientRect();return (e.clientX-r.left)/r.width*dur};
 wave.addEventListener('pointerdown',e=>{wave.setPointerCapture(e.pointerId);seek(at(e));const mv=ev=>seek(at(ev)),up=()=>{wave.removeEventListener('pointermove',mv);wave.removeEventListener('pointerup',up)};wave.addEventListener('pointermove',mv);wave.addEventListener('pointerup',up)});
 wave.addEventListener('keydown',e=>{const t=au?au.currentTime:0,m={ArrowRight:2,ArrowUp:2,ArrowLeft:-2,ArrowDown:-2,PageUp:5,PageDown:-5};
  if(e.key in m){e.preventDefault();seek(t+m[e.key])}else if(e.key==='Home'){e.preventDefault();seek(0)}else if(e.key==='End'){e.preventDefault();seek(dur)}else if(e.key===' '||e.key==='Enter'){e.preventDefault();btn.click()}});
 function lab(){const on=w.classList.contains('on'),n=T(w.dataset.nameAr,w.dataset.nameEn);
  btn.setAttribute('aria-label',on?T('إيقاف مؤقت: عيّنة توضيحية — ','Pause concept demo: ')+n:T('تشغيل عيّنة توضيحية: ','Play concept demo: ')+n);btn.setAttribute('aria-pressed',on);
  wave.setAttribute('aria-label',T('موضع التشغيل','Playback position'))}
 w._lab=()=>{lab();aria(au?au.currentTime:0)};lab()}
/* ---------- before / after ---------- */
function ba(b,d={}){const h=b.querySelector('.ba-h');let x=50;
 const set=v=>{x=Math.min(100,Math.max(0,v));b.style.setProperty('--x',x);h.setAttribute('aria-valuenow',Math.round(x));h.setAttribute('aria-valuetext',T(`${Math.round(x)}٪ ${d.bAr||'قبل'}`,`${Math.round(x)}% ${(d.bEn||'before').toLowerCase()}`))};
 const rtl=()=>getComputedStyle(b).direction==='rtl';
 const at=e=>{const r=b.getBoundingClientRect();let p=(e.clientX-r.left)/r.width*100;return rtl()?100-p:p};
 b.addEventListener('pointerdown',e=>{if(e.button>0)return;b.setPointerCapture(e.pointerId);b.classList.add('drag');set(at(e));
  const mv=ev=>set(at(ev)),up=()=>{b.classList.remove('drag');b.removeEventListener('pointermove',mv);b.removeEventListener('pointerup',up);b.removeEventListener('pointercancel',up)};
  b.addEventListener('pointermove',mv);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up)});
 h.addEventListener('keydown',e=>{const s=e.shiftKey?10:5,dirn=rtl()?-1:1;let v=null;
  if(e.key==='ArrowRight')v=x+s*dirn;else if(e.key==='ArrowLeft')v=x-s*dirn;else if(e.key==='ArrowUp'||e.key==='PageUp')v=x+s;else if(e.key==='ArrowDown'||e.key==='PageDown')v=x-s;else if(e.key==='Home')v=0;else if(e.key==='End')v=100;
  if(v!==null){e.preventDefault();set(v)}});
 b._lab=()=>{h.setAttribute('aria-label',T(d.cmpAr||'مقارنة قبل وبعد التلوين',d.cmpEn||'Before/after colour grading comparison'));set(x)};b._lab()}
/* ---------- device frame ---------- */
let devIO=null;
function dev(d,ar,en){d._lab=()=>d.setAttribute('aria-label',T(ar,en));d._lab();
 const meas=()=>d.querySelectorAll('.dev-scr').forEach(s=>{const i=s.querySelector('img');if(!i.complete||!i.naturalWidth)return;
  const m=Math.min(0,s.clientHeight-s.clientWidth*i.naturalHeight/i.naturalWidth);s.style.setProperty('--max',m+'px');s.style.setProperty('--dur',Math.max(3,Math.abs(m)/160)+'s')});
 d.querySelectorAll('img').forEach(i=>i.complete?meas():i.addEventListener('load',meas));addEventListener('resize',meas,{passive:true});
 if(COARSE.matches&&'IntersectionObserver' in window){devIO=devIO||new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('auto',e.isIntersecting&&!RM.matches)),{threshold:.5});devIO.observe(d)}
 if(!RM.matches&&!COARSE.matches){d.addEventListener('pointermove',e=>{const r=d.getBoundingClientRect();d.style.setProperty('--ry',((e.clientX-r.left)/r.width-.5)*8+'deg');d.style.setProperty('--rx',(.5-(e.clientY-r.top)/r.height)*6+'deg')});d.addEventListener('pointerleave',()=>{d.style.setProperty('--ry','0deg');d.style.setProperty('--rx','0deg')})}}
function labels(r){(r||document).querySelectorAll('.wp,.ba,.dev').forEach(x=>x._lab&&x._lab());(r||document).querySelectorAll('.km img[data-alt-ar]').forEach(i=>i.alt=K.lang==='ar'?i.dataset.altAr:i.dataset.altEn)}
K.kmInit=(r=document)=>r.querySelectorAll('.km:not([data-km-on])').forEach(render);
document.addEventListener('kev:lang',()=>{if(cur)cur.pause();labels()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&cur)cur.pause()});
document.addEventListener('DOMContentLoaded',()=>K.kmInit());
})();
