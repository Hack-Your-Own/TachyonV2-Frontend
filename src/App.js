/* eslint-disable no-shadow */
import React, { useState } from "react";
import { Container, Tabs, Tab, Paper } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { TabPanel, a11yProps } from "./components/Tabs";
import CreateTeam from "./Tabs/CreateTeam";
import getThemeByName from "./theme";
import Settings from "./Tabs/Settings";
import useDarkState from "./util/useDarkState";

const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: "#f9f9f9",
  },
  padding: {
    padding: "1rem 1rem 1rem 0",
  },
  bold: {
    fontWeight: "bold",
  },
  marginLeft: {
    marginLeft: "auto",
    width: "100%",
  },
}));

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [darkState, toggleDarkState] = useDarkState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={getThemeByName(darkState ? "dark" : "light")}>
      <Paper style={{ height: "100%" }}>
        <Container
          maxWidth={false}
          className={!darkState && classes.background}
        >
          <Tabs
            className={classes.padding}
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="tabs"
          >
            <Tab label="Student Matching" {...a11yProps(0)} />
            <Tab label="Team Management" {...a11yProps(1)} />
            <Tab label="Settings" {...a11yProps(2)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <CreateTeam />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Settings darkState={darkState} toggleDarkState={toggleDarkState} />
          </TabPanel>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
