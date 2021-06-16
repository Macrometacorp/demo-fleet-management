import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
import { insightList } from "../../services/streams";
import useInterval from "../../hooks/useInterval";

const useStyles = makeStyles({
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

export default function InsightsTable() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const initInsightList = async () => {
    const result = await insightList();
    setData(result);
  };
  useEffect(() => {
    initInsightList();
  }, []);
  useInterval(initInsightList, 3000);
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
                    investigate
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
