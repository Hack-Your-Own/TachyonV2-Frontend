import React, { useEffect, useState } from "react";
import { Button, Box, CircularProgress } from "@material-ui/core";
import {
  SortingState,
  IntegratedSorting,
  IntegratedSelection,
  SelectionState,
  FilteringState,
  IntegratedFiltering,
  GroupingState,
  IntegratedGrouping,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFilterRow,
  TableColumnResizing,
  TableColumnReordering,
  TableSelection,
  DragDropProvider,
  TableGroupRow,
  Toolbar,
  GroupingPanel,
  TableFixedColumns,
} from "@devexpress/dx-react-grid-material-ui";
import columnWidthConfig from "../TableConfigs/columnConfigs";
import { makeTitleReadable, orderKey } from "../util/dataParserUtils";
import CreateTeamButton from "../buttons/CreateTeamButton";

const url = "https://hyo-backend.herokuapp.com/test";

const CreateTeam = () => {
  const [orderedData, setOrderedData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnWidths] = useState(columnWidthConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [orginalOrder, setOrginalOrder] = useState([]);
  const [selection, setSelection] = useState([]);

  const [selected, setSelected] = useState([]);

  const onSelection = (choice) => {
    setSelection(choice);
    const arrOfStudents = choice.map((i) => orderedData[i]);
    setSelected(arrOfStudents);
  };

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
            "discord_id",
            "team_name",
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
        console.log(order);
        setOrginalOrder(order);
        const newData = [...fetchedData];

        newData.forEach((d) => {
          orderKey(d, order);
          Object.keys(d).forEach((k) => {
            // eslint-disable-next-line
            if (Array.isArray(d[k]) && d[k].length === 1) d[k] = d[k][0];
            if (k === "interest_skills") {
              // eslint-disable-next-line
              d[k] = d[k]
                .split(", ")
                .filter((val) => val !== "")
                .join(", ");
            }
            if (d[k] === "" || d[k] === null || d[k] === "undefined")
              // eslint-disable-next-line
              d[k] = "null";
          });
          // eslint-disable-next-line
          delete d["_id"];
          // eslint-disable-next-line
          delete d["__v"];
        });
        setOrderedData(newData);
        setIsLoading(false);
        const cols = Object.keys(newData[0]).map((item) => ({
          name: item,
          title: makeTitleReadable(item),
        }));

        setColumns(cols);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  }, [columnWidths]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="">
      <CreateTeamButton selected={selected} />
      <br />
      <Button color="primary" variant="contained">
        Add User to Team
      </Button>
      <Box component="div" m={1}>
        Total rows selected: {selection.length}
      </Box>

      {orderedData && (
        <Grid rows={orderedData} columns={columns}>
          <DragDropProvider />
          <SortingState />
          <SelectionState
            selection={selection}
            onSelectionChange={onSelection}
          />
          <GroupingState />
          <FilteringState />
          <IntegratedSorting />
          <IntegratedSelection />
          <IntegratedGrouping />
          <IntegratedFiltering />
          <VirtualTable columnExtensions={columnWidthConfig} height="70vh" />
          <TableSelection showSelectAll highlightRow selectByRowClick />
          <TableColumnReordering
            order={orginalOrder}
            onOrderChange={setOrginalOrder}
          />
          <TableColumnResizing defaultColumnWidths={columnWidthConfig} />
          <TableFilterRow />
          <TableHeaderRow showSortingControls />
          <TableGroupRow />
          <TableFixedColumns leftColumns={["email"]} />
          <Toolbar />
          <GroupingPanel showGroupingControls />
        </Grid>
      )}
    </div>
  );
};

export default CreateTeam;
