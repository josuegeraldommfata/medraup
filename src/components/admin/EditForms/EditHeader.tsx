import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, Menu, Trash2 } from 'lucide-react';
import { useSiteData } from '@/contexts/SiteContext';
import { useToast } from '@/hooks/use-toast';

const EditHeader = () => {
  const { siteData, updateSiteData } = useSiteData();
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState(siteData.logoUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoPreview(base64);
        updateSiteData({ logoUrl: base64, faviconUrl: base64 });
        toast({
          title: 'Logo e Favicon atualizados',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMenuItemChange = (index: number, field: 'label' | 'href', value: string) => {
    const newMenu = [...siteData.menuItems];
    newMenu[index] = { ...newMenu[index], [field]: value };
    updateSiteData({ menuItems: newMenu });
  };

  const addMenuItem = () => {
    const newItem = { label: 'Novo Item', href: '#' };
    updateSiteData({ menuItems: [...siteData.menuItems, newItem] });
  };

  const deleteMenuItem = (index: number) => {
    const newMenu = siteData.menuItems.filter((_, i) => i !== index);
    updateSiteData({ menuItems: newMenu });
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Menu className="w-6 h-6" />
          Header & Navbar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Logo Upload */}
        <div className="space-y-4">
          <Label>Logo / Favicon</Label>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:border-medraup-blue group" onClick={() => fileInputRef.current?.click()}>
              <div className="text-center">
                <Image className="w-12 h-12 mx-auto text-gray-400 group-hover:text-medraup-blue mb-2" />
                <p className="text-xs text-gray-500">Clique para alterar</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
            <Badge variant="secondary" className="px-4 py-1">
              Preview:
            </Badge>
            <img src={logoPreview} alt="Logo preview" className="w-16 h-16 rounded-lg object-contain shadow-md" />
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-lg font-semibold">Itens do Menu</Label>
            <Button type="button" variant="outline" size="sm" onClick={addMenuItem}>
              + Adicionar Item
            </Button>
          </div>
          <div className="space-y-3">
            {siteData.menuItems.map((item, index) => (
              <div key={index} className="flex items-end gap-3 p-4 bg-gray-50 rounded-lg group">
                <div className="flex-1 space-y-2">
                  <Input
                    value={item.label}
                    onChange={(e) => handleMenuItemChange(index, 'label', e.target.value)}
                    placeholder="Label do menu"
                  />
                  <Input
                    value={item.href}
                    onChange={(e) => handleMenuItemChange(index, 'href', e.target.value)}
                    placeholder="#section ou /page"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMenuItem(index)}
                  className="h-10 w-10 p-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditHeader;
