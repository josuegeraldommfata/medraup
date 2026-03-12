import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Type } from 'lucide-react';
import { useSiteData } from '@/contexts/SiteContext';
import { useToast } from '@/hooks/use-toast';
import { defaultSiteData } from '@/types/site';

const EditHero = () => {
  const { siteData, updateSiteData } = useSiteData();
  const { toast } = useToast();

  const [title, setTitle] = useState(siteData.hero.title.replace(/<[^>]*>/g, ''));
  const [subtitle, setSubtitle] = useState(siteData.hero.subtitle);
  const [buttons, setButtons] = useState(siteData.hero.buttons);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateSiteData({
      hero: {
        ...siteData.hero,
        title: `<span class="text-medraup-orange block mt-2">${e.target.value}</span>` || defaultSiteData.hero.title
      }
    });
    toast({ title: 'Título atualizado' });
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubtitle(e.target.value);
    updateSiteData({
      hero: {
        ...siteData.hero,
        subtitle: e.target.value
      }
    });
  };

  const toggleButtonVariant = (index: number) => {
    const newButtons = [...buttons];
    newButtons[index] = {
      ...newButtons[index],
      variant: newButtons[index].variant === 'default' ? 'outline' : 'default' as const
    };
    setButtons(newButtons);
    updateSiteData({ hero: { ...siteData.hero, buttons: newButtons } });
  };

  const updateButtonLabel = (index: number, value: string) => {
    const newButtons = [...buttons];
    newButtons[index] = { ...newButtons[index], label: value };
    setButtons(newButtons);
    updateSiteData({ hero: { ...siteData.hero, buttons: newButtons } });
  };

  const previewTitle = title || 'Título não definido';

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Type className="w-6 h-6" />
          Seção Hero (Página Inicial)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Título Principal */}
        <div className="space-y-3">
          <Label>Título Principal</Label>
          <Input
            value={title}
            onChange={handleTitleChange}
            placeholder="Ex: Transforme ideias em produtos reais"
            className="h-14 text-lg"
          />
          <Badge className="w-full justify-between">
            Preview:
            <span dangerouslySetInnerHTML={{ __html: previewTitle }} />
          </Badge>
        </div>

        {/* Subtítulo */}
        <div className="space-y-3">
          <Label>Subtítulo</Label>
          <Textarea
            value={subtitle}
            onChange={handleSubtitleChange}
            placeholder="Descrição da sua expertise..."
            className="min-h-24 resize-none"
            rows={3}
          />
          <Badge className="truncate max-w-xs">
            Preview: {subtitle.slice(0, 50)}...
          </Badge>
        </div>

        {/* Botões CTA */}
        <div>
          <Label className="text-lg font-semibold mb-4 block">Botões de Call-to-Action</Label>
          <div className="space-y-4">
            {buttons.map((button, index) => (
              <div key={index} className="flex items-end gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex-1 space-y-2">
                  <Input
                    value={button.label}
                    onChange={(e) => updateButtonLabel(index, e.target.value)}
                    placeholder={`Botão ${index + 1}`}
                  />
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>Variante:</span>
                    <Badge variant={button.variant === 'default' ? 'default' : 'secondary'}>
                      {button.variant === 'default' ? 'Primário (Laranja)' : 'Secundário (Contorno)'}
                    </Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleButtonVariant(index)}
                      className="h-8 px-3"
                    >
                      Trocar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditHero;
