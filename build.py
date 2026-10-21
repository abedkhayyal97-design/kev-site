# Static page builder for the KEV site. Run: python3 build.py
import re
def B(ar,en,tag='span',cls=''):
    c=(' '+cls) if cls else ''
    return f'<{tag} class="ar{c}" lang="ar">{ar}</{tag}><{tag} class="en{c}" lang="en">{en}</{tag}>'
NAV=[('index.html','الرئيسية','Home'),('services.html','الخدمات والمتجر','Services & store'),('portfolio.html','الأعمال','Portfolio'),('process.html','طريقة العمل','Process'),('about.html','من نحن','About'),('faq.html','أسئلة شائعة','FAQ'),('contact.html','تواصل','Contact')]
def header(cur):
    nav=''.join(f'<a href="{h}"{" aria-current=\"page\"" if h==cur else ""}>{B(a,e)}</a>' for h,a,e in NAV)
    return f'''<a class="skip" href="#main">{B('تخطَّ إلى المحتوى','Skip to content')}</a>
<header class="top"><div class="wrap bar">
 <a class="brand" href="index.html" aria-label="KEV · Khayyal Echo Vision — {('Home')}"><img class="lk-light" src="assets/brand/kev_horizontal_light.svg" alt="KEV · Khayyal Echo Vision" width="117" height="40"><img class="lk-dark" src="assets/brand/kev_horizontal_color.svg" alt="KEV · Khayyal Echo Vision" width="117" height="40"></a>
 <nav id="nav" aria-label="Main">{nav}</nav>
 <div class="tools">
  <a class="chip cartlink" href="cart.html" style="display:grid;place-items:center" aria-label="Cart / السلة"><span aria-hidden="true">🛒</span><b class="cartcount" hidden>0</b></a>
  <button class="chip" id="lang" type="button">EN</button>
  <button class="chip" id="theme" type="button" aria-label="Theme / المظهر">◐</button>
  <button class="chip menu" id="menu" type="button" aria-expanded="false" aria-controls="nav" aria-label="Menu / القائمة">☰</button>
 </div></div></header>'''
FOOT=f'''<footer><div class="wrap"><span>© <span id="yr"></span> KEV · Khayyal Echo Vision</span>
<span class="links"><a href="terms.html">{B('الشروط','Terms')}</a><a href="refund.html">{B('الاسترجاع','Refunds')}</a><a href="privacy.html">{B('الخصوصية','Privacy')}</a><a href="contact.html">{B('تواصل','Contact')}</a></span>
<span>{B('بلا تتبّع. بلا ملفات تعريف ارتباط.','No tracking. No cookies.')}</span></div></footer>'''
def page(fn,tar,ten,desc,body,cur=None,js=()):
    scripts=''.join(f'<script defer src="assets/js/{j}.js"></script>' for j in ('config','common')+tuple(js))
    html=f'''<!DOCTYPE html>
<html lang="ar" dir="rtl" data-title-ar="{tar} · KEV خيال" data-title-en="{ten} · KEV Khayyal">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{tar} · KEV خيال</title><meta name="description" content="{desc}">
<meta name="theme-color" content="#080D28"><link rel="icon" href="favicon.ico" sizes="any"><link rel="icon" href="assets/brand/kev_icon-tile.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="assets/brand/apple-touch-icon-180.png"><link rel="manifest" href="site.webmanifest">
<link rel="preload" href="assets/fonts/cairo.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="assets/css/site.css">{scripts}</head>
<body>{header(cur or fn)}
<main id="main" tabindex="-1">{body}</main>
{FOOT}</body></html>'''
    open(fn,'w').write(html)
def hero(ar,en,par,pen,crumb=True):
    c=f'<p class="crumbs"><a href="index.html">{B("الرئيسية","Home")}</a> / {B(ar,en)}</p>' if crumb else ''
    return f'<div class="page-hero"><div class="wrap">{c}<h1>{B(ar,en)}</h1><p>{B(par,pen)}</p></div></div>'
# ---------- home (original content) ----------
hm=open('/tmp/home_main.html').read().replace('href="#contact" data-i="cta1"','href="services.html" data-i="cta1"').replace('ابدأ مشروعاً','تصفّح الخدمات')
hm=hm.replace('<section id="contact"','''<section id="shop"><div class="wrap"><div class="head"><h2>'''+B('اطلب خدمتك أونلاين','Order a service online')+'</h2><p>'+B('باقات واضحة بأسعار ومدة تسليم محددة، والدفع عبر Binance Pay أو USDT.','Clear packages with set prices and delivery times. Pay with Binance Pay or USDT.')+'''</p></div><ul class="cards" id="catalogue"></ul><p style="margin-top:22px"><a class="btn" href="services.html">'''+B('كل الخدمات','All services')+'</a></p></div></section>\n<section id="contact"')
page('index.html','الرئيسية','Home','KEV (خيال) استوديو للصوت والصورة والفن والبرمجة. KEV studio for sound, video, art and software.',hm,js=('store','home'))
# home.js swaps cta1 text: update EN dict at runtime handled in home.js patch
# ---------- services ----------
page('services.html','الخدمات والمتجر','Services & store','Services and packages: voice-over, mixing, photography, video, branding, web & apps.',
 hero('الخدمات والمتجر','Services & store','اختر الخدمة ثم الباقة المناسبة. الأسعار بالدولار وتُدفع USDT بنسبة 1:1.','Pick a service, then the package that fits. Prices in USD, paid in USDT at 1:1.')+
 f'<section><div class="wrap"><p class="note" style="margin-bottom:22px">{B("الأسعار المعروضة أمثلة للتعديل وليست نهائية.","The prices shown are examples to edit, not final.")}</p><ul class="cards" id="catalogue"></ul></div></section>',js=('store',))
import json,subprocess
cfg=open('assets/js/config.js').read()
ids=re.findall(r'\{ id:"([^"]+)"',cfg)
for sid in ids:
    page(f'service-{sid}.html','خدمة','Service','KEV service packages.',
     f'<div class="page-hero"><div class="wrap"><p class="crumbs"><a href="index.html">{B("الرئيسية","Home")}</a> / <a href="services.html">{B("الخدمات","Services")}</a> / <span id="svc-crumb"></span></p><h1 id="svc-title"></h1><p id="svc-desc"></p></div></div>'
     f'<section><div class="wrap"><div class="pkgs" id="detail" data-service="{sid}"></div><p id="store-status" role="status" aria-live="polite" style="margin-top:18px"></p>'
     f'<div class="prose" style="margin-top:32px"><h2>{B("كيف يتم الطلب","How ordering works")}</h2><ol><li>{B("أضف الباقة للسلة وأكمل بياناتك.","Add the package to your cart and fill in your details.")}</li><li>{B("ادفع الدفعة المقدّمة عبر Binance Pay أو USDT مع رقم الطلب.","Pay the deposit via Binance Pay or USDT with your order reference.")}</li><li>{B("أرسل رقم المعاملة، نتحقق يدوياً ونؤكد خلال يوم عمل.","Send the transaction ID; we verify manually and confirm within one working day.")}</li></ol></div></div></section>',cur='services.html',js=('store',))
# ---------- cart ----------
page('cart.html','السلة','Cart','Your cart.',hero('السلة','Cart','راجع الخدمات قبل الدفع.','Review your services before checkout.')+'<section><div class="wrap" id="cart"></div></section>',cur='services.html',js=('store',))
# ---------- checkout ----------
co=f'''{hero('إتمام الطلب','Checkout','ثلاث خطوات: بياناتك، الدفع، تأكيد رقم المعاملة.','Three steps: your details, payment, transaction confirmation.')}
<section><div class="wrap" id="co">
<div class="warn" id="cfgwarn" hidden role="note">{B('وضع الإعداد: بيانات الدفع لم تُملأ بعد في assets/js/config.js — لا ترسل أي مبلغ.','Setup mode: payment details are not filled in assets/js/config.js yet — do not send any money.')} <span class="mono" id="cfgmiss"></span></div>
<ol class="steps" aria-label="Steps"><li>{B('١. البيانات','1. Details')}</li><li>{B('٢. الدفع','2. Payment')}</li><li>{B('٣. التأكيد','3. Confirmation')}</li></ol>
<div id="s1" class="two"><form id="f1" class="panel light-form" novalidate><h2>{B('بياناتك','Your details')}</h2>
 <label><span>{B('الاسم','Name')}</span><input id="cn" autocomplete="name" required><span class="err" id="cn-e"></span></label>
 <label><span>{B('البريد الإلكتروني','Email')}</span><input id="ce" type="email" autocomplete="email" dir="ltr" required><span class="err" id="ce-e"></span></label>
 <label><span>{B('واتساب أو تيليغرام (اختياري)','WhatsApp or Telegram (optional)')}</span><input id="cc" dir="ltr" autocomplete="tel"></label>
 <label><span>{B('تفاصيل المشروع','Project details')}</span><textarea id="cnotes"></textarea></label>
 <fieldset style="border:1px solid var(--line);border-radius:var(--r);padding:12px 16px"><legend>{B('طريقة الدفع','Payment method')}</legend>
  <label style="display:flex;gap:10px;align-items:center;font-weight:600"><input type="radio" name="pm" value="binance" checked style="width:auto;min-height:auto"> Binance Pay (Pay ID)</label>
  <label style="display:flex;gap:10px;align-items:center;font-weight:600"><input type="radio" name="pm" value="trc20" style="width:auto;min-height:auto"> USDT — TRC20 (TRON)</label>
  <label style="display:flex;gap:10px;align-items:center;font-weight:600"><input type="radio" name="pm" value="bep20" style="width:auto;min-height:auto"> USDT — BEP20 (BNB Smart Chain)</label></fieldset>
 <label style="display:flex;gap:10px;align-items:start"><input id="cag" type="checkbox" style="width:auto;min-height:auto;margin-top:6px"><span>{B('أوافق على <a href="terms.html">الشروط</a> و<a href="refund.html">سياسة الاسترجاع</a>.','I accept the <a href="terms.html">terms</a> and <a href="refund.html">refund policy</a>.')}</span></label><span class="err" id="cag-e"></span>
 <button class="btn" type="submit">{B('متابعة إلى الدفع','Continue to payment')}</button></form>
 <aside class="panel" aria-label="Summary"><h2>{B('ملخص الطلب','Order summary')}</h2><div class="sum"></div><p class="note">{B('لا توجد بوابة دفع آلية: نتحقق من كل دفعة يدوياً ثم نؤكد طلبك بالبريد.','There is no automatic payment gateway: we verify every payment manually, then confirm your order by email.')}</p></aside></div>
<div id="s2" class="two" hidden><div class="panel"><h2 tabindex="-1">{B('ادفع الآن','Pay now')}</h2>
 <p>{B('رقم الطلب — اكتبه في ملاحظة الدفع:','Order reference — put it in the payment note:')}</p><div class="copyrow"><code class="mono" id="p-ref"></code><button class="btn sm ghost" type="button" data-copy="#p-ref">{B('نسخ','Copy')}</button></div>
 <p>{B('المبلغ المطلوب الآن:','Amount due now:')} <b id="p-amt" dir="ltr"></b></p>
 <p>{B('الطريقة:','Method:')} <b id="p-method"></b> — <span id="p-net"></span></p>
 <p id="p-idlabel"></p><div class="copyrow"><code class="mono" id="p-addr"></code><button class="btn sm ghost" type="button" data-copy="#p-addr">{B('نسخ','Copy')}</button></div><p id="copy-st" role="status" aria-live="polite"></p>
 <img class="qr" id="p-qr" src="assets/pay/qr-binance.png" alt="" width="200" height="200">
 <p class="note">{B('تحقق من الشبكة قبل الإرسال. إرسال USDT على شبكة خاطئة قد يضيّع المبلغ نهائياً.','Check the network before sending. USDT sent on the wrong network can be lost for good.')}</p>
 <form id="f2" class="light-form" novalidate style="display:grid;gap:12px"><label><span id="txlabel"></span><input id="tx" dir="ltr" required autocomplete="off"><span class="err" id="tx-e"></span></label>
 <div class="row"><button class="btn" type="submit">{B('دفعت — أرسل الطلب','I’ve paid — send order')}</button><button class="btn ghost" type="button" id="back">{B('رجوع','Back')}</button></div><p id="send-st" role="status" aria-live="polite"></p></form></div>
 <aside class="panel"><h2>{B('ملخص الطلب','Order summary')}</h2><div class="sum"></div></aside></div>
<div id="s3" hidden><div class="panel"><h2 tabindex="-1">{B('شكراً! استلمنا طلبك','Thank you! Order received')}</h2><p>{B('رقم الطلب:','Order reference:')} <code class="mono" id="d-ref"></code></p><p id="d-mode"></p>
 <p>{B('سنتحقق من الدفعة يدوياً ونرد خلال يوم عمل واحد. احتفظ برقم الطلب ورقم المعاملة.','We will verify the payment manually and reply within one working day. Keep your order reference and transaction ID.')}</p>
 <p><button class="btn" type="button" id="neworder">{B('طلب جديد','New order')}</button></p></div></div>
</div></section>'''
page('checkout.html','إتمام الطلب','Checkout','Checkout with Binance Pay or USDT.',co,cur='services.html',js=('checkout',))
# ---------- portfolio ----------
ph=''.join(f'<li class="work"><div class="ph">{B("مكان عمل حقيقي","Real project placeholder")}</div><div class="txt"><small>{B(a,e)}</small><h3>{B("عنوان المشروع — للاستبدال","Project title — replace")}</h3><p>{B("وصف قصير للمشروع والنتيجة.","Short description of the project and outcome.")}</p></div></li>' for a,e in [('تعليق صوتي','Voice-over'),('هندسة صوت','Sound engineering'),('تصوير','Photography'),('فيديو وموشن','Video & motion'),('هوية بصرية','Branding'),('برمجة','Web & apps')])
page('portfolio.html','الأعمال','Portfolio','KEV portfolio.',hero('الأعمال','Portfolio','نماذج من أعمالنا.','Samples of our work.')+f'<section><div class="wrap"><p class="warn" style="margin-bottom:22px">{B("محتوى مؤقت: هذه البطاقات أماكن فارغة واضحة. استبدلها بأعمالك الحقيقية (صور، مقاطع صوت، روابط).","Placeholder content: these cards are clearly marked placeholders. Replace them with your real work (images, audio, links).")}</p><ul class="works">{ph}</ul></div></section>')
# ---------- about ----------
page('about.html','من نحن','About','About KEV.',hero('من نحن','About','KEV — خيال: صوت (Echo) وصورة (Vision) باسم مؤسسها.','KEV — Khayyal: sound (Echo) and sight (Vision), under its founder’s name.')+
 f'''<section><div class="wrap prose">{B('<p>KEV اختصار Khayyal Echo Vision. «خيال» اسم المؤسس، و«Echo» هو الصوت، و«Vision» هي الصورة. نجمع التعليق الصوتي وهندسة الصوت والتصوير والفيديو والتصميم والبرمجة تحت سقف واحد، لنسلّم منتجاً متماسكاً بدل ملفات متفرقة من جهات مختلفة.</p><h2>ما نؤمن به</h2><ul><li>الجودة قبل الكمية.</li><li>مواعيد ومراجعات واضحة منذ البداية.</li><li>عربي وإنجليزي بالمستوى نفسه.</li></ul><p class="note">نص تمهيدي — عدّله بقصتك وخبرتك وصورتك.</p>','<p>KEV stands for Khayyal Echo Vision. Khayyal is the founder’s name, Echo is sound, and Vision is sight. We bring voice-over, sound engineering, photography, video, design and code under one roof, so you get one coherent product instead of scattered files from different vendors.</p><h2>What we believe</h2><ul><li>Quality over quantity.</li><li>Clear timelines and revisions from day one.</li><li>Arabic and English at the same standard.</li></ul><p class="note">Starter text — edit it with your own story, experience and photo.</p>','div')}</div></section>''')
# ---------- process ----------
steps=[('نفهم','Understand','جلسة قصيرة نحدد فيها الهدف والجمهور ومعيار النجاح.','A short session to set the goal, audience and success criteria.'),('ندفع المقدّم','Deposit','تدفع الدفعة المقدّمة عبر Binance Pay أو USDT ونؤكد يدوياً.','You pay the deposit via Binance Pay or USDT; we confirm manually.'),('ننتج','Produce','مسودات ومعاينات ضمن عدد التعديلات في باقتك.','Drafts and previews within your package’s revisions.'),('نسلّم','Deliver','بعد الدفعة المتبقية نسلّم الملفات النهائية والحقوق.','After the final payment we deliver final files and rights.')]
fl=''.join(f'<li><h3>{B(a,e)}</h3><p>{B(pa,pe)}</p></li>' for a,e,pa,pe in steps)
page('process.html','طريقة العمل','Process','How KEV works.',hero('طريقة العمل','Process','من الطلب إلى التسليم بخطوات واضحة.','From order to delivery in clear steps.')+f'<section><div class="wrap"><ol class="flow">{fl}</ol></div></section>')
# ---------- faq ----------
faq=[('كيف أدفع؟','How do I pay?','عبر Binance Pay (Pay ID) أو تحويل USDT على شبكة TRC20 أو BEP20. لا نقبل PayPal أو البطاقات حالياً.','Via Binance Pay (Pay ID) or a USDT transfer on TRC20 or BEP20. We do not accept PayPal or cards at the moment.'),
 ('هل الدفع آمن ومؤكد آلياً؟','Is payment confirmed automatically?','لا. لا توجد بوابة آلية؛ نتحقق من كل معاملة يدوياً عبر رقم المعاملة ونؤكد بالبريد خلال يوم عمل.','No. There is no automatic gateway; we check each transaction manually via its ID and confirm by email within one working day.'),
 ('ماذا لو أرسلت على شبكة خاطئة؟','What if I send on the wrong network?','قد يضيع المبلغ ولا يمكننا استرجاعه. تأكد من الشبكة والعنوان قبل الإرسال.','The funds may be lost and we cannot recover them. Check the network and address before sending.'),
 ('هل الأسعار نهائية؟','Are prices final?','الأسعار المعروضة حالياً أمثلة. المشاريع الخاصة تُسعّر بعرض منفصل.','The prices shown are currently examples. Custom projects get a separate quote.'),
 ('كم عدد التعديلات؟','How many revisions?','حسب الباقة، ومذكورة في كل باقة. التعديلات الإضافية تُسعّر منفصلة.','It depends on the package and is listed on each one. Extra revisions are quoted separately.'),
 ('هل تعملون بالعربية والإنجليزية؟','Do you work in Arabic and English?','نعم، كل خدماتنا متاحة باللغتين.','Yes, all our services are available in both languages.')]
fq=''.join(f'<details><summary>{B(q,qe)}</summary><p>{B(a,ae)}</p></details>' for q,qe,a,ae in faq)
page('faq.html','أسئلة شائعة','FAQ','KEV FAQ.',hero('أسئلة شائعة','FAQ','أجوبة سريعة عن الطلب والدفع والتسليم.','Quick answers on ordering, payment and delivery.')+f'<section><div class="wrap" style="max-width:820px">{fq}</div></section>')
# ---------- contact ----------
ct=f'''{hero('تواصل','Contact','أخبرنا بما تريد إنجازه. نرد خلال يوم عمل واحد.','Tell us what you want to achieve. We reply within one working day.')}
<section><div class="wrap two"><form id="cf" class="panel light-form" novalidate>
<label><span>{B('الاسم','Name')}</span><input id="kn" autocomplete="name" required><span class="err" id="kn-e"></span></label>
<label><span>{B('البريد الإلكتروني','Email')}</span><input id="ke" type="email" dir="ltr" autocomplete="email" required><span class="err" id="ke-e"></span></label>
<label><span>{B('الرسالة','Message')}</span><textarea id="km" required></textarea><span class="err" id="km-e"></span></label>
<button class="btn" type="submit">{B('أرسل','Send')}</button><p id="k-st" role="status" aria-live="polite"></p></form>
<div class="panel"><h2>{B('مباشرة','Directly')}</h2><p>{B('البريد:','Email:')} <a data-email class="mono" href="#"></a></p><p class="note">{B('العنوان والبريد من ملف config.js.','Email comes from config.js.')}</p></div></div></section>'''
page('contact.html','تواصل','Contact','Contact KEV.',ct,js=('contact',))
# ---------- legal ----------
LEG=f'<p class="warn">{B("نموذج عام وليس استشارة قانونية. راجعه وعدّله حسب بلدك ونشاطك.","Generic template, not legal advice. Review and adapt it to your country and business.")}</p>'
page('terms.html','الشروط والأحكام','Terms','Terms of service.',hero('الشروط والأحكام','Terms of service','تنطبق على كل الطلبات عبر هذا الموقع.','Apply to every order placed on this site.')+f'''<section><div class="wrap prose">{LEG}{B('<h2>الطلب</h2><p>يبدأ العمل بعد تأكيد استلام الدفعة المقدّمة يدوياً. مدة التسليم تُحسب من تاريخ التأكيد.</p><h2>الدفع</h2><p>يتم الدفع عبر Binance Pay أو USDT (TRC20/BEP20). العميل مسؤول عن اختيار الشبكة والعنوان الصحيحين ورسوم الشبكة.</p><h2>التعديلات</h2><p>عدد التعديلات محدد في كل باقة. التغييرات خارج النطاق تُسعّر منفصلة.</p><h2>الملكية والحقوق</h2><p>تنتقل حقوق الاستخدام للعميل بعد سداد كامل المبلغ، ضمن ما تنص عليه الباقة.</p><h2>التواصل</h2><p>أي إشعار يتم عبر البريد المسجّل في الطلب.</p>','<h2>Orders</h2><p>Work starts once the deposit has been manually confirmed. Delivery time counts from the confirmation date.</p><h2>Payment</h2><p>Payment is made via Binance Pay or USDT (TRC20/BEP20). The client is responsible for choosing the correct network and address and for network fees.</p><h2>Revisions</h2><p>Each package states its number of revisions. Out-of-scope changes are quoted separately.</p><h2>Ownership and rights</h2><p>Usage rights pass to the client after full payment, as described in the package.</p><h2>Communication</h2><p>All notices are sent to the email given in the order.</p>','div')}</div></section>''')
page('refund.html','سياسة الاسترجاع','Refund policy','Refund policy.',hero('سياسة الاسترجاع','Refund policy','متى وكيف تُسترد المبالغ.','When and how money is refunded.')+f'''<section><div class="wrap prose">{LEG}{B('<ul><li>قبل بدء العمل: استرداد كامل الدفعة المقدّمة ناقص رسوم الشبكة.</li><li>بعد تسليم المسودة الأولى: لا تُسترد الدفعة المقدّمة.</li><li>إذا تأخرنا عن موعد التسليم أكثر من 7 أيام دون اتفاق: يحق لك استرداد 50% من المدفوع.</li><li>تُرد المبالغ بنفس الطريقة (USDT أو Binance Pay) خلال 7 أيام عمل.</li></ul>','<ul><li>Before work starts: full refund of the deposit minus network fees.</li><li>After the first draft is delivered: the deposit is non-refundable.</li><li>If we miss the delivery date by more than 7 days without agreement: you may claim 50% of what you paid.</li><li>Refunds are made the same way (USDT or Binance Pay) within 7 working days.</li></ul>','div')}</div></section>''')
page('privacy.html','الخصوصية','Privacy','Privacy policy.',hero('سياسة الخصوصية','Privacy policy','نجمع أقل قدر ممكن من البيانات.','We collect as little data as possible.')+f'''<section><div class="wrap prose">{LEG}{B('<ul><li>لا نستخدم أدوات تتبّع أو تحليلات أو ملفات تعريف ارتباط.</li><li>السلة واللغة والمظهر تُحفظ في متصفحك فقط (localStorage).</li><li>بيانات الطلب (الاسم، البريد، رقم المعاملة) تصلنا عبر البريد أو خدمة النماذج المحددة، وتُستخدم فقط لتنفيذ الطلب.</li><li>الخطوط مستضافة على الموقع نفسه، بلا طلبات لجهات خارجية.</li><li>لحذف بياناتك راسلنا على البريد في صفحة التواصل.</li></ul>','<ul><li>We use no trackers, analytics or cookies.</li><li>Cart, language and theme are stored only in your browser (localStorage).</li><li>Order data (name, email, transaction ID) reaches us by email or the configured form service and is used only to fulfil the order.</li><li>Fonts are self-hosted, with no third-party requests.</li><li>To delete your data, email us via the contact page.</li></ul>','div')}</div></section>''')
page('404.html','الصفحة غير موجودة','Not found','Not found.',hero('الصفحة غير موجودة','Page not found','الرابط غير صحيح.','This link is not valid.',crumb=False)+f'<section><div class="wrap"><a class="btn" href="index.html">{B("العودة للرئيسية","Back to home")}</a></div></section>',cur='')
print('built')
