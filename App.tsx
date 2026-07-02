import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  CheckCircle2,
  Globe,
  HeartHandshake,
  Mail,
  MessageCircle,
  Phone,
  ShoppingBag,
  Sparkles,
  Trello,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const PRIMARY_LOGO_URL = 'https://github.com/user-attachments/assets/a3d40da7-447c-4868-87b2-14861e3c26cd';
const FALLBACK_LOGO_URL = 'https://github.com/user-attachments/assets/43f6352a-4d02-48c9-b7ba-43ce93ea29d4';

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Project = {
  title: string;
  summary: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
  highlights: string[];
};

const services: Service[] = [
  {
    title: 'אתרי פרימיום ומערכות מותאמות',
    description: 'תכנון ופיתוח אתרים ומערכות ברמת ביצוע גבוהה במיוחד, עם חוויית משתמש חדה ויציבה מלאה.',
    icon: Globe,
  },
  {
    title: 'חנויות אונליין שמייצרות מכירות',
    description: 'עיצוב ופיתוח חנויות יוקרתיות שמבליטות את המותג, מחזקות אמון ומגדילות את יחס ההמרה.',
    icon: ShoppingBag,
  },
  {
    title: 'ניהול פרויקטים ושיווק ביצועי',
    description: 'ליווי מקצה לקצה: אסטרטגיה, ניהול תהליכים, שליטה בזמנים ותוצאה עסקית ברורה.',
    icon: Trello,
  },
  {
    title: 'קמפיינים וגיוס קהילות',
    description: 'מהלך קריאייטיב מלא לגיוס המונים ובניית נוכחות דיגיטלית עם מסר חד וקצב התקדמות מהיר.',
    icon: HeartHandshake,
  },
];

const projects: Project[] = [
  {
    title: 'Nashi - תרבות נשית עירונית',
    summary: 'פלטפורמת תוכן וקהילה עם היררכיית מידע ברורה, ניווט מהיר וחוויית מובייל חלקה.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=75&w=1200&fm=webp',
    imageAlt: 'צילום מסך כהה של דף אירועים קהילתי עם כרטיסי תוכן ומבנה גריד',
    link: 'https://nashi-co.com/',
    highlights: ['ארכיטקטורת תוכן', 'UI נקי', 'ביצועים מהירים'],
  },
  {
    title: 'צפת בתנופה',
    summary: 'פורטל חדשות מקומי המציג עדכונים בזמן אמת, חוויית קריאה אלגנטית וארגון מידע נגיש.',
    imageUrl: 'https://images.unsplash.com/photo-1544013508-22284988770c?auto=format&fit=crop&q=75&w=1200&fm=webp',
    imageAlt: 'צילום מסך של פורטל חדשות עם אזור כותרת ורשימת כתבות מרכזיות',
    link: 'https://safed-news-production.up.railway.app/',
    highlights: ['תצוגת כתבות חכמה', 'רספונסיביות מלאה', 'קלות תפעול'],
  },
  {
    title: 'מוסדות חלב חיטים',
    summary: 'מערכת ארגונית לניהול פעילות מוסדית עם תשתית יציבה וזרימת עבודה יעילה.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=1200&fm=webp',
    imageAlt: 'צילום מסך של ממשק ניהול ארגוני עם טבלאות נתונים ותפריט צד',
    link: 'https://www.helevhitim.com/',
    highlights: ['ניהול תהליכים', 'יציבות מערכתית', 'התאמה ארגונית'],
  },
  {
    title: 'ג׳ני שמלות כלה',
    summary: 'אתר בוטיק יוקרתי עם דגש על חוויית גלריה, תצוגה ויזואלית חזקה ושפה מותגית מדויקת.',
    imageUrl: 'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&q=75&w=1200&fm=webp',
    imageAlt: 'צילום מסך של אתר אופנה עם תמונת הירו גדולה וקטלוג מוצרים',
    link: 'https://jennyskallot.com/',
    highlights: ['מיתוג יוקרתי', 'גלריות עשירות', 'קריאות לפעולה'],
  },
  {
    title: 'סטודיו לכבודה',
    summary: 'אתר תדמית מעוצב לעולם הבמה והתנועה, עם קומפוזיציה נקייה והצגת תוכן מדויקת.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=75&w=1200&fm=webp',
    imageAlt: 'צילום מסך של אתר סטודיו עם גלריית תמונות ותוכן תדמיתי מוביל',
    link: 'https://lichvoda.co.il/',
    highlights: ['שפה אמנותית', 'UX ממוקד', 'תצוגת מדיה נקייה'],
  },
  {
    title: 'LiveRaise Production',
    summary: 'מערכת רתימה בזמן אמת לקמפיינים, עם תצוגה דינמית ורמת אמינות גבוהה.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=75&w=1200&fm=webp',
    imageAlt: 'צילום מסך של דשבורד תרומות בזמן אמת עם מדדים וגרפים חיים',
    link: 'https://liveraise-production.up.railway.app/',
    highlights: ['Real-time', 'דשבורדים חיים', 'ביצועי עומס'],
  },
];

const stats = [
  { label: 'פרויקטים באוויר', value: '150+' },
  { label: 'שנות ניסיון', value: '12+' },
  { label: 'לקוחות חוזרים', value: '93%' },
  { label: 'זמן תגובה', value: 'עד 24 שעות' },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const App: React.FC = () => {
  const [logoSrc, setLogoSrc] = useState(PRIMARY_LOGO_URL);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    document.documentElement.lang = 'he';
    document.documentElement.dir = 'rtl';
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };
  const handleLogoError = () => {
    setLogoSrc((current) => (current === FALLBACK_LOGO_URL ? current : FALLBACK_LOGO_URL));
  };
  const sanitizeField = (value: string) => value.replace(/[\r\n*]/g, ' ').trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeName = sanitizeField(contactName);
    const safePhone = sanitizeField(contactPhone);
    const safeMessage = sanitizeField(contactMessage);
    const text = `*פנייה חדשה מאתר DA*\n\n*שם:* ${safeName}\n*טלפון:* ${safePhone}\n*תיאור הפרויקט:* ${safeMessage}`;
    window.open(`https://wa.me/972556674329?text=${encodeURIComponent(text)}`, '_blank');
    setIsFormSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030303] text-white antialiased selection:bg-[#c5a059] selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-0">
        <motion.div
          className="absolute -top-24 right-[10%] h-[30rem] w-[30rem] rounded-full bg-[#c5a059]/15 blur-[120px]"
          animate={{ x: [0, -40, 10, 0], y: [0, 30, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[-10rem] left-[8%] h-[26rem] w-[26rem] rounded-full bg-white/10 blur-[130px]"
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0,transparent_52%)]" />
      </div>

      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-6">
          <a href="#home" onClick={(e) => handleNavLink(e, 'home')} aria-label="חזרה לראש העמוד" className="group flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-white/5">
            <img src={logoSrc} onError={handleLogoError} alt="DA Group Logo" className="h-10 w-auto rounded-md border border-white/15 bg-black/50 object-contain" />
            <div className="text-right">
              <p className="text-sm font-black tracking-[0.25em] text-white transition group-hover:text-[#f3d9a7]">DA GROUP</p>
              <p className="text-[10px] font-bold tracking-[0.32em] text-[#c5a059]">PREMIUM DIGITAL</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {[
              ['services', 'שירותים'],
              ['portfolio', 'עבודות'],
              ['contact', 'יצירת קשר'],
            ].map(([id, title]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleNavLink(e, id)}
                className="text-xs font-black tracking-[0.3em] text-zinc-200 transition hover:text-[#c5a059]"
              >
                {title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-24">
        <section id="home" className="mx-auto flex min-h-[88vh] w-full max-w-[1200px] flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-white/5 px-4 py-1.5"
          >
            <Sparkles size={14} className="text-[#c5a059]" />
            <span className="text-[10px] font-black tracking-[0.35em] text-[#c5a059]">LUXURY WEB EXPERIENCE</span>
          </motion.div>

          <motion.img
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            src={logoSrc}
            onError={handleLogoError}
            alt="DA Group Logo"
            className="mt-8 h-auto w-full max-w-md rounded-2xl border border-white/10 bg-black/40 p-2"
          />

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-4xl text-4xl font-black leading-[1.1] md:text-6xl"
          >
            עיצוב שחור יוקרתי, מהיר וחלק
            <span className="mt-2 block text-[#c5a059]">שגורם למותג שלכם להיראות כמו ליגה אחרת</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-200 md:text-2xl"
          >
            אנחנו מתכננים חוויה דיגיטלית מחדש מהיסוד: שפה ויזואלית חזקה, תנועה אלגנטית וביצועים גבוהים, כדי שכל לקוח יבין מיד שאתם ברמה אחרת.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#portfolio"
              onClick={(e) => handleNavLink(e, 'portfolio')}
              className="rounded-full bg-[#c5a059] px-8 py-4 text-xs font-black tracking-[0.28em] text-black transition hover:bg-white"
            >
              צפו בעבודות
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavLink(e, 'contact')}
              className="rounded-full border border-white/25 bg-white/5 px-8 py-4 text-xs font-black tracking-[0.28em] text-white transition hover:border-[#c5a059] hover:text-[#c5a059]"
            >
              נתחיל פרויקט
            </a>
          </motion.div>

          <div className="mt-16 grid w-full grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center backdrop-blur">
                <p className="text-xl font-black text-[#c5a059] md:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[11px] font-bold text-zinc-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <motion.section
          id="services"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto w-full max-w-[1200px] px-6 py-24"
        >
          <p className="text-center text-[10px] font-black tracking-[0.5em] text-[#c5a059]">SERVICES</p>
          <h2 className="mt-4 text-center text-3xl font-black md:text-6xl">פתרונות שמייצרים נוכחות ותוצאות</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-[#0d0d0d]/85 p-8"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#c5a059]/15 text-[#c5a059]">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-black">{service.title}</h3>
                  <p className="mt-4 text-zinc-300">{service.description}</p>
                </motion.article>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="portfolio"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="bg-black/45 px-6 py-24"
        >
          <div className="mx-auto w-full max-w-[1280px]">
            <p className="text-center text-[10px] font-black tracking-[0.5em] text-[#c5a059]">PORTFOLIO</p>
            <h2 className="mt-4 text-center text-3xl font-black md:text-6xl">העבודות שלנו מוצגות ברור ומדויק</h2>
            <p className="mx-auto mt-5 max-w-3xl text-center text-zinc-300 md:text-xl">
              כל פרויקט מוצג עם סיפור קצר, חוזקות מרכזיות וקישור ישיר לצפייה — בלי עומס ובלי רעש מיותר.
            </p>

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
              {projects.map((project, idx) => (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.06 }}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-[#090909]"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover brightness-75 transition duration-700 group-hover:scale-105 group-hover:brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  </div>
                  <div className="p-7">
                    <h3 className="text-2xl font-black">{project.title}</h3>
                    <p className="mt-3 text-zinc-300">{project.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.highlights.map((item) => (
                        <li key={item} className="rounded-full border border-[#c5a059]/40 bg-[#c5a059]/10 px-3 py-1 text-xs font-bold text-[#f3d9a7]">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#c5a059]">
                      לצפייה בפרויקט <ArrowUpRight size={16} />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-12 px-6 py-24 lg:grid-cols-2"
        >
          <div>
            <p className="text-[10px] font-black tracking-[0.5em] text-[#c5a059]">CONTACT</p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">בואו נהפוך את הנוכחות הדיגיטלית שלכם לנכס אמיתי</h2>
            <p className="mt-6 text-zinc-300 md:text-xl">
              משאירים פרטים, מקבלים שיחת אסטרטגיה ממוקדת, ומתקדמים לפתרון שנבנה בדיוק לעסק שלכם.
            </p>

            <div className="mt-10 space-y-5">
              <a href="tel:0556674329" aria-label="התקשר למספר 055-667-4329" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#c5a059] text-black"><Phone size={18} /></span>
                <span className="font-bold">055-667-4329</span>
              </a>
              <a href="mailto:DA@101.ORG.IL" aria-label="שלח מייל לכתובת DA@101.ORG.IL" className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-black"><Mail size={18} /></span>
                <span className="font-bold">DA@101.ORG.IL</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0b0b0b]/90 p-8">
            {!isFormSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-xs font-black tracking-[0.25em] text-zinc-400">שם מלא</label>
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c5a059]"
                    placeholder="דוד אפרגן"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-black tracking-[0.25em] text-zinc-400">טלפון</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c5a059]"
                    placeholder="050-000-0000"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-black tracking-[0.25em] text-zinc-400">ספרו לנו על העסק</label>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-[#c5a059]"
                    placeholder="מה המטרות שלכם? איזה סוג אתר או מערכת אתם רוצים?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#c5a059] px-6 py-4 text-sm font-black tracking-[0.25em] text-black transition hover:bg-white"
                >
                  שליחה לוואטסאפ
                </button>
              </form>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#c5a059]/50 bg-[#c5a059]/15 text-[#c5a059]">
                  <CheckCircle2 size={34} />
                </div>
                <h3 className="mt-6 text-2xl font-black">הפנייה נשלחה בהצלחה</h3>
                <p className="mt-3 text-zinc-300">ניצור איתכם קשר בהקדם ונבנה יחד את השלב הבא.</p>
                <button
                  onClick={() => setIsFormSubmitted(false)}
                  className="mt-8 text-sm font-bold text-[#c5a059] underline underline-offset-4"
                >
                  לשלוח פנייה נוספת
                </button>
              </div>
            )}
          </div>
        </motion.section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black px-6 py-12 text-center">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-5">
          <img src={logoSrc} onError={handleLogoError} alt="DA Group Logo" className="h-10 w-auto rounded-md border border-white/10 bg-black/50" />
          <p className="text-xs font-black tracking-[0.3em] text-zinc-300">DA PROJECT MANAGEMENT & ENTREPRENEURSHIP</p>
          <div className="flex items-center gap-6 text-zinc-500">
            <Zap size={18} />
            <MessageCircle size={18} />
            <Sparkles size={18} />
          </div>
          <p className="text-[11px] text-zinc-500">© {new Date().getFullYear()} כל הזכויות שמורות</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
