import { useSiteData } from '@/contexts/SiteContext';
import { useEffect } from 'react';

export const useFavicon = () => {
  const { siteData } = useSiteData();

  useEffect(() => {
    // Remove favicon antigo
    const oldFavicon = document.querySelector('link[rel="icon"]');
    if (oldFavicon) {
      oldFavicon.remove();
    }

    // Adiciona novo favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = siteData.faviconUrl;
    link.type = 'image/png'; // ou image/x-icon se .ico
    document.head.appendChild(link);
  }, [siteData.faviconUrl]);
};

