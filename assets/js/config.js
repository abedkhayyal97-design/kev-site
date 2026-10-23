/* =====================================================================
   KEV site configuration — THE ONLY FILE YOU NEED TO EDIT
   ملف الإعدادات — هذا هو الملف الوحيد الذي تحتاج لتعديله
   ---------------------------------------------------------------------
   Anything marked FILL_ME must be replaced before going live.
   كل قيمة مكتوب فيها FILL_ME يجب استبدالها قبل النشر.
   ===================================================================== */
window.KEV_CONFIG = {
  brand: "KEV · Khayyal Echo Vision",
  email: "abed.khayyal97@gmail.com",     // founder email: contact + orders (mailto) | بريد المؤسس
  whatsapp: ["+963995404257", "+352681595993"], // shown as call + WhatsApp links (hard-coded in build.py PHONES)
  telegram: "",                          // optional, e.g. "kev_studio"

  // Order submission. Leave formEndpoint empty to use email (mailto).
  // Free option: create a form at https://formspree.io and paste its URL, e.g. "https://formspree.io/f/abcdwxyz"
  formEndpoint: "",

  payment: {
    currency: "USD",                     // prices in USD; payment details are agreed and sent per order
    depositPercent: 50                   // % paid upfront; rest on delivery | نسبة الدفعة المقدمة
  },

  // true = show "example prices" badge everywhere. Set false once prices are final.
  examplePrices: true,

  // Home stats band — EXAMPLE NUMBERS, edit or set to [] to hide | أرقام تجريبية للتعديل
  statsAreExamples: true,
  stats: [
    { n:"120", suf:"+", l:["مشروع مُسلَّم","Projects delivered"] },
    { n:"6",   suf:"",  l:["تخصصات تحت سقف واحد","Disciplines, one roof"] },
    { n:"2",   suf:"",  l:["لغتان بنفس المستوى","Languages, one standard"] },
    { n:"24",  suf:"h", l:["أقصى مدة للرد","Max reply time"] }
  ],

  /* ---------------- Services & packages (prices in USD) ---------------- */
  services: [
    { id:"voice-over", icon:"🎙", cat:"sound",
      name:["تعليق صوتي","Voice-over"],
      desc:["تعليق صوتي عربي وإنجليزي لإعلانات، وثائقيات، شروحات وتطبيقات، مسجّل في بيئة معالجة صوتياً.","Arabic and English voice-over for ads, documentaries, explainers and apps, recorded in a treated room."],
      packages:[
        {id:"basic",name:["أساسي","Basic"],price:40,days:2,rev:1,items:[["حتى 150 كلمة","Up to 150 words"],["ملف WAV + MP3","WAV + MP3 files"],["تنظيف ضجيج أساسي","Basic noise clean-up"]]},
        {id:"pro",name:["احترافي","Pro"],price:90,days:3,rev:2,hl:true,items:[["حتى 500 كلمة","Up to 500 words"],["معالجة وماسترينغ","Processing and mastering"],["نسختان بأداءين مختلفين","Two performance takes"]]},
        {id:"premium",name:["مميّز","Premium"],price:180,days:5,rev:3,items:[["حتى 1500 كلمة","Up to 1,500 words"],["مزامنة مع الفيديو","Synced to your video"],["موسيقى خلفية مرخّصة","Licensed background music"],["حقوق استخدام تجاري","Commercial usage rights"]]}]},
    { id:"sound-engineering", icon:"🎚", cat:"sound",
      name:["هندسة صوت ومكساج","Sound engineering & mixing"],
      desc:["مزج وماسترينغ لأغانٍ وبودكاست ومحتوى فيديو بمعايير المنصات (−14 LUFS).","Mixing and mastering for songs, podcasts and video content to platform standards (−14 LUFS)."],
      packages:[
        {id:"basic",name:["أساسي","Basic"],price:60,days:3,rev:1,items:[["ماسترينغ لمقطع واحد","Mastering for one track"],["حتى 8 دقائق","Up to 8 minutes"]]},
        {id:"pro",name:["احترافي","Pro"],price:150,days:5,rev:2,hl:true,items:[["مزج حتى 24 مسار","Mix up to 24 stems"],["ماسترينغ","Mastering"],["نسخة للبث ونسخة للمنصات","Broadcast and streaming versions"]]},
        {id:"premium",name:["مميّز","Premium"],price:320,days:7,rev:3,items:[["مزج غير محدود المسارات","Unlimited stems"],["تصميم صوت وتنظيف متقدم","Sound design and advanced restoration"],["ملفات Stems منفصلة","Separate stems delivered"]]}]},
    { id:"photography", icon:"📷", cat:"vision",
      name:["تصوير فوتوغرافي","Photography"],
      desc:["تصوير منتجات، بورتريه وفعاليات، مع تعديل وتلوين احترافي.","Product, portrait and event photography with professional retouching and grading."],
      packages:[
        {id:"basic",name:["أساسي","Basic"],price:80,days:3,rev:1,items:[["جلسة ساعة","1-hour session"],["10 صور معدّلة","10 edited photos"]]},
        {id:"pro",name:["احترافي","Pro"],price:200,days:5,rev:2,hl:true,items:[["جلسة 3 ساعات","3-hour session"],["30 صورة معدّلة","30 edited photos"],["تلوين موحّد للهوية","Brand-consistent grading"]]},
        {id:"premium",name:["مميّز","Premium"],price:420,days:7,rev:3,items:[["يوم تصوير كامل","Full-day shoot"],["70 صورة معدّلة","70 edited photos"],["رتوش متقدم","Advanced retouching"],["حقوق استخدام تجاري","Commercial usage rights"]]}]},
    { id:"video-motion", icon:"🎬", cat:"vision",
      name:["فيديو وموشن غرافيك","Video & motion graphics"],
      desc:["مونتاج، موشن غرافيك، إعلانات قصيرة ومحتوى للتواصل الاجتماعي.","Editing, motion graphics, short ads and social content."],
      packages:[
        {id:"basic",name:["أساسي","Basic"],price:120,days:4,rev:1,items:[["فيديو حتى 30 ثانية","Video up to 30 s"],["مونتاج ونصوص","Edit and captions"]]},
        {id:"pro",name:["احترافي","Pro"],price:300,days:7,rev:2,hl:true,items:[["فيديو حتى 90 ثانية","Video up to 90 s"],["موشن غرافيك","Motion graphics"],["تلوين وصوت","Colour and sound"]]},
        {id:"premium",name:["مميّز","Premium"],price:650,days:12,rev:3,items:[["حتى 3 دقائق","Up to 3 minutes"],["سيناريو وستوري بورد","Script and storyboard"],["3 نسخ مقاسات للمنصات","3 platform cut-downs"]]}]},
    { id:"branding", icon:"✦", cat:"art",
      name:["هوية بصرية وتصميم","Branding & design"],
      desc:["شعار، نظام ألوان وخطوط، ودليل استخدام جاهز للطباعة والويب.","Logo, colour and type system, and a usage guide ready for print and web."],
      packages:[
        {id:"basic",name:["أساسي","Basic"],price:150,days:5,rev:2,items:[["شعار بمفهومين","Logo, 2 concepts"],["ملفات SVG/PNG/PDF","SVG/PNG/PDF files"]]},
        {id:"pro",name:["احترافي","Pro"],price:400,days:10,rev:3,hl:true,items:[["شعار + نظام ألوان وخطوط","Logo + colour and type system"],["دليل استخدام مختصر","Short usage guide"],["قوالب تواصل اجتماعي","Social media templates"]]},
        {id:"premium",name:["مميّز","Premium"],price:900,days:18,rev:4,items:[["هوية كاملة","Full identity"],["قرطاسية ونماذج تطبيق","Stationery and mockups"],["دليل هوية شامل","Complete brand guidelines"]]}]},
    { id:"web-app", icon:"⌘", cat:"code",
      name:["تطوير مواقع وتطبيقات","Web & app development"],
      desc:["مواقع سريعة ثنائية اللغة، متاجر، وتطبيقات ويب وجوال، بكود نظيف قابل للصيانة.","Fast bilingual websites, stores, and web and mobile apps, with clean maintainable code."],
      packages:[
        {id:"basic",name:["أساسي","Basic"],price:300,days:7,rev:2,items:[["صفحة هبوط واحدة","One landing page"],["عربي وإنجليزي","Arabic and English"],["متجاوب وسريع","Responsive and fast"]]},
        {id:"pro",name:["احترافي","Pro"],price:900,days:18,rev:3,hl:true,items:[["موقع حتى 8 صفحات","Site up to 8 pages"],["نماذج وتكاملات","Forms and integrations"],["تحسين محركات البحث الأساسي","Basic SEO"]]},
        {id:"premium",name:["مميّز","Premium"],price:2400,days:40,rev:4,items:[["تطبيق ويب أو جوال","Web or mobile app"],["لوحة إدارة","Admin dashboard"],["شهر دعم بعد الإطلاق","1 month post-launch support"]]}]}
  ]
};
