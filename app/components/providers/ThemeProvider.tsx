'use client'
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'default' | 'matrix' | 'purple';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('default');

  const handleSetTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    setTheme(newTheme);

    let consolePromptColor = '#60a5fa';
    if (newTheme === 'matrix') {
        root.style.setProperty('--accent-color', '#34d399');
        root.style.setProperty('--accent-color-darker', '#059669');
        root.style.setProperty('--accent-color-lighter', '#6ee7b7');
        root.style.setProperty('--console-bg', '#0A0A0A');
        root.style.setProperty('--console-text', '#00FF00');
        consolePromptColor = '#33FF33';
    } else if (newTheme === 'purple') {
        root.style.setProperty('--accent-color', '#a855f7');
        root.style.setProperty('--accent-color-darker', '#7e22ce');
        root.style.setProperty('--accent-color-lighter', '#c084fc');
        root.style.setProperty('--console-bg', '#1e1b2e');
        root.style.setProperty('--console-text', '#d8b4fe');
        consolePromptColor = '#e9d5ff';
    } else {
        root.style.setProperty('--accent-color', '#3b82f6');
        root.style.setProperty('--accent-color-darker', '#2563eb');
        root.style.setProperty('--accent-color-lighter', '#60a5fa');
        root.style.setProperty('--console-bg', '#000000');
        root.style.setProperty('--console-text', '#93c5fd');
    }
    root.style.setProperty('--console-prompt', consolePromptColor);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};