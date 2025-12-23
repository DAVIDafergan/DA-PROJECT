
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
  MousePointer2
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { translations } from './translations';
import { Language, Project } from './types';

interface ExtendedProject extends Project {
  tags: string[];
}

const projects: ExtendedProject[] = [
  {
    id: 'helevhitim',
    title: 'מוסדות חלב חיטים',
    description: 'מערכת ניהול מורכבת ופורטל ארגוני חדשני המרכז את כלל פעילות המוסד.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    link: 'https://www.helevhitim.com/',
    tags: ['Software', 'Enterprise']
  },
  {
    id: 'jennyskallot',
    title: 'ג׳ני שמלות כלה',
    description: 'אתר בוטיק יוקרתי המציג קולקציות שמלות כלה בתצוגה ויזואלית עוצרת נשימה וחווית משתמש פרימיום.',
    imageUrl: 'https://images.unsplash.com/photo-1596433809252-260c2745dfdd?auto=format&fit=crop&q=80&w=1200',
    link: 'https://jennyskallot.com/',
    tags: ['Luxury E-comm', 'Fashion']
  },
  {
    id: 'lichvoda',
    title: 'סטודיו לכבודה',
    description: 'אתר תדמית יוקרתי לסטודיו לאומנויות הבמה המשלב תנועה ואסתטיקה.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    link: 'https://lichvoda.co.il/',
    tags: ['Portfolio', 'Design']
  },
  {
    id: 'liveraise',
    title: 'LiveRaise Production',
    description: 'מערכת מסכי רתימה דינמית לגיוס המונים בזמן אמת עם גרפיקה חיה.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    link: 'https://liveraise-production.up.railway.app/',
    tags: ['Real-time', 'Fundraising']
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
      <motion.div style={{ y: yTranslate }} className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover grayscale brightness-50"
          alt="Atmosphere"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
      <motion.div 
        animate={{ 
          x: [0, 150, -150, 0], 
          y: [0, -80, 80, 0],
          scale: [1, 1.4, 0.8, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="glow-spot w-[600px] h-[600px] bg-[#c5a059] top-[-10%] left-[-10%] opacity-20"
      />
      <motion.div 
        animate={{ 
          x: [0, -200, 200, 0], 
          y: [0, 150, -150, 0],
          scale: [1, 0.7, 1.5, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="glow-spot w-[500px] h-[500px] bg-[#0ea5e9] bottom-[-10%] right-[-10%] opacity-20"
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
        className="fixed top-0 left-0 w-8 h-8 border border-[#c5a059] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#c5a059] rounded-full pointer-events-none z-[9999] hidden md:block"
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
  
  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  const t = translations[lang];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders[lang].length);
    }, 6000);
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `You are the Lead Creative Architect at DA Group. 
      The user has this specific vision: "${aiInput}".
      
      STRICT GUIDELINES:
      1. Focus solely on characterizing the user's actual idea. Use professional business language.
      2. Write a professional, punchy characterization in ${lang === 'he' ? 'Hebrew' : 'English'}.
      3. Generate a LUXURY, MINIMAL, MOBILE-RESPONSIVE HTML landing page (single file).
      4. The HTML MUST include a script or CSS that performs a slow, constant automatic vertical scroll from top to bottom and repeats, to showcase the design.
      5. Design aesthetic: Dark (#020202), Gold accents (#c5a059), high-end serif typography.
      
      Output ONLY a JSON object with keys: "characterization" and "htmlPreview".`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              characterization: { type: Type.STRING },
              htmlPreview: { type: Type.STRING }
            },
            required: ["characterization", "htmlPreview"]
          }
        }
      });

      const result = JSON.parse(response.text);
      setAiResponse(result);
    } catch (error) {
      console.error("Blueprint Engine Error:", error);
    } finally {
      setIsAiLoading(false);
    }
  };

  const submitToExperts = () => {
    if (!aiResponse) return;
    const blueprintHeader = lang === 'he' ? '--- אפיון חזון עסקי ---' : '--- Strategic Vision Blueprint ---';
    setContactMessage(`${blueprintHeader}\n\n${aiResponse.characterization}\n\n${lang === 'he' ? 'נשלח מהמעבדה האסטרטגית של DA Group' : 'Sent from DA Group Strategic Lab'}`);
    const element = document.getElementById('contact');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = '972556674329';
    const introText = lang === 'he' ? 'שלום DA Group, התקבלה פנייה חדשה מהאתר:' : 'Hello DA Group, a new inquiry from the website:';
    
    const messageBody = `
${introText}
---------------------------------
*${t.contact.name}:* ${contactName}
*${t.contact.phone}:* ${contactPhone}
*${t.contact.message}:*
${contactMessage}
---------------------------------
    `.trim();

    const encodedMessage = encodeURIComponent(messageBody);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsFormSubmitted(true);
  };

  return (
    <div className="min-h-screen text-[#f5f5f7] antialiased overflow-x-hidden">
      <CustomCursor />
      <AtmosphericBackground />
      
      {/* Background Floating Elements Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <motion.div 
            animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[5%] opacity-20 md:opacity-30"
         >
            <div className="w-20 h-20 border border-[#c5a059] rounded-full" />
         </motion.div>
         <motion.div 
            animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[60%] right-[10%] opacity-15 md:opacity-25"
         >
            <div className="w-32 h-32 border border-[#c5a059] rounded-tl-[3rem] rounded-br-[3rem]" />
         </motion.div>
         {/* Vertical Text Marquee (Slow Scroll) */}
         <div className="absolute right-[-2vw] top-0 bottom-0 flex flex-col items-center justify-around opacity-5 select-none font-black text-[10vh] md:text-[15vh] uppercase serif-display italic leading-none pointer-events-none">
            <motion.div 
              animate={{ y: [0, -500] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex flex-col gap-20"
            >
              <span className="gold-gradient-text transform rotate-90">EXCELLENCE</span>
              <span className="gold-gradient-text transform rotate-90">INNOVATION</span>
              <span className="gold-gradient-text transform rotate-90">DA GROUP</span>
              <span className="gold-gradient-text transform rotate-90">STRATEGY</span>
              <span className="gold-gradient-text transform rotate-90">EXCELLENCE</span>
            </motion.div>
         </div>
      </div>

      <nav className="fixed top-0 w-full z-[90] h-16 md:h-20 flex items-center border-b border-white/10 bg-black/90 backdrop-blur-3xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 md:w-11 md:h-11 bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] rounded-lg flex items-center justify-center font-black text-white text-base md:text-xl">DA</div>
            <div className="flex flex-col leading-none">
              <span className="text-[10px] md:text-sm font-black tracking-widest block serif-display uppercase text-white">DA GROUP</span>
              <span className="text-[7px] md:text-[9px] text-[#c5a059] tracking-[0.6em] font-bold uppercase italic">Digital Elite</span>
            </div>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10">
            {['services', 'portfolio', 'contact'].map((id) => (
              <a 
                key={id} 
                href={`#${id}`} 
                onClick={(e) => handleNavClick(e, id)}
                className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-zinc-100 uppercase hover:text-[#c5a059] transition-all"
              >
                {t.nav[id]}
              </a>
            ))}
            <button 
              onClick={() => setLang(l => l === 'he' ? 'en' : 'he')}
              className="px-4 py-1.5 border border-[#c5a059]/40 rounded-full text-[9px] md:text-[11px] font-black text-[#c5a059] hover:bg-[#c5a059] hover:text-white transition-all bg-black/40"
            >
              {lang === 'he' ? 'ENGLISH' : 'עברית'}
            </button>
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden hero-grid">
        <div className="max-w-5xl mx-auto px-6 w-full relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/[0.04] border border-white/10 rounded-full mb-8 backdrop-blur-xl"
          >
            <Sparkles size={12} className="text-[#c5a059]" />
            <span className="text-[8px] md:text-[9px] font-black tracking-[0.4em] text-[#c5a059] uppercase">{t.hero.tagline}</span>
          </motion.div>
          
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-[7rem] font-black leading-[0.95] tracking-tighter text-white serif-display italic"
            >
              <span className="block mb-2">{lang === 'he' ? 'ניהול' : 'DA'}</span>
              <span className="gold-gradient-text block">
                 {lang === 'he' ? 'פרויקטים ויזמות' : 'PROJECTS'}
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="text-[11px] md:text-lg text-zinc-400 mb-12 max-w-lg mx-auto leading-relaxed font-light italic"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="w-full max-w-4xl mx-auto mt-4 p-px rounded-[2rem] bg-gradient-to-br from-[#c5a059]/30 via-white/5 to-[#c5a059]/30 shadow-3xl"
          >
            <div className="bg-[#050505]/95 backdrop-blur-3xl rounded-[1.95rem] p-6 md:p-12 border border-white/5 relative overflow-hidden text-start">
              <div className="flex flex-col md:flex-row items-center gap-5 mb-10">
                <div className="w-10 h-10 rounded-lg bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                  <PenTool size={24} className={isAiLoading ? 'animate-pulse' : ''} />
                </div>
                <div className="text-center md:text-start">
                  <h2 className="text-base md:text-xl font-black text-white serif-display italic uppercase tracking-widest">
                    {lang === 'he' ? 'כתוב את הרעיון שלך או את הפתרון לעסק שלך' : 'Blueprint Your Vision or Business Solution'}
                  </h2>
                </div>
              </div>

              <div className="relative mb-8 group">
                <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={placeholders[lang][placeholderIndex]}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-6 text-white text-sm md:text-lg font-light italic outline-none focus:border-[#c5a059] transition-all min-h-[160px] resize-none pr-14"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={generateIdeaBlueprint}
                  disabled={isAiLoading || !aiInput.trim()}
                  className="absolute bottom-5 right-5 w-10 h-10 bg-[#c5a059] text-black rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all disabled:opacity-30"
                >
                  {isAiLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </motion.button>
              </div>

              <AnimatePresence>
                {aiResponse && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                  >
                    <div className="flex flex-col justify-between p-6 rounded-2xl bg-white/[0.01] border border-[#c5a059]/10">
                      <div>
                        <div className="text-[#c5a059] text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
                          <CheckCircle2 size={12} /> Strategic Blueprint
                        </div>
                        <p className="text-zinc-200 text-xs md:text-base font-light leading-relaxed italic mb-8">
                          {aiResponse.characterization}
                        </p>
                      </div>
                      <button 
                        onClick={submitToExperts}
                        className="w-full py-4 bg-[#c5a059] text-black font-black uppercase text-[10px] rounded-full flex items-center justify-center gap-2 hover:bg-white transition-all shadow-xl"
                      >
                        <Rocket size={16} />
                        {lang === 'he' ? 'הוצא את הרעיון לפועל - שלח עכשיו' : 'Execute Vision - Send to DA'}
                      </button>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black overflow-hidden relative group">
                      <div className="bg-white/5 p-2 flex items-center justify-between border-b border-white/5 px-4">
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                           <Monitor size={12} /> Live Preview
                        </span>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        </div>
                      </div>
                      <div className="h-[250px] md:h-[350px] overflow-hidden relative group">
                         <motion.div 
                           className="w-full h-full"
                           whileHover={{ scale: 1.02 }}
                           transition={{ duration: 0.5 }}
                         >
                            <iframe
                              title="Vision Preview"
                              srcDoc={aiResponse.htmlPreview}
                              className="w-full h-full border-none pointer-events-none"
                            />
                         </motion.div>
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="bg-[#c5a059] text-black px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                              <MousePointer2 size={12} /> Hover to Explore
                            </div>
                         </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-24 md:py-40 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 md:mb-32 text-center"
          >
            <span className="text-[#c5a059] font-bold tracking-[0.8em] uppercase text-[9px] mb-4 block italic">Core Ecosystem</span>
            <h2 className="text-2xl md:text-5xl font-black text-white serif-display italic leading-tight uppercase tracking-tighter">
              {t.services.sectionSubtitle}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.items.map((service: any, idx: number) => {
              const Icon = IconMap[service.icon];
              const accentColor = ColorMap[service.id] || '#c5a059';
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bento-card p-10 rounded-[2rem] border border-white/5 relative group bg-black/40 backdrop-blur-xl"
                  whileHover={{ scale: 1.02, borderColor: accentColor + '44' }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-8 shadow-inner border border-white/10"
                    style={{ backgroundColor: accentColor + '22', color: accentColor }}
                  >
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold mb-4 text-white serif-display italic">{service.title}</h4>
                  <p className="text-zinc-400 text-[11px] md:text-sm font-light leading-relaxed mb-8 italic opacity-80">
                    {service.description}
                  </p>
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">Unit 0{idx+1}</span>
                    <ArrowUpRight size={16} style={{ color: accentColor }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 md:py-40 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16 md:mb-32">
            <span className="text-[#c5a059] font-bold tracking-[1.5em] uppercase text-[9px] mb-6 block italic">Selected Works</span>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white serif-display italic leading-none">
              {t.portfolio.sectionSubtitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative h-[350px] md:h-[550px] rounded-[2.5rem] overflow-hidden border border-white/5 cursor-pointer shadow-2xl"
                onClick={() => window.open(project.link, '_blank')}
              >
                <div className="absolute inset-0 z-0">
                   <img src={project.imageUrl} className="w-full h-full object-cover grayscale brightness-50 opacity-50 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1s]" alt={project.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-0 z-10 p-8 md:p-14 flex flex-col justify-end text-start">
                  <div className="flex gap-3 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[8px] font-bold uppercase tracking-widest text-[#c5a059] px-3 py-1 bg-black/60 rounded-full border border-[#c5a059]/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-xl md:text-4xl font-black serif-display italic text-white mb-3 tracking-tighter group-hover:text-[#c5a059] transition-colors">{project.title}</h4>
                  <p className="text-zinc-300 text-[10px] md:text-base font-light mb-6 line-clamp-2 italic opacity-0 group-hover:opacity-100 transition-all duration-500">{project.description}</p>
                  <div className="flex items-center gap-3 text-[#c5a059] font-bold text-[9px] md:text-[10px] uppercase tracking-[0.4em]">
                    <span className="border-b border-[#c5a059]/40 pb-1">{t.portfolio.viewProject}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 md:py-40 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="text-center lg:text-start">
              <span className="text-[#c5a059] font-bold tracking-[1.5em] uppercase text-[9px] mb-12 block">Secure Inquiry</span>
              <h3 className="text-3xl md:text-[5rem] font-black mb-12 leading-[0.9] text-white serif-display italic tracking-tighter uppercase">
                {t.contact.sectionSubtitle}
              </h3>
              
              <div className="space-y-12">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-[#0a0a0b] border border-white/10 rounded-full flex items-center justify-center text-[#c5a059]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[8px] uppercase tracking-[0.5em] mb-1 font-black italic">Voice Comms</p>
                    <p className="text-xl md:text-2xl font-black text-white tracking-tighter">055-667-4329</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-[#0a0a0b] border border-white/10 rounded-full flex items-center justify-center text-[#c5a059]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-zinc-500 text-[8px] uppercase tracking-[0.5em] mb-1 font-black italic">Mail Drop</p>
                    <p className="text-xl md:text-2xl font-black text-white tracking-tighter uppercase">DA@101.ORG.IL</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="p-10 md:p-14 rounded-[3rem] bento-card shadow-3xl relative overflow-hidden border border-white/10 bg-black/60 shadow-gold-500/10"
            >
              {!isFormSubmitted ? (
                <form onSubmit={handleFinalSubmit} className="space-y-10 relative z-10">
                  <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.5em]">{t.contact.name}</label>
                      <input 
                        type="text" 
                        required 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 p-2 focus:border-[#c5a059] outline-none text-sm md:text-xl font-light text-white transition-all serif-display italic" 
                        placeholder={lang === 'he' ? 'הזן שם מלא' : 'Your Name'} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.5em]">{t.contact.phone}</label>
                      <input 
                        type="tel" 
                        required 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 p-2 focus:border-[#c5a059] outline-none text-sm md:text-xl font-light text-white transition-all serif-display italic" 
                        placeholder={lang === 'he' ? 'מספר טלפון' : 'Phone'} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.5em]">{t.contact.message}</label>
                      <textarea 
                        rows={2} 
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        required 
                        className="w-full bg-transparent border-b border-white/10 p-2 focus:border-[#c5a059] outline-none resize-none text-sm md:text-xl font-light text-white transition-all serif-display italic" 
                        placeholder={lang === 'he' ? 'ספר לנו על הפרויקט שלך...' : 'Brief vision summary...'} 
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-white text-black font-black uppercase text-[10px] md:text-xs rounded-full shadow-lg hover:bg-[#c5a059] hover:text-white transition-all tracking-[0.6em]"
                  >
                    {t.contact.send}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12">
                   <CheckCircle2 size={50} className="text-[#c5a059] mx-auto mb-6" />
                   <h4 className="text-xl md:text-3xl font-black text-white serif-display italic mb-4 tracking-tight">{t.contact.success}</h4>
                   <button onClick={() => setIsFormSubmitted(false)} className="text-[#c5a059] text-[9px] font-black uppercase underline tracking-[0.4em]">New Inquiry</button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-20 md:py-32 bg-black border-t border-white/5 relative z-10 overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-12">
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 bg-gradient-to-br from-[#c5a059] to-[#8a6d3b] rounded-xl flex items-center justify-center font-black text-white text-xl md:text-2xl serif-display">DA</div>
              <div className="text-start leading-none">
                <span className="text-lg md:text-2xl font-black tracking-widest block serif-display uppercase text-white">DA GROUP</span>
                <span className="text-[8px] md:text-[10px] text-[#c5a059] tracking-[0.6em] font-bold uppercase mt-1 italic block opacity-80">Gold Tier Ventures</span>
              </div>
            </div>
            <p className="text-zinc-600 text-[8px] md:text-[10px] font-bold tracking-[0.6em] uppercase italic opacity-60">© {new Date().getFullYear()} DA STRATEGY & VENTURES. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-8 left-8 z-[100] flex flex-col gap-5">
        <motion.a 
          href="tel:0556674329" 
          whileHover={{ scale: 1.1, backgroundColor: "#c5a059" }}
          className="w-10 h-10 md:w-14 md:h-14 bg-[#0a0a0b] border border-white/10 text-white rounded-2xl flex items-center justify-center shadow-xl transition-all"
        >
          <Phone size={20} />
        </motion.a>
        <motion.a 
          href="https://wa.me/972556674329" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, backgroundColor: "#25d366" }}
          className="w-12 h-12 md:w-16 md:h-16 bg-green-800 text-white rounded-[1.5rem] flex items-center justify-center shadow-xl transition-all"
        >
          <MessageCircle size={24} />
        </motion.a>
      </div>
    </div>
  );
};

export default App;
