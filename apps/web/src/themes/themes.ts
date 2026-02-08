'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useMemo } from 'react';
import { getLightTheme, getDarkTheme } from '../app/styles';
import { themePaletteOverridesStore } from '@/state/themePaletteOverrides';

declare module '@mui/material/styles' {
  export interface Palette {
    taxi: Palette['primary'];
    body: Palette['primary'];
    crime: Palette['primary'];
    drama: Palette['primary'];
    comedy: Palette['primary'];
    scifi: Palette['primary'];
  }

  export interface PaletteOptions {
    taxi?: PaletteOptions['primary'];
    crime?: PaletteOptions['primary'];
    drama?: PaletteOptions['primary'];
    comedy?: PaletteOptions['primary'];
    scifi?: PaletteOptions['primary'];
    body?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/SvgIcon' {
  export interface SvgIconPropsColorOverrides {
    taxi: true;
  }
}

export const getTheme = () => {
  const [theme, setTheme] = useState(true);
  const lightOverrides = themePaletteOverridesStore((s) => s.light);
  const darkOverrides = themePaletteOverridesStore((s) => s.dark);
  const appliedTheme = useMemo(
    () => createTheme(theme ? getLightTheme(lightOverrides) : getDarkTheme(darkOverrides)),
    [theme, lightOverrides, darkOverrides]
  );
  return { theme, setTheme, appliedTheme };
};