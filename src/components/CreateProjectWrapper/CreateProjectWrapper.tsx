'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { request } from 'graphql-request';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useCreateProjectModalStore } from '@/state/createProjectModal';
import { useOutlineFrameworksStore } from '@/state/outlineFrameworks';
import { CreateProject } from '@/components/CreateProject';
import { CREATE_PROJECT } from '@mutations/ProjectMutations';
import { OUTLINE_FRAMEWORKS_QUERY } from '@/queries/OutlineQueries';
import { createMutation } from '@/helpers/createMutation';
import { useCreateMutation } from '@hooks/useCreateMutation';
import { GqlStatements } from '@/enums/GqlStatements';
import { useProjectTableState } from '@/state/userGeneration';
import { Mutation } from '@/interfaces/scene';
import type { OutlineFrameworkItem } from '@/state/outlineFrameworks';

const endpoint = 'http://localhost:4000';
const DEFAULT_USER = 'rory.garcia1@gmail.com';

interface OutlineFrameworksResponse {
  getOutlineFrameworks?: OutlineFrameworkItem[];
}

export function CreateProjectWrapper() {
  const queryClient = useQueryClient();
  const open = useCreateProjectModalStore((s) => s.open);
  const setFrameworks = useOutlineFrameworksStore((s) => s.setFrameworks);

  const { data: outlineData } = useQuery<OutlineFrameworksResponse>({
    queryKey: ['outline-frameworks', DEFAULT_USER],
    queryFn: () => request(endpoint, OUTLINE_FRAMEWORKS_QUERY, { user: DEFAULT_USER }) as Promise<OutlineFrameworksResponse>,
  });

  useEffect(() => {
    if (outlineData?.getOutlineFrameworks) {
      setFrameworks(outlineData.getOutlineFrameworks);
    }
  }, [outlineData, setFrameworks]);
  const setOpen = useCreateProjectModalStore((s) => s.setOpen);
  const createStatement = useProjectTableState((s) => s.createStatement);
  const setCreateStatement = useProjectTableState((s) => s.setCreateStatement);
  const [createVariables, setCreateVariables] = useState<Record<string, unknown> | undefined>();

  const mutationArgs = useMemo((): Mutation => ({
    createStatement,
    createVariables: createVariables as Record<string, string>,
    invalidateQueriesArray: ['projects'],
    stateResetters: {
      setCreateStatement,
      setCreateVariables: () => setCreateVariables(undefined),
    },
  }), [createStatement, createVariables]);

  const mutation = createMutation(mutationArgs);
  useCreateMutation(createStatement, createVariables, mutation, GqlStatements.CREATE_PROJECT);

  const handleAddProject = (formValues: Record<string, unknown>) => {
    const user =
      process.env.NODE_ENV === 'development'
        ? 'rory.garcia1@gmail.com'
        : ((formValues.user as string) ?? 'rory.garcia1@gmail.com');
    const withUser = { ...formValues, user };
    setCreateVariables(withUser);
    setCreateStatement(CREATE_PROJECT);
  };

  if (!open) return null;

  return (
    <CreateProject
      setAddProject={setOpen}
      handleAddProject={handleAddProject}
    />
  );
}
