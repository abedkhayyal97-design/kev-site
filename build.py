# Static page builder for the KEV site. Run: python3 build.py
import re
ASSET_V="20261023q"  # bump to bust browser/CDN caches
def B(ar,en,tag='span',cls=''):
    c=(' '+cls) if cls else ''
    return f'<{tag} class="ar{c}" lang="ar">{ar}</{tag}><{tag} class="en{c}" lang="en">{en}</{tag}>'
import re
ICONS={'bank': '<path d="M3 9l9-5 9 5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>', 'wise': '<path d="M4 7h9l-3-3M20 17h-9l3 3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>', 'paypal': '<path d="M8 20l2-14h5a3.5 3.5 0 010 7h-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>', 'transfer': '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" stroke-width="1.5"/>', 'card': '<rect x="3" y="6" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 10h18M7 15h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'}
PM=[('card', 'طرق دفع متعددة ومناسبة', 'Multiple convenient payment methods')]
def SVG(k): return f'<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">{ICONS[k]}</svg>'
def PAYM(): return '<ul class="paym">'+''.join(f'<li>{SVG(k)}{B(a,e)}</li>' for k,a,e in PM)+'</ul>'
WA='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 20l1.2-3.6A8 8 0 1112 20a8 8 0 01-3.9-1z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 8.5c0 3 2.5 5.5 5.5 5.5l1-1.4-1.8-1-1 .8a4 4 0 01-2.1-2.1l.8-1-1-1.8z" fill="currentColor"/></svg>'
PH='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M6 3h3l1.5 4-2 1.5a11 11 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 014 5a2 2 0 012-2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>'
ML='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>'
PHONES=[('963995404257','+963 995 404 257'),('352681595993','+352 681 595 993')]
EMAIL='abed.khayyal97@gmail.com'
def CONTACTS(cls=''):
    rows=''.join(f'<li class="ct-row"><a class="ct-call" href="tel:+{n}">{PH}<bdi dir="ltr">{d}</bdi></a><a class="ct-wa" href="https://wa.me/{n}" target="_blank" rel="noopener">{WA}<span>WhatsApp</span></a></li>' for n,d in PHONES)
    return f'<ul class="contacts {cls}">{rows}<li class="ct-row"><a class="ct-mail" href="mailto:{EMAIL}">{ML}<bdi dir="ltr">{EMAIL}</bdi></a><small class="ct-tag">{B("بريد المؤسس","Founder")}</small></li></ul>'

def KM(sid,img,w,h,ar,en,cls='',sizes='(max-width:760px) 100vw, 50vw',tag=True,**kw):
    ex=''.join(f' data-{k.replace("_","-")}="{v}"' for k,v in kw.items())
    t=f'<span class="ctag">{B("تصوّر","Concept")}</span>' if tag else ''
    return f'<div class="km {cls}" data-sid="{sid}" data-img="{img}" data-w="{w}" data-h="{h}" data-sizes="{sizes}" data-alt-ar="{ar}" data-alt-en="{en}"{"" if tag else ' data-tag="0"'}{ex}>'+PIC(img,w,h,ar,en,sizes=sizes)+t+'</div>'
def PIC(name,w,h,alt_ar,alt_en,cls='',sizes='(max-width:760px) 100vw, 50vw'):
    p=f'assets/img/work/{name}'
    return (f'<picture class="pic {cls}"><source type="image/webp" srcset="{p}-640.webp 640w, {p}.webp {w}w" sizes="{sizes}">'
            f'<img src="{p}.jpg" srcset="{p}-640.jpg 640w, {p}.jpg {w}w" sizes="{sizes}" width="{w}" height="{h}" loading="lazy" decoding="async" alt="{alt_en}" data-alt-ar="{alt_ar}" data-alt-en="{alt_en}"></picture>')
NAV=[('index.html','الرئيسية','Home'),('services.html','الخدمات والمتجر','Services & store'),('portfolio.html','الأعمال','Portfolio'),('process.html','طريقة العمل','Process'),('about.html','من نحن','About'),('faq.html','أسئلة شائعة','FAQ'),('contact.html','تواصل','Contact')]
def header(cur):
    nav=''.join(f'<a href="{h}"{" aria-current=\"page\"" if h==cur else ""}>{B(a,e)}</a>' for h,a,e in NAV)
    return f'''<div class="progress" aria-hidden="true"><i></i></div><a class="skip" href="#main">{B('تخطَّ إلى المحتوى','Skip to content')}</a>
<header class="top"><div class="wrap bar">
 <a class="brand" href="index.html" aria-label="KEV · Khayyal Echo Vision — {('Home')}"><img class="lk-light" src="assets/brand/kev_horizontal_light.svg" alt="KEV · Khayyal Echo Vision" width="117" height="40"><img class="lk-dark" src="assets/brand/kev_horizontal_color.svg" alt="KEV · Khayyal Echo Vision" width="117" height="40"></a>
 <nav id="nav" aria-label="Main">{nav}</nav>
 <div class="tools">
  <a class="btn sm hdr-cta" href="contact.html">{CHAT}{B('تواصل معنا','Contact us')}</a>
  <a class="chip cartlink" href="cart.html" style="display:grid;place-items:center" aria-label="Cart / السلة"><span aria-hidden="true">🛒</span><b class="cartcount" hidden>0</b></a>
  <button class="chip" id="lang" type="button">EN</button>
  <button class="chip menu" id="menu" type="button" aria-expanded="false" aria-controls="drawer" aria-label="Menu / القائمة"><span class="burg" aria-hidden="true"><i></i><i></i><i></i></span></button>
 </div></div></header>
<a class="fab-cta" href="contact.html">{CHAT}{B('تواصل معنا','Contact us')}</a>
<div class="dr-back" id="drback" hidden></div>
<aside class="drawer" id="drawer" aria-label="Menu / القائمة" hidden><div class="dr-in">
 <div class="dr-head"><img src="assets/brand/kev_horizontal_color.svg" alt="" width="117" height="40"><button class="chip dr-x" id="drclose" type="button" aria-label="Close / إغلاق"><span aria-hidden="true">✕</span></button></div>
 <nav class="dr-nav" aria-label="Side menu / القائمة الجانبية">{nav}</nav>
 <div class="dr-ct">{CONTACTS("sm")}</div>
 <div class="dr-opts">
  <div class="dr-row"><span class="dr-lbl">{B("اللغة","Language")}</span><button class="seg" id="lang2" type="button"><span lang="ar">عربي</span><span lang="en">English</span></button></div>
  <div class="dr-row"><span class="dr-lbl" id="thlbl">{B("المظهر","Appearance")}</span>
   <button class="tsw" id="themeSw" type="button" role="switch" aria-checked="false">{B("الوضع الداكن","Dark mode","span","sr")}<span class="tsw-thumb"><svg viewBox="0 0 24 24" aria-hidden="true"><defs><mask id="moonm"><rect width="24" height="24" fill="#fff"/><circle class="tsw-bite" cx="24" cy="4" r="7" fill="#000"/></mask></defs><circle class="tsw-core" cx="12" cy="12" r="5" fill="currentColor" mask="url(#moonm)"/><g class="tsw-rays" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></g></svg></span></button>
   <span class="tsw-st" aria-hidden="true">{B("فاتح","Light","span","st-l")}{B("داكن","Dark","span","st-d")}</span></div>
 </div></div></aside>'''
FOOT=f'''<footer><div class="wrap"><div class="ft"><img src="assets/brand/kev_horizontal_color.svg" alt="KEV · Khayyal Echo Vision" width="152" height="52"><span class="links">{''.join(f'<a href="{h}">{B(x,y)}</a>' for h,x,y in NAV[1:])}</span></div><div class="ft-ct">{CONTACTS("sm")}</div><div class="fb"><span><bdi dir="ltr">© <span id="yr">2026</span> KEV — Khayyal Echo Vision.</bdi> {B('جميع الحقوق محفوظة.','All rights reserved.')}</span><span class="links"><a href="terms.html">{B('الشروط','Terms')}</a><a href="refund.html">{B('الاسترجاع','Refunds')}</a><a href="privacy.html">{B('الخصوصية','Privacy')}</a></span></div></div></footer>'''
DESC={
'index.html':('KEV خيال استوديو إنتاج يجمع التعليق الصوتي وهندسة الصوت والتصوير والفيديو والهوية البصرية وتطوير المواقع تحت سقف واحد.','KEV Khayyal is a production studio for voice-over, sound engineering, photography, video, brand identity and web development under one roof.'),
'services.html':('خدمات KEV وباقاتها بأسعار واضحة بالدولار: تعليق صوتي، هندسة صوت ومكساج، تصوير، فيديو وموشن غرافيك، هوية بصرية، ومواقع وتطبيقات.','KEV services and packages with clear USD prices: voice-over, sound engineering and mixing, photography, video and motion graphics, branding, and web and apps.'),
'portfolio.html':('أعمال KEV: الشعار والهوية البصرية، بطاقات العمل، موقع KEV، الفيديو الترويجي، وعينات التعليق الصوتي والمكساج.','KEV portfolio: the logo and brand identity, business cards, the KEV website, the promo film, and voice-over and mixing samples.'),
'about.html':('تعرّف على KEV خيال: صوت (Echo) وصورة (Vision) باسم مؤسسها، وقيمنا وطريقة عملنا كاستوديو واحد.','Meet KEV Khayyal: sound (Echo) and sight (Vision) under its founder’s name, our values and how we work as one studio.'),
'process.html':('طريقة العمل في KEV من الطلب إلى التسليم: نفهم، ندفع المقدّم، ننتج، ثم نسلّم الملفات النهائية.','How KEV works from order to delivery: understand, deposit, produce, then deliver the final files.'),
'faq.html':('أسئلة شائعة عن الطلب والدفع والتعديلات والتسليم في KEV.','Frequently asked questions about ordering, payment, revisions and delivery at KEV.'),
'contact.html':('تواصل مع KEV عبر واتساب أو البريد أو نموذج التواصل. نرد خلال يوم عمل واحد.','Contact KEV by WhatsApp, email or the contact form. We reply within one working day.'),
'thanks.html':('وصلتنا رسالتك. فريق KEV يرد خلال يوم عمل واحد.','Your message reached KEV. We reply within one working day.'),
'cart.html':('سلة الطلب في KEV: راجع الخدمات والباقات قبل إتمام الطلب.','Your KEV cart: review your services and packages before checkout.'),
'checkout.html':('إتمام الطلب في KEV بثلاث خطوات: بياناتك، المراجعة والإرسال، ثم تفاصيل الدفع.','KEV checkout in three steps: your details, review and submit, then payment details.'),
'terms.html':('الشروط والأحكام التي تنطبق على كل الطلبات عبر موقع KEV.','The terms of service that apply to every order placed through the KEV website.'),
'refund.html':('سياسة الاسترجاع في KEV: متى وكيف تُسترد المبالغ.','KEV refund policy: when and how money is refunded.'),
'privacy.html':('سياسة الخصوصية في KEV: نجمع أقل قدر ممكن من البيانات.','KEV privacy policy: we collect as little data as possible.'),
'404.html':('الصفحة المطلوبة غير موجودة على موقع KEV.','The page you requested does not exist on the KEV website.'),
}
def page(fn,tar,ten,desc,body,cur=None,js=()):
    da,de=DESC[fn] if fn in DESC else desc
    scripts=''.join(f'<script defer src="assets/js/{j}.js?v={ASSET_V}"></script>' for j in ('config','common')+tuple(js)+('media','fx'))
    html=f'''<!DOCTYPE html>
<html lang="ar" dir="rtl" class="no-js" data-title-ar="{tar} · KEV خيال" data-title-en="{ten} · KEV Khayyal" data-desc-ar="{da}" data-desc-en="{de}">
<head><script>(function(){{var d=document.documentElement,t,l;try{{t=localStorage.getItem('kev-theme');l=localStorage.getItem('kev-lang')}}catch(e){{}}if(t==='dark'||t==='light')d.setAttribute('data-theme',t);if(t?t==='dark':!!(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('is-dark');if(l!=='ar'&&l!=='en')l=navigator.language&&!/^ar/i.test(navigator.language)?'en':'ar';d.lang=l;d.dir=l==='ar'?'rtl':'ltr';try{{if('scrollRestoration' in history)history.scrollRestoration='manual'}}catch(e){{}}var h=location.hash,p=location.pathname,r=document.referrer;if(h&&/([/]|index[.]html)$/.test(p)&&(!r||r.indexOf(location.origin)!==0)){{try{{history.replaceState(history.state,'',p+location.search)}}catch(e){{}}h=''}}window.__kevHash=h}})()</script><meta charset="utf-8"><meta name="color-scheme" content="light dark"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{tar} · KEV خيال</title><meta name="description" content="{da}">
<meta name="theme-color" content="#080D28"><link rel="icon" href="favicon.ico" sizes="any"><link rel="icon" href="assets/brand/kev_icon-tile.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="assets/brand/apple-touch-icon-180.png"><link rel="manifest" href="site.webmanifest">
<link rel="preload" href="assets/fonts/cairo.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="assets/css/site.css?v={ASSET_V}">{scripts}</head>
<body>{header(cur or fn)}
<main id="main" tabindex="-1">{body.replace('<section>','<section class="band" data-band="light">')}</main>
{FOOT}</body></html>'''
    open(fn,'w').write(html)
def hero(ar,en,par,pen,crumb=True):
    c=f'<p class="crumbs"><a href="index.html">{B("الرئيسية","Home")}</a> / {B(ar,en)}</p>' if crumb else ''
    return f'<div class="band page-hero dark has-studio" data-band="dark"><div class="glow" aria-hidden="true"></div>{STUDIO("st-hero")}<div class="wrap" data-stagger>{c}<h1>{B(ar,en)}<span class="hl">.</span></h1><p>{B(par,pen)}</p></div></div>'
import json,subprocess
# ---------- P0: portfolio, testimonials, clients, CTA, contact form ----------
# Demo testimonials and client logos live in data/demo_content.json (flagged "demo": true; replace before launch).
DEMO=json.load(open('data/demo_content.json',encoding='utf-8'))
SZ="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
PLAY='<svg class="i-play" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg><svg class="i-pause" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>'
def WAVE(src,peaks,ar,en,lab_ar,lab_en):
    pk=json.load(open(peaks))['peaks'];n=56;st=len(pk)/n
    bars=''.join(f'<i style="--h:{max(.08,max(pk[int(i*st):int((i+1)*st)] or [0])):.2f}"></i>' for i in range(n))
    dur=json.load(open(peaks))['duration']
    return (f'<div class="wf" data-src="{src}"><div class="wf-bg" aria-hidden="true"></div><span class="wf-lab">{B(lab_ar,lab_en)}</span>'
            f'<div class="wf-row"><button class="wf-btn" type="button" aria-label="Play / تشغيل" data-l-ar="تشغيل: {ar}" data-l-en="Play: {en}">{PLAY}</button>'
            f'<div class="wf-bars" role="slider" tabindex="0" aria-label="{en}" aria-valuemin="0" aria-valuemax="{int(dur)}" aria-valuenow="0">{bars}</div></div>'
            f'<span class="wf-t" dir="ltr"><b>0:00</b> / {int(dur)//60}:{int(dur)%60:02d}</span></div>')
VID=(f'<div class="pf-vid pf-vh"><video controls playsinline preload="none" poster="assets/video/kev-promo-h-poster.webp" width="1280" height="720" aria-label="KEV promo video / فيديو KEV الترويجي"><source src="assets/video/kev-promo-h.mp4" type="video/mp4"></video></div>')
WORKS=[
 (KM('branding','kev_logo',1280,720,'شعار KEV بالألوان على الكحلي','KEV logo in full colour on navy','ph',SZ,False,kind='ba',before='kev_logo_mono',b_alt_ar='شعار KEV بنسخة أحادية اللون',b_alt_en='KEV logo, one-colour version',a_alt_ar='شعار KEV بالألوان الكاملة',a_alt_en='KEV logo, full colour',b_ar='أحادي',b_en='Mono',a_ar='ملوّن',a_en='Colour',cmp_ar='مقارنة الشعار الأحادي والملوّن',cmp_en='Mono vs colour logo comparison'),
  'هوية بصرية','Brand identity','شعار KEV','The KEV logo','رمز دائري يجمع عدسة الكاميرا وموجة الصوت، بنسخ ملوّنة وأحادية وأفقية ومقاسات صغيرة.','A circular mark joining a camera lens and a sound wave, in colour, mono, horizontal and small-size versions.'),
 (KM('branding','kev_cards',1280,720,'بطاقات عمل KEV على مكتب خشبي','KEV business cards on a wooden desk','ph',SZ,False,kind='vf'),
  'مطبوعات','Print','بطاقات العمل','Business cards','الشعار على وجهين داكن وفاتح، بتشطيب بسيط يناسب الاستوديو.','The mark on dark and light faces, with a clean studio finish.'),
 (KM('web-app','site_laptop',1000,2344,'موقع KEV على حاسوب وهاتف','The KEV website on a laptop and a phone','ph',SZ,False,kind='dev',lap='site_laptop',lap_h=2344,ph='site_phone',ph_h=5231),
  'موقع إلكتروني','Website','موقع KEV','The KEV website','الموقع الذي تتصفّحه الآن: ثنائي اللغة، وضع فاتح وداكن، ومتجر باقات.','The site you are browsing: bilingual, light and dark modes, and a package store.'),
 (VID,'فيديو وموشن غرافيك','Video & motion graphics','فيديو KEV الترويجي','KEV promo film','فيديو تعريفي متحرك لهوية KEV، يعرض خدماتنا الست بموشن غرافيك وصوت متقن.','An animated brand film for KEV, showcasing our six services with motion graphics and crafted sound.'),
 (WAVE('assets/audio/kev-vo-sample','assets/audio/kev-vo-sample.json','عينة التعليق الصوتي','Voice-over sample','تعليق صوتي','Voice-over'),'تعليق صوتي','Voice-over','عينة أداء درامي','Dramatic read sample','صوت بشري معزول ونظيف، بمستوى جاهز للبث.','An isolated, clean human voice at broadcast-ready level.'),
 (WAVE('assets/audio/kev-promo-mix','assets/audio/kev-promo-mix.json','عينة المكساج الكامل','Full mix sample','هندسة صوتية','Sound engineering'),'هندسة صوتية','Sound engineering','مكساج درامي كامل','Full dramatic mix','صوت وموسيقى ومؤثرات في مكساج متوازن واحد.','Voice, music and effects in one balanced mix.')]
WORKS_HTML=''.join(f'<li class="work rv">{km}<div class="txt"><small>{B(sa,se)}</small><h3>{B(ta,te)}</h3><p>{B(da,de)}</p></div></li>' for km,sa,se,ta,te,da,de in WORKS)
STAR='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" fill="currentColor"/></svg>'
TESTI=''.join(f'<li class="tst rv"><div class="stars" role="img" aria-label="{t["stars"]}/5">{STAR*t["stars"]}</div><blockquote>{B("«"+t["quote_ar"]+"»","“"+t["quote_en"]+"”","p")}</blockquote><div class="who"><span class="av" aria-hidden="true">{B(t["name_ar"][0],t["name_en"][0])}</span><span><b>{B(t["name_ar"],t["name_en"])}</b><small>{B(t["role_ar"],t["role_en"])}</small></span></div></li>' for t in DEMO['testimonials'])
MARKS={'arch':'<path d="M6 30V18a10 10 0 0120 0v12M12 30V19a4 4 0 018 0v11" fill="none" stroke="currentColor" stroke-width="2.4"/>',
 'frame':'<rect x="5" y="9" width="22" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M14 13.5v7l6-3.5z" fill="currentColor"/>',
 'leaf':'<path d="M6 26C6 13 15 6 27 6c0 12-7 20-20 20zM6 26l11-11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
 'wave':'<path d="M4 17h3l2-6 3 12 3-16 3 14 2-6 2 2h6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
 'orbit':'<circle cx="16" cy="16" r="4.5" fill="currentColor"/><ellipse cx="16" cy="16" rx="12" ry="6" transform="rotate(-25 16 16)" fill="none" stroke="currentColor" stroke-width="2.2"/>',
 'chevron':'<path d="M5 9l8 7-8 7M14 9l8 7-8 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 16h4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>'}
CLIENTS=''.join(f'<li class="cl rv"><svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">{MARKS[c["mark"]]}</svg><span class="cl-n" lang="en">{c["name_en"].split()[0].upper()}<small>{" ".join(c["name_en"].split()[1:])}</small></span><span class="sr">{B(c["name_ar"],c["name_en"])}</span></li>' for c in DEMO['clients'])
DEMO_NOTE=f'<p class="demo-note">{B("محتوى تجريبي للعرض قبل الإطلاق.","Demo content for the pre-launch preview.")}</p>'
CHAT='<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/></svg>'
def CTA(ar,en,href='#contact'):
    wa=''.join(f'<a class="chip cta-wa" href="https://wa.me/{n}" target="_blank" rel="noopener" aria-label="WhatsApp {d}">{WA}<bdi dir="ltr">{d}</bdi></a>' for n,d in PHONES)
    return (f'<aside class="cta-strip rv" aria-label="Contact / تواصل"><div><p class="cta-t">{B(ar,en)}</p><p class="cta-s">{B("واتساب أو بريد أو نموذج التواصل. الدفع بطرق متعددة ومناسبة.","WhatsApp, email or the contact form. Multiple convenient payment methods.")}</p></div>'
            f'<div class="cta-a"><a class="btn sm" href="{href}">{CHAT}{B("تواصل معنا","Contact us")}</a>{wa}<a class="chip cta-wa" href="mailto:{EMAIL}" aria-label="Email {EMAIL}">{ML}<span>{B("البريد","Email")}</span></a></div></aside>')
FS_ACTION=f'https://formsubmit.co/{EMAIL}'
FS_AJAX=f'https://formsubmit.co/ajax/{EMAIL}'
def FORM(title=True):
    t=f'<h3 style="font-size:1.5rem">{B("أخبرنا عن مشروعك","Tell us about your project")}</h3>' if title else ''
    return f'''<form id="cf" class="formcard rv" action="{FS_ACTION}" data-ajax="{FS_AJAX}" method="POST" novalidate>{t}
<input type="hidden" name="_subject" value="KEV — new message"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="_template" value="table"><input type="hidden" name="_next" id="k-next" value="">
<div class="hp" aria-hidden="true"><label>Leave empty<input type="text" name="_honey" id="k-hp" tabindex="-1" autocomplete="off"></label></div>
<label for="kn"><span>{B('الاسم','Name')}</span><input id="kn" name="name" autocomplete="name" required aria-describedby="kn-e"><span class="err" id="kn-e"></span></label>
<label for="ke"><span>{B('البريد الإلكتروني','Email')}</span><input id="ke" name="email" type="email" dir="ltr" autocomplete="email" required aria-describedby="ke-e"><span class="err" id="ke-e"></span></label>
<label for="km"><span>{B('الرسالة','Message')}</span><textarea id="km" name="message" required aria-describedby="km-e"></textarea><span class="err" id="km-e"></span></label>
<button class="btn" type="submit">{B('أرسل','Send')}</button><p id="k-st" role="status" aria-live="polite"></p></form>'''
# ---------- home ----------
_L=open(__import__('os').path.join(__import__('os').path.dirname(__file__) or '.','assets/img/kev-logo-vertical.svg')).read()
_L=re.sub(r'<svg[^>]*>','<svg viewBox="0 0 760 651" class="kl" focusable="false">',_L,count=1).replace('kev-gradient','kevhg')
_L=_L.replace('id="ring"','id="ring" class="k-ring" pathLength="1"').replace('<g id="aperture-blades"','<g id="aperture-blades" class="k-blades"').replace('<g id="letters-KEV"','<g id="letters-KEV" class="k-let"').replace('<g id="wordmark"','<g id="wordmark" class="k-word"')
for i in (1,2,3): _L=_L.replace(f'id="bar-{i}"',f'id="hb-{i}" class="k-bar k-b{i}"')
_L=re.sub(r' id="(?!kevhg)[^"]*"','',_L)
MOTIF='<div class="motif" aria-hidden="true"><div class="k-tilt"><span class="k-halo"></span>'+_L+'</div></div>'
STUDIO=lambda v='': f'<div class="studio {v}" aria-hidden="true"><svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid meet" fill="none" stroke="currentColor" stroke-linecap="round"><g class="sv-vf"><path d="M36 74V36h40M524 36h40v38M564 286v38h-40M76 324H36v-38"/><path d="M288 180h24M300 168v24"/><rect x="250" y="138" width="100" height="84" rx="3" class="sv-af"/><path class="sv-tick" d="M300 36v10M300 314v10M36 180h10M554 180h10"/></g><path class="sv-w1" d="M0 180.0 L5 180.2 L10 180.6 L15 180.8 L20 181.1 L25 182.0 L30 183.7 L35 185.3 L40 185.1 L45 182.3 L50 177.6 L55 173.3 L60 171.5 L65 172.2 L70 173.3 L75 172.0 L80 168.1 L85 164.3 L90 165.0 L95 172.5 L100 184.9 L105 196.4 L110 201.8 L115 200.0 L120 195.4 L125 193.9 L130 197.9 L135 203.8 L140 204.2 L145 193.8 L150 174.4 L155 154.4 L160 143.1 L165 144.3 L170 153.2 L175 160.3 L180 159.6 L185 153.4 L190 150.9 L195 160.9 L200 184.2 L205 211.6 L210 229.8 L215 231.3 L220 219.4 L225 205.5 L230 200.0 L235 203.9 L240 208.2 L245 201.1 L250 178.2 L255 147.2 L260 122.9 L265 116.9 L270 129.3 L275 148.7 L280 161.7 L285 162.8 L290 158.4 L295 161.4 L300 179.8 L305 209.6 L310 236.9 L315 247.6 L320 237.6 L325 215.8 L330 196.6 L335 189.5 L340 191.9 L345 192.3 L350 180.6 L355 156.3 L360 130.2 L365 116.6 L370 122.5 L375 142.8 L380 164.7 L385 176.8 L390 177.7 L395 175.6 L400 180.9 L405 197.1 L410 217.9 L415 231.5 L420 229.8 L425 214.0 L430 193.8 L435 179.8 L440 175.8 L445 177.7 L450 177.0 L455 168.8 L460 155.6 L465 145.0 L470 144.2 L475 154.1 L480 168.9 L485 181.0 L490 186.0 L495 185.3 L500 184.0 L505 186.4 L510 192.4 L515 198.0 L520 199.2 L525 194.5 L530 186.6 L535 179.5 L540 176.1 L545 176.1 L550 177.3 L555 177.5 L560 176.4 L565 175.2 L570 175.2 L575 176.7 L580 178.6 L585 180.0 L590 180.4 L595 180.2 L600 180.0"/><path class="sv-w2" d="M0 186.0 L5 186.1 L10 186.1 L15 186.1 L20 186.2 L25 186.3 L30 185.9 L35 184.6 L40 182.5 L45 180.6 L50 180.2 L55 181.7 L60 184.1 L65 186.0 L70 186.4 L75 186.0 L80 186.7 L85 190.1 L90 195.5 L95 200.3 L100 201.2 L105 197.4 L110 190.8 L115 185.1 L120 182.8 L125 183.4 L130 183.3 L135 179.4 L140 171.6 L145 163.7 L150 161.0 L155 166.2 L160 177.1 L165 188.0 L170 193.8 L175 193.9 L180 192.6 L185 195.0 L190 203.2 L195 213.3 L200 218.4 L205 213.5 L210 199.7 L215 183.8 L220 173.3 L225 171.2 L230 173.8 L235 174.2 L240 168.0 L245 157.6 L250 150.5 L255 153.6 L260 168.0 L265 187.2 L270 202.1 L275 207.2 L280 204.4 L285 201.0 L290 203.4 L295 211.8 L300 219.7 L305 219.1 L310 206.6 L315 186.8 L320 169.1 L325 160.9 L330 162.6 L335 168.1 L340 169.8 L345 165.1 L350 158.1 L355 156.7 L360 165.7 L365 183.0 L370 200.9 L375 211.3 L380 211.4 L385 205.4 L390 200.6 L395 201.3 L400 205.9 L405 208.3 L410 203.1 L415 190.2 L420 174.9 L425 164.6 L430 162.8 L435 167.6 L440 173.6 L445 175.9 L450 174.1 L455 172.1 L460 174.3 L465 182.1 L470 192.6 L475 200.8 L480 203.2 L485 200.2 L490 195.2 L495 191.9 L500 191.5 L505 192.5 L510 191.9 L515 188.5 L520 183.1 L525 178.6 L530 176.9 L535 178.3 L540 181.2 L545 183.5 L550 184.4 L555 184.3 L560 184.4 L565 185.3 L570 186.6 L575 187.5 L580 187.6 L585 187.1 L590 186.5 L595 186.1 L600 186.0"/></svg></div>'
def H(ar,arh,en,enh):return B(f'{ar} <span class="hl">{arh}</span>',f'{en} <span class="hl">{enh}</span>')
beliefs=[('الجودة قبل الكمية','Quality over quantity','نأخذ مشاريع أقل لنمنح كل مشروع تركيزاً كاملاً.','We take fewer projects so each one gets full focus.'),('وضوح من اليوم الأول','Clarity from day one','سعر ومدة وعدد تعديلات مكتوبة قبل أن نبدأ.','Price, timeline and revisions in writing before we start.'),('عربي وإنجليزي بالمستوى نفسه','Arabic and English, one standard','لا ترجمة سطحية؛ كل لغة تُكتب وتُصمَّم أصلاً.','No surface translation; each language is written and designed natively.'),('الأذن والعين حَكَم','Ear and eye decide','نعرض مسودات تُسمع وتُرى، لا وصفاً نظرياً.','We show drafts you can hear and see, not theory.'),('سرعة بلا استعجال','Fast, never rushed','مواعيد واقعية نلتزم بها.','Realistic deadlines we actually keep.'),('شفافية في الدفع','Transparent payment','طرق دفع متعددة ومناسبة، ونتحقق من كل دفعة يدوياً.','Multiple convenient payment methods, and we verify every payment manually.')]
BEL=''.join(f'<article class="box"><span class="num">0{i+1}</span><h3>{B(a,e)}</h3><p>{B(pa,pe)}</p></article>' for i,(a,e,pa,pe) in enumerate(beliefs))
import re as _r
_cfg=open('assets/js/config.js',encoding='utf-8').read()
STATS=''.join(f'<div class="stat"><b>{n}<em>{suf}</em></b><span>{B(a,e)}</span></div>' for n,suf,a,e in _r.findall(r'\{\s*n:"([^"]*)",\s*suf:"([^"]*)",\s*l:\["([^"]*)","([^"]*)"\]',_cfg))
import math as _m
_bars=[(i*12+6,int(4+22*abs(_m.sin(i*.37)*_m.cos(i*.11)))) for i in range(100)]
WAVEBAR='<svg class="h-wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">'+''.join('<path class="wb wb%d" d="%s" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>'%(g,' '.join(f'M{x} {30-h} V{30+h}' for k,(x,h) in enumerate(_bars) if k%5==g)) for g in range(5))+'</svg>'
AP='<svg class="h-ap" viewBox="0 0 200 200" aria-hidden="true" focusable="false"><circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width=".8" stroke-dasharray="2 6"/><g fill="none" stroke="currentColor" stroke-width="1.2">'+''.join(f'<path d="M100 100 L{100+88*_m.cos(_m.radians(a)):.1f} {100+88*_m.sin(_m.radians(a)):.1f}" transform="rotate(28 100 100)" opacity=".5"/>' for a in range(0,360,60))+'<circle cx="100" cy="100" r="88"/></g></svg>'
# ring lives INSIDE the logo SVG, centred on the aperture circle (256,256 + translate 128,20 = 384,276 in viewBox units)
AP_G='<g transform="translate(384 276)"><g class="h-ap"><g class="h-ap-in" transform="scale(2.75) translate(-100 -100)">'+AP[AP.index('>')+1:AP.rindex('</svg>')]+'</g></g></g>'
assert '<g transform="translate(128.0,20)">' in _L
MOTIF_H='<div class="motif" aria-hidden="true"><div class="k-tilt"><div class="k-br">'+_L.replace('<g transform="translate(128.0,20)">',AP_G+'<g transform="translate(128.0,20)">',1)+'</div></div></div>'
home=f'''<section class="band hero dark" data-band="dark" id="top" data-anim><div class="glow" aria-hidden="true"></div>{MOTIF_H}<div class="wrap h-copy">
<span class="eyebrow h-in">{B('KEV · خيال — استوديو إنتاج','KEV · Khayyal — production studio')}</span>
<h1 class="display h-words"><span class="ar" lang="ar"><span class="w" style="--i:0">صوت.</span> <span class="w" style="--i:1">صورة.</span> <span class="w hl" style="--i:2">خيال.</span></span><span class="en" lang="en"><span class="w" style="--i:0">Sound.</span> <span class="w" style="--i:1">Vision.</span> <span class="w hl" style="--i:2">Imagination.</span></span></h1>
<p class="lead h-in">{B('استوديو واحد للتعليق الصوتي وهندسة الصوت والتصوير والفيديو والهوية والبرمجة. نصنع أعمالاً تُسمَع وتُرى وتُتذكَّر.','One studio for voice-over, sound engineering, photography, video, identity and code. We make work that is heard, seen and remembered.')}</p>
<div class="row h-in h-cta"><a class="btn" href="#contact">{CHAT}{B('تواصل معنا','Contact us')}</a><a class="btn ghost" href="#work">{B('شوف أعمالنا','See our work')}</a></div></div>{WAVEBAR}</section>
<section class="slogan" data-band="light"><div class="wrap"><div class="sl-card rv"><span class="sl-ring" aria-hidden="true"></span><svg class="sl-boxi" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 20h32v20H8z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path class="lid" d="M8 20l-4-8h16l4 8M40 20l4-8H28l-4 8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><circle class="spark" cx="24" cy="12" r="3.2" fill="#12D9E8"/></svg><p class="sl-txt"><span class="ar" lang="ar"><span class="w" style="--i:0">نفكّر</span> <span class="w hl" style="--i:1">خارج</span> <span class="w hl" style="--i:2">الصندوق</span></span><span class="en" lang="en"><span class="w" style="--i:0">We</span> <span class="w" style="--i:1">think</span> <span class="w hl" style="--i:2">outside</span> <span class="w hl" style="--i:3">the</span> <span class="w hl" style="--i:4">box</span></span><span class="sl-shine" aria-hidden="true"></span></p></div></div></section>
<section class="band" data-band="light" id="about-band"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('لماذا KEV','Why KEV')}</span><h2 class="h2">{H('ست مهارات،','فريق واحد.','Six skills,','one team.')}</h2><p class="lead">{B('لا نسلّم ملفاً لجهة وننتقل لأخرى. الصوت والصورة والتصميم والكود يُبنون معاً، فيصل المنتج متماسكاً.','We never hand a file to one vendor and move on to the next. Sound, picture, design and code are built together, so the result holds up.')}</p></div>
<div class="grid2" data-stagger><article class="box big"><span class="num">{B('الرسالة','MISSION')}</span><h3>{H('نحوّل الفكرة إلى','أثر.','We turn ideas into','impact.')}</h3><p>{B('إنتاج صوتي ومرئي وبرمجي بمعايير عالمية، بأسعار وخطوات واضحة.','Audio, visual and software production to international standards, with clear prices and steps.')}</p></article>
<article class="box big"><span class="num">{B('الرؤية','VISION')}</span><h3>{H('استوديو عربي','يُحتذى.','An Arab studio','others follow.')}</h3><p>{B('أن يصبح «خيال» اسماً مرادفاً للجودة في الصوت والصورة والكود.','For Khayyal to become a name that means quality in sound, image and code.')}</p></article></div></div></section>
<section class="band tight dark" data-band="dark"><div class="wrap"><div class="stats" id="stats">{STATS}</div></div></section>
<section class="band has-studio edge" data-band="light">{STUDIO("st-head")}<div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('الخدمات','Services')}</span><h2 class="h2">{H('كل ما يحتاجه','مشروعك.','Everything your project','needs.')}</h2><p class="lead">{B('باقات واضحة بأسعار ومدة تسليم محددة، والدفع بطرق متعددة ومناسبة.','Clear packages with set prices and delivery times. Multiple convenient payment methods.')}</p></div><div id="features"></div>
<p style="margin-top:32px"><a class="btn" href="services.html">{B('كل الخدمات والباقات','All services & packages')}</a></p>{CTA('عندك مشروع؟ لنبدأ اليوم.','Have a project? Let’s start today.')}</div></section>
<section class="band dark has-studio edge" data-band="dark" id="work">{STUDIO("st-head")}<div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('الأعمال','Portfolio')}</span><h2 class="h2">{H('أعمال','تُرى وتُسمَع.','Work you can','see and hear.')}</h2><p class="lead">{B('نبدأ بهويتنا: شعار KEV ودليله وتطبيقاته وموقعه — كلها من تصميمنا وتنفيذنا.','We start with our own identity: the KEV logo, its guide, its applications and this website — all designed and built in-house.')}</p></div>
<ul class="works">{WORKS_HTML}</ul><p style="margin-top:32px"><a class="btn ghost" href="portfolio.html">{B('كل الأعمال','All work')}</a></p>{CTA('أعجبك ما رأيت وسمعت؟','Like what you see and hear?')}</div></section>
<section class="band dark edge" data-band="dark"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('طريقة العمل','Process')}</span><h2 class="h2">{H('أربع خطوات،','بلا مفاجآت.','Four steps,','no surprises.')}</h2></div>
<ol class="flow" data-stagger><li><h3>{B('نفهم','Understand')}</h3><p>{B('نحدد الهدف والجمهور ومعيار النجاح.','We set the goal, audience and success criteria.')}</p></li><li><h3>{B('ندفع المقدّم','Deposit')}</h3><p>{B('دفعة مقدّمة بالطريقة التي تناسبك.','A deposit by the method that suits you.')}</p></li><li><h3>{B('ننتج','Produce')}</h3><p>{B('مسودات ومعاينات ضمن تعديلات باقتك.','Drafts and previews within your revisions.')}</p></li><li><h3>{B('نسلّم','Deliver')}</h3><p>{B('ملفات نهائية وحقوق الاستخدام.','Final files and usage rights.')}</p></li></ol>{CTA('أربع خطوات تفصلك عن النتيجة.','Four steps from your result.')}</div></section>
<section class="band" data-band="light"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('مبادئنا','Our rules')}</span><h2 class="h2">{H('ما','نلتزم به.','What we','stand by.')}</h2></div>
<div class="grid3" id="principles" data-scrub>{BEL}</div></div></section>
<section class="band" data-band="light" id="testimonials"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('آراء العملاء','Testimonials')}</span><h2 class="h2">{H('ماذا يقول','عملاؤنا.','What our clients','say.')}</h2></div>
<ul class="tsts">{TESTI}</ul>{DEMO_NOTE}{CTA('انضم إليهم.','Join them.')}</div></section>
<section class="band tight dark" data-band="dark"><div class="wrap"><div class="head" data-stagger><span class="eyebrow">{B('عملاء وشركاء','Clients & partners')}</span><h2 class="h2">{H('بثقة','شركائنا.','Trusted by','partners.')}</h2></div>
<ul class="clients" aria-label="Clients / العملاء">{CLIENTS}</ul>{DEMO_NOTE}
<p style="margin-top:32px"><a class="btn ghost" href="portfolio.html">{B('شاهد الأعمال','See the work')}</a></p></div></section>
<section class="band has-studio edge" data-band="light" id="contact">{STUDIO("st-cta")}<div class="wrap contact-grid"><div class="head" data-stagger style="margin:0"><span class="eyebrow">{B('تواصل','Contact')}</span><h2 class="h2">{H('لنصنع شيئاً','لا يُنسى.','Let’s make something','unforgettable.')}</h2><p class="lead">{B('أخبرنا بما تريد إنجازه. نرد خلال يوم عمل واحد.','Tell us what you want to achieve. We reply within one working day.')}</p>
<div class="direct"><span class="eyebrow">{B('تواصل مباشر','Direct line')}</span>{CONTACTS()}</div></div>
{FORM()}</div></section>'''
page('index.html','الرئيسية','Home','KEV (خيال) استوديو للصوت والصورة والفن والبرمجة. KEV studio for sound, video, art and software.',home,js=('contact','p0'))

# ---------- services ----------
page('services.html','الخدمات والمتجر','Services & store','Services and packages: voice-over, mixing, photography, video, branding, web & apps.',
 hero('الخدمات والمتجر','Services & store','اختر الخدمة ثم الباقة المناسبة. الأسعار بالدولار، وطرق دفع متعددة.','Pick a service, then the package that fits. Prices in USD, with several payment options.')+
 f'<section><div class="wrap"><ul class="cards" id="catalogue"></ul><div class="paybox"><h2 class="h3">{B("طرق الدفع","Payment methods")}</h2><p class="note">{B("اختر الطريقة المناسبة عند الطلب، ونرسل لك التفاصيل.","Pick the method that suits you when ordering, and we’ll send you the details.")}</p>{PAYM()}</div></div></section>',js=('store',))
cfg=open('assets/js/config.js').read()
ids=re.findall(r'\{ id:"([^"]+)"',cfg)
SVCN={m[0]:(m[1],m[2],m[3],m[4]) for m in re.findall(r'\{ id:"([^"]+)".*?name:\["([^"]+)","([^"]+)"\],\s*desc:\["([^"]+)","([^"]+)"\]',cfg,re.S)}
for sid in ids:
    na,ne,dar,den=SVCN[sid]
    page(f'service-{sid}.html',na,ne,(f'{na} من KEV: {dar} باقات بأسعار واضحة بالدولار.',f'{ne} by KEV: {den} Packages with clear USD prices.'),
     f'<div class="band page-hero dark has-studio" data-band="dark"><div class="glow" aria-hidden="true"></div>{STUDIO("st-hero")}<div class="wrap"><p class="crumbs"><a href="index.html">{B("الرئيسية","Home")}</a> / <a href="services.html">{B("الخدمات","Services")}</a> / <span id="svc-crumb"></span></p><h1 id="svc-title"></h1><p id="svc-desc"></p></div></div>'
     f'<section><div class="wrap">{KM(sid,"svc_"+sid,1280,720,"صورة توضيحية للخدمة","Illustrative image for this service","svc-hero",sizes="(max-width:1200px) 100vw, 1200px")}<div class="pkgs" id="detail" data-service="{sid}"></div><p id="store-status" role="status" aria-live="polite" style="margin-top:18px"></p>'
     f'<div class="prose" style="margin-top:32px"><h2>{B("كيف يتم الطلب","How ordering works")}</h2><ol><li>{B("أضف الباقة للسلة وأكمل بياناتك.","Add the package to your cart and fill in your details.")}</li><li>{B("اختر طريقة الدفع المفضّلة وأرسل الطلب.","Choose your preferred payment method and submit the order.")}</li><li>{B("نرسل لك تفاصيل الدفع خلال يوم عمل، وبعد استلام الدفعة المقدّمة نبدأ.","We send you payment details within one working day and start once the deposit arrives.")}</li></ol></div></div></section>',cur='services.html',js=('store',))
# ---------- cart ----------
page('cart.html','السلة','Cart','Your cart.',hero('السلة','Cart','راجع الخدمات قبل الدفع.','Review your services before checkout.')+'<section><div class="wrap" id="cart"></div></section>',cur='services.html',js=('store',))
# ---------- checkout ----------
co=f'''{hero('إتمام الطلب','Checkout','ثلاث خطوات: بياناتك، المراجعة والإرسال، ثم نرسل لك تفاصيل الدفع.','Three steps: your details, review & submit, then we send you payment details.')}
<section><div class="wrap" id="co">

<ol class="steps" aria-label="Steps"><li>{B('١. البيانات','1. Details')}</li><li>{B('٢. المراجعة','2. Review')}</li><li>{B('٣. التأكيد','3. Confirmation')}</li></ol>
<div id="s1" class="two"><form id="f1" class="panel light-form" novalidate><h2>{B('بياناتك','Your details')}</h2>
 <label><span>{B('الاسم','Name')}</span><input id="cn" autocomplete="name" required><span class="err" id="cn-e"></span></label>
 <label><span>{B('البريد الإلكتروني','Email')}</span><input id="ce" type="email" autocomplete="email" dir="ltr" required><span class="err" id="ce-e"></span></label>
 <label><span>{B('واتساب أو تيليغرام (اختياري)','WhatsApp or Telegram (optional)')}</span><input id="cc" dir="ltr" autocomplete="tel"></label>
 <label><span>{B('تفاصيل المشروع','Project details')}</span><textarea id="cnotes"></textarea></label>
 <label><span>{B('طريقة الدفع المفضّلة','Preferred payment method')}</span><select id="pm">{''.join(f'<option value="{i}" data-ar="{a}" data-en="{e}">{e}</option>' for i,(k,a,e) in enumerate(PM))}</select><small class="note" style="border:0;padding:0;background:none">{B('نرسل لك تفاصيل الدفع بعد استلام الطلب.','We send you payment details after receiving your order.')}</small></label>
 <label style="display:flex;gap:10px;align-items:start"><input id="cag" type="checkbox" style="width:auto;min-height:auto;margin-top:6px"><span>{B('أوافق على <a href="terms.html">الشروط</a> و<a href="refund.html">سياسة الاسترجاع</a>.','I accept the <a href="terms.html">terms</a> and <a href="refund.html">refund policy</a>.')}</span></label><span class="err" id="cag-e"></span>
 <button class="btn" type="submit">{B('متابعة إلى الدفع','Continue to payment')}</button></form>
 <aside class="panel" aria-label="Summary"><h2>{B('ملخص الطلب','Order summary')}</h2><div class="sum"></div><p class="note">{B('لا توجد بوابة دفع آلية: نتحقق من كل دفعة يدوياً ثم نؤكد طلبك بالبريد.','There is no automatic payment gateway: we verify every payment manually, then confirm your order by email.')}</p></aside></div>
<div id="s2" class="two" hidden><div class="panel"><h2 tabindex="-1">{B('مراجعة وإرسال','Review & submit')}</h2>
 <p>{B('رقم الطلب:','Order reference:')}</p><div class="copyrow"><code class="mono" id="p-ref"></code><button class="btn sm ghost" type="button" data-copy="#p-ref">{B('نسخ','Copy')}</button></div><p id="copy-st" role="status" aria-live="polite"></p>
 <p>{B('الدفعة المقدّمة:','Deposit due:')} <b id="p-amt" dir="ltr"></b></p>
 <p>{B('طريقة الدفع المختارة:','Chosen payment method:')} <b id="p-method"></b></p>
 <p class="note">{B('عند الإرسال يُفتح تطبيق بريدك برسالة جاهزة فيها تفاصيل طلبك. أرسلها، وسنرد خلال يوم عمل بتفاصيل الدفع.','Submitting opens your mail app with a ready message containing your order. Send it, and we’ll reply within one working day with payment details.')}</p>
 <div class="paybox sm">{PAYM()}</div>
 <form id="f2" novalidate><div class="row"><button class="btn" type="submit" id="f2btn">{B('أرسل الطلب','Submit order')}</button><button class="btn ghost" type="button" id="back">{B('رجوع','Back')}</button></div><p id="send-st" role="status" aria-live="polite"></p></form></div>
 <aside class="panel"><h2>{B('ملخص الطلب','Order summary')}</h2><div class="sum"></div></aside></div>
<div id="s3" hidden><div class="panel"><h2 tabindex="-1">{B('شكراً! استلمنا طلبك','Thank you! Order received')}</h2><p>{B('رقم الطلب:','Order reference:')} <code class="mono" id="d-ref"></code></p><p id="d-mode"></p>
 <p>{B('سنرسل لك تفاصيل الدفع عبر البريد خلال يوم عمل واحد. احتفظ برقم الطلب.','We will email you payment details within one working day. Keep your order reference.')}</p>
 <p><button class="btn" type="button" id="neworder">{B('طلب جديد','New order')}</button></p></div></div>
</div></section>'''
page('checkout.html','إتمام الطلب','Checkout','Checkout.',co,cur='services.html',js=('checkout',))
# ---------- portfolio ----------
page('portfolio.html','الأعمال','Portfolio','KEV portfolio: brand identity, website, promo film, voice-over and sound engineering samples.',hero('الأعمال','Portfolio','نبدأ بهويتنا: شعار KEV ودليله وتطبيقاته وموقعه — كلها من تصميمنا وتنفيذنا.','We start with our own identity: the KEV logo, its guide, its applications and this website — all designed and built in-house.')+f'<section><div class="wrap"><ul class="works">{WORKS_HTML}</ul>{CTA("مشروعك التالي يبدأ هنا.","Your next project starts here.","contact.html")}</div></section>',js=('p0',))
# ---------- thanks ----------
page('thanks.html','شكراً','Thank you','Message received.',hero('شكراً','Thank you','وصلتنا رسالتك. نرد خلال يوم عمل واحد.','Your message reached us. We reply within one working day.',crumb=False)+f'<section><div class="wrap thanks"><div class="row"><a class="btn" href="index.html">{B("العودة للرئيسية","Back to home")}</a><a class="btn ghost" href="portfolio.html">{B("شاهد الأعمال","See the work")}</a></div><h2 class="h3" style="margin-top:40px">{B("تحتاج رداً أسرع؟","Need a faster reply?")}</h2>{CONTACTS()}</div></section>',cur='')
# ---------- about ----------
_A=DEMO['about']
def _cards(items,tk,dk):
    return '<ul class="ab-grid">'+''.join(f'<li class="box rv" style="--i:{i}"><h3>{B(x[tk+"_ar"],x[tk+"_en"])}</h3><p>{B(x[dk+"_ar"],x[dk+"_en"])}</p></li>' for i,x in enumerate(items))+'</ul>'
ABOUT_X=(f'<section class="band tight"><div class="wrap"><h2 class="h3">{B("قيمنا","Our values")}</h2>'+_cards(_A['values'],'t','d')+'</div></section>'
 +f'<section class="band tight"><div class="wrap"><h2 class="h3">{B("لماذا KEV؟","Why KEV?")}</h2>'+_cards(_A['why'],'t','d')+'</div></section>'
 +f'<section class="band tight"><div class="wrap"><h2 class="h3">{B("الفريق","The team")}</h2><p class="ab-note">{B("أسماء تجريبية مؤقتة — يُستبدل بها الفريق الحقيقي قبل الإطلاق.","Placeholder names — to be replaced with the real team before launch.")}</p>'
 +'<ul class="ab-grid">'+''.join(f'<li class="box rv ab-tm" style="--i:{i}" data-demo="true"><span class="ab-av" aria-hidden="true">K</span><h3>{B(x["n_ar"],x["n_en"])}</h3><p>{B(x["r_ar"],x["r_en"])}</p></li>' for i,x in enumerate(_A['team']))+'</ul></div></section>')
page('about.html','من نحن','About','About KEV.',hero('من نحن','About','KEV — خيال: صوت (Echo) وصورة (Vision) باسم مؤسسها.','KEV — Khayyal: sound (Echo) and sight (Vision), under its founder’s name.')+
 f'''<section><div class="wrap prose">{B('<p>KEV اختصار Khayyal Echo Vision. «خيال» اسم المؤسس، و«Echo» هو الصوت، و«Vision» هي الصورة. نجمع التعليق الصوتي وهندسة الصوت والتصوير والفيديو والتصميم والبرمجة تحت سقف واحد، لنسلّم منتجاً متماسكاً بدل ملفات متفرقة من جهات مختلفة.</p><h2>ما نؤمن به</h2><ul><li>الجودة قبل الكمية.</li><li>مواعيد ومراجعات واضحة منذ البداية.</li><li>عربي وإنجليزي بالمستوى نفسه.</li></ul>','<p>KEV stands for Khayyal Echo Vision. Khayyal is the founder’s name, Echo is sound, and Vision is sight. We bring voice-over, sound engineering, photography, video, design and code under one roof, so you get one coherent product instead of scattered files from different vendors.</p><h2>What we believe</h2><ul><li>Quality over quantity.</li><li>Clear timelines and revisions from day one.</li><li>Arabic and English at the same standard.</li></ul>','div')}</div></section>'''+ABOUT_X+f'''<section><div class="wrap prose"><h2>{B('تواصل مع المؤسس','Contact the founder')}</h2>{CONTACTS()}</div></section>''')
# ---------- process ----------
steps=[('نفهم','Understand','جلسة قصيرة نحدد فيها الهدف والجمهور ومعيار النجاح.','A short session to set the goal, audience and success criteria.'),('ندفع المقدّم','Deposit','تدفع الدفعة المقدّمة بالطريقة التي تختارها ونؤكد استلامها.','You pay the deposit by your chosen method; we confirm receipt.'),('ننتج','Produce','مسودات ومعاينات ضمن عدد التعديلات في باقتك.','Drafts and previews within your package’s revisions.'),('نسلّم','Deliver','بعد الدفعة المتبقية نسلّم الملفات النهائية والحقوق.','After the final payment we deliver final files and rights.')]
fl=''.join(f'<li><h3>{B(a,e)}</h3><p>{B(pa,pe)}</p></li>' for a,e,pa,pe in steps)
page('process.html','طريقة العمل','Process','How KEV works.',hero('طريقة العمل','Process','من الطلب إلى التسليم بخطوات واضحة.','From order to delivery in clear steps.')+f'<section><div class="wrap"><ol class="flow">{fl}</ol></div></section>')
# ---------- faq ----------
faq=[('كيف أدفع؟','How do I pay?','نوفّر طرق دفع متعددة ومناسبة، ونتفق معك على الطريقة الأنسب لك عند الطلب ثم نرسل لك التفاصيل.','We offer multiple convenient payment methods and agree with you on the most convenient one when you order, then send you the details.'),
 ('هل الدفع آمن ومؤكد آلياً؟','Is payment confirmed automatically?','لا. لا توجد بوابة آلية؛ نتحقق من كل معاملة يدوياً عبر رقم المعاملة ونؤكد بالبريد خلال يوم عمل.','No. There is no automatic gateway; we check each transaction manually via its ID and confirm by email within one working day.'),
 ('ماذا لو أرسلت على شبكة خاطئة؟','What if I send on the wrong network?','قد يضيع المبلغ ولا يمكننا استرجاعه. تأكد من الشبكة والعنوان قبل الإرسال.','The funds may be lost and we cannot recover them. Check the network and address before sending.'),
 ('هل الأسعار نهائية؟','Are prices final?','أسعار الباقات المعروضة هي أسعارنا الحالية. المشاريع الخاصة تُسعّر بعرض منفصل.','Package prices shown are our current rates. Custom projects get a separate quote.'),
 ('كم عدد التعديلات؟','How many revisions?','حسب الباقة، ومذكورة في كل باقة. التعديلات الإضافية تُسعّر منفصلة.','It depends on the package and is listed on each one. Extra revisions are quoted separately.'),
 ('هل تعملون بالعربية والإنجليزية؟','Do you work in Arabic and English?','نعم، كل خدماتنا متاحة باللغتين.','Yes, all our services are available in both languages.')]
fq=''.join(f'<details><summary>{B(q,qe)}</summary><p>{B(a,ae)}</p></details>' for q,qe,a,ae in faq)
page('faq.html','أسئلة شائعة','FAQ','KEV FAQ.',hero('أسئلة شائعة','FAQ','أجوبة سريعة عن الطلب والدفع والتسليم.','Quick answers on ordering, payment and delivery.')+f'<section><div class="wrap" style="max-width:820px">{fq}</div></section>')
# ---------- contact ----------
ct=f'''{hero('تواصل','Contact','أخبرنا بما تريد إنجازه. نرد خلال يوم عمل واحد.','Tell us what you want to achieve. We reply within one working day.')}
<section><div class="wrap two">{FORM(False)}
<div class="panel"><h2>{B('تواصل مباشرة','Reach us directly')}</h2><p class="note">{B('اتصال أو واتساب، أو راسل المؤسس مباشرة.','Call or WhatsApp, or email the founder directly.')}</p>{CONTACTS()}</div></div></section>'''
page('contact.html','تواصل','Contact','Contact KEV.',ct,js=('contact','p0'))
# ---------- legal ----------
LEG=''
page('terms.html','الشروط والأحكام','Terms','Terms of service.',hero('الشروط والأحكام','Terms of service','تنطبق على كل الطلبات عبر هذا الموقع.','Apply to every order placed on this site.')+f'''<section><div class="wrap prose">{LEG}{B('<h2>الطلب</h2><p>يبدأ العمل بعد تأكيد استلام الدفعة المقدّمة يدوياً. مدة التسليم تُحسب من تاريخ التأكيد.</p><h2>الدفع</h2><p>نوفّر طرق دفع متعددة ومناسبة، ونتفق مع العميل على الطريقة الأنسب. نرسل تفاصيل الدفع بعد استلام الطلب، والعميل مسؤول عن رسوم التحويل وعن استخدام التفاصيل الصحيحة.</p><h2>التعديلات</h2><p>عدد التعديلات محدد في كل باقة. التغييرات خارج النطاق تُسعّر منفصلة.</p><h2>الملكية والحقوق</h2><p>تنتقل حقوق الاستخدام للعميل بعد سداد كامل المبلغ، ضمن ما تنص عليه الباقة.</p><h2>التواصل</h2><p>أي إشعار يتم عبر البريد المسجّل في الطلب.</p>','<h2>Orders</h2><p>Work starts once the deposit has been manually confirmed. Delivery time counts from the confirmation date.</p><h2>Payment</h2><p>We offer multiple convenient payment methods and agree with the client on the most convenient one. We send payment details after receiving the order; the client is responsible for transfer fees and for using the correct details.</p><h2>Revisions</h2><p>Each package states its number of revisions. Out-of-scope changes are quoted separately.</p><h2>Ownership and rights</h2><p>Usage rights pass to the client after full payment, as described in the package.</p><h2>Communication</h2><p>All notices are sent to the email given in the order.</p>','div')}</div></section>''')
page('refund.html','سياسة الاسترجاع','Refund policy','Refund policy.',hero('سياسة الاسترجاع','Refund policy','متى وكيف تُسترد المبالغ.','When and how money is refunded.')+f'''<section><div class="wrap prose">{LEG}{B('<ul><li>قبل بدء العمل: استرداد كامل الدفعة المقدّمة ناقص رسوم الشبكة.</li><li>بعد تسليم المسودة الأولى: لا تُسترد الدفعة المقدّمة.</li><li>إذا تأخرنا عن موعد التسليم أكثر من 7 أيام دون اتفاق: يحق لك استرداد 50% من المدفوع.</li><li>تُرد المبالغ بنفس طريقة الدفع الأصلية خلال 7 أيام عمل.</li></ul>','<ul><li>Before work starts: full refund of the deposit minus network fees.</li><li>After the first draft is delivered: the deposit is non-refundable.</li><li>If we miss the delivery date by more than 7 days without agreement: you may claim 50% of what you paid.</li><li>Refunds are made by the original payment method within 7 working days.</li></ul>','div')}</div></section>''')
page('privacy.html','الخصوصية','Privacy','Privacy policy.',hero('سياسة الخصوصية','Privacy policy','نجمع أقل قدر ممكن من البيانات.','We collect as little data as possible.')+f'''<section><div class="wrap prose">{LEG}{B('<h2>بلا تتبّع، بلا ملفات تعريف ارتباط</h2><p>لا نستخدم أي أدوات تتبّع أو تحليلات أو إعلانات، ولا نضع ملفات تعريف ارتباط (Cookies) على جهازك.</p><h2>ما الذي نحفظه وأين</h2><ul><li>السلة واللغة والمظهر تُحفظ في متصفحك فقط (localStorage).</li><li>بيانات الطلب (الاسم، البريد، رقم المعاملة) تصلنا عبر البريد أو خدمة النماذج المحددة، وتُستخدم فقط لتنفيذ الطلب.</li><li>الخطوط مستضافة على الموقع نفسه، بلا طلبات لجهات خارجية.</li><li>لحذف بياناتك راسلنا على البريد في صفحة التواصل.</li></ul>','<h2>No tracking, no cookies</h2><p>We use no trackers, analytics or advertising tools, and we place no cookies on your device.</p><h2>What we store and where</h2><ul><li>Cart, language and theme are stored only in your browser (localStorage).</li><li>Order data (name, email, transaction ID) reaches us by email or the configured form service and is used only to fulfil the order.</li><li>Fonts are self-hosted, with no third-party requests.</li><li>To delete your data, email us via the contact page.</li></ul>','div')}</div></section>''')
page('404.html','الصفحة غير موجودة','Not found','Not found.',hero('الصفحة غير موجودة','Page not found','الرابط غير صحيح.','This link is not valid.',crumb=False)+f'<section><div class="wrap"><a class="btn" href="index.html">{B("العودة للرئيسية","Back to home")}</a></div></section>',cur='')
t=open('thanks.html').read().replace('<meta charset="utf-8">','<meta charset="utf-8"><meta name="robots" content="noindex">',1);open('thanks.html','w').write(t)
print('built')
