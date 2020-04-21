import React from "react";
import { mount } from "enzyme";
import { newBuilding, buildings } from "../../../tools/mockData";
import { ManageBuildingPage } from "./ManageBuildingPage";

function render(args) {
  const defaultProps = {
    buildings,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saveBuilding: jest.fn().mockRejectedValue(new Error('Name is required')),
    loadBuildings: jest.fn(),
    building: newBuilding,
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageBuildingPage {...props} />);
}

it("sets error when attempting to save an empty name field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Name is required.");
});
