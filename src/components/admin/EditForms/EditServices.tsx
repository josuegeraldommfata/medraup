import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Trash2,
  Upload,
  X,
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
import { useSiteData } from '@/contexts/SiteContext';
import { Service } from '@/types/site';

const EditServices = () => {
  const { siteData, updateSiteData } = useSiteData();

  const addService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'Novo Serviço',
      description: 'Descrição do serviço',
      features: ['Recurso 1', 'Recurso 2']
    };
    updateSiteData({ services: [...siteData.services, newService] });
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    updateSiteData({
      services: siteData.services.map(s => s.id === id ? { ...s, ...updates } : s)
    });
  };

  const deleteService = (id: string) => {
    updateSiteData({
      services: siteData.services.filter(s => s.id !== id)
    });
  };

  const addFeature = (serviceId: string) => {
    updateSiteData({
      services: siteData.services.map(s =>
        s.id === serviceId
          ? { ...s, features: [...s.features, 'Novo recurso'] }
          : s
      )
    });
  };

  const handleServiceImageUpload = (serviceId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateService(serviceId, { image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleIconChange = (serviceId: string, icon: string) => {
    updateService(serviceId, { icon });
  };

  const removeServiceImage = (serviceId: string) => {
    updateService(serviceId, { image: undefined });
  };

  const removeServiceIcon = (serviceId: string) => {
    updateService(serviceId, { icon: undefined });
  };

  const renderIcon = (name?: string, className = 'w-6 h-6 text-gray-600') => {
    switch (name) {
      case 'activity': return <Activity className={className} />;
      case 'anchor': return <Anchor className={className} />;
      case 'aperture': return <Aperture className={className} />;
      case 'barchart': return <BarChart className={className} />;
      case 'bell': return <Bell className={className} />;
      case 'bookopen': return <BookOpen className={className} />;
      case 'box': return <Box className={className} />;
      case 'camera': return <Camera className={className} />;
      case 'cloud': return <Cloud className={className} />;
      case 'code': return <Code className={className} />;
      case 'cpu': return <Cpu className={className} />;
      case 'database': return <Database className={className} />;
      case 'download': return <Download className={className} />;
      case 'eye': return <Eye className={className} />;
      case 'filetext': return <FileText className={className} />;
      case 'filter': return <Filter className={className} />;
      case 'heart': return <Heart className={className} />;
      case 'home': return <Home className={className} />;
  case 'lightning': return <Lightning className={className} />;
      case 'lock': return <Lock className={className} />;
      case 'map': return <Map className={className} />;
      case 'music': return <Music className={className} />;
      case 'paperclip': return <Paperclip className={className} />;
      case 'pentool': return <PenTool className={className} />;
      case 'phone': return <Phone className={className} />;
      case 'search': return <Search className={className} />;
      case 'settings': return <Settings className={className} />;
      case 'shoppingcart': return <ShoppingCart className={className} />;
      case 'star': return <Star className={className} />;
      case 'tag': return <Tag className={className} />;
      case 'user': return <User className={className} />;
      case 'briefcase': return <Briefcase className={className} />;
      case 'calendar': return <Calendar className={className} />;
      case 'globe': return <Globe className={className} />;
      case 'monitor': return <Monitor className={className} />;
      case 'shield': return <Shield className={className} />;
      case 'rocket': return <Rocket className={className} />;
      default: return null;
    }
  };

  const updateFeature = (serviceId: string, featureIndex: number, value: string) => {
    updateSiteData({
      services: siteData.services.map(s => {
        if (s.id === serviceId) {
          const newFeatures = [...s.features];
          newFeatures[featureIndex] = value;
          return { ...s, features: newFeatures };
        }
        return s;
      })
    });
  };

  const deleteFeature = (serviceId: string, featureIndex: number) => {
    updateSiteData({
      services: siteData.services.map(s => {
        if (s.id === serviceId) {
          const newFeatures = s.features.filter((_, i) => i !== featureIndex);
          return { ...s, features: newFeatures };
        }
        return s;
      })
    });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <div className="w-6 h-6 bg-medraup-blue rounded-lg flex items-center justify-center">
              <Badge className="text-xs">4</Badge>
            </div>
            Serviços
          </CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={addService}>
            <Plus className="w-4 h-4 mr-1" />
            Adicionar Serviço
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {siteData.services.map((service) => (
          <div key={service.id} className="space-y-4 p-6 border rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {service.image ? (
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  renderIcon(service.icon, 'w-8 h-8 text-gray-500') || <div className="text-gray-400 text-sm">Sem imagem</div>
                )}
              </div>
              <div className="flex-1">
                <Label className="text-sm">Ícone</Label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {renderIcon(service.icon, 'w-6 h-6 text-gray-700')}
                  </div>
                    <select value={service.icon || ''} onChange={(e) => handleIconChange(service.id, e.target.value)} className="border rounded p-2">
                      <option value="">(nenhum)</option>
                      <option value="activity">Activity</option>
                      <option value="anchor">Anchor</option>
                      <option value="aperture">Aperture</option>
                      <option value="barchart">BarChart</option>
                      <option value="bell">Bell</option>
                      <option value="bookopen">BookOpen</option>
                      <option value="box">Box</option>
                      <option value="camera">Camera</option>
                      <option value="cloud">Cloud</option>
                      <option value="code">Code</option>
                      <option value="cpu">CPU</option>
                      <option value="database">Database</option>
                      <option value="download">Download</option>
                      <option value="eye">Eye</option>
                      <option value="filetext">FileText</option>
                      <option value="filter">Filter</option>
                      <option value="heart">Heart</option>
                      <option value="home">Home</option>
                      <option value="lightning">Lightning</option>
                      <option value="lock">Lock</option>
                      <option value="map">Map</option>
                      <option value="music">Music</option>
                      <option value="paperclip">Paperclip</option>
                      <option value="pentool">PenTool</option>
                      <option value="phone">Phone</option>
                      <option value="search">Search</option>
                      <option value="settings">Settings</option>
                      <option value="shoppingcart">ShoppingCart</option>
                      <option value="star">Star</option>
                      <option value="tag">Tag</option>
                      <option value="user">User</option>
                      <option value="briefcase">Briefcase</option>
                      <option value="calendar">Calendar</option>
                      <option value="globe">Globe</option>
                      <option value="monitor">Monitor</option>
                      <option value="shield">Shield</option>
                      <option value="rocket">Rocket</option>
                    </select>
                    <Button variant="ghost" size="sm" onClick={() => removeServiceIcon(service.id)} title="Remover ícone">
                      <X className="w-4 h-4 text-gray-600" />
                    </Button>
                  <label className="flex items-center gap-2 cursor-pointer p-2 border rounded bg-gray-50">
                    <Upload className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Enviar imagem</span>
                    <input type="file" accept="image/*" onChange={(e) => handleServiceImageUpload(service.id, e)} className="hidden" />
                  </label>
                  <Button variant="ghost" size="sm" onClick={() => removeServiceImage(service.id)} title="Remover imagem">
                    <X className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-between">
              <Input
                value={service.title}
                onChange={(e) => updateService(service.id, { title: e.target.value })}
                placeholder="Título do serviço"
                className="text-lg font-semibold h-12"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteService(service.id)}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <Textarea
              value={service.description}
              onChange={(e) => updateService(service.id, { description: e.target.value })}
              placeholder="Descrição do serviço"
              className="min-h-20"
              rows={3}
            />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Label className="text-sm font-medium">Recursos / Features</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addFeature(service.id)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-md group">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(service.id, index, e.target.value)}
                      className="flex-1 h-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 p-0 -ml-2 group-hover:bg-red-50 text-red-600"
                      onClick={() => deleteFeature(service.id, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EditServices;
