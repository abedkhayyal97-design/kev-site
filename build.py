# Static page builder for the KEV site. Run: python3 build.py
import re
def B(ar,en,tag='span',cls=''):
    c=(' '+cls) if cls else ''
    return f'<{tag} class="ar{c}" lang="ar">{ar}</{tag}><{tag} class="en{c}" lang="en">{en}</{tag}>'
NAV=[('index.html','الرئيسية','Home'),('services.html','الخدمات والمتجر','Services & store'),('portfolio.html','الأعمال','Portfolio'),('process.html','طريقة العمل','Process'),('about.html','من نحن','About'),('faq.html','أسئلة شائعة','FAQ'),('contact.html','تواصل','Contact')]
def header(cur):
    nav=''.join(f'<a href="{h}"{" aria-current=\"page\"" if h==cur else ""}>{B(a,e)}</a>' for h,a,e in NAV)
    return f'''<div class="progress" aria-hidden="true"><i></i></div><a class="skip" href="#main">{B('تخطَّ إلى المحتوى','Skip to content')}</a>
<header class="top"><div class="wrap bar">
 <a class="brand" href="index.html" aria-label="KEV · Khayyal Echo Vision — {('Home')}"><img class="lk-light" src="assets/brand/kev_horizontal_light.svg" alt="KEV · Khayyal Echo Vision" width="117" height="40"><img class="lk-dark" src="assets/brand/kev_horizontal_color.svg" alt="KEV · Khayyal Echo Vision" width="117" height="40"></a>
 <nav id="nav" aria-label="Main">{nav}</nav>
 <div class="tools">
  <a class="chip cartlink" href="cart.html" style="display:grid;place-items:center" aria-label="Cart / السلة"><span aria-hidden="true">🛒</span><b class="cartcount" hidden>0</b></a>
  <button class="chip" id="lang" type="button">EN</button>
  <button class="chip menu" id="menu" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Menu / القائمة"><span class="burg" aria-hidden="true"><i></i><i></i><i></i></span></button>
 </div></div></header>
<div class="dr-back" id="drback" hidden></div>
<aside class="drawer" id="drawer" aria-label="Menu / القائمة" hidden><div class="dr-in">
 <div class="dr-head"><img src="assets/brand/kev_horizontal_color.svg" alt="" width="117" height="40"><button class="chip dr-x" id="drclose" type="button" aria-label="Close / إغلاق"><span aria-hidden="true">✕</span></button></div>
 <nav class="dr-nav" aria-label="Side menu / القائمة الجانبية">{nav}</nav>
 <div class="dr-opts">
  <div class="dr-row"><span class="dr-lbl">{B("اللغة","Language")}</span><button class="seg" id="lang2" type="button"><span lang="ar">عربي</span><span lang="en">English</span></button></div>
  <div class="dr-row"><span class="dr-lbl" id="thlbl">{B("المظهر","Appearance")}</span>
   <button class="tsw" id="themeSw" type="button" role="switch" aria-checked="false">{B("الوضع الداكن","Dark mode","span","sr")}<span class="tsw-thumb"><svg viewBox="0 0 24 24" aria-hidden="true"><defs><mask id="moonm"><rect width="24" height="24" fill="#fff"/><circle class="tsw-bite" cx="24" cy="4" r="7" fill="#000"/></mask></defs><circle class="tsw-core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#moonm)"/><g class="tsw-rays" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></g></svg></span></button>
   <span class="tsw-st" aria-hidden="true">{B("فاتح","Light","span","st-l")}{B("داكن","Dark","span","st-d")}</span></div>
 </div></div></aside>'''
FOOT=f'''<footer><div class="wrap"><div class="ft"><img src="assets/brand/kev_horizontal_color.svg" alt="KEV · Khayyal Echo Vision" width="152" height="52"><span class="links">{''.join(f'<a href="{h}">{B(x,y)}</a>' for h,x,y in NAV[1:])}</span></div><div class="fb"><span>© <span id="yr"></span> KEV · Khayyal Echo Vision</span><span class="links"><a href="terms.html">{B('الشروط','Terms')}</a><a href="refund.html">{B('الاسترجاع','Refunds')}</a><a href="privacy.html">{B('الخصوصية','Privacy')}</a></span><span>{B('بلا تتبّع. بلا ملفات تعريف ارتباط.','No tracking. No cookies.')}</span></div></div></footer>'''
def page(fn,tar,ten,desc,body,cur=None,js=()):
    scripts=''.join(f'<script defer src="assets/js/{j}.js"></script>' for j in ('config','common')+tuple(js)+('fx',))
    html=f'''<!DOCTYPE html>
<html lang="ar" dir="rtl" class="no-js" data-title-ar="{tar} · KEV خيال" data-title-en="{ten} · KEV Khayyal">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{tar} · KEV خيال</title><meta name="description" content="{desc}">
<meta name="theme-color" content="#080D28"><link rel="icon" href="favicon.ico" sizes="any"><link rel="icon" href="assets/brand/kev_icon-tile.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="assets/brand/apple-touch-icon-180.png"><link rel="manifest" href="site.webmanifest">
<link rel="preload" href="assets/fonts/cairo.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="assets/css/site.css">{scripts}</head>
<body>{header(cur or fn)}
<main id="main" tabindex="-1">{body.replace('<section>','<section class="band" data-band="light">')}</main>
{FOOT}</body></html>'''
    open(fn,'w').write(html)
def hero(ar,en,par,pen,crumb=True):
    c=f'<p class="crumbs"><a href="index.html">{B("الرئيسية","Home")}</a> / {B(ar,en)}</p>' if crumb else ''
    return f'<div class="band page-hero dark" data-band="dark"><div class="glow" aria-hidden="true"></div><div class="wrap" data-stagger>{c}<h1>{B(ar,en)}<span class="hl">.</span></h1><p>{B(par,pen)}</p></div></div>'
# ---------- home ----------
_L=open(__import__('os').path.join(__import__('os').path.dirname(__file__) or '.','assets/img/kev-logo-vertical.svg')).read()
_L=re.sub(r'<svg[^>]*>','<svg viewBox="0 0 760 651" class="kl" focusable="false">',_L,count=1).replace('kev-gradient','kevhg')
_L=_L.replace('id="ring"','id="ring" class="k-ring" pathLength="1"').replace('<g id="aperture-blades"','<g id="aperture-blades" class="k-blades"').replace('<g id="letters-KEV"','<g id="letters-KEV" class="k-let"').replace('<g id="wordmark"','<g id="wordmark" class="k-word"')
for i in (1,2,3): _L=_L.replace(f'id="bar-{i}"',f'id="hb-{i}" class="k-bar k-b{i}"')
_L=re.sub(r' id="(?!kevhg)[^"]*"','',_L)
MOTIF='<div class="motif" aria-hidden="true"><div class="k-tilt"><span class="k-halo"></span>'+_L+'</div></div>'
def H(ar,arh,en,enh):return B(f'{ar} <span class="hl">{arh}</span>',f'{en} <span class="hl">{enh}</span>')
beliefs=[('الجودة قبل الكمية','Quality over quantity','نأخذ مشاريع أقل لنمنح كل مشروع تركيزاً كاملاً.','We take fewer projects so each one gets full focus.'),('وضوح من اليوم الأول','Clarity from day one','سعر ومدة وعدد تعديلات مكتوبة قبل أن نبدأ.','Price, timeline and revisions in writing before we start.'),('عربي وإنجليزي بالمستوى نفسه','Arabic and English, one standard','لا ترجمة سطحية؛ كل لغة تُكتب وتُصمَّم أصلاً.','No surface translation; each language is written and designed natively.'),('الأذن والعين حَكَم','Ear and eye decide','نعرض مسودات تُسمع وتُرى، لا وصفاً نظرياً.','We show drafts you can hear and see, not theory.'),('سرعة بلا استعجال','Fast, never rushed','مواعيد واقعية نلتزم بها.','Realistic deadlines we actually keep.'),('شفافية في الدفع','Transparent payment','Binance Pay أو USDT، ونتحقق من كل دفعة يدوياً.','Binance Pay or USDT, with every payment verified by hand.')]
BEL=''.join(f'<article class="box"><span class="num">0{i+1}</span><h3>{B(a,e)}</h3><p>{B(pa,pe)}</p></article>' for i,(a,e,pa,pe) in enumerate(beliefs))
LOGOS=''.join(f'<div class="lg">LOGO {i%6+1}</div>' for i in range(12))
home=f'''<section class="band hero dark" data-band="dark" id="top"><div class="glow" aria-hidden="true"></div>{MOTIF}
<div class="wrap" data-stagger><span class="eyebrow">{B('KEV · خيال — استوديو إنتاج','KEV · Khayyal — production studio')}</span>
<h1 class="display">{H('صوت. صورة.','خيال.','Sound. Vision.','Imagination.')}</h1>
<p class="lead">{B('استوديو واحد للتعليق الصوتي وهندسة الصوت والتصوير والفيديو والهوية والبرمجة. نصنع أعمالاً تُسمَع وتُرى وتُتذكَّر.','One studio for voice-over, sound engineering, photography, video, identity and code. We make work that is heard, seen and remembered.')}</p>
<div class="row"><a class="btn" href="services.html">{B('تصفّح الخدمات','Browse services')}</a><a class="btn ghost" href="#contact">{B('ابدأ مشروعاً','Start a project')}</a></div></div>
<a class="cue" href="#about-band"><i aria-hidden="true"></i>{B('مرّر','Scroll')}</a></section>
<section class="slogan" data-band="light"><div class="wrap"><div class="sl-card rv"><span class="sl-ring" aria-hidden="true"></span><svg class="sl-boxi" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 20h32v20H8z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path class="lid" d="M8 20l-4-8h16l4 8M40 20l4-8H28l-4 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle class="spark" cx="24" cy="12" r="3.2" fill="#12D9E8"/></svg><p class="sl-txt"><span class="ar" lang="ar"><span class="w" style="--i:0">نفكّر</span> <span class="w hl" style="--i:1">خارج</span> <span class="w hl" style="--i:2">الصندوق</span></span><span class="en" lang="en"><span class="w" style="--i:0">We</span> <span class="w" style="--i:1">think</span> <span class="w hl" style="--i:2">outside</span> <span class="w hl" style="--i:3">the</span> <span class="w hl" style="--i:4">box</span></span><span class="sl-shine" aria-hidden="true"></span></p></div></div></section>
<section class="band" data-band="light" id="about-band"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('لماذا KEV','Why KEV')}</span><h2 class="h2">{H('ست مهارات،','فريق واحد.','Six skills,','one team.')}</h2><p class="lead">{B('لا نسلّم ملفاً لجهة وننتقل لأخرى. الصوت والصورة والتصميم والكود يُبنون معاً، فيصل المنتج متماسكاً.','We never hand a file to one vendor and move on to the next. Sound, picture, design and code are built together, so the result holds up.')}</p></div>
<div class="grid2" data-stagger><article class="box big"><span class="num">{B('الرسالة','MISSION')}</span><h3>{H('نحوّل الفكرة إلى','أثر.','We turn ideas into','impact.')}</h3><p>{B('إنتاج صوتي ومرئي وبرمجي بمعايير عالمية، بأسعار وخطوات واضحة.','Audio, visual and software production to international standards, with clear prices and steps.')}</p></article>
<article class="box big"><span class="num">{B('الرؤية','VISION')}</span><h3>{H('استوديو عربي','يُحتذى.','An Arab studio','others follow.')}</h3><p>{B('أن يصبح «خيال» اسماً مرادفاً للجودة في الصوت والصورة والكود.','For Khayyal to become a name that means quality in sound, image and code.')}</p></article></div></div></section>
<section class="band tight dark" data-band="dark"><div class="wrap"><div class="stats" id="stats"></div><p class="note" id="stats-note" style="margin-top:22px">{B('أرقام تجريبية — عدّلها في assets/js/config.js.','Example numbers — edit them in assets/js/config.js.')}</p></div></section>
<section class="band" data-band="light"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('الخدمات','Services')}</span><h2 class="h2">{H('كل ما يحتاجه','مشروعك.','Everything your project','needs.')}</h2><p class="lead">{B('باقات واضحة بأسعار ومدة تسليم محددة، والدفع عبر Binance Pay أو USDT.','Clear packages with set prices and delivery times. Pay with Binance Pay or USDT.')}</p></div><div id="features"></div>
<p style="margin-top:32px"><a class="btn" href="services.html">{B('كل الخدمات والباقات','All services & packages')}</a></p></div></section>
<section class="band dark" data-band="dark"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('طريقة العمل','Process')}</span><h2 class="h2">{H('أربع خطوات،','بلا مفاجآت.','Four steps,','no surprises.')}</h2></div>
<ol class="flow" data-stagger><li><h3>{B('نفهم','Understand')}</h3><p>{B('نحدد الهدف والجمهور ومعيار النجاح.','We set the goal, audience and success criteria.')}</p></li><li><h3>{B('ندفع المقدّم','Deposit')}</h3><p>{B('دفعة مقدّمة عبر Binance Pay أو USDT، تأكيد يدوي.','A deposit via Binance Pay or USDT, verified by hand.')}</p></li><li><h3>{B('ننتج','Produce')}</h3><p>{B('مسودات ومعاينات ضمن تعديلات باقتك.','Drafts and previews within your revisions.')}</p></li><li><h3>{B('نسلّم','Deliver')}</h3><p>{B('ملفات نهائية وحقوق الاستخدام.','Final files and usage rights.')}</p></li></ol></div></section>
<section class="band" data-band="light"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('مبادئنا','Our rules')}</span><h2 class="h2">{H('ما','نلتزم به.','What we','stand by.')}</h2></div>
<div class="grid3" data-stagger>{BEL}</div></div></section>
<section class="band tight dark" data-band="dark"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('عملاء وشركاء','Clients & partners')}</span><h2 class="h2">{H('بثقة','شركائنا.','Trusted by','partners.')}</h2><p class="note">{B('أماكن شعارات مؤقتة — استبدلها بشعارات عملائك بعد إذنهم.','Placeholder logo slots — replace with client logos, with their permission.')}</p></div>
<div class="logos" aria-hidden="true"><div class="track">{LOGOS}</div></div>
<p style="margin-top:32px"><a class="btn ghost" href="portfolio.html">{B('شاهد الأعمال','See the work')}</a></p></div></section>
<section class="band" data-band="light" id="contact"><div class="wrap contact-grid"><div class="head" data-stagger style="margin:0"><span class="eyebrow">{B('تواصل','Contact')}</span><h2 class="h2">{H('لنصنع شيئاً','لا يُنسى.','Let’s make something','unforgettable.')}</h2><p class="lead">{B('أخبرنا بما تريد إنجازه. نرد خلال يوم عمل واحد.','Tell us what you want to achieve. We reply within one working day.')}</p>
<div class="direct"><span class="eyebrow">{B('البريد المباشر','Direct line')}</span><a data-email href="#"></a></div></div>
<form id="cf" class="formcard rv" novalidate><h3 style="font-size:1.5rem">{B('أخبرنا عن مشروعك','Tell us about your project')}</h3>
<label><span>{B('الاسم','Name')}</span><input id="kn" autocomplete="name" required><span class="err" id="kn-e"></span></label>
<label><span>{B('البريد الإلكتروني','Email')}</span><input id="ke" type="email" dir="ltr" autocomplete="email" required><span class="err" id="ke-e"></span></label>
<label><span>{B('الرسالة','Message')}</span><textarea id="km" required></textarea><span class="err" id="km-e"></span></label>
<button class="btn" type="submit">{B('أرسل','Send')}</button><p id="k-st" role="status" aria-live="polite"></p></form></div></section>'''
page('index.html','الرئيسية','Home','KEV (خيال) استوديو للصوت والصورة والفن والبرمجة. KEV studio for sound, video, art and software.',home,js=('contact',))

# ---------- services ----------
page('services.html','الخدمات والمتجر','Services & store','Services and packages: voice-over, mixing, photography, video, branding, web & apps.',
 hero('الخدمات والمتجر','Services & store','اختر الخدمة ثم الباقة المناسبة. الأسعار بالدولار وتُدفع USDT بنسبة 1:1.','Pick a service, then the package that fits. Prices in USD, paid in USDT at 1:1.')+
 f'<section><div class="wrap"><p class="note" style="margin-bottom:22px">{B("الأسعار المعروضة أمثلة للتعديل وليست نهائية.","The prices shown are examples to edit, not final.")}</p><ul class="cards" id="catalogue"></ul></div></section>',js=('store',))
import json,subprocess
cfg=open('assets/js/config.js').read()
ids=re.findall(r'\{ id:"([^"]+)"',cfg)
for sid in ids:
    page(f'service-{sid}.html','خدمة','Service','KEV service packages.',
     f'<div class="band page-hero dark" data-band="dark"><div class="glow" aria-hidden="true"></div><div class="wrap"><p class="crumbs"><a href="index.html">{B("الرئيسية","Home")}</a> / <a href="services.html">{B("الخدمات","Services")}</a> / <span id="svc-crumb"></span></p><h1 id="svc-title"></h1><p id="svc-desc"></p></div></div>'
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
<section><div class="wrap two"><form id="cf" class="formcard" novalidate>
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
