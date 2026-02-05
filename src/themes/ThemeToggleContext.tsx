'use client';

import * as React from 'react';

interface ThemeToggleContextValue {
  isLightMode: boolean;
  setTheme: (fn: (prev: boolean) => boolean) => void;
}

const ThemeToggleContext = React.createContext<ThemeToggleContextValue | null>(null);

export function ThemeToggleProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ThemeToggleContextValue;
}) {
  return (
    <ThemeToggleContext.Provider value={value}>
      {children}
    </ThemeToggleContext.Provider>
  );
}

export function useThemeToggle() {
  const ctx = React.useContext(ThemeToggleContext);
  if (!ctx) {
    throw new Error('useThemeToggle must be used within ThemeToggleProvider');
  }
  return ctx;
}

export function useThemeToggleOptional() {
  return React.useContext(ThemeToggleContext);
}
