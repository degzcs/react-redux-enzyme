import React from "react";
import BuildingForm from "./BuildingForm";
import { shallow } from "enzyme";

function renderBuildingForm(args) {
  const defaultProps = {
    building: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<BuildingForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderBuildingForm();
  // console.log(wrapper.debug());
  expect(wrapper.find("form").length).toBe(1);
  expect(wrapper.find("h2").text()).toEqual("Add Building");
});

it('labels save buttons as "Save" when not saving', () => {
  const wrapper = renderBuildingForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it('labels save button as "Saving..." when saving', () => {
  const wrapper = renderBuildingForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
