'use client';

import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';

interface AppAlertProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  autoHideDurationMs?: number;
}

export function AppAlert({
  open,
  onClose,
  message,
  severity = 'error',
  autoHideDurationMs = 5000,
}: AppAlertProps) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={autoHideDurationMs}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

