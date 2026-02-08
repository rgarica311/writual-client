import { create } from 'zustand';
import type { PaletteOverrides } from '../app/styles/light.colors';

const STORAGE_KEY = 'writual-theme-overrides';

interface StoredOverrides {
  light?: Partial<PaletteOverrides>;
  dark?: Partial<PaletteOverrides>;
}

function loadFromStorage(): StoredOverrides {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const { light, dark } = parsed as StoredOverrides;
      return {
        light: light && typeof light === 'object' ? light : {},
        dark: dark && typeof dark === 'object' ? dark : {},
      };
    }
  } catch {
    // ignore invalid or missing data
  }
  return {};
}

function saveToStorage(light: Partial<PaletteOverrides>, dark: Partial<PaletteOverrides>) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ light, dark }));
  } catch {
    // ignore quota or other errors
  }
}

interface ThemePaletteOverridesState {
  light: Partial<PaletteOverrides>;
  dark: Partial<PaletteOverrides>;
  setLightOverrides: (overrides: Partial<PaletteOverrides>) => void;
  setDarkOverrides: (overrides: Partial<PaletteOverrides>) => void;
  resetLight: () => void;
  resetDark: () => void;
}

const initial = loadFromStorage();


export const themePaletteOverridesStore = create<ThemePaletteOverridesState>((set) => ({
  light: initial.light ?? {},
  dark: initial.dark ?? {},
  setLightOverrides: (overrides) =>
    set((state) => {
      const next = { ...state.light, ...overrides };
      saveToStorage(next, state.dark);
      return { light: next };
    }),
  setDarkOverrides: (overrides) =>
    set((state) => {
      const next = { ...state.dark, ...overrides };
      saveToStorage(state.light, next);
      return { dark: next };
    }),
  resetLight: () =>
    set((state) => {
      saveToStorage({}, state.dark);
      return { light: {} };
    }),
  resetDark: () =>
    set((state) => {
      saveToStorage(state.light, {});
      return { dark: {} };
    }),
}));
