import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const useStyles = makeStyles({
  tableCell: {
    padding: "1.9px 10px",
    border: "1px solid",
  },
  textRed: {
    color: 'red',
  },
  textYellow: {
    color: '#d0d00f',
  },
  textGreen: {
    color: 'green',
  },
  textOrange: {
    color: 'orange',
  }
});

export default function FleetStatusTable() {
  const classes = useStyles();

  const data = [
    {
      col1: (
        <>
          Attention required <br /> (Next 7 days)
        </>
      ),
      col3: (<b className={classes.textRed}>1048</b>)
    },
    {
      col1: (
        <>
          Critical Status <br /> (Next 7 days)
        </>
      ),
      col3: (<b className={classes.textYellow}>374</b>)
    },
    {
      col1: (
        <>
          Fleet Health <br /> (Last 7 days)
        </>
      ),
      col3: (<b className={classes.textGreen}>89.04%</b>)
    },
    {
      col1: (
        <>
          Unplanned Maintenance <br /> (Last 7 days)
        </>
      ),
      col3: (<b className={classes.textRed}>171</b>)
    },
    {
      col1: (
        <>
          Planned Maintenance <br /> (Next 7 days)
        </>
      ),
      col3: (<b className={classes.textRed}>234</b>)
    },
    {
      col1: "Predicted Maintenance",
      col3: (<b className={classes.textOrange}>35.69%</b>)
    },
  ];

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
                <TableCell className={classes.tableCell}>{row.col3}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
