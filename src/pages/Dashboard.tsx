import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Settings, Preview } from 'lucide-react';
import EditHeader from '@/components/admin/EditForms/EditHeader';
import EditHero from '@/components/admin/EditForms/EditHero';
import EditServices from '@/components/admin/EditForms/EditServices';
import EditPortfolio from '@/components/admin/EditForms/EditPortfolio';
import EditFooter from '@/components/admin/EditForms/EditFooter';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Admin */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-medraup-blue rounded-xl flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Painel Admin Medraup</h1>
              <p className="text-sm text-gray-500">Gerencie todo o conteúdo do site</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2 text-sm text-medraup-blue hover:text-medraup-blue-dark font-medium p-2 -m-2 rounded-lg transition-colors">
              <Preview className="w-4 h-4" />
              <span>Preview Site</span>
            </Link>
            <Button variant="ghost" size="sm" onClick={logout} className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="header" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="header">Header</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>
          <TabsContent value="header">
            <EditHeader />
          </TabsContent>
          <TabsContent value="hero">
            <EditHero />
          </TabsContent>
          <TabsContent value="services">
            <EditServices />
          </TabsContent>
          <TabsContent value="portfolio">
            <EditPortfolio />
          </TabsContent>
          <TabsContent value="footer">
            <EditFooter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
