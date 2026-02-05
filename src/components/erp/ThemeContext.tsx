import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'modern' | 'minimalist' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('modern');

  useEffect(() => {
    // Carrega tema salvo no localStorage
    const savedTheme = localStorage.getItem('erp-theme') as Theme;
    if (savedTheme && ['modern', 'minimalist', 'dark'].includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('erp-theme', newTheme);
    
    // Aplica o tema no HTML
    if (newTheme === 'modern') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  // Aplica tema inicial
  useEffect(() => {
    if (theme === 'modern') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
