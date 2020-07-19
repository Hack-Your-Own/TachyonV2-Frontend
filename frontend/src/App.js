import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

const url = 'http://localhost:8080/test'

function App() {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }
    fetchData(url).then((data) => {
      setData(data);
      let cols = Object.keys(data[0]).map(
        (item) => ({ name: item, title: item })
      );
      setColumns(cols)
      console.log(cols)
    }).catch((e) => console.log(e))
  }, [])

  return (
    <div className="App">
      TACHYON FRONTEND
      <Paper>
        <Grid
          rows={data}
          columns={columns}
        >
          <Table />
          <TableHeaderRow />
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
