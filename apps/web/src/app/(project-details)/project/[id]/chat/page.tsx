'use client';

import { Container, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { ProjectHeader } from '@/components/ProjectHeader';

export default function ChatPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <Container maxWidth={false} disableGutters sx={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 2, height: '100%', width: '100%' }}>
      <ProjectHeader />
      <Container disableGutters sx={{ py: 2, flex: 1 }}>
        <Typography variant="h6" fontWeight={600}>Chat</Typography>
        <Typography variant="body2" color="text.secondary">Project ID: {id}</Typography>
      </Container>
    </Container>
  );
}
