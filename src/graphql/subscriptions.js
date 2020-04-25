/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMultiplayerCanvasModel = /* GraphQL */ `
  subscription OnCreateMultiplayerCanvasModel(
    $id: ID
    $title: String
    $grid_dimension: Int
    $picture: AWSJSON
    $grid_coordinates: AWSJSON
  ) {
    onCreateMultiplayerCanvasModel(
      id: $id
      title: $title
      grid_dimension: $grid_dimension
      picture: $picture
      grid_coordinates: $grid_coordinates
    ) {
      id
      title
      grid_dimension
      picture
      grid_coordinates
    }
  }
`;
export const onUpdateMultiplayerCanvasModel = /* GraphQL */ `
  subscription OnUpdateMultiplayerCanvasModel(
    $id: ID
    $title: String
    $grid_dimension: Int
    $picture: AWSJSON
    $grid_coordinates: AWSJSON
  ) {
    onUpdateMultiplayerCanvasModel(
      id: $id
      title: $title
      grid_dimension: $grid_dimension
      picture: $picture
      grid_coordinates: $grid_coordinates
    ) {
      id
      title
      grid_dimension
      picture
      grid_coordinates
    }
  }
`;
export const onDeleteMultiplayerCanvasModel = /* GraphQL */ `
  subscription OnDeleteMultiplayerCanvasModel(
    $id: ID
    $title: String
    $grid_dimension: Int
    $picture: AWSJSON
    $grid_coordinates: AWSJSON
  ) {
    onDeleteMultiplayerCanvasModel(
      id: $id
      title: $title
      grid_dimension: $grid_dimension
      picture: $picture
      grid_coordinates: $grid_coordinates
    ) {
      id
      title
      grid_dimension
      picture
      grid_coordinates
    }
  }
`;
