(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};
const root=document.documentElement,C=window.KEV_CONFIG;
const KEV=window.KEV={$, $$, store, C, lang:'ar'};
const L=a=>Array.isArray(a)?a[KEV.lang==='ar'?0:1]:a;KEV.L=L;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));KEV.esc=esc;
KEV.money=n=>'$'+Number(n).toLocaleString('en-US')+' / '+n.toLocaleString('en-US')+' USDT';
KEV.svc=id=>C.services.find(s=>s.id===id);
KEV.pkg=(sid,pid)=>{const s=KEV.svc(sid);return s&&s.packages.find(p=>p.id===pid)};
/* cart */
KEV.cart={get(){try{return JSON.parse(store.get('kev-cart')||'[]').filter(i=>KEV.pkg(i.s,i.p))}catch(e){return[]}},
 set(c){store.set('kev-cart',JSON.stringify(c));KEV.badge()},
 add(s,p){const c=this.get(),f=c.find(i=>i.s===s&&i.p===p);f?f.q=Math.min(9,(f.q||1)+1):c.push({s,p,q:1});this.set(c)},
 total(){return this.get().reduce((t,i)=>t+KEV.pkg(i.s,i.p).price*i.q,0)}};
KEV.badge=()=>{const n=KEV.cart.get().reduce((t,i)=>t+i.q,0);$$('.cartcount').forEach(b=>{b.textContent=n;b.hidden=!n})};
KEV.exBadge=()=>C.examplePrices?`<span class="badge">${KEV.lang==='ar'?'سعر تجريبي':'Example price'}</span>`:'';
/* language */
function setLang(l){KEV.lang=l;root.lang=l;root.dir=l==='ar'?'rtl':'ltr';store.set('kev-lang',l);
 const b=$('#lang');if(b){b.textContent=l==='ar'?'EN':'ع';b.setAttribute('aria-label',l==='ar'?'Switch to English':'التبديل إلى العربية')}
 const t=root.dataset['title'+(l==='ar'?'Ar':'En')];if(t)document.title=t;
 document.dispatchEvent(new CustomEvent('kev:lang',{detail:l}))}
KEV.setLang=setLang;
/* theme */
const curDark=()=>root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
function setTheme(t){root.dataset.theme=t;document.dispatchEvent(new Event('kev:theme'))}
document.addEventListener('DOMContentLoaded',()=>{
 const y=$('#yr');if(y)y.textContent=new Date().getFullYear();
 $('#lang')?.addEventListener('click',()=>setLang(KEV.lang==='ar'?'en':'ar'));
 $('#theme')?.addEventListener('click',()=>{const t=curDark()?'light':'dark';setTheme(t);store.set('kev-theme',t)});
 const m=$('#menu'),nav=$('#nav');m?.addEventListener('click',()=>{const o=nav.classList.toggle('open');m.setAttribute('aria-expanded',o)});
 const st=store.get('kev-theme');if(st)setTheme(st);
 const sl=store.get('kev-lang');setLang(sl||(navigator.language&&!/^ar/i.test(navigator.language)?'en':'ar'));
 KEV.badge();
 $$('[data-email]').forEach(a=>{a.href='mailto:'+C.email;a.textContent=C.email});
});
})();
