import { darkColors } from './dark.colors';
import type { PaletteOverrides } from './light.colors';

function mergeWithOverrides(overrides?: Partial<PaletteOverrides>): PaletteOverrides {
  const base = { ...darkColors };
  if (!overrides) return base as PaletteOverrides;
  return { ...base, ...overrides } as PaletteOverrides;
}

export function getDarkTheme(overrides?: Partial<PaletteOverrides>) {
  const colors = mergeWithOverrides(overrides);
  return {
    palette: {
      mode: 'dark' as const,
      primary: {
        main: colors.primaryMain,
        contrastText: colors.commonWhite,
      },
      secondary: {
        main: colors.secondaryMain,
        contrastText: colors.commonWhite,
      },
      error: { main: colors.errorMain },
      warning: { main: colors.warningMain },
      info: { main: colors.infoMain },
      success: { main: colors.successMain },
      common: { black: colors.commonBlack, white: colors.commonWhite },
    },
  };
}

export const dark = getDarkTheme();
