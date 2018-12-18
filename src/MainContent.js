import React from "react";
import PropTypes from "prop-types";

const MainContent = props => (
  <div>
    <h2>Invitees</h2>
    <label>
      <input
        type="checkbox"
        onChange={props.toggleFilter}
        checked={props.isFiltered}
      />{" "}
      Hide those who haven't responded
    </label>
  </div>
);

MainContent.propTypes = {
    toggleFilter: PropTypes.func.isRequired,
    isFiltered: PropTypes.bool.isRequired,
};
export default MainContent;