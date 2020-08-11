import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import {
  Grid,
  Table,
  TableHeaderRow,
} from "@devexpress/dx-react-grid-material-ui";

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

const CreateTeam = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const fetchData = async (url) => {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    };
    fetchData(url)
      // eslint-disable-next-line no-shadow
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
    <div className="">
      <Button color="primary" variant="contained">
        Create Team
      </Button>
      <Button color="primary" variant="contained">
        Add User to Team
      </Button>
      <Grid rows={data} columns={columns}>
        <Table />
        <TableHeaderRow />
      </Grid>
    </div>
  );
};

export default CreateTeam;
