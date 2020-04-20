import { combineReducers } from "redux";
import buildings from "./buildingReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  buildings,
  apiCallsInProgress
});

export default rootReducer;
