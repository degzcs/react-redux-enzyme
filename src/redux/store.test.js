import { createStore } from "redux";
import rootReducer from "./reducers";
import initialState from "./reducers/initialState";
import * as buildingActions from "./actions/buildingActions";

it("Should handle creating buildings", function() {
  // arrange
  const store = createStore(rootReducer, initialState);
  const building = {
    address: "Clean Code"
  };

  // act
  const action = buildingActions.createCourseSuccess(building);
  store.dispatch(action);

  // assert
  const createdCourse = store.getState().buildings[0];
  expect(createdCourse).toEqual(building);
});
