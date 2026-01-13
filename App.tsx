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

// אופטימיזציה: הוספת w=800, q=75 ו-fm=webp לכל תמונות הפורטפוליו
const projects: ExtendedProject[] = [
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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]">
      <motion.div style={{ y: yTranslate }} className="absolute inset-0 opacity-15 transform-gpu will-change-transform">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60&w=1400&fm=webp" 
          className="w-full h-full object-cover grayscale brightness-50"
          alt="Atmosphere"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
      {/* אופטימיזציה: הפחתת Blur ל-64px והוספת transform-gpu למניעת לאגים */}
      <motion.div 
        animate={{ 
          x: [0, 150, -150, 0], 
          y: [0, -80, 80, 0],
          scale: [1, 1.4, 0.8, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="glow-spot w-[600px] h-[600px] bg-[#c5a059] top-[-10%] left-[-10%] opacity-20 blur-[64px] transform-gpu will-change-transform"
      />
      <motion.div 
        animate={{ 
          x: [0, -200, 200, 0], 
          y: [0, 150, -150, 0],
          scale: [1, 0.7, 1.5, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="glow-spot w-[500px] h-[500px] bg-[#0ea5e9] bottom-[-10%] right-[-10%] opacity-20 blur-[60px] transform-gpu will-change-transform"
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
      
      const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

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
    const whatsappUrl = `https://wa.me/972556674329?text=${encodeURIComponent(`*פנייה חדשה מאתר DA Group*\n\n*שם:* ${contactName}\n*טלפון:* ${contactPhone}\n*תוכן:* ${contactMessage}`)}`;
    window.open(whatsappUrl, '_blank');
    setIsFormSubmitted(true);
  };

  return (
    <div className="min-h-screen text-[#f5f5f7] antialiased overflow-x-hidden selection:bg-[#c5a059] selection:text-black">
      <CustomCursor />
      <AtmosphericBackground />
      
      {/* Background Floating Typography Layers - Optimized with transform-gpu */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute right-[-3vw] top-0 bottom-0 flex flex-col items-center justify-around opacity-[0.03] select-none font-black text-[12vh] md:text-[18vh] uppercase serif-display italic leading-none pointer-events-none">
            <motion.div 
              animate={{ y: [0, -1000] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="flex flex-col gap-32 transform-gpu will-change-transform"
            >
              <span className="gold-gradient-text transform rotate-90">EXCELLENCE</span>
              <span className="gold-gradient-text transform rotate-90">STRATEGY</span>
              <span className="gold-gradient-text transform rotate-90">INNOVATION</span>
              <span className="gold-gradient-text transform rotate-90">DA GROUP</span>
              <span className="gold-gradient-text transform rotate-90">EXCELLENCE</span>
              <span className="gold-gradient-text transform rotate-90">STRATEGY</span>
            </motion.div>
         </div>
         <div className="absolute left-[-3vw] top-0 bottom-0 flex flex-col items-center justify-around opacity-[0.03] select-none font-black text-[12vh] md:text-[18vh] uppercase serif-display italic leading-none pointer-events-none">
            <motion.div 
              animate={{ y: [-1000, 0] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="flex flex-col gap-32 transform-gpu will-change-transform"
            >
              <span className="gold-gradient-text transform -rotate-90">ENTREPRENEURSHIP</span>
              <span className="gold-gradient-text transform -rotate-90">PREMIUM</span>
              <span className="gold-gradient-text transform -rotate-90">DIGITAL ELITE</span>
              <span className="gold-gradient-text transform -rotate-90">LUXURY</span>
              <span className="gold-gradient-text transform -rotate-90">ENTREPRENEURSHIP</span>
              <span className="gold-gradient-text transform -rotate-90">PREMIUM</span>
            </motion.div>
         </div>
      </div>

      <nav className="fixed top-0 w-full z-[90] h-16 md:h-24 flex items-center border-b border-white/5 bg-black/80 backdrop-blur-2xl shadow-2xl transform-gpu">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] rounded-xl flex items-center justify-center font-black text-white text-xl md:text-2xl shadow-[0_0_30px_rgba(197,160,89,0.3)] group-hover:scale-105 transition-transform duration-500 transform-gpu">DA</div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs md:text-lg font-black tracking-[0.2em] block serif-display uppercase text-white group-hover:text-[#c5a059] transition-colors">DA GROUP</span>
              <span className="text-[7px] md:text-[10px] text-[#c5a059] tracking-[0.5em] font-bold uppercase italic opacity-80">Strategic Ventures</span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-12">
            {['services', 'portfolio', 'contact'].map((id) => (
              <a 
                key={id} 
                href={`#${id}`} 
                onClick={(e) => handleNavClick(e, id)}
                className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-zinc-300 uppercase hover:text-[#c5a059] transition-all relative group"
              >
                {t.nav[id]}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#c5a059] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
            <button 
              onClick={() => setLang(l => l === 'he' ? 'en' : 'he')}
              className="px-6 py-2 border border-[#c5a059]/30 rounded-full text-[10px] font-black text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all duration-500 bg-black/40 backdrop-blur-md"
            >
              {lang === 'he' ? 'ENGLISH' : 'עברית'}
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
             <button onClick={() => setLang(l => l === 'he' ? 'en' : 'he')} className="text-[#c5a059] text-[10px] font-black">{lang === 'he' ? 'EN' : 'עב'}</button>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[80%] z-[100] bg-black/95 backdrop-blur-3xl border-l border-white/10 flex flex-col p-12 lg:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transform-gpu"
          >
            <div className="flex justify-end mb-20">
               <button onClick={() => setIsMenuOpen(false)} className="text-[#c5a059]"><X size={36} /></button>
            </div>
            <div className="flex flex-col gap-12">
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
            <div className="mt-auto pt-10 border-t border-white/10">
               <p className="text-[#c5a059] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">DA Group Private Client</p>
               <p className="text-zinc-500 text-sm italic">Elite Digital Assets & Architecture.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-white/[0.03] border border-white/10 rounded-full mb-12 backdrop-blur-xl shadow-inner transform-gpu"
          >
            <Sparkles size={14} className="text-[#c5a059] animate-pulse" />
            <span className="text-[10px] md:text-[11px] font-black tracking-[0.5em] text-[#c5a059] uppercase">{t.hero.tagline}</span>
          </motion.div>
          
          <div className="mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-[9rem] font-black leading-[0.85] tracking-tighter text-white serif-display italic transform-gpu"
            >
              <span className="block mb-4">{lang === 'he' ? 'ניהול' : 'DA'}</span>
              <span className="gold-gradient-text block relative">
                 {lang === 'he' ? 'פרויקטים ויזמות' : 'STRATEGY'}
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8, duration: 1 }}
            className="text-[12px] md:text-xl text-zinc-400 mb-16 max-w-2xl mx-auto leading-relaxed font-light italic opacity-80"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-full max-w-5xl mx-auto p-[1px] rounded-[3rem] bg-gradient-to-br from-[#c5a059]/40 via-white/5 to-[#c5a059]/40 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform-gpu"
          >
            <div className="bg-[#050505]/98 backdrop-blur-3xl rounded-[2.95rem] p-8 md:p-16 border border-white/5 relative overflow-hidden text-start">
              <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059] shadow-inner border border-[#c5a059]/20 transform-gpu">
                  <BrainCircuit size={32} className={isAiLoading ? 'animate-pulse' : ''} />
                </div>
                <div className="text-center md:text-start">
                  <h2 className="text-xl md:text-3xl font-black text-white serif-display italic uppercase tracking-widest">
                    {lang === 'he' ? 'הזן את החזון שלך לאפיון ופיתוח אסטרטגי' : 'Strategic Blueprint Engine'}
                  </h2>
                  <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mt-2 italic">Powered by Gemini 3 Pro Elite</p>
                </div>
              </div>

              <div className="relative mb-12 group">
                <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={placeholders[lang][placeholderIndex]}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 md:p-10 text-white text-sm md:text-2xl font-light italic outline-none focus:border-[#c5a059] transition-all min-h-[200px] resize-none pr-20 shadow-inner placeholder:text-zinc-800"
                />
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateIdeaBlueprint}
                  disabled={isAiLoading || !aiInput.trim()}
                  className="absolute bottom-8 right-8 w-14 h-14 bg-[#c5a059] text-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(197,160,89,0.4)] hover:shadow-[0_15px_40px_rgba(197,160,89,0.6)] transition-all disabled:opacity-20 disabled:grayscale transform-gpu"
                >
                  {isAiLoading ? <Loader2 size={28} className="animate-spin" /> : <Send size={28} />}
                </motion.button>
              </div>

              <AnimatePresence>
                {aiResponse && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                  >
                    <div className="flex flex-col justify-between p-8 rounded-[2.5rem] bg-white/[0.01] border border-[#c5a059]/20 shadow-2xl relative group/card transform-gpu">
                      <div>
                        <div className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.5em] mb-6 flex items-center gap-3">
                          <ShieldCheck size={14} /> Full Strategic characterization
                        </div>
                        <div className="text-zinc-200 text-sm md:text-lg font-light leading-relaxed italic mb-10 whitespace-pre-wrap max-h-[400px] overflow-y-auto custom-scrollbar pr-4">
                          {aiResponse.characterization}
                        </div>
                      </div>
                      <button 
                        onClick={submitToExperts}
                        className="w-full py-6 bg-[#c5a059] text-black font-black uppercase text-[11px] rounded-full flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl tracking-[0.2em] transform-gpu"
                      >
                        <Rocket size={18} />
                        {lang === 'he' ? 'הוצא את הרעיון לפועל - שלח למומחים' : 'EXECUTE VISION - SEND TO DA'}
                      </button>
                      <div className="absolute top-0 right-0 p-6 opacity-20 group-hover/card:opacity-100 transition-opacity">
                         <Zap size={20} className="text-[#c5a059]" />
                      </div>
                    </div>

                    <div className="rounded-[2.5rem] border border-white/10 bg-black overflow-hidden relative group/preview shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] transform-gpu">
                      <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10 px-8">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-3">
                           <Monitor size={14} className="text-[#c5a059]" /> Intelligent UI Preview
                        </span>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-white/20" />
                          <div className="w-2 h-2 rounded-full bg-white/20" />
                          <div className="w-2 h-2 rounded-full bg-[#c5a059]/40" />
                        </div>
                      </div>
                      <div className="h-[350px] md:h-[500px] overflow-hidden relative">
                         <iframe
                            title="Blueprint Preview"
                            srcDoc={aiResponse.htmlPreview}
                            className="w-full h-full border-none pointer-events-none"
                         />
                         <div className="absolute inset-0 bg-black/0 group-hover/preview:bg-black/20 transition-colors pointer-events-none flex items-center justify-center opacity-0 group-hover/preview:opacity-100">
                            <div className="bg-[#c5a059] text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl">
                              <MousePointer2 size={14} /> Auto-Scrolling Active
                            </div>
                         </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-32 md:py-56 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24 md:mb-40 text-center transform-gpu"
          >
            <span className="text-[#c5a059] font-bold tracking-[1em] uppercase text-[10px] mb-6 block italic">Core Ecosystem</span>
            <h2 className="text-4xl md:text-7xl font-black text-white serif-display italic leading-tight uppercase tracking-tighter">
              {t.services.sectionSubtitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {t.services.items.map((service: any, idx: number) => {
              const Icon = IconMap[service.icon];
              const accentColor = ColorMap[service.id] || '#c5a059';
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.7 }}
                  className="bento-card p-12 rounded-[3rem] border border-white/5 relative group bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all transform-gpu"
                  whileHover={{ scale: 1.03, borderColor: accentColor + '66' }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 shadow-inner border border-white/10 transform-gpu"
                    style={{ backgroundColor: accentColor + '11', color: accentColor }}
                  >
                    <Icon size={32} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold mb-6 text-white serif-display italic tracking-tight">{service.title}</h4>
                  <p className="text-zinc-400 text-sm md:text-lg font-light leading-relaxed mb-10 italic opacity-80">
                    {service.description}
                  </p>
                  <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">Unit 0{idx+1}</span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all transform-gpu">
                       <ArrowUpRight size={20} style={{ color: accentColor }} className="group-hover:text-black" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 md:py-56 relative z-10 overflow-hidden bg-black/20">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <div className="mb-24 md:mb-40">
            <span className="text-[#c5a059] font-bold tracking-[1.5em] uppercase text-[10px] mb-8 block italic">Selected Works</span>
            <h2 className="text-5xl md:text-[8rem] font-black tracking-tighter text-white serif-display italic leading-[0.9]">
              {t.portfolio.sectionSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.15 }}
                className="group relative h-[450px] md:h-[750px] rounded-[4rem] overflow-hidden border border-white/5 cursor-pointer shadow-[0_50px_100px_rgba(0,0,0,0.8)] transform-gpu"
                onClick={() => window.open(project.link, '_blank')}
              >
                <div className="absolute inset-0 z-0">
                   <img 
                     src={project.imageUrl} 
                     loading="lazy"
                     className="w-full h-full object-cover grayscale brightness-50 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] transform-gpu" 
                     alt={project.title} 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>
                <div className="absolute inset-0 z-10 p-10 md:p-20 flex flex-col justify-end text-start">
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] px-5 py-2 bg-black/80 rounded-full border border-[#c5a059]/30 backdrop-blur-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-3xl md:text-6xl font-black serif-display italic text-white mb-6 tracking-tighter group-hover:text-[#c5a059] transition-colors duration-500">{project.title}</h4>
                  <p className="text-zinc-300 text-sm md:text-xl font-light mb-10 line-clamp-3 italic opacity-0 group-hover:opacity-100 transform translate-y-10 group-hover:translate-y-0 transition-all duration-700">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-6 text-[#c5a059] font-bold text-[10px] md:text-[12px] uppercase tracking-[0.6em] group/btn">
                    <span className="border-b-2 border-[#c5a059]/30 pb-2 group-hover/btn:border-[#c5a059] transition-all">Launch Digital Asset</span>
                    <div className="w-12 h-12 rounded-full border border-[#c5a059]/30 flex items-center justify-center group-hover/btn:bg-[#c5a059] group-hover/btn:text-black transition-all transform-gpu">
                       <ExternalLink size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 md:py-64 bg-transparent relative z-10">
        <div className="max-w-[1300px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            <div className="text-center lg:text-start">
              <span className="text-[#c5a059] font-bold tracking-[1.5em] uppercase text-[10px] mb-16 block">Secure Inquiry</span>
              <h3 className="text-5xl md:text-[7rem] font-black mb-16 leading-[0.85] text-white serif-display italic tracking-tighter uppercase">
                {t.contact.sectionSubtitle}
              </h3>
              
              <div className="space-y-20">
                <div className="flex items-center gap-10 group">
                  <div className="w-20 h-20 bg-[#0a0a0b] border border-white/10 rounded-full flex items-center justify-center text-[#c5a059] shadow-2xl group-hover:bg-[#c5a059] group-hover:text-black transition-all duration-500 transform-gpu">
                    <Phone size={36} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] mb-3 font-black italic">Voice Line</p>
                    <p className="text-2xl md:text-4xl font-black text-white tracking-tighter tabular-nums">055-667-4329</p>
                  </div>
                </div>
                <div className="flex items-center gap-10 group">
                  <div className="w-20 h-20 bg-[#0a0a0b] border border-white/10 rounded-full flex items-center justify-center text-[#c5a059] shadow-2xl group-hover:bg-[#c5a059] group-hover:text-black transition-all duration-500 transform-gpu">
                    <Mail size={36} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] mb-3 font-black italic">Encrypted Mail</p>
                    <p className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase font-serif italic">DA@101.ORG.IL</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="p-10 md:p-20 rounded-[5rem] bento-card shadow-[0_100px_150px_-50px_rgba(0,0,0,1)] relative overflow-hidden border border-white/10 bg-black/60 shadow-gold-500/5 transform-gpu"
            >
              {!isFormSubmitted ? (
                <form onSubmit={handleFinalSubmit} className="space-y-16 relative z-10">
                  <div className="grid grid-cols-1 gap-16">
                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.7em] ml-2">{t.contact.name}</label>
                      <input 
                        type="text" 
                        required 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-white/10 p-4 focus:border-[#c5a059] outline-none text-xl md:text-3xl font-light text-white transition-all serif-display italic placeholder:text-zinc-900" 
                        placeholder={lang === 'he' ? 'שם מלא / יישות עסקית' : 'Full Name / Entity'} 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.7em] ml-2">{t.contact.phone}</label>
                      <input 
                        type="tel" 
                        required 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-transparent border-b-2 border-white/10 p-4 focus:border-[#c5a059] outline-none text-xl md:text-3xl font-light text-white transition-all serif-display italic placeholder:text-zinc-900" 
                        placeholder={lang === 'he' ? 'מספר ליצירת קשר' : 'Contact Number'} 
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.7em] ml-2">{t.contact.message}</label>
                      <textarea 
                        rows={2} 
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required 
                        className="w-full bg-transparent border-b-2 border-white/10 p-4 focus:border-[#c5a059] outline-none resize-none text-xl md:text-3xl font-light text-white transition-all serif-display italic placeholder:text-zinc-900" 
                        placeholder={lang === 'he' ? 'פרט כאן את החזון שלך...' : 'Brief vision summary...'} 
                      />
                    </div>
                  </div>
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: '#c5a059', color: '#000' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-8 bg-white text-black font-black uppercase text-xs md:text-sm rounded-full shadow-2xl transition-all tracking-[1em] relative overflow-hidden group transform-gpu"
                  >
                    <span className="relative z-10">{t.contact.send}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-24">
                   <motion.div 
                     initial={{ scale: 0, rotate: -180 }} 
                     animate={{ scale: 1, rotate: 0 }} 
                     className="w-32 h-32 bg-[#c5a059]/10 rounded-full flex items-center justify-center mx-auto mb-12 border border-[#c5a059]/20 shadow-[0_0_50px_rgba(197,160,89,0.2)] transform-gpu"
                   >
                      <CheckCircle2 size={60} className="text-[#c5a059]" />
                   </motion.div>
                   <h4 className="text-2xl md:text-5xl font-black text-white serif-display italic mb-8 tracking-tight">{t.contact.success}</h4>
                   <p className="text-zinc-500 mb-12 text-lg md:text-2xl italic font-light">אנחנו ננתח את האפיון ונחזור אליך תוך 24 שעות.</p>
                   <button onClick={() => setIsFormSubmitted(false)} className="text-[#c5a059] text-xs font-black uppercase underline underline-offset-[12px] tracking-[0.6em] hover:text-white transition-colors">Start New Inquiry</button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-24 md:py-48 bg-black border-t border-white/5 relative z-10 overflow-hidden transform-gpu">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-col items-center gap-20">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] rounded-[1.5rem] flex items-center justify-center font-black text-white text-3xl serif-display shadow-2xl transform-gpu">DA</div>
              <div className="text-start leading-none">
                <span className="text-2xl md:text-5xl font-black tracking-[0.1em] block serif-display uppercase text-white">DA GROUP</span>
                <span className="text-[12px] md:text-[14px] text-[#c5a059] tracking-[1em] font-bold uppercase mt-3 italic block opacity-80">Gold Tier Ventures</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-20 gap-y-10">
               {['services', 'portfolio', 'contact'].map(item => (
                 <a key={item} href={`#${item}`} onClick={(e) => handleNavClick(e, item)} className="text-[11px] font-bold tracking-[0.5em] uppercase text-zinc-500 hover:text-white transition-colors border-b border-transparent hover:border-[#c5a059] pb-2">{t.nav[item]}</a>
               ))}
            </div>

            <div className="space-y-8">
               <p className="text-zinc-600 text-[10px] md:text-[13px] font-bold tracking-[0.8em] uppercase italic opacity-60 max-w-2xl mx-auto leading-relaxed">
                  ULTRA-HIGH END STRATEGY & ARCHITECTURE FOR VISIONARY DISRUPTORS.
               </p>
               <div className="flex justify-center gap-8 opacity-40">
                  <ShieldCheck size={20} className="text-zinc-500" />
                  <Globe size={20} className="text-zinc-500" />
                  <Zap size={20} className="text-zinc-500" />
               </div>
               <p className="text-zinc-800 text-[10px] md:text-[12px] font-bold tracking-[0.6em] uppercase">
                  © {new Date().getFullYear()} DA PROJECT MANAGEMENT & ENTREPRENEURSHIP. ALL RIGHTS RESERVED.
               </p>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-10 left-10 z-[100] flex flex-col gap-8">
        <motion.a 
          href="tel:0556674329" 
          whileHover={{ scale: 1.1, y: -8, backgroundColor: '#c5a059' }}
          className="w-14 h-14 md:w-20 md:h-20 bg-[#0a0a0b] border border-white/10 text-white rounded-[2rem] flex items-center justify-center shadow-2xl transition-all backdrop-blur-xl group transform-gpu"
        >
          <Phone size={30} className="group-hover:text-black transition-colors" />
        </motion.a>
        <motion.a 
          href="https://wa.me/972556674329" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -8 }}
          className="w-16 h-16 md:w-24 md:h-24 bg-green-600/90 text-white rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(22,163,74,0.4)] transition-all backdrop-blur-xl group transform-gpu"
        >
          <MessageCircle size={40} className="group-hover:scale-110 transition-transform" />
        </motion.a>
      </div>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent origin-left z-[100]"
        style={{ scaleX: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }) }}
      />
    </div>
  );
};

export default App;