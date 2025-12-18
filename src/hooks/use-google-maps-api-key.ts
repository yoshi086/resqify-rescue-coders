import { useEffect, useState } from 'react';

const STORAGE_KEY = 'resqify-google-maps-api-key';

export function useGoogleMapsApiKey() {
  const [apiKey, setApiKeyState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  });

  useEffect(() => {
    // Keep in sync across tabs
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setApiKeyState(e.newValue || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '');
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setApiKey = (next: string) => {
    const value = next.trim();
    setApiKeyState(value);
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  };

  return { apiKey, setApiKey };
}
