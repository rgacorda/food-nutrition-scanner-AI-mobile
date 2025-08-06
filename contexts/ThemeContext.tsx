import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
}

const lightColors: ThemeColors = {
  background: '#F0F0F0',
  surface: '#FFFFFF',
  primary: '#000000',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#E5E7EB',
  shadow: '#000000',
  accent: '#000000ff',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
};

const darkColors: ThemeColors = {
  background: '#000000',
  surface: '#1C1C1E',
  primary: '#FFFFFF',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  shadow: '#000000',
  accent: '#0A84FF',
  success: '#30D158',
  warning: '#FF9F0A',
  error: '#FF453A',
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>('light');

  const isDark = theme === 'system' 
    ? systemColorScheme === 'dark' 
    : theme === 'dark';

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, colors, isDark, setTheme }}>
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