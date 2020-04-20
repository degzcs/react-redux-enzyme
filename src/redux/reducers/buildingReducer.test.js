import buildingReducer from "./buildingReducer";
import * as actions from "../actions/buildingActions";

it("should add building when passed CREATE_BUILDING_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      address: "A"
    },
    {
      address: "B"
    }
  ];

  const newBuilding = {
    address: "C"
  };

  const action = actions.createBuildingSuccess(newBuilding);

  // act
  const newState = buildingReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].address).toEqual("A");
  expect(newState[1].address).toEqual("B");
  expect(newState[2].address).toEqual("C");
});

it("should update building when passed UPDATE_BUILDING_SUCCESS", () => {
  // arrange
  const initialState = [
    { id: 1, address: "A" },
    { id: 2, address: "B" },
    { id: 3, address: "C" }
  ];

  const building = { id: 2, address: "New Address" };
  const action = actions.updateBuildingSuccess(building);

  // act
  const newState = buildingReducer(initialState, action);
  const updatedBuilding = newState.find(a => a.id == building.id);
  const untouchedBuilding = newState.find(a => a.id == 1);

  // assert
  expect(updatedBuilding.address).toEqual("New Address");
  expect(untouchedBuilding.address).toEqual("A");
  expect(newState.length).toEqual(3);
});
