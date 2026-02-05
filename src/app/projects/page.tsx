'use client';

import React, { useEffect, Suspense } from 'react';
import { request } from "graphql-request";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectCard } from "../../components"
import { useUserStore } from 'state/userGeneration';
import { useCreateProjectModalStore } from '@/state/createProjectModal';
import { PROJECTS_QUERY } from '@/queries/ProjectQueries';
import { DELETE_PROJECT } from 'mutations/ProjectMutations';
import { Box, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import Link from 'next/link';
import { SettingsPopover } from '@/components/SettingsPopover';

const endpoint = `http://localhost:4000`;

export default function DataTable() {
  const queryClient = useQueryClient();
  const setProjects = useUserStore((state) => state.setProjects)
  const projects = useUserStore((state) => state.projects)
  const openCreateProjectModal = useCreateProjectModalStore((s) => s.openModal)

  const { data }: any = useQuery({ queryKey: ['projects'], queryFn: async () => request(endpoint, PROJECTS_QUERY) })

  const deleteProjectMutation = useMutation({
    mutationFn: (deleteProjectId: string) =>
      request(endpoint, DELETE_PROJECT, { deleteProjectId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const dataRef = React.useRef<any>(null);
  useEffect(() => {
    if (data?.getProjectData?.length > 0 && dataRef.current !== data) {
      dataRef.current = data;
      const enriched = data.getProjectData.map((row: any) => ({
        ...row,
        coverImage: row.poster,
        characters: true,
        treatment: true
      }))
      setProjects(enriched)
    }
  }, [data, setProjects])

  return (
      <>
      {
        <Suspense fallback={<div>Loading...</div>}>
          
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <Container sx={{ 
                minWidth: "100%", 
                display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 1, marginTop: "10px", textAlign: "center", height: "70px", textDecoration: "none", color: "inherit" }}>
                <Link href="/projects" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit" }}>
                  <Image src="/logo_symbol.png" alt="Writual" width={65} height={65} loading="lazy" />
                  <Typography letterSpacing={5} variant="h6" color="primary" fontSize={32}>ritual</Typography>
                </Link>
              </Container>
              <Box sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 1200 }}>
                <SettingsPopover standalone />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2, paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={openCreateProjectModal}
                >
                  Create Project
                </Button>
              </Box>

                <Box
                  sx={{
                    height: '100%',
                    paddingTop: 5,
                    overflowY: 'scroll',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap',
                    gap: 2,
                  }}
                >
                  {projects.map((project: any, index: number) => (
                    <Box
                      key={project.id ?? index}
                      sx={{  marginTop: '20px', flexShrink: 0 }}
                    >
                      <ProjectCard
                        title={project.title}
                        author={project.user}
                        genre={project.genre}
                        logline={project.logline}
                        coverImage={project.coverImage ?? project.poster}
                        onDelete={project._id ? () => deleteProjectMutation.mutate(project._id) : undefined}
                        projectId={project._id}
                        sharedWith={project.sharedWith ?? []}
                        to={project._id ? `/project/${project._id}` : undefined}
                      />
                    </Box>
                  ))}
                </Box>
           

            </Box>
          
        
        </Suspense>
      }

      </>
      
  );
}
