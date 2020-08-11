/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import { Typography, Tabs, Tab, Button, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";
import { TabPanel, a11yProps } from "./components/Tabs";

const url = "http://localhost:8080/test";

/**
 *
 * @param {String} name
 */
const makeTitleReadable = (name) => {
  return name === "_id"
    ? "Id"
    : name
        .split("_")
        .map((word) => {
          // console.log(word);
          if (word) return word[0].toUpperCase() + word.substring(1);
          return "";
        })
        .join(" ");
};

const useStyles = makeStyles(() => ({
  background: {
    backgroundColor: "#f9f9f9",
  },
}));

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
    fetchData(url)
      .then((data) => {
        setData(data);
        const cols = Object.keys(data[0]).map((item) => ({
          name: item,
          title: makeTitleReadable(item),
        }));
        setColumns(cols);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  }, []);

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
        {/* Put real create team code here. */}
        <Button color="primary" variant="contained">
          Add to Group
        </Button>
        <Grid rows={data} columns={columns}>
          <Table />
          <TableHeaderRow />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Button color="primary" variant="contained">
          Add to Group
        </Button>
        <Grid rows={data} columns={columns}>
          <Table />
          <TableHeaderRow />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Button color="primary" variant="contained">
          Add to Group
        </Button>
        <Grid rows={data} columns={columns}>
          <Table />
          <TableHeaderRow />
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default App;
