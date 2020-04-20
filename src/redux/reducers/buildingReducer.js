import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function buildingReducer(state = initialState.buildings, action) {
  switch (action.type) {
    case types.CREATE_BUILDING_SUCCESS:
      return [...state, { ...action.building }];
    case types.UPDATE_BUILDING_SUCCESS:
      return state.map(building =>
        building.id === action.building.id ? action.building : building
      );
    case types.LOAD_BUILDINGS_SUCCESS:
      return action.buildings;
    case types.DELETE_BUILDING_OPTIMISTIC:
      return state.filter(building => building.id !== action.building.id);
    default:
      return state;
  }
}
