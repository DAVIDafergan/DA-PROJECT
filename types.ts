
export type Language = 'he' | 'en';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface Translations {
  nav: {
    services: string;
    portfolio: string;
    contact: string;
    home: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: Service[];
  };
  portfolio: {
    sectionTitle: string;
    sectionSubtitle: string;
    viewProject: string;
  };
  contact: {
    sectionTitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    success: string;
  };
}
