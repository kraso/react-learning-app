import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'app-theme-preference';

function getSystemPreference() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredPreference() {
  try {
    return localStorage.getItem(THEME_KEY) || 'auto';
  } catch {
    return 'auto';
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
}

export function useTheme() {
  const [preference, setPreference] = useState(getStoredPreference);
  const [theme, setThemeState] = useState(() => {
    if (preference !== 'auto') return preference;
    if (typeof window !== 'undefined') return getSystemPreference();
    return 'dark';
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (preference === 'auto') {
        const next = e.matches ? 'dark' : 'light';
        setThemeState(next);
        applyTheme(next);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [preference]);

  const setMode = useCallback((newMode) => {
    setPreference(newMode);
    try {
      localStorage.setItem(THEME_KEY, newMode);
    } catch { /* ignore */ }

    if (newMode === 'auto') {
      const system = getSystemPreference();
      setThemeState(system);
      applyTheme(system);
    } else {
      setThemeState(newMode);
      applyTheme(newMode);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setMode(next);
  }, [theme, setMode]);

  return { theme, preference, setMode, toggleTheme };
}
