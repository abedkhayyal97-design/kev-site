(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const root=document.documentElement,C=window.KEV_CONFIG;
const KEV=window.KEV={$, $$, store, C, lang:'ar'};
const L=a=>Array.isArray(a)?a[KEV.lang==='ar'?0:1]:a;KEV.L=L;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));KEV.esc=esc;const rich=s=>esc(s).replace(/\(([−-]\d+ LUFS)\)/g,'(<bdi dir="ltr">$1</bdi>)');KEV.rich=rich;
KEV.money=n=>'$'+Number(n).toLocaleString('en-US');
KEV.svc=id=>C.services.find(s=>s.id===id);
KEV.pkg=(sid,pid)=>{const s=KEV.svc(sid);return s&&s.packages.find(p=>p.id===pid)};
/* cart */
KEV.cart={get(){try{return JSON.parse(store.get('kev-cart')||'[]').filter(i=>KEV.pkg(i.s,i.p))}catch(e){return[]}},
 set(c){store.set('kev-cart',JSON.stringify(c));KEV.badge()},
 add(s,p){const c=this.get(),f=c.find(i=>i.s===s&&i.p===p);f?f.q=Math.min(9,(f.q||1)+1):c.push({s,p,q:1});this.set(c)},
 total(){return this.get().reduce((t,i)=>t+KEV.pkg(i.s,i.p).price*i.q,0)}};
KEV.badge=()=>{const n=KEV.cart.get().reduce((t,i)=>t+i.q,0);$$('.cartcount').forEach(b=>{b.textContent=n;b.hidden=!n})};
KEV.exBadge=()=>'';
KEV.filled=v=>!!v&&!/FILL_ME/.test(v);
/* language */
function setLang(l){KEV.lang=l;root.lang=l;root.dir=l==='ar'?'rtl':'ltr';store.set('kev-lang',l);
 const b=$('#lang');if(b){b.textContent=l==='ar'?'EN':'ع';b.setAttribute('aria-label',l==='ar'?'Switch to English':'التبديل إلى العربية')}
 document.querySelectorAll('img[data-alt-ar]').forEach(i=>i.alt=l==='ar'?i.dataset.altAr:i.dataset.altEn);
 const t=root.dataset['title'+(l==='ar'?'Ar':'En')];if(t)document.title=t;const dd=root.dataset['desc'+(l==='ar'?'Ar':'En')],md=document.querySelector('meta[name=description]');if(dd&&md)md.setAttribute('content',dd);
 document.dispatchEvent(new CustomEvent('kev:lang',{detail:l}))}
KEV.setLang=setLang;
/* start at the top: no browser scroll restoration; honour a deliberate #anchor; smooth scrolling only after load */
function toStart(){const h=window.__kevHash||'';let t=null;try{t=h&&document.getElementById(decodeURIComponent(h.slice(1)))}catch(e){}if(t)t.scrollIntoView({behavior:'instant',block:'start'});else window.scrollTo({top:0,left:0,behavior:'instant'})}
addEventListener('load',()=>{toStart();requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.add('smooth')))});
addEventListener('pageshow',e=>{if(e.persisted){window.__kevHash='';root.classList.remove('smooth');toStart();requestAnimationFrame(()=>root.classList.add('smooth'))}});
/* theme */
const curDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
function syncDark(){root.classList.toggle('is-dark',curDark())}
function setTheme(t){root.dataset.theme=t;syncDark();const s=$('#themeSw');if(s)s.setAttribute('aria-checked',t==='dark');document.dispatchEvent(new Event('kev:theme'))}
syncDark();matchMedia('(prefers-color-scheme:dark)').addEventListener?.('change',syncDark);
document.addEventListener('DOMContentLoaded',()=>{
 if(!window.__kevHash)window.scrollTo({top:0,left:0,behavior:'instant'});
 const y=$('#yr');if(y)y.textContent=new Date().getFullYear();
 $('#lang')?.addEventListener('click',()=>setLang(KEV.lang==='ar'?'en':'ar'));
 $('#lang2')?.addEventListener('click',()=>setLang(KEV.lang==='ar'?'en':'ar'));
 const sw=$('#themeSw');if(sw){sw.setAttribute('aria-checked',curDark());sw.addEventListener('click',()=>{const t=curDark()?'light':'dark';setTheme(t);store.set('kev-theme',t)})}
 const m=$('#menu'),dr=$('#drawer'),bk=$('#drback');let last=null;
 const open=()=>{last=document.activeElement;dr.hidden=bk.hidden=false;requestAnimationFrame(()=>requestAnimationFrame(()=>{if(m.getAttribute('aria-expanded')==='true'){dr.classList.add('on');bk.classList.add('on')}}));m.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';setTimeout(()=>$('#drclose').focus(),60)};
 const close=()=>{dr.classList.remove('on');bk.classList.remove('on');m.setAttribute('aria-expanded','false');document.body.style.overflow='';const done=()=>{if(!dr.classList.contains('on'))dr.hidden=bk.hidden=true};matchMedia('(prefers-reduced-motion: reduce)').matches?done():setTimeout(done,460);last&&last.focus()};
 if(m&&dr){m.addEventListener('click',open);$('#drclose').addEventListener('click',close);bk.addEventListener('click',close);
  dr.addEventListener('click',e=>{if(e.target.closest('.dr-nav a'))close()});
  document.addEventListener('keydown',e=>{if(dr.hidden)return;if(e.key==='Escape'){close();return}
   if(e.key==='Tab'){const f=[...dr.querySelectorAll('a,button')].filter(x=>x.offsetParent);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}})}
 const st=store.get('kev-theme');if(st)setTheme(st);
 const sl=store.get('kev-lang');setLang(sl||(navigator.language&&!/^ar/i.test(navigator.language)?'en':'ar'));
 KEV.badge();
 $$('[data-email]').forEach(a=>{if(!KEV.filled(C.email)){(a.closest('.direct,p,li')||a).hidden=true;return}a.href='mailto:'+C.email;a.textContent=C.email});
});
})();
