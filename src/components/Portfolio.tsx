
import { Card, CardContent } from "./ui/card";

import { Card, CardContent } from "./ui/card";
import { useSiteData } from '@/contexts/SiteContext';

const Portfolio = () => {
  const { siteData } = useSiteData();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-2">
            Cases de <span className="text-medraup-blue">Sucesso</span>
          </h2>
          <div className="w-20 h-1 bg-medraup-orange mx-auto mb-6"></div>
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed">
              Você sabia que muita gente cai em golpes ao contratar um site?
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Veja 3 casos reais de falsas entregas — e como técnicas de Product Owner (PO) poderiam ter evitado o prejuízo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {siteData.portfolioItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-medraup-gray-light">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-6">
                  <span className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                    Case #{siteData.portfolioItems.findIndex(p => p.id === item.id) + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight">{item.title}</h3>

                  <div className="mb-6">
                    <h4 className="font-semibold text-red-600 mb-3 text-base">⚠️ Situação:</h4>
                    <p className="text-gray-600 leading-relaxed bg-red-50 p-4 sm:p-6 rounded-lg border-l-4 border-red-500 text-base">
                      {item.problem}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-medraup-blue mb-3 text-base">✅ Com um PO no projeto:</h4>
                  <div className="space-y-3 bg-green-50 p-4 sm:p-6 rounded-lg border-l-4 border-green-500">
                    {item.solution.map((solution, solutionIndex) => (
                      <div key={solutionIndex} className="flex items-start text-gray-700 text-base">
                        <div className="w-2 h-2 bg-medraup-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="leading-relaxed">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-medraup-blue to-medraup-blue-dark rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 leading-tight">O que aprendemos com isso?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <p className="text-blue-100 text-base leading-relaxed">Nem todo desenvolvedor é gestor de produto</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <p className="text-blue-100 text-base leading-relaxed">Nem todo projeto começa com código</p>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-lg">
                <p className="text-blue-100 text-base leading-relaxed">Todo projeto precisa de visão, alinhamento e transparência</p>
              </div>
            </div>
            <p className="text-lg sm:text-xl font-semibold text-medraup-orange mb-6">
              É aí que entra o papel do Product Owner.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center bg-medraup-gray-light p-6 sm:p-8 rounded-2xl mx-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight">Evite prejuízos. Tenha um PO com você.</h3>
          <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
            ✨ Eu sou <strong>Loyanne Medrado</strong>, PO e fundadora da <strong>Medraup</strong>.<br/>
            Ajudo negócios a tirarem ideias do papel com entregas reais, funcionais e seguras.
          </p>
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-medraup-orange hover:bg-medraup-orange/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 min-h-[56px]"
          >
            🔗 Me chama para conversar!
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
