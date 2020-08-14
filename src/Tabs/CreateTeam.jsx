import React, { useEffect, useState } from "react";
import { Button, Box } from "@material-ui/core";
import {
  SortingState,
  IntegratedSorting,
  IntegratedSelection,
  SelectionState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableColumnResizing,
  TableColumnReordering,
  TableSelection,
  DragDropProvider,
} from "@devexpress/dx-react-grid-material-ui";
import columnWidthConfig from "../TableConfigs/columnConfigs";
import { makeTitleReadable, orderKey } from "../util/dataParserUtils";

const url = "https://hyo-backend.herokuapp.com/test";

const CreateTeam = () => {
  const [orderedData, setOrderedData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnWidths] = useState(columnWidthConfig);
  const [orginalOrder, setOrginalOrder] = useState([]);
  const [selection, setSelection] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const fetchData = async (url) => {
      const response = await fetch(url);
      const responseData = await response.json();
      return responseData;
    };
    fetchData(url)
      // eslint-disable-next-line no-shadow
      .then((fetchedData) => {
        const order = Array.from(
          new Set([
            "email",
            "discord",
            "name",
            "start_date",
            "end_date",
            "track",
            ...Object.keys(fetchedData[0]),
            "goals",
            "createdAt",
            "updatedAt",
            "rules_agreement",
            "__v",
          ])
        );
        setOrginalOrder(order);
        const newData = [...fetchedData];
        newData.forEach((d) => {
          orderKey(d, order);
          Object.keys(d).forEach((k) => {
            // eslint-disable-next-line
            if ((d[k] == 0 || d[k] === null || d[k][0] == 0) && d[k] !== 0)
              d[k] = "null";
          });
          // eslint-disable-next-line
          delete d["_id"];
          // eslint-disable-next-line
          delete d["__v"];
        });
        setOrderedData(newData);
        const cols = Object.keys(newData[0]).map((item) => ({
          name: item,
          title: makeTitleReadable(item),
        }));
        setColumns(cols);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  }, [columnWidths]);

  return (
    <div className="">
      <Button color="primary" variant="contained">
        Create Team
      </Button>
      <Button color="primary" variant="contained">
        Add User to Team
      </Button>

      <Box component="div" m={1}>
        {selection.length > 0 && `Total rows selected: ${selection.length}`}
      </Box>

      <Grid rows={orderedData} columns={columns}>
        <DragDropProvider />
        <SortingState />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <IntegratedSorting />
        <IntegratedSelection />

        <VirtualTable columnExtensions={columnWidthConfig} height="80vh" />
        <TableSelection showSelectAll highlightRow />
        <TableColumnReordering
          order={orginalOrder}
          onOrderChange={setOrginalOrder}
        />
        <TableColumnResizing defaultColumnWidths={columnWidths} />
        <TableHeaderRow showSortingControls />
      </Grid>
    </div>
  );
};

export default CreateTeam;
