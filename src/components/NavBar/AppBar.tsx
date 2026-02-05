'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';

export const AppBarComponent = () => {
  return (
    <AppBar color="primary" position="static" sx={{ marginBottom: "10px", borderRadius: "5px", display: "flex", alignItems: "center", minHeight: "60px", flex: 1 }}>
      <Container maxWidth={false} sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} />
    </AppBar>
  );
};
