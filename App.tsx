import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { 
  Globe, 
  ShoppingBag, 
  Cpu, 
  HeartHandshake, 
  Trello, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  Rocket,
  Search,
  PenTool,
  MessageCircle,
  BrainCircuit,
  Send,
  Loader2,
  Lightbulb,
  Monitor,
  Eye,
  FileCode,
  Maximize2,
  MousePointer2,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
// ייבוא הספרייה הרשמית של גוגל
import { GoogleGenerativeAI } from "@google/generative-ai";
import { translations } from './translations';
import { Language, Project } from './types';

interface ExtendedProject extends Project {
  tags: string[];
}

// רשימת הפרויקטים המעודכנת והמורחבת
const projects: ExtendedProject[] = [
  {
    id: 'nashi-culture',
    title: 'Nashi - תרבות נשית עירונית',
    description: 'פלטפורמה דיגיטלית מתקדמת המרכזת אירועי תרבות, תכנים וקהילה לנשים. האתר מציג חווית משתמש נקייה, מערכת לוח אירועים אינטראקטיבית ועיצוב מודרני המותאם לקהל היעד.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=75&w=800&fm=webp',
    link: 'https://nashi-co.com/',
    tags: ['קהילה', 'פורטל תוכן', 'UX/UI']
  },
  {
    id: 'safed-news',
    title: 'צפת בתנופה',
    description: 'פורטל חדשות ותוכן מקומי לעיר צפת. האתר נמצא כעת בשלבי הרצה (Beta) ומספק עדכונים שוטפים, אינדקס עסקים ומידע עירוני בזמן אמת.',
    imageUrl: 'https://images.unsplash.com/photo-1544013508-22284988770c?auto=format&fit=crop&q=75&w=800&fm=webp',
    link: 'https://safed-news-production.up.railway.app/',
    tags: ['חדשות', 'גרסת הרצה', 'Local Media']
  },
  {
    id: 'helevhitim',
    title: 'מוסדות חלב חיטים',
    description: 'מערכת ניהול מורכבת ופורטל ארגוני חדשני המרכז את כלל פעילות המוסד, כולל מערכות גבייה וניהול תלמידים מתקדמות.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=75&w=800&fm=webp',
    link: 'https://www.helevhitim.com/',
    tags: ['Software', 'Enterprise', 'Management']
  },
  {
    id: 'jennyskallot',
    title: 'ג׳ני שמלות כלה',
    description: 'אתר בוטיק יוקרתי המציג קולקציות שמלות כלה בתצוגה ויזואלית עוצרת נשימה, חווית משתמש פרימיום ומערכת קביעת תורים.',
    imageUrl: 'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&q=75&w=800&fm=webp',
    link: 'https://jennyskallot.com/',
    tags: ['Luxury E-comm', 'Fashion', 'UX/UI']
  },
  {
    id: 'lichvoda',
    title: 'סטודיו לכבודה',
    description: 'אתר תדמית יוקרתי לסטודיו לאומנויות הבמה המשלב תנועה ואסתטיקה גבוהה עם גלריות וידאו אינטראקטיביות.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=75&w=800&fm=webp',
    link: 'https://lichvoda.co.il/',
    tags: ['Portfolio', 'Design', 'Art']
  },
  {
    id: 'liveraise',
    title: 'LiveRaise Production',
    description: 'מערכת מסכי רתימה דינמית לגיוס המונים בזמן אמת עם גרפיקה חיה המחוברת למסדי נתונים חיצוניים.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=75&w=800&fm=webp',
    link: 'https://liveraise-production.up.railway.app/',
    tags: ['Real-time', 'Fundraising', 'Analytics']
  }
];

const IconMap: Record<string, any> = {
  Globe, ShoppingBag, Cpu, HeartHandshake, Trello
};

const ColorMap: Record<string, string> = {
  web: '#00f2ff',
  ecommerce: '#ff007f',
  automation: '#39ff14',
  fundraising: '#ffaa00',
  'project-mgmt': '#bc13fe'
};

const placeholders = {
  he: [
    "דוגמה: אני רוצה לבנות פלטפורמת מסחר יוקרתית לשיווק נדל״ן בחו״ל שכוללת סיורים וירטואליים ב-360 מעלות, מערכת ניהול לידים חכמה עם אוטומציה בוואטסאפ לכל פנייה, ואפשרות לחתימה דיגיטלית על חוזים אונליין בעיצוב נקי ויוקרתי עם צבעי זהב ושחור...",
    "דוגמה: מערכת אוטומציה מלאה למפעל ייצור שכוללת סנכרון מלא בין המלאי לבין הזמנות הלקוחות באתר, שליחת הודעות סטטוס אוטומטיות ללקוח בכל שלב של הייצור, ודשבורד ניהולי מתקדם שמציג רווחיות בזמן אמת...",
    "דוגמה: חנות בוטיק לתכשיטי יוקרה בייבוא אישי, עם אפשרות להרכבת תכשיט בעיצוב עצמי על ידי הלקוח, שילוב של טכנולוגיית מציאות רבודה (AR) למדידת התכשיט מהנייד, וממשק תשלומים מאובטח ויוקרתי...",
    "דוגמה: קמפיייין גיוס המונים רחב היקף לעמותה שכולל דף נחיתה מעוצב עם גרפיקה חיה של התקדמות היעד, מערכת לניהול שגרירים ומתנדבים, ואוטומציה מלאה של שליחת קבלות ומכתבי תודה אישיים לכל תורם..."
  ],
  en: [
    "Example: I want to build a luxury real estate platform for international marketing that includes 360-degree virtual tours, a smart lead management system with WhatsApp automation for every inquiry, and the ability to sign digital contracts online with a clean, luxury design using gold and black colors...",
    "Example: A complete factory automation system that syncs inventory with online orders, sends automated production status updates to customers, and features an advanced management dashboard showing real-time profitability...",
    "Example: A custom boutique jewelry store with a self-design tool for customers, AR integration for virtual try-on, and a high-security premium payment interface with a seamless UX...",
    "Example: A massive crowdfunding campaign for a non-profit including a dynamic landing page with live goal tracking, an ambassador management portal, and full automation for receipts and personalized thank-you notes..."
  ]
};

const AtmosphericBackground = () => {
  const { scrollYProgress } = useScroll();
  const yTranslate = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0f1115]">
      <motion.div style={{ y: yTranslate }} className="absolute inset-0 opacity-30 transform-gpu will-change-transform">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60&w=1400&fm=webp" 
          className="w-full h-full object-cover grayscale brightness-[0.6]"
          alt="Atmosphere"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1115]/80 via-transparent to-[#0f1115]/80" />
      <motion.div 
        animate={{ 
          x: [0, 150, -150, 0], 
          y: [0, -80, 80, 0],
          scale: [1, 1.4, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="glow-spot w-[600px] h-[600px] bg-[#c5a059] top-[-10%] left-[-10%] opacity-40 blur-[120px] transform-gpu will-change-transform"
      />
      <motion.div 
        animate={{ 
          x: [0, -200, 200, 0], 
          y: [0, 150, -150, 0],
          scale: [1, 0.7, 1.5, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="glow-spot w-[500px] h-[500px] bg-[#0ea5e9] bottom-[-10%] right-[-10%] opacity-35 blur-[120px] transform-gpu will-change-transform"
      />
    </div>
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-[#c5a059] rounded-full pointer-events-none z-[9999] hidden md:block transform-gpu"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#c5a059] rounded-full pointer-events-none z-[9999] hidden md:block transform-gpu"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('he');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState<{ characterization: string, htmlPreview: string } | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  
  // Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  const t = translations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders[lang].length);
    }, 8000);
    return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const generateIdeaBlueprint = async () => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are the Master Creative Strategist and Lead Software Architect at DA Group. 
      The user vision is: "${aiInput}".
      
      YOUR TASKS:
      1. EXPANSION: Analyze this vision and expand it into a high-level technical and business blueprint.
      2. CHARACTERIZATION (HEBREW): Write a very detailed, professional characterization in Hebrew. Include: Overview, Unique Selling Points, UX/UI Strategy, Technical Architecture, and a 3-Phase Roadmap.
      3. LUXURY HTML PREVIEW: Generate a full, professional, ultra-luxury landing page (single file).
         - STYLING: Use Tailwind CSS (via CDN). Pure Black background (#020202), Gold text/accents (#c5a059).
         - COMPONENTS: Header, Hero with animated text, dynamic 3-column Feature Grid, "The Process" section, and a minimalist footer.
         - THE MAGIC: Mandatory JavaScript snippet for infinite vertical auto-scroll. The script must smoothly scroll to the bottom, then snap back to top and loop instantly.
      
      Output ONLY a valid JSON object:
      {
        "characterization": "Detailed Hebrew characterization...",
        "htmlPreview": "<!DOCTYPE html><html>...</html>"
      }
      Strictly NO markdown blocks. Raw JSON only.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const parsedResult = JSON.parse(text);
      setAiResponse(parsedResult);
    } catch (error) {
      console.error("Blueprint Engine Error:", error);
      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const fallbackModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const res = await fallbackModel.generateContent(aiInput);
        const txt = res.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        setAiResponse(JSON.parse(txt));
      } catch (e) {
         alert("המערכת עמוסה. נסה שוב בעוד מספר שניות.");
      }
    } finally {
      setIsAiLoading(false);
    }
  };

  const submitToExperts = () => {
    if (!aiResponse) return;
    const header = lang === 'he' ? '--- אפיון אסטרטגי מלא - DA Group ---' : '--- Strategic Blueprint - DA Group ---';
    setContactMessage(`${header}\n\n${aiResponse.characterization}\n\nנשלח מ-Blueprint Engine של DA Group`);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/972556674329?text=${encodeURIComponent(`*פנייה חדמה מאתר DA Group*\n\n*שם:* ${contactName}\n*טלפון:* ${contactPhone}\n*תוכן:* ${contactMessage}`)}`;
    window.open(whatsappUrl, '_blank');
    setIsFormSubmitted(true);
  };

  return (
    <div className="min-h-screen text-[#ffffff] antialiased overflow-x-hidden selection:bg-[#c5a059] selection:text-black">
      <CustomCursor />
      <AtmosphericBackground />
      
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute right-[-3vw] top-0 bottom-0 flex flex-col items-center justify-around opacity-[0.08] select-none font-black text-[10vh] md:text-[18vh] uppercase serif-display italic leading-none pointer-events-none">
            <motion.div 
              animate={{ y: [0, -1000] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="flex flex-col gap-32 transform-gpu will-change-transform"
            >
              <span className="gold-gradient-text transform rotate-90">EXCELLENCE</span>
              <span className="gold-gradient-text transform rotate-90">STRATEGY</span>
              <span className="gold-gradient-text transform rotate-90">INNOVATION</span>
              <span className="gold-gradient-text transform rotate-90">DA GROUP</span>
            </motion.div>
         </div>
      </div>

      <nav className="fixed top-0 w-full z-[90] h-16 md:h-24 flex items-center border-b border-white/10 bg-black/80 backdrop-blur-2xl shadow-2xl transform-gpu">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 w-full flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-9 h-9 md:w-12 md:h-12 bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] rounded-xl flex items-center justify-center font-black text-white text-base md:text-xl">DA</div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm md:text-lg font-black tracking-widest serif-display uppercase text-white group-hover:text-[#c5a059] transition-colors">DA GROUP</span>
              <span className="text-[7px] md:text-[9px] text-[#c5a059] font-bold uppercase tracking-[0.4em] italic opacity-100">Elite Architecture</span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10">
            {['services', 'portfolio', 'contact'].map((id) => (
              <a 
                key={id} 
                href={`#${id}`} 
                onClick={(e) => handleNavClick(e, id)}
                className="text-[10px] font-black tracking-[0.3em] text-zinc-100 uppercase hover:text-[#c5a059] transition-all relative group"
              >
                {t.nav[id]}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-[#c5a059] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <button 
              onClick={() => setLang(l => l === 'he' ? 'en' : 'he')}
              className="px-5 py-2 border border-[#c5a059]/40 rounded-full text-[9px] font-black text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all bg-black/40 backdrop-blur-md"
            >
              {lang === 'he' ? 'ENGLISH' : 'עברית'}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
             <button onClick={() => setLang(l => l === 'he' ? 'en' : 'he')} className="text-[#c5a059] text-[10px] font-black bg-white/5 px-2.5 py-1 rounded-full border border-[#c5a059]/30">{lang === 'he' ? 'EN' : 'עב'}</button>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 bg-white/5 rounded-lg">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full z-[100] bg-[#050507] backdrop-blur-3xl border-l border-white/10 flex flex-col p-10 lg:hidden transform-gpu"
          >
            <div className="flex justify-end mb-16">
               <button onClick={() => setIsMenuOpen(false)} className="text-[#c5a059] p-2 bg-white/5 rounded-full"><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-10 text-center">
               {['services', 'portfolio', 'contact'].map((id) => (
                 <a 
                   key={id} 
                   href={`#${id}`} 
                   onClick={(e) => handleNavClick(e, id)}
                   className="text-4xl font-black tracking-tighter text-white uppercase serif-display italic hover:text-[#c5a059] transition-colors"
                 >
                   {t.nav[id]}
                 </a>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-[#c5a059]/40 rounded-full mb-10 backdrop-blur-md shadow-lg"
          >
            <Sparkles size={14} className="text-[#c5a059] animate-pulse" />
            <span className="text-[10px] md:text-xs font-black tracking-[0.4em] text-[#c5a059] uppercase">{t.hero.tagline}</span>
          </motion.div>
          
          <div className="mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-[8rem] font-black leading-[0.95] tracking-tighter text-white serif-display italic transform-gpu"
            >
              <span className="block mb-3">{lang === 'he' ? 'ניהול' : 'DA'}</span>
              <span className="gold-gradient-text block">
                 {lang === 'he' ? 'פרויקטים ויזמות' : 'STRATEGY'}
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base md:text-2xl text-zinc-100 mb-14 max-w-3xl mx-auto leading-relaxed font-light italic"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl mx-auto p-[1px] rounded-[2.5rem] bg-gradient-to-br from-[#c5a059]/80 via-white/20 to-[#c5a059]/80 shadow-2xl transform-gpu"
          >
            <div className="bg-[#1a1d23]/95 backdrop-blur-3xl rounded-[2.45rem] p-6 md:p-14 border border-white/10 relative overflow-hidden text-start">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059] border border-[#c5a059]/40">
                  <BrainCircuit size={28} className={isAiLoading ? 'animate-spin' : ''} />
                </div>
                <div>
                  <h2 className="text-xl md:text-3xl font-black text-white serif-display italic uppercase tracking-wider">
                    {lang === 'he' ? 'אפיון אסטרטגי חכם' : 'Strategic Engine'}
                  </h2>
                  <p className="text-[#c5a059]/80 text-[9px] font-bold uppercase tracking-[0.2em] mt-1 italic">Powered by Gemini AI Elite</p>
                </div>
              </div>

              <div className="relative group mb-8">
                <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={placeholders[lang][placeholderIndex]}
                  className="w-full bg-white/[0.08] border-2 border-white/10 rounded-[1.8rem] p-6 md:p-10 text-white text-base md:text-2xl font-medium italic focus:border-[#c5a059]/60 outline-none min-h-[180px] resize-none pr-8 shadow-inner placeholder:text-zinc-500 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateIdeaBlueprint}
                  disabled={isAiLoading || !aiInput.trim()}
                  className="absolute bottom-6 right-6 w-14 h-14 bg-[#c5a059] text-black rounded-full flex items-center justify-center shadow-2xl disabled:opacity-20 transform-gpu"
                >
                  {isAiLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                </motion.button>
              </div>

              <AnimatePresence>
                {aiResponse && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10"
                  >
                    <div className="flex flex-col justify-between p-8 rounded-[2rem] bg-white/[0.05] border border-[#c5a059]/40">
                      <div>
                        <div className="text-[#c5a059] text-[9px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
                          <ShieldCheck size={14} /> Full Characterization
                        </div>
                        <div className="text-white text-base md:text-lg font-medium leading-relaxed italic mb-8 whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar pr-3">
                          {aiResponse.characterization}
                        </div>
                      </div>
                      <button 
                        onClick={submitToExperts}
                        className="w-full py-5 bg-[#c5a059] text-black font-black uppercase text-[10px] rounded-full flex items-center justify-center gap-3 shadow-xl tracking-[0.2em] hover:bg-white transition-all"
                      >
                        <Rocket size={18} /> {lang === 'he' ? 'שלח לביצוע ב-DA GROUP' : 'EXECUTE VISION'}
                      </button>
                    </div>

                    <div className="rounded-[2rem] border border-white/20 bg-black overflow-hidden relative group/preview h-[350px] md:h-full">
                         <iframe title="Preview" srcDoc={aiResponse.htmlPreview} className="w-full h-full border-none pointer-events-none" />
                         <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
                            <div className="bg-[#c5a059] text-black px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl">Interactive UI Active</div>
                         </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-24 md:py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 transform-gpu">
            <span className="text-[#c5a059] font-black tracking-[1em] uppercase text-[9px] mb-5 block italic">Ecosystem</span>
            <h2 className="text-4xl md:text-7xl font-black text-white serif-display italic leading-tight uppercase tracking-tighter">
              {t.services.sectionSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.services.items.map((service: any, idx: number) => {
              const Icon = IconMap[service.icon];
              const accentColor = ColorMap[service.id] || '#c5a059';
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-10 rounded-[2.5rem] border border-white/10 bg-[#161a20]/80 backdrop-blur-3xl hover:border-[#c5a059]/60 transition-all transform-gpu group"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl border border-white/10 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: accentColor + '20', color: accentColor }}
                  >
                    <Icon size={32} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black mb-6 text-white serif-display italic tracking-tight">{service.title}</h4>
                  <p className="text-zinc-100 text-sm md:text-lg font-light leading-relaxed mb-8 italic">
                    {service.description}
                  </p>
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Unit 0{idx+1}</span>
                    <ArrowUpRight size={18} style={{ color: accentColor }} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 md:py-40 relative z-10 overflow-hidden bg-[#0f1115]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <div className="mb-20">
            <span className="text-[#c5a059] font-black tracking-[1.5em] uppercase text-[9px] mb-6 block italic">Elite Portfolio</span>
            <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter text-white serif-display italic leading-[0.9]">
              {t.portfolio.sectionSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative h-[450px] md:h-[600px] rounded-[3rem] overflow-hidden border border-white/20 cursor-pointer shadow-2xl transform-gpu bg-white/5 backdrop-blur-md"
                onClick={() => window.open(project.link, '_blank')}
              >
                <div className="absolute inset-0 z-0">
                   <img src={project.imageUrl} loading="lazy" className="w-full h-full object-cover grayscale-[0.1] brightness-[0.5] group-hover:brightness-[0.8] transition-all duration-700" alt={project.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-0 z-10 p-8 md:p-16 flex flex-col justify-end text-start">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-white px-4 py-1.5 bg-[#c5a059]/80 rounded-full border border-[#c5a059]/40 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-3xl md:text-6xl font-black serif-display italic text-white mb-4 tracking-tighter group-hover:text-[#c5a059] transition-colors">{project.title}</h4>
                  <p className="text-zinc-200 text-sm md:text-xl font-normal mb-8 line-clamp-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity italic">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-4 text-[#c5a059] font-black text-[9px] md:text-xs uppercase tracking-[0.5em] group/btn">
                    <span className="border-b border-[#c5a059]/40 pb-1.5 group-hover/btn:border-[#c5a059] transition-all">Launch Asset</span>
                    <div className="w-10 h-10 rounded-full border border-[#c5a059]/40 flex items-center justify-center group-hover/btn:bg-[#c5a059] group-hover/btn:text-black transition-all"><ExternalLink size={18} /></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-28 md:py-56 bg-transparent relative z-10 px-6">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="text-center lg:text-start">
            <span className="text-[#c5a059] font-black tracking-[1.5em] uppercase text-[9px] mb-12 block italic">Secure Engagement</span>
            <h3 className="text-5xl md:text-[7.5rem] font-black mb-14 text-white serif-display italic tracking-tighter uppercase leading-[0.85]">
              {t.contact.sectionSubtitle}
            </h3>
            
            <div className="space-y-12">
                <div className="flex items-center justify-center lg:justify-start gap-6 group">
                  <div className="w-14 h-14 bg-[#c5a059] text-black rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500"><Phone size={24} /></div>
                  <div className="text-start leading-tight">
                    <p className="text-zinc-500 text-[8px] uppercase tracking-[0.4em] mb-1.5 font-black italic">Voice Line</p>
                    <p className="text-xl md:text-4xl font-black text-white tabular-nums tracking-tighter">055-667-4329</p>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-6 group">
                  <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500"><Mail size={24} /></div>
                  <div className="text-start leading-tight">
                    <p className="text-zinc-500 text-[8px] uppercase tracking-[0.4em] mb-1.5 font-black italic">Official Mail</p>
                    <p className="text-xl md:text-4xl font-black text-white serif-display italic tracking-tighter uppercase">DA@101.ORG.IL</p>
                  </div>
                </div>
            </div>
          </div>

          <div className="bg-[#1a1d23]/95 p-8 md:p-16 rounded-[3.5rem] border border-white/20 shadow-3xl backdrop-blur-2xl">
            {!isFormSubmitted ? (
              <form onSubmit={handleFinalSubmit} className="space-y-12 relative z-10">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.6em] ml-1.5">{t.contact.name}</label>
                  <input value={contactName} onChange={(e) => setContactName(e.target.value)} required className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-4xl outline-none focus:border-[#c5a059] transition-all text-white serif-display italic placeholder:text-zinc-800" placeholder="דוד אפרגן" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.6em] ml-1.5">{t.contact.phone}</label>
                  <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-4xl outline-none focus:border-[#c5a059] transition-all text-white tabular-nums placeholder:text-zinc-800" placeholder="050-000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.6em] ml-1.5">{t.contact.message}</label>
                  <textarea value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} required className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-4xl outline-none resize-none focus:border-[#c5a059] transition-all text-white serif-display italic placeholder:text-zinc-800" rows={1} placeholder="..." />
                </div>
                <button type="submit" className="w-full py-7 bg-white text-black font-black uppercase text-[11px] rounded-full shadow-2xl hover:bg-[#c5a059] transition-all tracking-[1em] mt-8">{t.contact.send}</button>
              </form>
            ) : (
              <div className="text-center py-20">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-[#c5a059]/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#c5a059]/40"><CheckCircle2 size={48} className="text-[#c5a059]" /></motion.div>
                <h4 className="text-3xl md:text-5xl font-black text-white serif-display italic mb-6 tracking-tight">{t.contact.success}</h4>
                <button onClick={() => setIsFormSubmitted(false)} className="text-[#c5a059] text-[9px] font-black uppercase tracking-widest mt-6 underline underline-offset-8">Send New Inquiry</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="py-20 md:py-32 border-t border-white/10 bg-black text-center relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] rounded-2xl mx-auto mb-10 flex items-center justify-center font-black text-white text-2xl shadow-2xl transform-gpu">DA</div>
        <p className="text-zinc-500 font-black tracking-[0.8em] uppercase text-[10px] mb-12 opacity-80">DA GROUP • ELITE DIGITAL ARCHITECTURE</p>
        <div className="flex justify-center gap-10 opacity-60 grayscale mb-16">
           <ShieldCheck size={24} /> <Globe size={24} /> <Zap size={24} />
        </div>
        <p className="text-zinc-600 text-[9px] font-bold tracking-[0.5em] uppercase">
          © {new Date().getFullYear()} DA PROJECT MANAGEMENT & ENTREPRENEURSHIP. ALL RIGHTS RESERVED.
        </p>
      </footer>

      <div className="fixed bottom-6 left-6 z-[120] flex flex-col gap-4">
        <motion.a 
          href="tel:0556674329" 
          whileHover={{ scale: 1.1, y: -4 }} 
          className="w-12 h-12 md:w-16 md:h-16 bg-white border border-[#c5a059]/40 text-black rounded-2xl flex items-center justify-center shadow-xl backdrop-blur-md transform-gpu"
        >
          <Phone size={24} />
        </motion.a>
        <motion.a 
          href="https://wa.me/972556674329" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -4 }} 
          className="w-16 h-16 md:w-20 md:h-20 bg-[#25D366] text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl backdrop-blur-md transform-gpu"
        >
          <MessageCircle size={36} />
        </motion.a>
      </div>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent z-[200] origin-left" 
        style={{ scaleX: useSpring(useScroll().scrollYProgress, { stiffness: 150, damping: 30 }) }} 
      />
    </div>
  );
};

export default App;