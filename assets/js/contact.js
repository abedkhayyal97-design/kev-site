// Contact form: client-side validation, honeypot, then a normal POST to FormSubmit.co which redirects to thanks.html.
document.addEventListener('DOMContentLoaded',()=>{const K=window.KEV,{$}=K,T=(a,e)=>K.lang==='ar'?a:e,f=$('#cf');if(!f)return;
const nx=$('#k-next');if(nx)nx.value=new URL('thanks.html',location.href).href;
const n=$('#kn'),em=$('#ke'),m=$('#km'),st=$('#k-st');
const chk=(el,ok,msg)=>{el.setAttribute('aria-invalid',!ok);$('#'+el.id+'-e').textContent=ok?'':msg;return ok};
const rules=[[n,()=>n.value.trim().length>1,()=>T('اكتب اسمك (حرفان على الأقل).','Enter your name (at least 2 characters).')],
 [em,()=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()),()=>T('اكتب بريداً إلكترونياً صحيحاً، مثل name@example.com.','Enter a valid email, e.g. name@example.com.')],
 [m,()=>m.value.trim().length>9,()=>T('اكتب رسالة من 10 أحرف على الأقل.','Write a message of at least 10 characters.')]];
rules.forEach(([el,ok,msg])=>el.addEventListener('blur',()=>{if(el.value)chk(el,ok(),msg())}));
f.addEventListener('submit',e=>{e.preventDefault();st.className='';
 const r=rules.map(([el,ok,msg])=>chk(el,ok(),msg()));
 if(r.includes(false)){st.className='bad';st.textContent=T('راجع الحقول المظلّلة.','Please check the highlighted fields.');f.querySelector('[aria-invalid="true"]').focus();return}
 if($('#k-hp').value){st.textContent=T('شكراً!','Thank you!');return}
 const b=f.querySelector('[type=submit]');b.disabled=true;st.className='ok';st.textContent=T('جارٍ الإرسال…','Sending…');
 f.submit()})});
