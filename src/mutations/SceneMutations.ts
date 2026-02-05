import { gql } from 'graphql-request';

export const CREATE_SCENE = gql`
  mutation CreateScene(
    $_id String!
    $versions: [SceneContentInput]
  ) {
    createScene(
      input: {
        act: $act
        projectId: $projectId
        versions: $versions
      }
    ) {
      projectId
      number
    }
  }
`;

/**
 * Updates an existing scene version by calling createScene with newVersion: false.
 * Server uses the same createScene resolver and updates the version at activeVersion.
 */
export const UPDATE_SCENE = gql`
  mutation UpdateScene(
    $_id String!
    $number: Int
    $activeVersion: Int
    $newVersion: Boolean
    $newScene: Boolean
    $versions: [SceneContentInput]
  ) {
    createScene(
      input: {
        projectId: $projectId
        number: $number
        activeVersion: $activeVersion
        newVersion: $newVersion
        newScene: $newScene
        versions: $versions
      }
    ) {
      projectId
      number
    }
  }
`;
