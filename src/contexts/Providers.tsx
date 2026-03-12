import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { SiteProvider } from './SiteContext';
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SiteProvider>
          <TooltipProvider>
            <Toaster />
            {children}
          </TooltipProvider>
        </SiteProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
