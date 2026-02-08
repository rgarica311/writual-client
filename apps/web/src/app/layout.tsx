"use client"

import * as React from 'react';
import { AppBarComponent } from '../components';
import { Box, Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './styles/global.scss'
import '@fontsource/lato/100.css'
import '@fontsource/lato/300.css'
import '@fontsource/lato'
import '@fontsource/lato/700.css'
import '@fontsource/lato/900.css'
import { getTheme } from '../themes/themes';
import { ThemeToggleProvider } from '../themes/ThemeToggleContext';
import { CreateProjectWrapper } from '../components/CreateProjectWrapper';

const client = new QueryClient();

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const { theme: isLightMode, setTheme, appliedTheme } = getTheme();
    return (
      <html lang="en">
        <body>
          <QueryClientProvider client={client}>
              <ThemeProvider theme={appliedTheme}>
              <ThemeToggleProvider value={{ isLightMode, setTheme }}>
                <CssBaseline />
                <Box sx={{ gap: 3, display: "flex", flexDirection: "row", width: "100%", height: "100%"}}>
                  <Box sx={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}>
                    <Container maxWidth={false} disableGutters sx={{ display: "flex", height: "100%", flexDirection: "column", resize:"vertical", margin:"0px", width: "100%"}}>
                    {children}
                  </Container>
                </Box>
              </Box>
              <CreateProjectWrapper />
            </ThemeToggleProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </body>
      </html>
    );
  }