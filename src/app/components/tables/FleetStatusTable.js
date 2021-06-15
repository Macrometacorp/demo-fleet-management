import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles({
  table: {
    // minWidth: 200,
  },
  tableCell: {
    padding: "3px 10px",
    border: "1px solid",
  },
});

const data = [
  {
    col1: (
      <>
        Attention required <br /> (Next 7 days)
      </>
    ),
  },
  {
    col1: (
      <>
        Critical Status <br /> (Next 7 days)
      </>
    ),
  },
  {
    col1: (
      <>
        Fleet Health <br /> (Last 7 days)
      </>
    ),
  },
  {
    col1: (
      <>
        Unplanned Maintenance <br /> (Last 7 days)
      </>
    ),
  },
  {
    col1: (
      <>
        Planned Maintenance <br /> (Next 7 days)
      </>
    ),
  },
  {
    col1: "Predicted Maintenance",
  },
];

export default function FleetStatusTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {data &&
            data.map((row, i) => (
              <TableRow key={Math.random()}>
                <TableCell className={classes.tableCell}>{row.col1}</TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "50px" }}
                >
                  {i % 2 === 0 ? (
                    <ArrowDropUpIcon style={{ fontSize: 50 }} />
                  ) : (
                    <ArrowDropDownIcon style={{ fontSize: 50 }} />
                  )}
                </TableCell>
                <TableCell className={classes.tableCell}>1048</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
