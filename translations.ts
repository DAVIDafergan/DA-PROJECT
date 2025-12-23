
import { Translations } from './types';

export const translations: Record<'he' | 'en', any> = {
  he: {
    nav: {
      home: 'בית',
      services: 'פתרונות',
      portfolio: 'תיק עבודות',
      contact: 'שיחת ייעוץ',
    },
    hero: {
      tagline: 'המצוינות היא לא יעד, היא הסטנדרט שלנו',
      title: 'DA ניהול פרויקטים ויזמות',
      subtitle: 'אנחנו הופכים חזון למציאות דיגיטלית עוצמתית. פיתוח מערכות קצה, אוטומציות חכמות וניהול פרויקטים בסטנדרט פרימיום לעסקים שרוצים להוביל את השוק.',
      cta: 'מתחילים עכשיו',
    },
    stats: [
      { label: 'פרויקטים מוצלחים', value: '150+' },
      { label: 'שנות ניסיון', value: '12+' },
      { label: 'אוטומציות פעילות', value: '450+' },
      { label: 'שביעות רצון', value: '100%' },
    ],
    services: {
      sectionTitle: 'השירותים שלנו',
      sectionSubtitle: 'מעטפת פתרונות טכנולוגיים מקצה לקצה',
      items: [
        {
          id: 'web',
          title: 'מערכות ואתרים מתקדמים',
          description: 'פיתוח Full-stack של מערכות מורכבות, אתרי תדמית יוקרתיים ופורטלים ארגוניים המשלבים חווית משתמש (UX) מנצחת וטכנולוגיה פורצת דרך.',
          icon: 'Globe'
        },
        {
          id: 'ecommerce',
          title: 'חנויות אינטרנט לעסקים',
          description: 'בניית חנויות אונליין הממוקדות במכירות. אנחנו יוצרים חווית קנייה יוקרתית שגורמת ללקוחות לחזור שוב ושוב.',
          icon: 'ShoppingBag'
        },
        {
          id: 'automation',
          title: 'מערכות בוטים ואוטומציה',
          description: 'ייעול מקסימלי של תהליכים עסקיים. פיתוח בוטים חכמים לשירות לקוחות, סנכרון CRM ואוטומציות שחוסכות לכם זמן וגורפות לידים.',
          icon: 'Cpu'
        },
        {
          id: 'fundraising',
          title: 'קמפיינים לגיוס כספים',
          description: 'ניהול מקצה לקצה של קמפיינים להתרמה וגיוס המונים. כולל מערכות רתימה אינטראקטיביות, ערבי רתימה וניהול שיווקי מלא.',
          icon: 'HeartHandshake'
        },
        {
          id: 'project-mgmt',
          title: 'ניהול פרויקטים וסושיאל',
          description: 'ליווי אסטרטגי צמוד וניהול נוכחות דיגיטלית חזקה. אנחנו בונים את המותג שלכם כסמכות המובילה בתחום.',
          icon: 'Trello'
        }
      ]
    },
    process: {
      title: 'כך אנחנו יוצרים הצלחה',
      steps: [
        { title: 'אסטרטגיה ואפיון', desc: 'אנחנו לומדים את ה-DNA של העסק שלכם כדי לבנות תוכנית פעולה מדויקת.' },
        { title: 'עיצוב פרימיום', desc: 'יצירת ממשקים עוצרי נשימה שמשדרים יוקרה ומקצועיות ללא פשרות.' },
        { title: 'פיתוח וביצוע', desc: 'כתיבת קוד נקי ואופטימלי בטכנולוגיות החדשניות ביותר בעולם.' },
        { title: 'ליווי וצמיחה', desc: 'אנחנו נשארים אתכם גם אחרי ההשקה כדי לוודא שהפרויקט ממריא.' }
      ]
    },
    portfolio: {
      sectionTitle: 'מהשטח',
      sectionSubtitle: 'העבודות שמדברות בעד עצמן',
      viewProject: 'לצפייה בחי'
    },
    contact: {
      sectionTitle: 'בואו נדבר תכלס',
      sectionSubtitle: 'השאירו פרטים ונתחיל לתכנן את המהפכה הדיגיטלית שלכם',
      name: 'שם מלא',
      email: 'כתובת אימייל',
      phone: 'טלפון',
      message: 'ספרו לנו על החזון שלכם',
      send: 'שליחה למחלקה הטכנית',
      success: 'הפנייה התקבלה! נציג בכיר יחזור אליכם בהקדם.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      services: 'Solutions',
      portfolio: 'Portfolio',
      contact: 'Book a Call',
    },
    hero: {
      tagline: 'Excellence is not a destination, it is our standard',
      title: 'DA Project Mgmt & Ventures',
      subtitle: 'Transforming visions into powerful digital realities. Advanced systems development, smart automation, and premium project management for industry leaders.',
      cta: 'Get Started',
    },
    stats: [
      { label: 'Successful Projects', value: '150+' },
      { label: 'Years Experience', value: '12+' },
      { label: 'Active Automations', value: '450+' },
      { label: 'Satisfaction Rate', value: '100%' },
    ],
    services: {
      sectionTitle: 'Our Services',
      sectionSubtitle: 'End-to-End Technological Solutions',
      items: [
        {
          id: 'web',
          title: 'Advanced Web Systems',
          description: 'Full-stack development of complex platforms, high-end corporate sites, and portals with winning UX and breakthrough tech.',
          icon: 'Globe'
        },
        {
          id: 'ecommerce',
          title: 'Professional E-commerce',
          description: 'Building online stores focused on conversions. We create luxury shopping experiences that keep customers coming back.',
          icon: 'ShoppingBag'
        },
        {
          id: 'automation',
          title: 'AI Bots & Automation',
          description: 'Maximizing business efficiency. Intelligent customer service bots, CRM sync, and automations that save time and capture leads.',
          icon: 'Cpu'
        },
        {
          id: 'fundraising',
          title: 'Mass Fundraising Campaigns',
          description: 'Complete management of fundraising and crowdfunding. Including interactive systems, gala events, and full marketing management.',
          icon: 'HeartHandshake'
        },
        {
          id: 'project-mgmt',
          title: 'Project & Social Mgmt',
          description: 'Strategic guidance and powerful digital presence management. We build your brand as the leading authority in your field.',
          icon: 'Trello'
        }
      ]
    },
    process: {
      title: 'Our Method to Success',
      steps: [
        { title: 'Strategy & Spec', desc: 'We study your business DNA to build a precise action plan.' },
        { title: 'Premium Design', desc: 'Creating breathtaking interfaces that convey uncompromising luxury and professionalism.' },
        { title: 'Dev & Execution', desc: 'Writing clean, optimal code using the world\'s most innovative technologies.' },
        { title: 'Scale & Support', desc: 'We stay with you long after the launch to ensure your project takes off.' }
      ]
    },
    portfolio: {
      sectionTitle: 'Our Work',
      sectionSubtitle: 'Projects that Speak for Themselves',
      viewProject: 'Live Preview'
    },
    contact: {
      sectionTitle: 'Let\'s Connect',
      sectionSubtitle: 'Share your details and let\'s plan your digital revolution',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone',
      message: 'Tell us about your vision',
      send: 'Send to Tech Dept',
      success: 'Request received! A senior representative will contact you shortly.'
    }
  }
};
