/* KEV studio media: waveform player, before/after slider, device frame, viewfinder card */
(()=>{const K=window.KEV;if(!K)return;
const T=(a,e)=>K.lang==='ar'?a:e,BI=(a,e)=>`<span class="ar" lang="ar">${a}</span><span class="en" lang="en">${e}</span>`;
const RM=matchMedia('(prefers-reduced-motion: reduce)'),COARSE=matchMedia('(hover: none)');
const P='assets/img/work/';
const pic=(n,w,h,sizes,ar,en,cls='')=>`<picture class="pic ${cls}"><source type="image/webp" srcset="${P}${n}-640.webp 640w, ${P}${n}.webp ${w}w" sizes="${sizes}"><img src="${P}${n}.jpg" srcset="${P}${n}-640.jpg 640w, ${P}${n}.jpg ${w}w" sizes="${sizes}" width="${w}" height="${h}" loading="lazy" decoding="async" alt="${T(ar,en)}" data-alt-ar="${ar}" data-alt-en="${en}"></picture>`;
const KIND={'voice-over':'wp','sound-engineering':'wp',photography:'ba','video-motion':'vid','web-app':'code',branding:'brand'};
const AUD={'voice-over':['kev-vo-sample','نموذج تعليق صوتي — درامي','Voice-over Sample — Dramatic'],'sound-engineering':['kev-promo-mix','نموذج موسيقى ومؤثرات — درامي','Sound Design & Mix Sample — Dramatic']};
const VF='<svg class="vf" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M3 14V3h11M86 3h11v11M97 86v11H86M14 97H3V86" vector-effect="non-scaling-stroke"/><path d="M47 50h6M50 47v6" vector-effect="non-scaling-stroke"/></svg>';
const PLAY='<svg viewBox="0 0 24 24" class="i-play" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg><svg viewBox="0 0 24 24" class="i-pause" aria-hidden="true"><path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z" fill="currentColor"/></svg>';
/* render a component into a .km host. data: sid, img, w, h, sizes, alt-ar, alt-en */
function render(el){const d=el.dataset,k=d.kind||KIND[d.sid];if(!k||el.dataset.kmOn)return;el.dataset.kmOn='1';
 const sz=d.sizes||'(max-width:760px) 100vw, 50vw',ar=d.altAr||'',en=d.altEn||'';el.classList.add('km-'+k);
 if(k==='wp'){const[a,lar,len]=AUD[d.sid];
  const meters=d.sid==='sound-engineering';el.innerHTML=pic(d.img,+d.w,+d.h,sz,ar,en,'wp-bg')+(meters?`<div class="mtr" aria-hidden="true">${Array.from({length:8},(_,i)=>`<i style="--d:${(-(i*.37)%1.3).toFixed(2)}s;--s:${(0.9+(i%3)*.25).toFixed(2)}s"><b></b></i>`).join('')}</div>`:`<div class="eqz" aria-hidden="true">${Array.from({length:32},(_,i)=>`<i style="--d:${(-(i*.173)%1.1).toFixed(2)}s;--s:${(0.75+((i*7)%5)*.12).toFixed(2)}s;--h:${(0.35+Math.abs(Math.sin(i*.6))*.65).toFixed(2)}"></i>`).join('')}</div>`)+`<div class="wp" data-src="assets/audio/${a}" data-name-ar="${lar}" data-name-en="${len}">
  <button class="wp-btn" type="button">${PLAY}</button>
  <div class="wp-main"><div class="wp-top"><span class="wp-lbl">${BI(lar,len)}</span><span class="wp-time" dir="ltr"><b>0:00</b> / <span class="wp-dur">0:18</span></span></div>
  <div class="wp-wave" dir="ltr" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="18" aria-valuenow="0"><svg class="wp-s0" preserveAspectRatio="none" aria-hidden="true"></svg><svg class="wp-s1" preserveAspectRatio="none" aria-hidden="true"></svg><i class="wp-head" aria-hidden="true"></i></div></div></div>`;
  wp(el.querySelector('.wp'))}
 else if(k==='ba'){el.innerHTML=`<div class="ba" style="--x:50">${pic(d.img,+d.w,+d.h,sz,d.aAltAr||ar+' — بعد التلوين',d.aAltEn||en+' — after grading')}<div class="ba-before">${pic(d.before||d.img+'_before',+d.w,+d.h,sz,d.bAltAr||ar+' — قبل التلوين',d.bAltEn||en+' — before grading')}</div>
  <span class="ba-tag ba-b" aria-hidden="true">${BI(d.bAr||'قبل',d.bEn||'Before')}</span><span class="ba-tag ba-a" aria-hidden="true">${BI(d.aAr||'بعد',d.aEn||'After')}</span>
  <div class="ba-h" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6l-5 6 5 6M15 6l5 6-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></i></div></div>`;
  ba(el.querySelector('.ba'),d)}
 else if(k==='dev'){el.innerHTML=`<div class="dev" role="img"><div class="dev-lap"><div class="dev-scr"><img src="${P}${d.lap||'ui_laptop'}.webp" width="1000" height="${d.lapH||1289}" loading="lazy" decoding="async" alt=""></div><i class="dev-base"></i></div>
  <div class="dev-ph"><div class="dev-scr"><img src="${P}${d.ph||'ui_phone'}.webp" width="600" height="${d.phH||4003}" loading="lazy" decoding="async" alt=""></div></div></div>`;
  dev(el.querySelector('.dev'),ar,en)}
 else if(k==='vid'){el.innerHTML=vidHTML(true);vid(el,true)}
 else if(k==='mg'){el.innerHTML=`<canvas class="mg" role="img"></canvas>`;const c=el.querySelector('canvas');c.setAttribute('aria-label',T(ar,en));mg(el,c)}
 else if(k==='code'){el.innerHTML=`<div class="cd" role="img" aria-label="${document.documentElement.lang==='ar'?'محرّر كود يكتب موقع KEV':'Code editor writing the KEV website'}"><div class="dev-lap cd-lap"><div class="dev-scr cd-scr"><div class="cd-bar" aria-hidden="true"><i></i><i></i><i></i><span>index.html — KEV</span></div><div class="cd-body" aria-hidden="true"><pre class="cd-pre"><code></code></pre></div><div class="cd-ui" aria-hidden="true"><img src="${P}site_laptop-640.webp" width="640" height="1500" loading="lazy" decoding="async" alt=""></div></div><i class="dev-base"></i></div></div>`;code(el)}
 else if(k==='brand'){el.innerHTML=brandBoard();}
 else{el.innerHTML=pic(d.img,+d.w,+d.h,sz,ar,en)+(k==='vf'?VF:'')}
 if(d.tag!=='0'&&k!=='brand'&&k!=='vid'&&d.sid!=='sound-engineering'&&d.sid!=='voice-over')el.insertAdjacentHTML('beforeend',`<span class="ctag">${BI('تصوّر','Concept')}</span>`);
 if(k==='brand'){const b=el.querySelector('.bb');b.setAttribute('aria-label',T(ar||'هوية KEV: الشعار والألوان والتطبيقات',en||'KEV identity: logo, palette and applications'))}
 vis(el);labels(el)}
/* ---------- waveform player ---------- */
let cur=null;const fmt=s=>{s=Math.max(0,Math.round(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const peaksCache={};
function wp(w){const src=w.dataset.src,wave=w.querySelector('.wp-wave'),btn=w.querySelector('.wp-btn'),s0=w.querySelector('.wp-s0'),s1=w.querySelector('.wp-s1'),tb=w.querySelector('.wp-time b');
 let au=null,dur=18,raf=0,an=null,fd=null;const host=w.closest('.km'),bars=host?[...host.querySelectorAll('.mtr i,.eqz i')]:[];
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
 const meter=()=>{if(!an||!bars.length)return;an.getByteFrequencyData(fd);const n=fd.length,B=bars.length;
  for(let i=0;i<B;i++){const a=Math.floor(Math.pow(i/B,2)*n*.7)+1,b=Math.max(a+1,Math.floor(Math.pow((i+1)/B,2)*n*.7)+1);let m=0;for(let j=a;j<b;j++)m=Math.max(m,fd[j]);const v=Math.min(.97,Math.pow(m/255,2.4)*(1+i*.08));const o=+bars[i].dataset.v||0;const nv=v>o?v:o*.88+v*.12;bars[i].dataset.v=nv;bars[i].style.setProperty('--lv',nv.toFixed(3))}};
 const graph=a=>{if(an||!bars.length)return;try{const AC=window.AudioContext||window.webkitAudioContext;const ctx=new AC(),src=ctx.createMediaElementSource(a);an=ctx.createAnalyser();an.fftSize=1024;an.smoothingTimeConstant=.6;fd=new Uint8Array(an.frequencyBinCount);src.connect(an);an.connect(ctx.destination);w._ctx=ctx}catch(e){an=null}};
 const loop=()=>{if(au&&pend===null)set(au.currentTime);meter();raf=requestAnimationFrame(loop)};
 function stop(){w.classList.remove('on');w.closest('.km')?.classList.remove('playing','an');cancelAnimationFrame(raf);if(cur===api)cur=null;lab()}
 const api={pause(){if(au)au.pause();stop()}};w._api=api;
 function play(){if(cur&&cur!==api)cur.pause();cur=api;K.kvHush&&K.kvHush();const a=get();if(bars.length){a.crossOrigin='anonymous';graph(a);w._ctx&&w._ctx.state!=='running'&&w._ctx.resume()}ready.then(()=>a.play()).then(()=>{w.classList.add('on');w.closest('.km')?.classList.add('playing');an&&w.closest('.km')?.classList.add('an');cancelAnimationFrame(raf);loop();lab()}).catch(()=>stop())}
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

/* ---------- visibility: run animations only on screen ---------- */
let visIO=null;
function vis(el){if(!('IntersectionObserver' in window)){el.classList.add('live');el._live=true;return}
 visIO=visIO||new IntersectionObserver(es=>es.forEach(e=>{const t=e.target;t._live=e.isIntersecting&&!document.hidden;t.classList.toggle('live',t._live);if(t._live&&t._wake)t._wake()}),{rootMargin:'80px'});visIO.observe(el)}
document.addEventListener('visibilitychange',()=>document.querySelectorAll('.km').forEach(k=>{if(document.hidden){k._was=k._live;k._live=false;k.classList.remove('live')}else if(k._was){k._live=true;k.classList.add('live');k._wake&&k._wake()}}));
/* ---------- promo video (video & motion) ---------- */
const VS='assets/video/kev-promo',SPK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor"/><path class="s-on" d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path class="s-off" d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
function vidHTML(ctl){return `<div class="kv${ctl?' kv-ctl':''}"><i class="kv-bg" aria-hidden="true"></i><div class="kv-fr"><video class="kv-v" muted loop playsinline preload="none" poster="${VS}-poster.webp" width="720" height="1280" disablepictureinpicture></video><button class="kv-play" type="button" aria-label="Play video / تشغيل الفيديو"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg></button>${ctl?`<button class="kv-snd" type="button">${SPK}</button><button class="kv-full" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg><span>${BI('شاهد مع الصوت','Watch with sound')}</span></button>`:''}</div></div>`}
let vidIO=null;const vids=new Set();
function vid(host,ctl){const w=host.querySelector('.kv'),v=w.querySelector('video');let loaded=false;
 const load=()=>{if(loaded)return;loaded=true;v.innerHTML=`<source src="${VS}.webm" type="video/webm"><source src="${VS}.mp4" type="video/mp4">`;v.preload='auto';v.load()};
 let ok=false;w.querySelector('.kv-play').addEventListener('click',e=>{e.stopPropagation();ok=true;v.muted=!ctl?true:v.muted;load();v.play().then(()=>w.classList.add('on')).catch(()=>{})});
 const go=()=>{if(!ok||(RM.matches&&v.muted))return;load();v.play().then(()=>w.classList.add('on')).catch(()=>{})};
 w._in=false;w._go=go;w._stop=()=>{v.pause();w.classList.remove('on')};vids.add(w);
 const sync=()=>{w.classList.toggle('sound',!v.muted);w._lab&&w._lab()};
 w._lab=()=>{v.setAttribute('aria-label',T('فيديو موشن جرافيك لهوية KEV','KEV motion-graphics promo video'));const sb=w.querySelector('.kv-snd');if(sb){sb.setAttribute('aria-label',v.muted?T('تشغيل الصوت','Turn sound on'):T('كتم الصوت','Mute'));sb.setAttribute('aria-pressed',!v.muted)}};
 if(ctl){const unmute=full=>{vids.forEach(o=>{if(o!==w){const ov=o.querySelector('video');ov.muted=true;o.classList.remove('sound')}});if(cur)cur.pause();ok=true;if(full){v.currentTime=0}v.muted=false;load();v.play().then(()=>w.classList.add('on')).catch(()=>{});sync()};
  w.querySelector('.kv-snd').addEventListener('click',e=>{e.stopPropagation();if(v.muted)unmute(false);else{v.muted=true;sync()}});
  w.querySelector('.kv-full').addEventListener('click',e=>{e.stopPropagation();unmute(true)});
  v.addEventListener('click',()=>{if(v.muted)unmute(true);else if(v.paused){ok=true;go()}else{v.pause();w.classList.remove('on')}})}
 if(!('IntersectionObserver' in window)){go();sync();return}
 vidIO=vidIO||new IntersectionObserver(es=>es.forEach(e=>{const t=e.target;t._in=e.isIntersecting;if(t._in&&!document.hidden)t._go();else t._stop()}),{threshold:.35});vidIO.observe(w);sync()}
document.addEventListener('visibilitychange',()=>vids.forEach(w=>{if(!w.isConnected){vids.delete(w);return}if(document.hidden)w._stop();else if(w._in)w._go()}));
K.kvHush=()=>vids.forEach(o=>{const v=o.querySelector('video');if(v&&!v.muted){v.pause();v.muted=true;o.classList.remove('sound','on');o._lab&&o._lab()}});
K.kvCard=el=>{el.innerHTML=vidHTML(false);vid(el,false)};
/* ---------- motion graphics canvas (video & motion) ---------- */
function mg(host,c){const x=c.getContext('2d');let W=0,H=0,raf=0,t0=performance.now(),tp=0;
 const size=()=>{const r=c.getBoundingClientRect(),dp=Math.min(1.5,devicePixelRatio||1);W=r.width;H=r.height;c.width=Math.max(1,W*dp|0);c.height=Math.max(1,H*dp|0);x.setTransform(dp,0,0,dp,0,0)};
 const E=k=>k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2,P=8;
 function draw(t){const s=t%P,k=s/P;x.clearRect(0,0,W,H);
  const g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,'#060A1F');g.addColorStop(1,'#0B0F2E');x.fillStyle=g;x.fillRect(0,0,W,H);
  const gl=x.createRadialGradient(W*.7,H*.3,0,W*.7,H*.3,W*.6);gl.addColorStop(0,'rgba(119,57,247,.28)');gl.addColorStop(1,'rgba(119,57,247,0)');x.fillStyle=gl;x.fillRect(0,0,W,H);
  // perspective grid
  x.strokeStyle='rgba(18,217,232,.10)';x.lineWidth=1;const hz=H*.62;
  for(let i=-8;i<=8;i++){x.beginPath();x.moveTo(W/2+i*W*.02,hz);x.lineTo(W/2+i*W*.16,H);x.stroke()}
  for(let i=0;i<7;i++){const yy=hz+Math.pow((i+(t*.6)%1)/7,2)*(H-hz);x.beginPath();x.moveTo(0,yy);x.lineTo(W,yy);x.stroke()}
  // light trails
  for(let j=0;j<5;j++){const ph=t*.55+j*1.3,amp=H*(.08+j*.025),y0=H*(.28+j*.07);
   x.beginPath();for(let i=0;i<=40;i++){const u=i/40,xx=u*W,yy=y0+Math.sin(u*5+ph)*amp*Math.sin(u*Math.PI);i?x.lineTo(xx,yy):x.moveTo(xx,yy)}
   const lg=x.createLinearGradient(0,0,W,0);lg.addColorStop(0,'rgba(18,217,232,0)');lg.addColorStop(.5,j%2?'rgba(119,57,247,.9)':'rgba(18,217,232,.95)');lg.addColorStop(1,'rgba(37,139,255,0)');
   x.setLineDash([W*.18,W*.5]);x.lineDashOffset=-t*W*.35-j*90;x.strokeStyle=lg;x.lineWidth=6;x.globalAlpha=.18;x.stroke();x.lineWidth=2;x.globalAlpha=.95;x.stroke();x.globalAlpha=1}
  x.setLineDash([]);
  // kinetic shapes
  const sh=[[.22,.42,'#12D9E8',0],[.5,.5,'#7739F7',1],[.78,.4,'#258BFF',2]];
  sh.forEach(([px,py,col,ty],i)=>{const q=E((k*3+i/3)%1),sc=(.5+Math.sin((k*3+i/3)%1*Math.PI)*.6)*Math.min(W,H)*.09;x.save();x.translate(W*px+Math.sin(t+i)*W*.03,H*py+Math.cos(t*.8+i)*H*.04);x.rotate(q*Math.PI*(ty===1?-1:1));
   x.strokeStyle=col;x.lineWidth=2.5;x.fillStyle=col+'22';x.beginPath();
   if(ty===0)x.rect(-sc,-sc,sc*2,sc*2);else if(ty===1)x.arc(0,0,sc,0,Math.PI*2);else{x.moveTo(0,-sc);x.lineTo(sc*.95,sc*.7);x.lineTo(-sc*.95,sc*.7);x.closePath()}
   x.fill();x.stroke();x.restore()});
  // frame transition wipe every half loop
  const w=(s%(P/2))/(P/2);if(w>.82){const v=E((w-.82)/.18);x.fillStyle='rgba(18,217,232,.9)';for(let b=0;b<6;b++){const bw=W/6;x.fillRect(b*bw,0,bw*Math.max(0,Math.min(1,v*1.6-b*.12)),H)}}
  // viewfinder + rec
  x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=1.5;const m=Math.min(W,H)*.06,L=m*.9;
  [[m,m+26,1,1],[W-m,m+26,-1,1],[m,H-m*2.6,1,-1],[W-m,H-m*2.6,-1,-1]].forEach(([a,b,sx,sy])=>{x.beginPath();x.moveTo(a,b+L*sy);x.lineTo(a,b);x.lineTo(a+L*sx,b);x.stroke()});
  if((t%1.2)<.7){x.fillStyle='#FF4D5E';x.beginPath();x.arc(m+L*.45,m+26+L*.45,4,0,7);x.fill()}
  // timeline with keyframes + playhead
  const ty=H-m*1.5,tx0=m,tx1=W-m;x.fillStyle='rgba(255,255,255,.08)';x.fillRect(tx0,ty-9,tx1-tx0,18);
  x.fillStyle='rgba(18,217,232,.35)';x.fillRect(tx0,ty-9,(tx1-tx0)*k,18);
  [.08,.22,.37,.5,.64,.81,.93].forEach((u,i)=>{const kx=tx0+(tx1-tx0)*u,on=k>=u;x.save();x.translate(kx,ty);x.rotate(Math.PI/4);x.fillStyle=on?(i%2?'#7739F7':'#12D9E8'):'rgba(255,255,255,.35)';x.fillRect(-4.5,-4.5,9,9);x.restore()});
  const px=tx0+(tx1-tx0)*k;x.fillStyle='#fff';x.fillRect(px-1,ty-16,2,32);x.beginPath();x.moveTo(px-6,ty-22);x.lineTo(px+6,ty-22);x.lineTo(px,ty-15);x.fill();
  const f=Math.floor(s*25),tc='00:00:'+String(Math.floor(s)).padStart(2,'0')+':'+String(f%25).padStart(2,'0');
  x.font='600 12px ui-monospace,Menlo,Consolas,monospace';x.fillStyle='rgba(234,246,255,.85)';x.textAlign='right';x.fillText(tc,tx1,ty-18);x.textAlign='left'}
 const loop=n=>{if(!host._live){raf=0;return}tp=(n-t0)/1000;draw(tp);raf=requestAnimationFrame(loop)};
 host._wake=()=>{if(RM.matches){size();draw(2.6);return}if(!raf){t0=performance.now()-tp*1000;raf=requestAnimationFrame(loop)}};
 size();draw(2.6);if('ResizeObserver' in window)new ResizeObserver(()=>{size();draw(tp||2.6)}).observe(c)}
/* ---------- live code typing (web & app) ---------- */
const SRC=[['c','<!-- KEV · Khayyal Echo Vision -->\n'],['t','<section '],['a','class'],['p','='],['s','"hero"'],['t','>\n'],['t','  <h1>'],['x','Sound. Vision. '],['t','<span>'],['x','Imagination.'],['t','</span></h1>\n'],['t','  <a '],['a','class'],['p','='],['s','"btn"'],['t',' '],['a','href'],['p','='],['s','"#services"'],['t','>'],['x','Browse services'],['t','</a>\n</section>\n\n'],
 ['k','.hero'],['p',' {\n  '],['a','display'],['p',': '],['s','grid'],['p',';\n  '],['a','background'],['p',': '],['s','#080D28'],['p',';\n  '],['a','color'],['p',': '],['s','#12D9E8'],['p',';\n}\n\n'],
 ['k','const'],['p',' io = '],['k','new'],['f',' IntersectionObserver'],['p','(es =>\n  es.'],['f','forEach'],['p','(e => e.target.classList.'],['f','toggle'],['p','('],['s',"'in'"],['p',', e.isIntersecting)));\n'],
 ['f','document'],['p','.'],['f','querySelectorAll'],['p','('],['s',"'.rv'"],['p',').'],['f','forEach'],['p','(el => io.'],['f','observe'],['p','(el));']];
const escH=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function code(host){const cd=host.querySelector('.cd'),pre=host.querySelector('.cd-pre code'),body=host.querySelector('.cd-body'),ui=host.querySelector('.cd-ui');
 const total=SRC.reduce((a,[,t])=>a+t.length,0);let n=0,phase=0,hold=0,raf=0,last=0;
 const html=m=>{let o='',left=m;for(const[c,t]of SRC){if(left<=0)break;const part=t.slice(0,left);left-=part.length;o+=`<span class="k-${c}">${escH(part)}</span>`}return o+'<i class="cd-cur"></i>'};
 const paint=()=>{pre.innerHTML=html(n);const over=pre.offsetHeight-body.clientHeight;pre.style.transform=over>0?`translateY(${-over}px)`:'none'};
 const step=ts=>{if(!host._live){raf=0;return}const dt=Math.min(64,ts-(last||ts));last=ts;
  if(phase===0){n=Math.min(total,n+Math.max(1,Math.round(dt*.16)));paint();if(n>=total){phase=1;hold=0}}
  else if(phase===1){hold+=dt;if(hold>700){phase=2;hold=0;cd.classList.add('show')}}
  else if(phase===2){hold+=dt;if(hold>2600){phase=3;hold=0;cd.classList.remove('show')}}
  else{hold+=dt;if(hold>700){phase=0;n=0;paint()}}
  raf=requestAnimationFrame(step)};
 host._wake=()=>{if(RM.matches){n=total;paint();return}if(!raf){last=0;raf=requestAnimationFrame(step)}};
 n=RM.matches?total:Math.round(total*.55);paint()}
/* ---------- animated brand board (real KEV identity) ---------- */
function brandBoard(){const sw=[['#080D28','Deep Navy'],['#7739F7','Electric Violet'],['#258BFF','Digital Blue'],['#12D9E8','Cyan'],['#FFFFFF','White']];
 return `<div class="bb" role="img"><div class="bb-logo"><span class="bb-ring" aria-hidden="true"></span><img src="assets/brand/kev_primary-vertical_color.svg" width="300" height="300" alt="" loading="lazy" decoding="async"></div>
 <div class="bb-sw" aria-hidden="true">${sw.map(([h,n],i)=>`<div style="--c:${h};--i:${i}"><i></i><b>${n}</b><span>${h}</span></div>`).join('')}</div>
 <div class="bb-mk" aria-hidden="true">${['kev_cards','kev_sign','kev_hoodie'].map((m,i)=>`<picture style="--i:${i}"><source type="image/webp" srcset="${P}${m}-640.webp"><img src="${P}${m}-640.jpg" width="640" height="360" alt="" loading="lazy" decoding="async"></picture>`).join('')}</div>
 <div class="bb-type" aria-hidden="true"><b>Aa</b><span>Montserrat · Cairo</span></div></div>`}
function labels(r){(r||document).querySelectorAll('.wp,.ba,.dev,.kv').forEach(x=>x._lab&&x._lab());(r||document).querySelectorAll('.km img[data-alt-ar]').forEach(i=>i.alt=K.lang==='ar'?i.dataset.altAr:i.dataset.altEn)}
K.kmInit=(r=document)=>r.querySelectorAll('.km:not([data-km-on])').forEach(render);
document.addEventListener('kev:lang',()=>{if(cur)cur.pause();labels()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&cur)cur.pause()});
document.addEventListener('DOMContentLoaded',()=>{K.kmInit();document.querySelectorAll('.cthumb-v:not(:has(.kv))').forEach(K.kvCard)});
})();
