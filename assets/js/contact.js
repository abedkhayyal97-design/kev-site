// Contact form: bilingual validation + honeypot, then AJAX POST to FormSubmit.co.
// Success -> thanks.html. Failure -> bilingual error with WhatsApp/email alternatives. No mailto fallback.
// Without JS the form still works as a native POST (action + _next).
document.addEventListener('DOMContentLoaded',()=>{const K=window.KEV,{$}=K,T=(a,e)=>K.lang==='ar'?a:e,f=$('#cf');if(!f)return;
const THX=new URL('thanks.html',location.href).href,nx=$('#k-next');if(nx)nx.value=THX;
const n=$('#kn'),em=$('#ke'),m=$('#km'),st=$('#k-st'),b=f.querySelector('[type=submit]');
const chk=(el,ok,msg)=>{el.setAttribute('aria-invalid',!ok);$('#'+el.id+'-e').textContent=ok?'':msg;return ok};
const rules=[[n,()=>n.value.trim().length>1,()=>T('اكتب اسمك (حرفان على الأقل).','Enter your name (at least 2 characters).')],
 [em,()=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()),()=>T('اكتب بريداً إلكترونياً صحيحاً، مثل name@example.com.','Enter a valid email, e.g. name@example.com.')],
 [m,()=>m.value.trim().length>9,()=>T('اكتب رسالة من 10 أحرف على الأقل.','Write a message of at least 10 characters.')]];
rules.forEach(([el,ok,msg])=>el.addEventListener('blur',()=>{if(el.value)chk(el,ok(),msg())}));
const fail=()=>{st.className='bad';st.innerHTML=T('تعذّر إرسال الرسالة الآن. تواصل معنا مباشرة عبر <a href="https://wa.me/963995404257" target="_blank" rel="noopener">واتساب</a> أو على <a href="mailto:abed.khayyal97@gmail.com">abed.khayyal97@gmail.com</a>.',
 'Your message could not be sent right now. Please reach us directly on <a href="https://wa.me/963995404257" target="_blank" rel="noopener">WhatsApp</a> or at <a href="mailto:abed.khayyal97@gmail.com">abed.khayyal97@gmail.com</a>.');b.disabled=false};
f.addEventListener('submit',async e=>{e.preventDefault();st.className='';
 const r=rules.map(([el,ok,msg])=>chk(el,ok(),msg()));
 if(r.includes(false)){st.className='bad';st.textContent=T('راجع الحقول المظلّلة.','Please check the highlighted fields.');f.querySelector('[aria-invalid="true"]').focus();return}
 if($('#k-hp').value){location.href=THX;return}
 b.disabled=true;st.className='ok';st.textContent=T('جارٍ الإرسال…','Sending…');
 try{const fd=new FormData(f);fd.set('_replyto',em.value.trim());
  const res=await fetch(f.dataset.ajax||f.action.replace('formsubmit.co/','formsubmit.co/ajax/'),{method:'POST',headers:{Accept:'application/json'},body:fd});
  const j=await res.json().catch(()=>({}));window.KEV_LAST_FS=j;
  if(res.ok&&(j.success===true||j.success==='true')){location.href=THX;return}
  if(res.ok&&/activat/i.test(j.message||'')){location.href=THX+'?activation=1';return}
  fail()}catch(err){fail()}})});
