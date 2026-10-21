
(()=>{
const K=window.KEV,{$,$$}=K,root=document.documentElement;
/* ---------- i18n ---------- */
const EN={skip:'Skip to content',n1:'Studio',n2:'Work',n3:'Process',n4:'Engineering',n5:'Contact',
h1:'Sound. Picture. Craft. Code.',lead:'KEV (Khayyal) is an integrated digital production studio. We design sound, video and identity, and build the software that runs them, as one team.',
m1:'Sound',m2:'Picture',m3:'Craft',m4:'Code',cta1:'Browse services',cta2:'See the work',tone:'Play tone',
s1:'Four skills, one team',s1p:'We never hand a file to one party and move on to another. Sound, picture, design and code are built together, so the result holds up.',
p1:'Sound',p1p:'From first idea to final master.',p1a:'Podcasts and voice-over',p1b:'Sonic identity and music',p1c:'Mixing and sound design',
p2:'Picture',p2p:'Video people watch to the end.',p2a:'Ads and documentaries',p2b:'Editing and motion',p2c:'Shooting and grading',
p3:'Craft',p3p:'An identity that recognises itself at every touchpoint.',p3a:'Visual identity',p3b:'Interface design',p3c:'Illustration',
p4:'Code',p4p:'Software that is fast, secure and maintainable.',p4a:'Websites and apps',p4b:'Internal production tools',p4c:'Systems and integrations',
w1:'Selected work',w1p:'Illustrative samples. Replace them with your real projects.',fa:'All',
r1:'How we work',r2:'Understand',r2p:'One session to set the goal, the audience and what success looks like.',r3:'Design',r3p:'Drafts you can judge by eye and ear, not a description on paper.',r4:'Build',r4p:'Production and engineering with weekly reviews and live preview links.',r5:'Deliver',r5p:'Clean files, documentation and training, with support after launch.',
e1:'We code the way we produce: precisely',e1p:'This site is itself an example of our standard: no frameworks, no libraries, no tracking.',
f1:'Accessible to everyone',f1p:'Full keyboard navigation, considered contrast, and respect for the reduced-motion setting.',
f2:'Arabic and English, natively',f2p:'Direction, fonts and spacing all switch, not a surface-level translation.',
f3:'Light and fast',f3p:'No dependencies. Drawing stops when you leave the page or the tab is hidden.',
f4:'Adapts to the device',f4p:'Light and dark to match the system, phone and large screens at equal quality.',
c1:'Let’s build something together',c1p:'Tell us what you want to achieve. We reply within one working day.',
l1:'Name',l2:'Email',l3:'Project type',l4:'Details',send:'Send message',foot:'Made with care in a single file.'};
const AR={};$$('[data-i]').forEach(n=>{AR[n.dataset.i]??=n.innerHTML});
const MSG={ar:{e1:'اكتب اسمك.',e2:'اكتب بريداً صحيحاً، مثل name@company.com.',e3:'اكتب بضع كلمات عن مشروعك.',ok:'تم تجهيز رسالتك في تطبيق البريد. اضغط إرسال هناك.'},
en:{e1:'Enter your name.',e2:'Enter a valid email, like name@company.com.',e3:'Write a few words about your project.',ok:'Your message is ready in your mail app. Press send there.'}};
let lang='ar';
function applyLang(l){lang=l;$$('[data-i]').forEach(n=>{const k=n.dataset.i;if(EN[k]!==undefined)n.innerHTML=l==='ar'?AR[k]:EN[k]});drawWorks()}
document.addEventListener('kev:lang',e=>applyLang(e.detail));
/* ---------- work ---------- */
const WORKS=[
 {c:'sound',t:['بودكاست سلسلة “صدى”','“Echo” podcast series'],d:['ثمان حلقات، هوية صوتية كاملة ومزج.','Eight episodes, full sonic identity and mix.']},
 {c:'vision',t:['فيلم تعريفي لشركة طاقة','Corporate film for an energy firm'],d:['كتابة وتصوير ومونتاج وموشن.','Script, shoot, edit and motion.']},
 {c:'art',t:['هوية منصة تعليمية','Learning platform identity'],d:['شعار ونظام ألوان ودليل استخدام.','Logo, colour system and guidelines.']},
 {c:'code',t:['لوحة إدارة محتوى','Content management dashboard'],d:['تطبيق ويب يدير الإنتاج من الطلب إلى التسليم.','A web app running production from request to delivery.']},
 {c:'vision',t:['حملة مرئية لمعرض','Exhibition video campaign'],d:['ثلاثة إعلانات قصيرة ومحتوى للتواصل.','Three short spots plus social content.']},
 {c:'code',t:['موقع مؤسسي ثنائي اللغة','Bilingual corporate site'],d:['سريع ومتاح، عربي وإنجليزي بالكامل.','Fast, accessible, fully Arabic and English.']}];
const TAG={sound:['صوت','Sound'],vision:['صورة','Picture'],art:['فن','Craft'],code:['برمجة','Code']};
let filt='all';
function art(c,i){const p=(i*37)%60;let g='';
 if(c==='sound')for(let k=0;k<22;k++){const h=10+Math.abs(Math.sin(k*.6+i))*70;g+=`<rect x="${20+k*17}" y="${100-h/2}" width="9" height="${h}" rx="4.5" fill="#12D9E8" opacity="${.35+k%3*.3}"/>`}
 if(c==='vision')g=`<rect x="60" y="30" width="260" height="140" rx="4" fill="none" stroke="#B4BEEB" stroke-width="3"/><path d="M180 70v60l45-30z" fill="#12D9E8"/><path d="M60 50v-20h20M320 50V30h-20M60 150v20h20M320 150v20h-20" fill="none" stroke="#12D9E8" stroke-width="4"/>`;
 if(c==='art')g=`<circle cx="${150+p}" cy="100" r="62" fill="#7739F7" opacity=".85"/><circle cx="${230-p/2}" cy="100" r="62" fill="#258BFF" opacity=".8"/><circle cx="190" cy="100" r="40" fill="#12D9E8" opacity=".9"/>`;
 if(c==='code')for(let y=0;y<6;y++)for(let x=0;x<14;x++){if((x*7+y*3+i)%5<2)g+=`<rect x="${34+x*24}" y="${26+y*26}" width="16" height="16" rx="2" fill="${(x+y)%4?'#258BFF':'#12D9E8'}"/>`}
 return `<svg class="art" viewBox="0 0 380 200" role="img" aria-label="${TAG[c][lang==='ar'?0:1]}">${g}</svg>`}
function drawWorks(){$('#works').innerHTML=WORKS.map((w,i)=>`<li class="work" ${filt!=='all'&&w.c!==filt?'hidden':''}>${art(w.c,i)}<div class="txt"><small>${TAG[w.c][lang==='ar'?0:1]}</small><h3>${w.t[lang==='ar'?0:1]}</h3><p>${w.d[lang==='ar'?0:1]}</p></div></li>`).join('')}
$$('.filters button').forEach(b=>b.onclick=()=>{filt=b.dataset.f;$$('.filters button').forEach(x=>x.setAttribute('aria-pressed',x===b));drawWorks()});

/* ---------- signal canvas: one surface, four disciplines ---------- */
const cv=$('#cv'),g=cv.getContext('2d');let W=0,H=0,mode='sound',mx=.5,my=.5,tx=.5,ty=.5,run=true,vis=true,col={};
const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
function readColors(){col={cy:'#12D9E8',bl:'#258BFF',vi:'#7739F7',mu:'#B4BEEB'};if(still)frame(performance.now())}
function fit(){const d=Math.min(devicePixelRatio||1,2),r=cv.getBoundingClientRect();W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);if(still)frame(0)}
new ResizeObserver(fit).observe(cv);
const draw={
 sound(t){const n=5;for(let i=0;i<n;i++){g.beginPath();const amp=H*(.08+.3*(1-my))*(1-i*.15),f=2+mx*14+i*.6;
  for(let x=0;x<=W;x+=3){const e=Math.sin(x/W*Math.PI),y=H/2+Math.sin(x/W*f*Math.PI*2+t*(1+i*.3))*amp*e;x?g.lineTo(x,y):g.moveTo(x,y)}
  g.strokeStyle=i?col.bl:col.cy;g.globalAlpha=i?.18+.1*(n-i)/n:1;g.lineWidth=i?1.5:2.5;g.stroke()}g.globalAlpha=1},
 vision(t){const cx=W*mx,cy=H*my,r=Math.min(W,H)*.22;g.strokeStyle=col.mu;g.lineWidth=1;
  for(let i=1;i<=4;i++){g.globalAlpha=.5/i;g.beginPath();g.arc(cx,cy,r*i*.6+Math.sin(t*2+i)*3,0,7);g.stroke()}g.globalAlpha=1;
  g.strokeStyle=col.cy;g.lineWidth=3;const L=26,m=18;[[m,m,1,1],[W-m,m,-1,1],[m,H-m,1,-1],[W-m,H-m,-1,-1]].forEach(([x,y,a,b])=>{g.beginPath();g.moveTo(x+a*L,y);g.lineTo(x,y);g.lineTo(x,y+b*L);g.stroke()});
  g.beginPath();g.moveTo(cx-14,cy);g.lineTo(cx+14,cy);g.moveTo(cx,cy-14);g.lineTo(cx,cy+14);g.stroke();
  const sy=(t*60)%H;g.fillStyle=col.cy;g.globalAlpha=.12;g.fillRect(0,sy,W,3);g.globalAlpha=1},
 art(t){const cols=[col.vi,col.bl,col.cy];for(let k=0;k<3;k++){g.beginPath();for(let i=0;i<=240;i++){const a=i/240*Math.PI*2,A=2+k+mx*3,B=3+k+my*3;
  const x=W/2+Math.sin(A*a+t*.5)*W*.38,y=H/2+Math.sin(B*a+t*.35+k)*H*.38;i?g.lineTo(x,y):g.moveTo(x,y)}
  g.strokeStyle=cols[k];g.lineWidth=2.5-k*.4;g.globalAlpha=.9;g.stroke()}g.globalAlpha=1},
 code(t){const s=Math.max(18,Math.min(W,H)/12),cxn=Math.ceil(W/s),cyn=Math.ceil(H/s);
  for(let y=0;y<cyn;y++)for(let x=0;x<cxn;x++){const dx=(x+.5)*s-W*mx,dy=(y+.5)*s-H*my,d=Math.hypot(dx,dy),k=Math.max(0,1-d/(s*5)),p=(Math.sin(x*.7+y*.5+t*1.5)+1)/2;
   const sz=s*(.14+.62*Math.max(k,p*.18));g.fillStyle=k>.4?col.cy:col.bl;g.globalAlpha=.25+.75*Math.max(k,p*.3);g.fillRect((x+.5)*s-sz/2,(y+.5)*s-sz/2,sz,sz)}g.globalAlpha=1}};
function frame(ms){mx+=(tx-mx)*.12;my+=(ty-my)*.12;g.clearRect(0,0,W,H);draw[mode](ms/1000);
 $('#cap2').textContent=`x ${mx.toFixed(2)} · y ${my.toFixed(2)}`;if(aud)aud.f.value=110*Math.pow(2,mx*3)}
function loop(ms){if(run&&vis&&!still)frame(ms);requestAnimationFrame(loop)}
cv.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();tx=(e.clientX-r.left)/r.width;ty=(e.clientY-r.top)/r.height;if(still)frame(0)});
cv.addEventListener('keydown',e=>{});
document.addEventListener('visibilitychange',()=>vis=!document.hidden);
new IntersectionObserver(es=>run=es[0].isIntersecting).observe(cv);
$$('.modes button').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;$$('.modes button').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#cap1').textContent='mode: '+mode;cv.setAttribute('aria-label',b.textContent);if(still)frame(0)});
/* keyboard control for the canvas */
cv.tabIndex=0;cv.addEventListener('keydown',e=>{const s=.05;({ArrowLeft:()=>tx-=s,ArrowRight:()=>tx+=s,ArrowUp:()=>ty-=s,ArrowDown:()=>ty+=s})[e.key]?.();tx=Math.min(1,Math.max(0,tx));ty=Math.min(1,Math.max(0,ty));if(/Arrow/.test(e.key))e.preventDefault();if(still)frame(0)});

/* ---------- optional tone (WebAudio, only on click) ---------- */
let aud=null;
$('#tone').onclick=function(){
 if(aud){aud.o.stop();aud.c.close();aud=null;this.setAttribute('aria-pressed','false');this.innerHTML=lang==='ar'?AR.tone:EN.tone;return}
 const c=new (window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),v=c.createGain();
 o.type='sine';v.gain.value=.05;o.connect(v).connect(c.destination);o.start();aud={c,o,f:o.frequency};
 this.setAttribute('aria-pressed','true');this.textContent=lang==='ar'?'إيقاف النغمة':'Stop tone'};

/* ---------- form ---------- */
$('#form').addEventListener('submit',e=>{e.preventDefault();const m=MSG[lang],n=$('#fn'),em=$('#fe'),t=$('#fm');
 const chk=[[n,n.value.trim().length>1,'#e1','e1'],[em,/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()),'#e2','e2'],[t,t.value.trim().length>9,'#e3','e3']];
 let ok=true,first=null;chk.forEach(([el,v,sel,k])=>{el.setAttribute('aria-invalid',!v);$(sel).textContent=v?'':m[k];if(!v){ok=false;first??=el}});
 if(!ok){first.focus();$('#status').textContent='';return}
 const body=`${t.value.trim()}\n\n— ${n.value.trim()} <${em.value.trim()}>`;
 location.href=`mailto:${K.C.email}?subject=${encodeURIComponent('['+$('#ft').value+'] '+n.value.trim())}&body=${encodeURIComponent(body)}`;
 $('#status').textContent=m.ok});

readColors();drawWorks();fit();applyLang(K.lang);requestAnimationFrame(loop);
})();
