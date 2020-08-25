/* eslint-disable no-shadow */
import React, { useState } from "react";
import {
  Grid,
  Typography,
  Tabs,
  Tab,
  Container,
  Paper,
} from "@material-ui/core";
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
          <Grid
            display="inline"
            container
            justify="space-between"
            direction="row"
            alignItems="center"
          >
            <Typography
              variant="h4"
              gutterBottom
              className={`${classes.padding} ${classes.bold}`}
              display="inline"
            >
              Team Management
            </Typography>
          </Grid>
          <Tabs
            className={classes.padding}
            variant="fullWidth"
            value={value}
            onChange={handleChange}
            aria-label="tabs"
          >
            <Tab label="Student Matching" {...a11yProps(0)} />
            <Tab label="Team Management" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            <CreateTeam />
          </TabPanel>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
