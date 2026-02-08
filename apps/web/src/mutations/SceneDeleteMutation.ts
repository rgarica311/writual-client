import { gql } from 'graphql-request';

export const DELETE_SCENE = gql`
  mutation DeleteScene($projectId: String!, $sceneNumber: Int!) {
    deleteScene(projectId: $projectId, sceneNumber: $sceneNumber) {
      id
      scenes {
        number
      }
    }
  }
`;

