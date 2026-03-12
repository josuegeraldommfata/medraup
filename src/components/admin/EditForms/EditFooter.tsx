import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteData } from '@/contexts/SiteContext';

const EditFooter = () => {
  const { siteData, updateSiteData } = useSiteData();

  const updateContacts = (field: string, value: string) => {
    updateSiteData({
      footer: {
        ...siteData.footer,
        contacts: { ...siteData.footer.contacts, [field]: value }
      }
    });
  };

  const updateSocial = (index: number, field: 'href' | 'label', value: string) => {
    const newSocials = [...siteData.footer.socials];
    newSocials[index] = { ...newSocials[index], [field]: value };
    updateSiteData({ footer: { ...siteData.footer, socials: newSocials } });
  };

  const updateDescription = (value: string) => {
    updateSiteData({ footer: { ...siteData.footer, description: value } });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          Rodapé (Footer)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Descrição */}
        <div className="space-y-3">
          <Label>Descrição da Empresa</Label>
          <Input
            value={siteData.footer.description}
            onChange={(e) => updateDescription(e.target.value)}
            placeholder="Descrição curta da empresa..."
            className="h-12"
          />
          <Badge className="truncate">{siteData.footer.description.slice(0, 60)}...</Badge>
        </div>

        {/* Contatos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label className="flex items-center gap-2 font-semibold">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              value={siteData.footer.contacts.email}
              onChange={(e) => updateContacts('email', e.target.value)}
              type="email"
            />
          </div>
          <div className="space-y-3">
            <Label className="flex items-center gap-2 font-semibold">
              <Phone className="w-4 h-4" />
              Telefone
            </Label>
            <Input
              value={siteData.footer.contacts.phone}
              onChange={(e) => updateContacts('phone', e.target.value)}
            />
          </div>
          <div className="space-y-3">
            <Label className="flex items-center gap-2 font-semibold">
              <MapPin className="w-4 h-4" />
              Localização
            </Label>
            <Input
              value={siteData.footer.contacts.location}
              onChange={(e) => updateContacts('location', e.target.value)}
            />
          </div>
        </div>

        {/* Redes Sociais */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">Redes Sociais</Label>
          <div className="space-y-3">
            {siteData.footer.socials.map((social, index) => (
              <div key={index} className="flex gap-3 items-end p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-2">
                  <Input
                    value={social.label}
                    onChange={(e) => updateSocial(index, 'label', e.target.value)}
                    placeholder="LinkedIn, Instagram, WhatsApp..."
                  />
                  <Input
                    value={social.href}
                    onChange={(e) => updateSocial(index, 'href', e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <Badge className="whitespace-nowrap">
                  <Link2 className="w-4 h-4 mr-1 inline" />
                  {social.icon}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditFooter;
