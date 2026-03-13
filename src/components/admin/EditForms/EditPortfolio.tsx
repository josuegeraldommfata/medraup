import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Upload, Link2, Image as ImageIcon, Pencil } from 'lucide-react';
import { useSiteData } from '@/contexts/SiteContext';
import { PortfolioItem } from '@/types/site';
import { useToast } from '@/hooks/use-toast';

const EditPortfolio = () => {
  const { siteData, addPortfolioItem, updatePortfolioItem, deletePortfolioItem } = useSiteData();
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editProblem, setEditProblem] = useState('');
  const [editSolution, setEditSolution] = useState<string[]>([]);
  const [editImage, setEditImage] = useState('');
  const [editLink, setEditLink] = useState('');
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

  // Upload de imagem para o formulário de edição
  const handleEditUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Normaliza links: adiciona https:// quando usuário não informou protocolo
  const normalizeLink = (url?: string) => {
    if (!url) return undefined;
    const trimmed = url.trim();
    if (!trimmed) return undefined;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const handleEditSolutionChange = (index: number, value: string) => {
    setEditSolution(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const addEditSolutionLine = () => {
    setEditSolution(prev => [...prev, '']);
  };

  const removeEditSolutionLine = (index: number) => {
    setEditSolution(prev => prev.filter((_, i) => i !== index));
  };

  const saveEdit = () => {
    if (!editingItem) return;
    if (!editTitle || !editProblem || !editSolution.some(s => s.trim())) {
      toast({ title: 'Preencha todos os campos obrigatórios', variant: 'destructive' });
      return;
    }

    updatePortfolioItem(editingItem.id, {
      title: editTitle,
      problem: editProblem,
      solution: editSolution.filter(s => s.trim()),
      image: editImage || undefined,
      link: normalizeLink(editLink)
    });
    setEditingItem(null);
    toast({ title: 'Case atualizado com sucesso!' });
  };

  const addNewItem = () => {
    if (newItem.title && newItem.problem && newItem.solution.some(s => s.trim())) {
      addPortfolioItem({
        title: newItem.title,
        problem: newItem.problem,
        solution: newItem.solution.filter(s => s.trim()),
        image: newItem.image || undefined,
        link: normalizeLink(newItem.link)
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
<div
  className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-medraup-blue group"
  onClick={(e) => { e.stopPropagation(); e.currentTarget.querySelector('input[type="file"]')?.click(); }}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.querySelector('input[type="file"]')?.click()}
>
                  <Upload className="w-6 h-6 text-gray-400 group-hover:text-medraup-blue transition-colors" />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Clique para selecionar imagem</span>
                  <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden sr-only" />
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

        {/* Form de Edição (aparece ao clicar no lápis) */}
        {editingItem && (
          <Card id="edit-form" className="bg-white border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Pencil className="w-5 h-5" />
                Editar Case
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Título</Label>
                  <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                </div>
                <div className="md:col-span-2">
                  <Label>Link do Projeto (opcional)</Label>
                  <Input
                    value={editLink}
                    onChange={(e) => setEditLink(e.target.value)}
                    placeholder="https://projeto.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Imagem (opcional)</Label>
                  <div
                    className="flex items-center space-x-4 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-medraup-blue group"
                    onClick={(e) => { e.stopPropagation(); e.currentTarget.querySelector('input[type="file"]')?.click(); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.querySelector('input[type="file"]')?.click()}
                  >
                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-medraup-blue transition-colors" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">Clique para selecionar imagem</span>
                    <input type="file" accept="image/*" onChange={handleEditUploadImage} className="hidden sr-only" />
                  </div>
                  {editImage && (
                    <img src={editImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md" />
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label>Situação/Problem</Label>
                  <Textarea
                    value={editProblem}
                    onChange={(e) => setEditProblem(e.target.value)}
                    placeholder="O que aconteceu de errado no projeto..."
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Solução com PO</Label>
                  <div className="space-y-2">
                    {editSolution.map((solution, index) => (
                      <div key={index} className="flex gap-2">
                        <Textarea
                          value={solution}
                          onChange={(e) => handleEditSolutionChange(index, e.target.value)}
                          placeholder="Solução/recomendação..."
                          rows={2}
                          className="flex-1"
                        />
                        {editSolution.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeEditSolutionLine(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="ghost" size="sm" onClick={addEditSolutionLine}>
                      + Adicionar linha de solução
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button className="bg-medraup-blue text-white" onClick={saveEdit}>Salvar alterações</Button>
                <Button variant="ghost" onClick={() => setEditingItem(null)}>Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Cases Existentes */}
        <div className="space-y-4">
          {siteData.portfolioItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="flex gap-2 ml-auto self-start lg:col-span-3">
                    <Button type="button" variant="ghost" size="sm" className="p-1 hover:bg-blue-50" onClick={(e) => {
                      e.stopPropagation();
                      if (item) {
                        setEditTitle(item.title);
                        setEditProblem(item.problem);
                        setEditSolution(item.solution);
                        setEditImage(item.image || '');
                        setEditLink(item.link || '');
                        setEditingItem(item);
                        toast({ title: 'Abrindo editor...' });
                        // rolar para o formulário de edição, se existir
                        setTimeout(() => {
                          document.getElementById('edit-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 80);
                      }
                    }} title="Editar">
                      <Pencil className="w-5 h-5 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deletePortfolioItem(item.id)} className="p-1 hover:bg-red-50">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </Button>
                  </div>

                  {item.image && (
                    <div className="lg:col-span-1">
                      <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform" />
                    </div>
                  )}

                  <div className="lg:col-span-2 space-y-3">
                    <h4 className="font-bold text-xl">{item.title}</h4>

                    {item.link && (
                      <div className="flex items-center space-x-2">
                        <Link2 className="w-4 h-4 text-blue-600" />
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-medium text-sm truncate">
                          Ver Projeto →
                        </a>
                      </div>
                    )}

                    <div>
                      <h5 className="font-semibold text-red-600 mb-2 text-sm">⚠️ Situação:</h5>
                      <p className="text-sm text-gray-700 bg-red-50 p-3 rounded-lg">{item.problem}</p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-green-600 mb-2 text-sm">✅ Solução PO:</h5>
                      <div className="space-y-1">
                        {item.solution.slice(0, 3).map((sol, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{sol}</span>
                          </div>
                        ))}
                        {item.solution.length > 3 && (
                          <p className="text-xs text-gray-500">+{item.solution.length - 3} mais soluções</p>
                        )}
                      </div>
                    </div>
                  </div>
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
