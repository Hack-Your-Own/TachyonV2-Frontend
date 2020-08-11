/* eslint-disable no-shadow */
import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";

const url = "http://localhost:8080/test";

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

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
  button: {
    marginTop: "1rem",
    marginBottom: "1rem",
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
    <Container maxWidth="lg">
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
        <Tab label="Create Teams" {...a11yProps(0)} />
        <Tab label="Modify Teams" {...a11yProps(1)} />
        <Tab label="Delete Teams" {...a11yProps(2)} />
      </Tabs>
      <Paper className={classes.button}>
        {value === 0 && (
          <div>
            <Button color="primary" variant="contained">
              Add to Group
            </Button>
            <Grid rows={data} columns={columns}>
              <Table />
              <TableHeaderRow />
            </Grid>
          </div>
        )}
        {value === 1 && (
          <div>
            <Button color="primary" variant="contained">
              Add to Group
            </Button>
            <Grid rows={data} columns={columns}>
              <Table />
              <TableHeaderRow />
            </Grid>
          </div>
        )}
        {value === 2 && (
          <div>
            <Button color="primary" variant="contained">
              Add to Group
            </Button>
            <Grid rows={data} columns={columns}>
              <Table />
              <TableHeaderRow />
            </Grid>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default App;
