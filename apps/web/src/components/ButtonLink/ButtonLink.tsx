'use client';

import Button from '@mui/material/Button';
import Link from 'next/link';

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export const ButtonLink = ({ color, href, children, variant = 'text' }: ButtonLinkProps) => {
  return (
    <Button
      color={color}
      component={Link}
      href={href}
      variant={variant}
      sx={{ justifyContent: 'flex-start', marginBottom: "20px", minWidth: "200px", borderRadius: '16px', textTransform: 'capitalize' }}
    >
      {children}
    </Button>
  );
};
