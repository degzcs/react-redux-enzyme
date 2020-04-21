import React from "react";
import { connect } from "react-redux";
import * as buildingActions from "../../redux/actions/buildingActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import BuildingList from "./BuildingList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class BuildingsPage extends React.Component {
  state = {
    redirectToAddBuildingPage: false
  };

  componentDidMount() {
    const { buildings, actions } = this.props;

    if (buildings.length === 0) {
      actions.loadBuildings().catch(error => {
        alert("Loading buildings failed" + error);
      });
    }
  }

  handleDeleteBuilding = async building => {
    toast.success("Building deleted");
    try {
      await this.props.actions.deleteBuilding(building);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddBuildingPage && <Redirect to="/building" />}
        <h2>Buildings</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-building"
              onClick={() => this.setState({ redirectToAddBuildingPage: true })}
            >
              Add Building
            </button>

            <BuildingList
              onDeleteClick={this.handleDeleteBuilding}
              buildings={this.props.buildings}
            />
          </>
        )}
      </>
    );
  }
}

BuildingsPage.propTypes = {
  buildings: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    buildings: state.buildings,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadBuildings: bindActionCreators(buildingActions.loadBuildings, dispatch),
      deleteBuilding: bindActionCreators(buildingActions.deleteBuilding, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuildingsPage);
