import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2 } from 'lucide-react';
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
