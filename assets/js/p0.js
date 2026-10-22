// Portfolio media: waveform audio players + one-at-a-time playback for all audio/video.
(function(){const fmt=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
document.addEventListener('play',e=>{document.querySelectorAll('audio,video').forEach(x=>{if(x!==e.target&&!x.muted)x.pause()})},true);
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.wf').forEach(w=>{
 const btn=w.querySelector('.wf-btn'),bars=w.querySelector('.wf-bars'),bs=[...bars.children],tb=w.querySelector('.wf-t b');let a=null;
 const lang=()=>document.documentElement.lang==='ar'?'ar':'en';
 const label=()=>btn.setAttribute('aria-label',btn.dataset['l'+(lang()==='ar'?'Ar':'En')]);label();
 new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 const get=()=>{if(a)return a;a=new Audio();a.preload='metadata';const s=w.dataset.src;a.src=a.canPlayType('audio/mp4')?s+'.m4a':s+'.mp3';document.body.appendChild(a);a.hidden=true;
  a.addEventListener('timeupdate',draw);a.addEventListener('play',()=>w.classList.add('on'));a.addEventListener('pause',()=>w.classList.remove('on'));a.addEventListener('ended',()=>{a.currentTime=0;draw()});return a};
 function draw(){const p=a.duration?a.currentTime/a.duration:0,k=Math.round(p*bs.length);bs.forEach((b,i)=>b.classList.toggle('p',i<k));tb.textContent=fmt(a.currentTime);bars.setAttribute('aria-valuenow',Math.floor(a.currentTime))}
 btn.addEventListener('click',()=>{const x=get();x.paused?x.play():x.pause()});
 const seek=p=>{const x=get();const go=()=>{x.currentTime=p*x.duration;draw()};x.duration?go():x.addEventListener('loadedmetadata',go,{once:true})};
 bars.addEventListener('click',e=>{const r=bars.getBoundingClientRect();let p=(e.clientX-r.left)/r.width;if(getComputedStyle(bars).direction==='rtl')p=1-p;seek(Math.min(1,Math.max(0,p)))});
 bars.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight',' ','Enter'].includes(e.key))return;e.preventDefault();const x=get();
  if(e.key===' '||e.key==='Enter'){btn.click();return}if(!x.duration)return;x.currentTime=Math.max(0,Math.min(x.duration,x.currentTime+(e.key==='ArrowRight'?5:-5)));draw()})})})})();
