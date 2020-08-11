/* eslint-disable no-shadow */
import React, { useState } from "react";
import { Typography, Tabs, Tab, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TabPanel, a11yProps } from "./components/Tabs";
import CreateTeam from "./Tabs/CreateTeam";
import DeleteTeam from "./Tabs/DeleteTeam";
import ModifyTeam from "./Tabs/ModifyTeam";

// const url = "http://localhost:8080/test";

const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: "#f9f9f9",
  },
}));

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" className={classes.background}>
      <Typography variant="h4" gutterBottom>
        <br />
        Group Management
      </Typography>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="tabs"
      >
        <Tab label="Create Team" {...a11yProps(0)} />
        <Tab label="Delete Team" {...a11yProps(1)} />
        <Tab label="Modify Team" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <CreateTeam />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeleteTeam />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ModifyTeam />
      </TabPanel>
    </Container>
  );
};

export default App;
