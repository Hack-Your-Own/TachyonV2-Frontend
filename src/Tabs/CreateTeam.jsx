import React, { useEffect, useState } from "react";
import { Button, Box, CircularProgress } from "@material-ui/core";
import {
  EditingState,
  SortingState,
  IntegratedSorting,
  IntegratedSelection,
  SelectionState,
  FilteringState,
  IntegratedFiltering,
  IntegratedSummary,
  SummaryState,
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
  TableEditRow,
  TableInlineCellEditing,
} from "@devexpress/dx-react-grid-material-ui";
import dayjs from "dayjs";
import columnWidthConfig, {
  groupingCountConfig,
} from "../TableConfigs/columnConfigs";
import { makeTitleReadable, orderKey } from "../util/dataParserUtils";
import CreateTeamButton from "../buttons/CreateTeamButton";
import dateFilterPredicate from "../util/dateUtils";

const url = "https://hyo-backend.herokuapp.com/test";

const CreateTeam = () => {
  const [columns, setColumns] = useState([]);
  const [columnWidths] = useState(columnWidthConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [integratedFilteringColumnExtensions] = useState([
    { columnName: "start_date", predicate: dateFilterPredicate },
  ]);
  const [orderedData, setOrderedData] = useState([]);
  const [orginalOrder, setOrginalOrder] = useState([]);
  const [selection, setSelection] = useState([]);
  const [selected, setSelected] = useState([]);

  const [editingRowIds, setEditingRowIds] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const commitChanges = ({ changed }) => {
    let changedRows;
    let updatedRowData;
    if (changed) {
      changedRows = orderedData.map((row, i) => {
        updatedRowData = { ...row, ...changed[i] };
        return changed[i] ? updatedRowData : row;
      });
    }

    // TODO: Add a function to update data in the backend

    // Updates data locally
    setOrderedData(changedRows);
  };

  const onSelection = (choice) => {
    setSelection(choice);
    const arrOfStudents = choice.map((i) => orderedData[i]);
    setSelected(arrOfStudents);
  };

  useEffect(() => {
    const fetchData = async (endpoint) => {
      const response = await fetch(endpoint);
      const responseData = await response.json();
      return responseData;
    };
    fetchData(url)
      .then((fetchedData) => {
        const order = Array.from(
          new Set([
            "email",
            "discord",
            "discord_id",
            "team_name",
            "start_date",
            "end_date",
            "track",
            "lang_prefs",
            "lang_importance",
            ...Object.keys(fetchedData[0]),
            "createdAt",
            "updatedAt",
            "rules_agreement",
          ])
        );
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
          [
            "_id",
            "__v",
            "name",
            "goals",
            "location",
            "pronouns",
            "introduction",
            "five_years",
            "year_school",
            "demographics",
            "tips",
            "professional_link",
            // eslint-disable-next-line
          ].forEach((clmn) => delete d[clmn]);
        });
        setOrderedData(newData);

        const cols = Object.keys(newData[0]).map((item) => ({
          name: item,
          title: makeTitleReadable(item),
        }));
        setColumns(cols);
        setIsLoading(false);
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  }, [columnWidths]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="">
      <Box display="flex" justifyContent="space-evenly">
        <CreateTeamButton selected={selected} />
        <Button color="primary" variant="contained">
          Add Student to Team
        </Button>
        <Box component="div" m={1}>
          Total rows selected: {selection.length}
        </Box>
      </Box>
      {orderedData && (
        <Grid rows={orderedData} columns={columns}>
          <DragDropProvider />
          <EditingState
            editingRowIds={editingRowIds}
            onEditingRowIdsChange={setEditingRowIds}
            rowChanges={rowChanges}
            onRowChangesChange={setRowChanges}
            onCommitChanges={commitChanges}
          />
          <SortingState />
          <SelectionState
            selection={selection}
            onSelectionChange={onSelection}
          />
          <GroupingState
            defaultGrouping={[
              { columnName: "track" },
              { columnName: "region" },
            ]}
          />
          <SummaryState groupItems={groupingCountConfig} />

          <FilteringState
            defaultFilters={[
              { columnName: "team_name", value: "null" },
              {
                columnName: "start_date",
                value: `${dayjs().format("L")} - ${dayjs()
                  .add(3, "day")
                  .format("L")}`,
              },
            ]}
          />
          <IntegratedSorting />
          <IntegratedSelection />
          <IntegratedGrouping />
          <IntegratedSummary />

          <IntegratedFiltering
            columnExtensions={integratedFilteringColumnExtensions}
          />
          <VirtualTable columnExtensions={columnWidthConfig} height="100vh" />
          <TableSelection showSelectAll highlightRow selectByRowClick />
          <TableColumnReordering
            order={orginalOrder}
            onOrderChange={setOrginalOrder}
          />
          <TableColumnResizing defaultColumnWidths={columnWidthConfig} />
          <TableFilterRow />
          <TableHeaderRow showSortingControls />
          <TableEditRow />
          <TableInlineCellEditing startEditAction="doubleClick" />
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
