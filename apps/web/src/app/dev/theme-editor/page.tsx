'use client';

import { notFound } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { lightColors, type PaletteOverrides } from '../../styles/light.colors';
import { darkColors } from '../../styles/dark.colors';
import { themePaletteOverridesStore } from '@/state/themePaletteOverrides';

const PALETTE_KEYS: (keyof PaletteOverrides)[] = [
  'primaryMain',
  'secondaryMain',
  'errorMain',
  'warningMain',
  'infoMain',
  'successMain',
  'commonBlack',
  'commonWhite',
];

function getDefaults(mode: 'light' | 'dark'): PaletteOverrides {
  const source = mode === 'light' ? lightColors : darkColors;
  return PALETTE_KEYS.reduce(
    (acc, key) => {
      acc[key] = source[key];
      return acc;
    },
    {} as PaletteOverrides
  );
}

function getEffectiveValues(
  mode: 'light' | 'dark',
  lightOverrides: Partial<PaletteOverrides>,
  darkOverrides: Partial<PaletteOverrides>
): PaletteOverrides {
  const defaults = getDefaults(mode);
  const overrides = mode === 'light' ? lightOverrides : darkOverrides;
  return { ...defaults, ...overrides } as PaletteOverrides;
}

export default function ThemeEditorPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const lightOverrides = themePaletteOverridesStore((s) => s.light);
  const darkOverrides = themePaletteOverridesStore((s) => s.dark);
  const setLightOverrides = themePaletteOverridesStore((s) => s.setLightOverrides);
  const setDarkOverrides = themePaletteOverridesStore((s) => s.setDarkOverrides);
  const resetLight = themePaletteOverridesStore((s) => s.resetLight);
  const resetDark = themePaletteOverridesStore((s) => s.resetDark);

  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [formValues, setFormValues] = useState<PaletteOverrides>(() =>
    getEffectiveValues('light', lightOverrides, darkOverrides)
  );

  const defaultsForMode = useMemo(() => getDefaults(mode), [mode]);

  useEffect(() => {
    const effective = getEffectiveValues(mode, lightOverrides, darkOverrides);
    setFormValues(effective);
  }, [mode, lightOverrides, darkOverrides]);

  const handleModeChange = (value: string) => {
    const next = value as 'light' | 'dark';
    setMode(next);
    const effective = getEffectiveValues(next, lightOverrides, darkOverrides);
    setFormValues(effective);
  };

  const handleFieldChange = (key: keyof PaletteOverrides, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (mode === 'light') {
      resetLight();
      setFormValues(getDefaults('light'));
    } else {
      resetDark();
      setFormValues(getDefaults('dark'));
    }
  };

  const handleUpdate = () => {
    if (mode === 'light') {
      setLightOverrides(formValues);
    } else {
      setDarkOverrides(formValues);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, maxWidth: 480 }}>
        <Stack spacing={3}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Mode</FormLabel>
            <RadioGroup
              row
              value={mode}
              onChange={(_, value) => handleModeChange(value)}
            >
              <FormControlLabel value="light" control={<Radio />} label="Light" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </FormControl>

          {PALETTE_KEYS.map((key) => (
            <TextField
              key={key}
              label={key}
              value={formValues[key]}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              fullWidth
              size="small"
            />
          ))}

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
