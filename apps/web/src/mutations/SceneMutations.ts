import { gql } from 'graphql-request';

export const CREATE_SCENE = gql`
  mutation CreateScene(
    $versions: [SceneContentInput]
    $_id: String
  ) {
    createScene(
      input: {
        _id: $_id
        versions: $versions
      }
    ) {
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
    $_id: String!
    $number: Int
    $activeVersion: Int
    $lockedVersion: Int
    $newVersion: Boolean
    $newScene: Boolean
    $versions: [SceneContentInput]
  ) {
    createScene(
      input: {
        _id: $_id
        number: $number
        activeVersion: $activeVersion
        lockedVersion: $lockedVersion
        newVersion: $newVersion
        newScene: $newScene
        versions: $versions
      }
    ) {
      number
    }
  }
`;
