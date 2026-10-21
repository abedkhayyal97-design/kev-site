(()=>{const K=window.KEV,{$,$$,C,L,esc,store}=K;const P=C.payment;
const T=(a,e)=>K.lang==='ar'?a:e;
const filled=v=>v&&!/^FILL_ME/.test(v);
let order=null;try{order=JSON.parse(store.get('kev-order')||'null')}catch(e){}
function ref(){const d=new Date(),p=n=>String(n).padStart(2,'0'),a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let r='';const b=new Uint32Array(5);crypto.getRandomValues(b);b.forEach(x=>r+=a[x%a.length]);return `KEV-${String(d.getFullYear()).slice(2)}${p(d.getMonth()+1)}${p(d.getDate())}-${r}`}
function lines(o){return o.items.map(i=>{const s=K.svc(i.s),p=K.pkg(i.s,i.p);return {name:L(s.name)+' — '+L(p.name),q:i.q,price:p.price*i.q}}).filter(Boolean)}
function summary(items){const t=items.reduce((a,i)=>a+K.pkg(i.s,i.p).price*i.q,0),dep=Math.round(t*P.depositPercent)/100;
 return {t,dep,html:`<table class="t"><caption class="sr">${T('ملخص الطلب','Order summary')}</caption><tbody>${items.map(i=>{const s=K.svc(i.s),p=K.pkg(i.s,i.p);return `<tr><td>${esc(L(s.name))} — ${esc(L(p.name))} × ${i.q}</td><td class="num">$${p.price*i.q}</td></tr>`}).join('')}</tbody>
 <tfoot><tr><th>${T('المجموع','Total')}</th><th class="num">${K.money(t)}</th></tr>${P.depositPercent<100?`<tr><th>${T('الدفعة المقدّمة الآن','Deposit due now')} (${P.depositPercent}%)</th><th class="num">${K.money(dep)}</th></tr>`:''}</tfoot></table>${K.exBadge()}`}}
function step(n){$$('.steps li').forEach((li,i)=>i===n-1?li.setAttribute('aria-current','step'):li.removeAttribute('aria-current'));['#s1','#s2','#s3'].forEach((x,i)=>$(x).hidden=i!==n-1)}
function render(){const items=order&&order.stage>1?order.items:K.cart.get();
 if(!items.length){$('#co').innerHTML=`<div class="panel"><p>${T('سلتك فارغة.','Your cart is empty.')}</p><p><a class="btn" href="services.html">${T('تصفّح الخدمات','Browse services')}</a></p></div>`;return}
 const s=summary(items);$$('.sum').forEach(e=>e.innerHTML=s.html);
 if(order&&order.stage>=2){fillPay();step(order.stage)}else step(1)}
function fillPay(){$('#p-ref').textContent=order.ref;$('#p-amt').textContent=K.money(order.dep);$('#p-method').textContent=T(order.methodAr,order.methodEn);$('#f2btn').hidden=!C.formEndpoint&&!filled(C.email)}
function err(el,ok,msg){el.setAttribute('aria-invalid',!ok);$('#'+el.id+'-e').textContent=ok?'':msg;return ok}
document.addEventListener('DOMContentLoaded',()=>{
 $('#f1').addEventListener('submit',e=>{e.preventDefault();const n=$('#cn'),em=$('#ce'),ag=$('#cag');
  const ok=[err(n,n.value.trim().length>1,T('اكتب اسمك.','Enter your name.')),err(em,/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()),T('اكتب بريداً صحيحاً.','Enter a valid email.')),err(ag,ag.checked,T('يجب الموافقة على الشروط.','You must accept the terms.'))];
  if(ok.includes(false)){$$('#f1 [aria-invalid="true"]')[0].focus();return}
  const items=K.cart.get(),s=summary(items);
  order={ref:ref(),stage:2,items,total:s.t,dep:s.dep,method:$('#pm').value,methodAr:$('#pm').selectedOptions[0].dataset.ar,methodEn:$('#pm').selectedOptions[0].dataset.en,name:n.value.trim(),email:em.value.trim(),contact:$('#cc').value.trim(),notes:$('#cnotes').value.trim(),lang:K.lang,date:new Date().toISOString()};
  store.set('kev-order',JSON.stringify(order));fillPay();step(2);$('#s2 h2').focus()});
 $('#back').addEventListener('click',()=>{order.stage=1;store.set('kev-order',JSON.stringify(order));order=null;store.set('kev-order','null');step(1)});
 $$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const t=$(b.dataset.copy).textContent;try{await navigator.clipboard.writeText(t);$('#copy-st').textContent=T('تم النسخ.','Copied.')}catch(e){$('#copy-st').textContent=T('انسخ يدوياً.','Copy manually.')}}));
 $('#f2').addEventListener('submit',async e=>{e.preventDefault();order.stage=3;const it=lines(order);
  const body=[`Order: ${order.ref}`,`Date: ${order.date}`,`Name: ${order.name}`,`Email: ${order.email}`,`Contact: ${order.contact||'-'}`,'',...it.map(i=>`- ${i.name} x${i.q}: $${i.price}`),'',`Total: $${order.total}`,`Deposit (${P.depositPercent}%): $${order.dep}`,`Preferred payment method: ${order.methodEn}`,'',`Notes: ${order.notes||'-'}`].join('\n');
  const st=$('#send-st');st.textContent=T('جارٍ الإرسال…','Sending…');let sent=false;
  if(C.formEndpoint){try{const r=await fetch(C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({_subject:`New order ${order.ref}`,email:order.email,ref:order.ref,message:body})});sent=r.ok}catch(x){}}
  if(!sent&&!filled(C.email)){st.textContent=T('تعذّر إرسال الطلب حالياً. حاول لاحقاً.','We couldn’t send your order right now. Please try again later.');return}
  if(!sent&&filled(C.email)){location.href=`mailto:${C.email}?subject=${encodeURIComponent('KEV order '+order.ref)}&body=${encodeURIComponent(body)}`}
  store.set('kev-order',JSON.stringify(order));K.cart.set([]);$('#d-ref').textContent=order.ref;$('#d-mode').textContent=sent?T('أُرسل طلبك إلينا.','Your order was sent to us.'):filled(C.email)?T('فُتح تطبيق البريد برسالة جاهزة، اضغط «إرسال» هناك لإكمال الطلب.','Your mail app opened with the order ready. Press send there to complete it.'):'';
  st.textContent='';step(3);$('#s3 h2').focus()});
 $('#neworder').addEventListener('click',()=>{store.set('kev-order','null');order=null;location.href='services.html'});
});
document.addEventListener('kev:lang',()=>{$$('#pm option').forEach(o=>o.textContent=K.lang==='ar'?o.dataset.ar:o.dataset.en);render()});
})();
