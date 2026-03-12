import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { SiteData, defaultSiteData } from '@/types/site';

interface SiteContextType {
  siteData: SiteData;
  updateSiteData: (newData: Partial<SiteData>) => void;
  updatePortfolioItem: (id: string, item: Partial<PortfolioItem>) => void;
  addPortfolioItem: (item: Omit<PortfolioItem, 'id'>) => void;
  deletePortfolioItem: (id: string) => void;
  saveSiteData: () => void;
  isDirty: boolean;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const useSiteData = (): SiteContextType => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSiteData deve ser usado dentro de SiteProvider');
  return context;
};

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);
  const [isDirty, setIsDirty] = useState<boolean>(false);
const STORAGE_KEY = 'medraup_site_data' as const;

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSiteData(JSON.parse(saved));
      } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSiteData));
      }
    }
  }, []);

  useEffect(() => {
    if (isDirty) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
      setIsDirty(false);
    }
  }, [siteData, isDirty]);

  const updateSiteData = (newData: Partial<SiteData>) => {
    setSiteData(prev => ({ ...prev, ...newData }));
    setIsDirty(true);
  };

  const updatePortfolioItem = (id: string, updates: Partial<PortfolioItem>) => {
    setSiteData(prev => ({
      ...prev,
      portfolioItems: prev.portfolioItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
    setIsDirty(true);
  };

  const addPortfolioItem = (item: Omit<PortfolioItem, 'id'>) => {
    const newId = Date.now().toString();
    setSiteData(prev => ({
      ...prev,
      portfolioItems: [...prev.portfolioItems, { ...item, id: newId }]
    }));
    setIsDirty(true);
  };

  const deletePortfolioItem = (id: string) => {
    setSiteData(prev => ({
      ...prev,
      portfolioItems: prev.portfolioItems.filter(item => item.id !== id)
    }));
    setIsDirty(true);
  };

  const saveSiteData = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    setIsDirty(false);
    // toast success
  };

  return (
    <SiteContext.Provider value={{
      siteData,
      updateSiteData,
      updatePortfolioItem,
      addPortfolioItem,
      deletePortfolioItem,
      saveSiteData,
      isDirty
    }}>
      {children}
    </SiteContext.Provider>
  );
};
