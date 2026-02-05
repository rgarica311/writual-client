import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { CREATE_SCENE, UPDATE_SCENE } from 'mutations/SceneMutations';
import { DELETE_SCENE } from 'mutations/SceneDeleteMutation';

const ENDPOINT = 'http://localhost:4000';

export const PROJECT_SCENES_QUERY_KEY = 'project-scenes';

export function useProjectSceneMutations() {
  const queryClient = useQueryClient();

  const updateSceneMutation = useMutation({
    mutationFn: async (variables: {
      projectId: string;
      number: number;
      activeVersion: number;
      newVersion: boolean;
      versions: any[];
    }) =>
      request(ENDPOINT, UPDATE_SCENE, {
        projectId: variables.projectId,
        number: variables.number,
        activeVersion: variables.activeVersion,
        newVersion: variables.newVersion,
        newScene: false,
        versions: variables.versions,
      }),
    onSuccess: (_, variables) => {
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: [PROJECT_SCENES_QUERY_KEY, variables.projectId] });
      }
    },
  });

  const deleteSceneMutation = useMutation({
    mutationFn: async (variables: { projectId: string; number: number }) =>
      request(ENDPOINT, DELETE_SCENE, {
        projectId: variables.projectId,
        sceneNumber: variables.number,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [PROJECT_SCENES_QUERY_KEY, variables.projectId] });
    },
  });

  const createSceneMutation = useMutation({
    mutationFn: async (variables: {
      projectId: string;
      act?: number;
      versions: any[];
    }) =>
      request(ENDPOINT, CREATE_SCENE, {
        projectId: variables.projectId,
        act: variables.act,
        versions: variables.versions,
      }),
    onSuccess: (_, variables) => {
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: [PROJECT_SCENES_QUERY_KEY, variables.projectId] });
      }
    },
  });

  return {
    updateSceneMutation,
    deleteSceneMutation,
    createSceneMutation,
  };
}
