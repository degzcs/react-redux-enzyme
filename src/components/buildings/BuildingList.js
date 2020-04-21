import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BuildingList = ({ buildings, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th />
        <th>Name</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {buildings.map(building => {
        return (
          <tr key={building.id}>
            <td>
              <Link to={"/building/" + building.id}>{building.name}</Link>
            </td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(building)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

BuildingList.propTypes = {
  buildings: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default BuildingList;
