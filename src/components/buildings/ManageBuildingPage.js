import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadBuildings, saveBuilding } from "../../redux/actions/buildingActions";
import PropTypes from "prop-types";
import BuildingForm from "./BuildingForm";
import { newBuilding } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageBuildingPage({
  buildings,
  loadBuildings,
  saveBuilding,
  history,
  ...props
}) {
  const [building, setBuilding] = useState({ ...props.building });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (buildings.length === 0) {
      loadBuildings().catch(error => {
        alert("Loading buildings failed" + error);
      });
    } else {
      setBuilding({ ...props.building });
    }
  }, [props.building]);

  function handleChange(event) {
    const { name, value } = event.target;
    setBuilding(prevBuilding => ({
      ...prevBuilding,
      [name]: name === "id" ? parseInt(value, 10) : value // address?
    }));
  }

  function formIsValid() {
    const { address } = building;
    const errors = {};

    if (!address) errors.title = "Address is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveBuilding(building)
      .then(() => {
        toast.success("Building saved.");
        history.push("/buildings");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return buildings.length === 0 ? (
    <Spinner />
  ) : (
    <BuildingForm
      building={building}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageBuildingPage.propTypes = {
  building: PropTypes.object.isRequired,
  buildings: PropTypes.array.isRequired,
  loadBuildings: PropTypes.func.isRequired,
  saveBuilding: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getBuildingById(buildings, id) {
  return buildings.find(building => building.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const building =
    id && state.buildings.length > 0
      ? getBuildingById(state.buildings, id)
      : newBuilding;
  return {
    building,
    buildings: state.buildings
  };
}

const mapDispatchToProps = {
  loadBuildings,
  saveBuilding
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageBuildingPage);
