import React from "react";
import { Box, Switch } from "@material-ui/core";
import PropTypes from "prop-types";

const Settings = ({ darkState, toggleDarkState }) => {
  return (
    <div>
      <Box component="span">
        <span>Dark Mode</span>
        <Switch checked={darkState} onChange={toggleDarkState} />
      </Box>
    </div>
  );
};

Settings.propTypes = {
  darkState: PropTypes.bool.isRequired,
  toggleDarkState: PropTypes.func.isRequired,
};

export default Settings;
