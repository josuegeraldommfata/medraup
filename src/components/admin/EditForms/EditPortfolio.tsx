import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Upload, Link2, Image as ImageIcon } from 'lucide-react';
import { useSiteData } from '@/contexts/SiteContext';
import { PortfolioItem } from '@/types/site';
import { useToast } from '@/hooks/use-toast';

const EditPortfolio = () => {
  const { siteData, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useSiteData();
  const { toast } = useToast();
  const [newItem, setNewItem] = useState<Omit<PortfolioItem, 'id'> & { id: string }>({
    id: '',
    title: '',
    problem: '',
    solution: [''],
    image: '',
    link: ''
  });

  const handleNewItemChange = (field: keyof typeof newItem, value: string) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const handleSolutionChange = (index: number, value: string) => {
    const newSolution = [...newItem.solution];
    newSolution[index] = value;
    setNewItem(prev => ({ ...prev, solution: newSolution }));
  };

  const addSolutionLine = () => {
    setNewItem(prev => ({ ...prev, solution: [...prev.solution, ''] }));
  };

  const removeSolutionLine = (index: number) => {
    const newSolution = newItem.solution.filter((_, i) => i !== index);
    setNewItem(prev => ({ ...prev, solution: newSolution }));
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleNewItemChange('image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewItem = () => {
    if (newItem.title && newItem.problem && newItem.solution.some(s => s.trim())) {
      addPortfolioItem({
        title: newItem.title,
        problem: newItem.problem,
        solution: newItem.solution.filter(s => s.trim()),
        image: newItem.image || undefined,
        link: newItem.link || undefined
      });
      setNewItem({
        id: '',
        title: '',
        problem: '',
        solution: [''],
        image: '',
        link: ''
      });
      toast({ title: 'Case adicionado com sucesso!' });
    } else {
      toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' });
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            Portfólio / Cases
          </CardTitle>
          <Badge variant="secondary">{siteData.portfolioItems.length} cases</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-8">
        {/* Form Novo Case */}
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Novo Case
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Título</Label>
                <Input value={newItem.title} onChange={(e) => handleNewItemChange('title', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <Label>Link do Projeto (opcional)</Label>
                <Input
                  value={newItem.link}
                  onChange={(e) => handleNewItemChange('link', e.target.value)}
                  placeholder="https://projeto.com"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Imagem (opcional)</Label>
                <div className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-medraup-blue">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-sm text-gray-600">Clique para selecionar imagem</span>
                  <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
                </div>
                {newItem.image && (
                  <img src={newItem.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md" />
                )}
              </div>
              <div className="md:col-span-2">
                <Label>Situação/Problem</Label>
                <Textarea
                  value={newItem.problem}
                  onChange={(e) => handleNewItemChange('problem', e.target.value)}
                  placeholder="O que aconteceu de errado no projeto..."
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Solução com PO</Label>
                <div className="space-y-2">
                  {newItem.solution.map((solution, index) => (
                    <div key={index} className="flex gap-2">
                      <Textarea
                        value={solution}
                        onChange={(e) => handleSolutionChange(index, e.target.value)}
                        placeholder="Solução/recomendação..."
                        rows={2}
                        className="flex-1"
                      />
                      {newItem.solution.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeSolutionLine(index)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="ghost" size="sm" onClick={addSolutionLine}>
                    + Adicionar linha de solução
                  </Button>
                </div>
              </div>
            </div>
            <Button className="mt-6 w-full bg-medraup-orange" onClick={addNewItem}>
              Adicionar Case ao Portfólio
            </Button>
          </CardContent>
        </Card>

        {/* Lista de Cases Existentes */}
        <div className="space-y-4">
          {siteData.portfolioItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Button variant="ghost" size="sm" onClick={() => deletePortfolioItem(item.id)} className="ml-auto p-1 -mt-1">
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-lg mb-2 line-clamp-1">{item.title}</h4>
                    {item.link && (
                      <p className="text-sm text-blue-600 mb-2 truncate">{item.link}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.problem}</p>
                    <div className="text-xs space-y-1">
                      {item.solution.slice(0, 3).map((sol, i) => (
                        <p key={i} className="flex items-center gap-1">
                          • {sol}
                        </p>
                      ))}
                      {item.solution.length > 3 && (
                        <p className="text-gray-400">+{item.solution.length - 3} mais...</p>
                      )}
                    </div>
                  </div>
                  {item.image && (
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0 shadow-md" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditPortfolio;
