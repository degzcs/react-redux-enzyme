import buildingReducer from "./buildingReducer";
import * as actions from "../actions/buildingActions";

it("should add building when passed CREATE_BUILDING_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      name: "A"
    },
    {
      name: "B"
    }
  ];

  const newBuilding = {
    name: "C"
  };

  const action = actions.createBuildingSuccess(newBuilding);

  // act
  const newState = buildingReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].name).toEqual("A");
  expect(newState[1].name).toEqual("B");
  expect(newState[2].name).toEqual("C");
});

it("should update building when passed UPDATE_BUILDING_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
    { id: 3, name: "C" }
  ];

  const building = { id: 2, name: "New Name" };
  const action = actions.updateBuildingSuccess(building);

  // act
  const newState = buildingReducer(initialState, action);
  const updatedBuilding = newState.find(a => a.id == building.id);
  const untouchedBuilding = newState.find(a => a.id == 1);

  // assert
  expect(updatedBuilding.name).toEqual("New Name");
  expect(untouchedBuilding.name).toEqual("A");
  expect(newState.length).toEqual(3);
});
