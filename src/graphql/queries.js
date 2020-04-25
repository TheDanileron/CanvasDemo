/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMultiplayerCanvasModel = /* GraphQL */ `
  query GetMultiplayerCanvasModel($id: ID!) {
    getMultiplayerCanvasModel(id: $id) {
      id
      title
      grid_dimension
      picture
      grid_coordinates
    }
  }
`;
export const listMultiplayerCanvasModels = /* GraphQL */ `
  query ListMultiplayerCanvasModels(
    $filter: TableMultiplayerCanvasModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMultiplayerCanvasModels(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        grid_dimension
        picture
        grid_coordinates
      }
      nextToken
    }
  }
`;
