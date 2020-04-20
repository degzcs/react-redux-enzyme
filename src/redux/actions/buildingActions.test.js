import * as buildingActions from "./buildingActions";
import * as types from "./actionTypes";
import { buildings } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Buildings Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_BUILDINGS_SUCCESS when loading buildings", () => {
      fetchMock.mock("*", {
        body: buildings,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_BUILDINGS_SUCCESS, buildings }
      ];

      const store = mockStore({ buildings: [] });
      return store.dispatch(buildingActions.loadBuildings()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createBuildingSuccess", () => {
  it("should create a CREATE_BUILDING_SUCCESS action", () => {
    //arrange
    const building = buildings[0];
    const expectedAction = {
      type: types.CREATE_BUILDING_SUCCESS,
      building
    };

    //act
    const action = buildingActions.createBuildingSuccess(building);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
