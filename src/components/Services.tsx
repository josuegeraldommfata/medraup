
import { Card, CardContent } from "./ui/card";
import { useSiteData } from '@/contexts/SiteContext';
import {
  Activity,
  Anchor,
  Aperture,
  BarChart,
  Bell,
  BookOpen,
  Box,
  Camera,
  Cloud,
  Code,
  Cpu,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Heart,
  Home,
  Zap as Lightning,
  Lock,
  Map,
  Music,
  Paperclip,
  PenTool,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Tag,
  User,
  Briefcase,
  Calendar,
  Globe,
  Monitor,
  Shield,
  Rocket
} from 'lucide-react';

const Services = () => {
  const { siteData } = useSiteData();

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-medraup-gray-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 px-2">
            Nossos <span className="text-medraup-blue">Serviços</span>
          </h2>
          <div className="w-20 h-1 bg-medraup-orange mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
            Soluções completas para transformar suas ideias em produtos digitais de sucesso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {siteData.services.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
              <CardContent className="p-6 sm:p-8 h-full">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-medraup-blue rounded-xl flex items-center justify-center mb-4 group-hover:bg-medraup-orange transition-colors duration-300">
                    {service.image ? (
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover rounded-xl" />
                    ) : service.icon ? (
                      (() => {
                        switch (service.icon) {
                          case 'activity': return <Activity className="w-8 h-8 text-white" />;
                          case 'anchor': return <Anchor className="w-8 h-8 text-white" />;
                          case 'aperture': return <Aperture className="w-8 h-8 text-white" />;
                          case 'barchart': return <BarChart className="w-8 h-8 text-white" />;
                          case 'bell': return <Bell className="w-8 h-8 text-white" />;
                          case 'bookopen': return <BookOpen className="w-8 h-8 text-white" />;
                          case 'box': return <Box className="w-8 h-8 text-white" />;
                          case 'camera': return <Camera className="w-8 h-8 text-white" />;
                          case 'cloud': return <Cloud className="w-8 h-8 text-white" />;
                          case 'code': return <Code className="w-8 h-8 text-white" />;
                          case 'cpu': return <Cpu className="w-8 h-8 text-white" />;
                          case 'database': return <Database className="w-8 h-8 text-white" />;
                          case 'download': return <Download className="w-8 h-8 text-white" />;
                          case 'eye': return <Eye className="w-8 h-8 text-white" />;
                          case 'filetext': return <FileText className="w-8 h-8 text-white" />;
                          case 'filter': return <Filter className="w-8 h-8 text-white" />;
                          case 'heart': return <Heart className="w-8 h-8 text-white" />;
                          case 'home': return <Home className="w-8 h-8 text-white" />;
                          case 'lightning': return <Lightning className="w-8 h-8 text-white" />;
                          case 'lock': return <Lock className="w-8 h-8 text-white" />;
                          case 'map': return <Map className="w-8 h-8 text-white" />;
                          case 'music': return <Music className="w-8 h-8 text-white" />;
                          case 'paperclip': return <Paperclip className="w-8 h-8 text-white" />;
                          case 'pentool': return <PenTool className="w-8 h-8 text-white" />;
                          case 'phone': return <Phone className="w-8 h-8 text-white" />;
                          case 'search': return <Search className="w-8 h-8 text-white" />;
                          case 'settings': return <Settings className="w-8 h-8 text-white" />;
                          case 'shoppingcart': return <ShoppingCart className="w-8 h-8 text-white" />;
                          case 'star': return <Star className="w-8 h-8 text-white" />;
                          case 'tag': return <Tag className="w-8 h-8 text-white" />;
                          case 'user': return <User className="w-8 h-8 text-white" />;
                          case 'briefcase': return <Briefcase className="w-8 h-8 text-white" />;
                          case 'calendar': return <Calendar className="w-8 h-8 text-white" />;
                          case 'globe': return <Globe className="w-8 h-8 text-white" />;
                          case 'monitor': return <Monitor className="w-8 h-8 text-white" />;
                          case 'shield': return <Shield className="w-8 h-8 text-white" />;
                          case 'rocket': return <Rocket className="w-8 h-8 text-white" />;
                          default: return <div className="w-8 h-8 bg-white rounded-lg"></div>;
                        }
                      })()
                    ) : (
                      <div className="w-8 h-8 bg-white rounded-lg"></div>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-tight">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base mb-6">{service.description}</p>
                </div>

                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start text-gray-600 text-base">
                      <div className="w-2 h-2 bg-medraup-orange rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16 px-4">
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto bg-medraup-blue hover:bg-medraup-blue-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 min-h-[56px]"
          >
            Solicite um Orçamento
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
