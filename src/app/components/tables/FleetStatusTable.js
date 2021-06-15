import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles2 = makeStyles({
  table: {
    // minWidth: 200,
  },

});

const data = [
  {
    col1: `Attention required   (Next 7 days)`,
    col2: <ArrowDropDownIcon/>,
    col3: '1048'
  },
  {
    col1: 'Critical Status  (Next 7 days)',
    col2: <ArrowDropDownIcon/>,
    col3: '1048'
  },
  {
    col1: 'Fleet Health  (Next 7 days)',
    col2: <ArrowDropDownIcon/>,
    col3: '1048'
  },
  {
    col1: 'Unplanned Maintenance   (Next 7 days)',
    col2: <ArrowDropDownIcon/>,
    col3: '1048'
  },
  {
    col1: 'Planned Maintenance  (Next 7 days)',
    col2: <ArrowDropDownIcon/>,
    col3: '1048'
  },
  {
    col1: 'Predicted Maintenance  (Next 7 days)',
    col2: <ArrowDropDownIcon/>,
    col3: '1048'
  },
]

export default function FleetStatusTable() {
  const classes = useStyles2();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>

          {data && data.map((row)=>(
            <TableRow key={Math.random()}>
              <TableCell style={{border: '1px solid'}}>
                  {row.col1}
              </TableCell>
              <TableCell style={{border: '1px solid'}}>
                <ArrowDropUpIcon/>
              </TableCell>
              <TableCell style={{border: '1px solid'}}>
                {row.col3}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
