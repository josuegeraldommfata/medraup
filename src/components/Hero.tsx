
import { Button } from "./ui/button";

import { useSiteData } from '@/contexts/SiteContext';
import { Button } from "./ui/button";
import { useCallback } from 'react';

const Hero = () => {
  const { siteData } = useSiteData();

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const renderButton = (button: any, index: number) => (
    <Button
      key={index}
      size="lg"
      onClick={() => scrollToSection(button.action === 'contact' ? '#contact' : '#services')}
      className={`w-full sm:w-auto px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200 min-h-[56px] ${
        button.variant === 'default'
          ? 'bg-medraup-orange hover:bg-medraup-orange/90 text-white'
          : 'border-2 border-medraup-orange text-medraup-orange hover:bg-medraup-orange hover:text-white'
      }`}
      variant={button.variant as any}
    >
      {button.label}
    </Button>
  );

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-medraup-blue to-medraup-blue-dark overflow-hidden pt-16 sm:pt-18 lg:pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 sm:opacity-10">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-48 sm:h-48 lg:w-72 lg:h-72 rounded-full bg-white"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 rounded-full bg-medraup-orange"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white animate-fade-in max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight"
            dangerouslySetInnerHTML={{ __html: siteData.hero.title }}
          />

          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-blue-100 leading-relaxed px-2">
            {siteData.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-2">
            {siteData.hero.buttons.map(renderButton)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
