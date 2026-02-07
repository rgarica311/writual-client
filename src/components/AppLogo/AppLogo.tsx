'use client';

import * as React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';

export interface AppLogoProps {
  logoPath?: string;
  color?: string;
  size?: number;
  fontSize?: number;
  gap?: number;
  loading?: 'eager' | 'lazy';
}

export function AppLogo({
  size = 65,
  fontSize = 32,
  gap = 8,
  loading = 'lazy',
  color = 'primary',
  logoPath = '/logo_symbol.png',
}: AppLogoProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', }}>
      <Image src={logoPath} alt="Writual" width={size} height={size} loading={loading} />
      <Typography fontFamily='Varela Round' sx={{ marginLeft: 2}} letterSpacing={11} variant="h6" color={color} fontSize={fontSize}>
        ritual
      </Typography>
    </Box>
  );
}

