export interface MenuItem {
  label: string;
  href: string;
}

export interface CtaButton {
  label: string;
  variant: 'default' | 'outline';
  action: 'contact' | 'services';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  problem: string;
  solution: string[];
  image?: string; // base64 data URL
  link?: string; // opcional para "ver projeto"
}

export interface SocialLink {
  href: string;
  icon: string; // 'linkedin' | 'instagram' | 'whatsapp'
  label: string;
}

export interface SiteData {
  logoUrl: string;
  faviconUrl: string;
  menuItems: MenuItem[];
  hero: {
    title: string;
    subtitle: string;
    buttons: CtaButton[];
  };
  services: Service[];
  portfolioItems: PortfolioItem[];
  footer: {
    description: string;
    socials: SocialLink[];
    contacts: {
      email: string;
      phone: string;
      location: string;
    };
  };
}

// Dados default para init localStorage
export const defaultSiteData: SiteData = {
  logoUrl: '/lovable-uploads/6b632b81-e47a-4865-8474-8c8bf273eac9.png',
  faviconUrl: '/favicon.ico',
  menuItems: [
    { label: 'Início', href: '#home' },
    { label: 'Serviços', href: '#services' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Contato', href: '#contact' }
  ],
  hero: {
    title: 'Transforme ideias em <span className=\\"text-medraup-orange block mt-2\\">produtos reais</span>',
    subtitle: 'Product Owner especializada em gestão de projetos e criação de plataformas digitais que geram resultados',
    buttons: [
      { label: 'Fale Comigo Agora', variant: 'default', action: 'contact' },
      { label: 'Conheça a Medraup', variant: 'outline', action: 'services' }
    ]
  },
  services: [
    {
      id: '1',
      title: 'Product Owner',
      description: 'Gestão completa do produto desde a concepção até o lançamento, garantindo que sua visão se torne realidade.',
      features: ['Definição de requisitos', 'Backlog do produto', 'Priorização de funcionalidades', 'Acompanhamento de métricas']
    },
    {
      id: '2',
      title: 'Gerência de Projetos',
      description: 'Coordenação eficiente de recursos, prazos e equipes para garantir o sucesso do seu projeto.',
      features: ['Metodologias ágeis', 'Controle de cronograma', 'Gestão de stakeholders', 'Relatórios de progresso']
    },
    {
      id: '3',
      title: 'Criação de Sites/Plataformas',
      description: 'Desenvolvimento de soluções digitais personalizadas que atendem às suas necessidades específicas.',
      features: ['Sites responsivos', 'Plataformas web', 'UX/UI strategy', 'Integração de sistemas']
    },
    {
      id: '4',
      title: 'Consultoria',
      description: 'Análise estratégica e recomendações para otimizar seus processos e produtos digitais.',
      features: ['Análise de processos', 'Estratégia digital', 'Otimização de workflow', 'Transformação digital']
    }
  ],
  portfolioItems: [
    {
      id: '1',
      title: 'E-commerce em 30 dias… ou quase',
      problem: 'Uma agência prometeu um e-commerce completo em 30 dias. O cliente pagou 50% adiantado. O que recebeu? Apenas um template gratuito, sem loja, checkout ou integração.',
      solution: ['Backlog claro com funcionalidades prioritárias', 'Critérios de aceite definidos para cada item', 'Roadmap com validações semanais', 'Transparência no desenvolvimento']
    },
    {
      id: '2',
      title: 'Site bonito, mas só no desktop',
      problem: 'Uma influenciadora contratou um freelancer com preço atrativo. O visual parecia ótimo no computador, mas o site quebrava no celular, não tinha SEO e não tinha painel de edição de conteúdo.',
      solution: ['Requisitos não funcionais bem definidos (responsividade, SEO, CMS)', 'Validação contínua com o usuário', 'Testes antes da entrega final']
    },
    {
      id: '3',
      title: 'Sistema médico que nunca existiu',
      problem: 'Um investidor contratou uma equipe para um sistema de agendamento médico. Durante semanas, recebeu apenas vídeos simulando a interface, mas o sistema nunca existiu de verdade.',
      solution: ['MVP funcional testável, mesmo que simples', 'Acompanhamento por sprints e reuniões de review', 'Backlog visível com status atualizado']
    }
  ],
  footer: {
    description: 'Transformando ideias em produtos digitais de sucesso através de metodologias ágeis e gestão estratégica.',
    socials: [
      { href: 'https://www.linkedin.com/in/loyannemedradoproductowner', icon: 'linkedin', label: 'LinkedIn' },
      { href: 'https://www.instagram.com/medraup?igsh=MWVuMnJsY2s3OTBoZA==', icon: 'instagram', label: 'Instagram' },
      { href: 'https://wa.me/5531986274984', icon: 'whatsapp', label: 'WhatsApp' }
    ],
    contacts: {
      email: 'loyannemedrado@hotmail.com',
      phone: '(31) 98627-4984',
      location: 'São Paulo, SP'
    }
  }
};
