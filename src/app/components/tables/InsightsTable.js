import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    // minWidth: 200,
  },
  tableCell: {
    padding: "0.7rem",
    border: "1px solid",
  },
  heading: {
    margin: "10px",
    fontSize: "28px",
    fontWeight: 400,
  },
});

const data = [
  {
    col1: "Vechicle with most frequent issue	",
    col2: "PF16VBD",
    col3: "investigate",
  },
  {
    col1: "Most Common Alert",
    col2: "Breaks",
    col3: "investigate",
  },
  {
    col1: "Average Driver Behaviour",
    col2: "Good",
    col3: "investigate",
  },
  {
    col1: "Total Cost of Unplanned Maintenance",
    col2: "£4,230",
    col3: "investigate",
  },
  {
    col1: "Area with most critical Alerts",
    col2: "Manchester",
    col3: "investigate",
  },
  {
    col1: "Least Cost Effective Vehicle",
    col2: "Ford Transit",
    col3: "investigate",
  },
];

export default function InsightsTable() {
  const classes = useStyles();

  return (
    <>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <span
          className="fab fa-searchengin"
          style={{ fontSize: 40, marginTop: "10px" }}
        ></span>
        <h3 className={classes.heading}> Insights</h3>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {data &&
              data.map((row) => (
                <TableRow key={Math.random()}>
                  <TableCell className={classes.tableCell}>
                    {row.col1}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.col2}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.col3}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
