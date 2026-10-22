(()=>{const K=window.KEV,{$,$$,C,L,esc}=K;
const T=(a,e)=>K.lang==='ar'?a:e;
function pkgCard(s,p){return `<article class="pkg${p.hl?' hl':''}"><div class="row" style="justify-content:space-between"><h3>${esc(L(p.name))}</h3>${p.hl?`<span class="badge">${T('الأكثر طلباً','Most popular')}</span>`:''}</div>
 <div class="price">$${p.price}<small style="font-size:.9rem;font-weight:600"> / ${p.price} USDT</small></div>${K.exBadge()}
 <ul>${p.items.map(i=>`<li>${esc(L(i))}</li>`).join('')}</ul>
 <dl><dt>${T('مدة التسليم','Delivery')}</dt><dd>${p.days} ${T(p.days>10?'يوم':'أيام','days')}</dd><dt>${T('التعديلات','Revisions')}</dt><dd>${p.rev}</dd></dl>
 <button class="btn" type="button" data-add="${s.id}|${p.id}">${T('أضف إلى السلة','Add to cart')}</button></article>`}
function catalogue(){const el=$('#catalogue');if(!el)return;
 el.innerHTML=C.services.map(s=>{const min=Math.min(...s.packages.map(p=>p.price));return `<li class="card">${(s.id==='sound-engineering'||s.id==='voice-over')?`<div class="cthumb cthumb-a"><div class="km" data-sid="${s.id}" data-img="svc_${s.id}" data-w="1280" data-h="720" data-sizes="(max-width:760px) 100vw, 33vw" data-tag="0" data-alt-ar="${esc(L(s.name))}" data-alt-en="${esc(L(s.name))}"></div></div>`:''}<div class="cthumb${s.id==='video-motion'?' cthumb-v':''}${(s.id==='sound-engineering'||s.id==='voice-over')?' sr':''}" aria-hidden="true"><picture><source type="image/webp" srcset="assets/img/work/svc_${s.id}-640.webp"><img src="assets/img/work/svc_${s.id}-640.jpg" width="640" height="360" loading="lazy" decoding="async" alt=""></picture></div><h2>${esc(L(s.name))}</h2><p>${esc(L(s.desc))}</p>
 <p class="from">${T('يبدأ من','From')} <span dir="ltr">$${min} / ${min} USDT</span> ${K.exBadge()}</p><a class="btn ghost" href="service-${s.id}.html">${T('عرض الباقات','View packages')} <span class="sr">${esc(L(s.name))}</span></a></li>`}).join('');el.querySelectorAll('.cthumb-v').forEach(t=>K.kvCard&&K.kvCard(t));K.kmInit&&K.kmInit(el)}
function detail(){const el=$('#detail');if(!el)return;const s=K.svc(el.dataset.service);
 $('#svc-title').textContent=L(s.name);document.title=L(s.name)+' · KEV';$('#svc-desc').textContent=L(s.desc);$('#svc-crumb').textContent=L(s.name);
 el.innerHTML=s.packages.map(p=>pkgCard(s,p)).join('')}
function cart(){const el=$('#cart');if(!el)return;const c=K.cart.get();
 if(!c.length){el.innerHTML=`<div class="panel"><p>${T('سلتك فارغة.','Your cart is empty.')}</p><p><a class="btn" href="services.html">${T('تصفّح الخدمات','Browse services')}</a></p></div>`;return}
 el.innerHTML=`<div style="overflow-x:auto"><table class="t"><caption class="sr">${T('محتويات السلة','Cart contents')}</caption><thead><tr><th>${T('الخدمة','Service')}</th><th>${T('الكمية','Qty')}</th><th class="num">${T('السعر','Price')}</th><th><span class="sr">${T('إزالة','Remove')}</span></th></tr></thead><tbody>
 ${c.map((i,n)=>{const s=K.svc(i.s),p=K.pkg(i.s,i.p);return `<tr><td><b>${esc(L(s.name))}</b><br><small>${esc(L(p.name))} · ${p.days} ${T('أيام','days')}</small></td>
 <td><label><span class="sr">${T('الكمية','Quantity')}</span><select data-q="${n}" style="width:auto;min-height:40px;padding:6px 10px">${[1,2,3,4,5,6,7,8,9].map(q=>`<option${q===i.q?' selected':''}>${q}</option>`).join('')}</select></label></td>
 <td class="num">$${p.price*i.q}</td><td><button class="iconbtn" type="button" data-rm="${n}" aria-label="${T('إزالة','Remove')} ${esc(L(s.name))}">✕</button></td></tr>`}).join('')}
 </tbody><tfoot><tr><th colspan="2">${T('المجموع','Total')}</th><th class="num">${K.money(K.cart.total())}</th><td></td></tr></tfoot></table></div>
 <p style="margin-top:12px">${K.exBadge()}</p><div class="row" style="margin-top:18px"><a class="btn" href="checkout.html">${T('متابعة إلى الدفع','Proceed to checkout')}</a><a class="btn ghost" href="services.html">${T('أضف خدمات أخرى','Add more services')}</a></div>`}
document.addEventListener('click',e=>{const a=e.target.closest('[data-add]'),r=e.target.closest('[data-rm]');
 if(a){const[s,p]=a.dataset.add.split('|');K.cart.add(s,p);const st=$('#store-status');if(st)st.innerHTML=T('أُضيفت إلى السلة. ','Added to cart. ')+`<a href="cart.html">${T('عرض السلة','View cart')}</a>`}
 if(r){const c=K.cart.get();c.splice(+r.dataset.rm,1);K.cart.set(c);cart()}});
document.addEventListener('change',e=>{const q=e.target.closest('[data-q]');if(q){const c=K.cart.get();c[+q.dataset.q].q=+q.value;K.cart.set(c);cart()}});
document.addEventListener('kev:lang',()=>{catalogue();detail();cart()});
})();
