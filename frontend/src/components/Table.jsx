import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
	Grid,
	Table,
	TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

const CustomTable = ({ data, columns }) => {
	return (
		<Paper>
			<Grid rows={data} columns={columns}>
				<Table />
				<TableHeaderRow />
			</Grid>
		</Paper>
	);
};

export default CustomTable;
