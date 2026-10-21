document.addEventListener('DOMContentLoaded',()=>{const K=window.KEV,{$}=K,T=(a,e)=>K.lang==='ar'?a:e;
$('#cf').addEventListener('submit',async e=>{e.preventDefault();const n=$('#kn'),em=$('#ke'),m=$('#km');
 const chk=(el,ok,msg)=>{el.setAttribute('aria-invalid',!ok);$('#'+el.id+'-e').textContent=ok?'':msg;return ok};
 const r=[chk(n,n.value.trim().length>1,T('اكتب اسمك.','Enter your name.')),chk(em,/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()),T('اكتب بريداً صحيحاً.','Enter a valid email.')),chk(m,m.value.trim().length>9,T('اكتب بضع كلمات.','Write a few words.'))];
 if(r.includes(false)){document.querySelector('#cf [aria-invalid="true"]').focus();return}
 const body=`${m.value.trim()}\n\n— ${n.value.trim()} <${em.value.trim()}>`;let ok=false;
 if(K.C.formEndpoint){try{ok=(await fetch(K.C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({email:em.value.trim(),name:n.value.trim(),message:body})})).ok}catch(x){}}
 if(!ok&&!K.filled(K.C.email)){$('#k-st').textContent=T('تعذّر الإرسال حالياً. حاول لاحقاً.','Sending is unavailable right now. Please try again later.');return}
 if(!ok)location.href=`mailto:${K.C.email}?subject=${encodeURIComponent('KEV — '+n.value.trim())}&body=${encodeURIComponent(body)}`;
 $('#k-st').textContent=ok?T('أُرسلت رسالتك. شكراً!','Message sent. Thank you!'):T('فُتح تطبيق البريد، اضغط إرسال هناك.','Your mail app opened. Press send there.')})});
