import * as types from "./actionTypes";
import * as buildingApi from "../../api/buildingApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadBuildingSuccess(buildings) {
  return { type: types.LOAD_BUILDINGS_SUCCESS, buildings };
}

export function createBuildingSuccess(building) {
  return { type: types.CREATE_BUILDING_SUCCESS, building };
}

export function updateBuildingSuccess(building) {
  return { type: types.UPDATE_BUILDING_SUCCESS, building };
}

export function deleteBuildingOptimistic(building) {
  return { type: types.DELETE_BUILDING_OPTIMISTIC, building };
}

export function loadBuildings() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return buildingApi
      .getBuildings()
      .then(buildings => {
        dispatch(loadBuildingSuccess(buildings));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveBuilding(building) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return buildingApi
      .saveBuilding(building)
      .then(savedBuilding => {
        building.id
          ? dispatch(updateBuildingSuccess(savedBuilding))
          : dispatch(createBuildingSuccess(savedBuilding));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteBuilding(building) {
  return function(dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteBuildingOptimistic(building));
    return buildingApi.deleteBuilding(building.id);
  };
}
