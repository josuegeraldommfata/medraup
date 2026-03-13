import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSiteData } from '@/contexts/SiteContext';
import { useToast } from '@/hooks/use-toast';

const EditContact = () => {
  const { siteData, updateSiteData } = useSiteData();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [quickResponse, setQuickResponse] = useState('');

  useEffect(() => {
    if (siteData.contact) {
      setTitle(siteData.contact.title || '');
      setSubtitle(siteData.contact.subtitle || '');
      setEmail(siteData.contact.email || '');
      setWhatsapp(siteData.contact.whatsapp || siteData.footer.contacts.phone || '');
      setQuickResponse(siteData.contact.quickResponse || '');
    }
  }, [siteData]);

  const save = () => {
    updateSiteData({
      contact: {
        title,
        subtitle,
        email,
        whatsapp,
        quickResponse
      }
    });
    toast({ title: 'Contato atualizado' });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle>Contato / Seção "Vamos Conversar?"</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label>Título (pode conter HTML simples)</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Vamos Conversar?" />
        </div>

        <div>
          <Label>Subtítulo</Label>
          <Textarea value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Email (exibido no cartão de contato)</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>WhatsApp (exibido no cartão de contato)</Label>
            <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>
        </div>

        <div>
          <Label>Texto de resposta rápida</Label>
          <Textarea value={quickResponse} onChange={(e) => setQuickResponse(e.target.value)} rows={2} />
        </div>

        <div className="flex items-center gap-2">
          <Button className="bg-medraup-blue text-white" onClick={save}>Salvar</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditContact;
