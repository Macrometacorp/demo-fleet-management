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

const tdata = {
  Vehicle_With_Most_Frequent_Issues: "Vechicle with most frequent issue",
  Most_Common_Alert: "Most Common Alert",
  Total_Cost_Of_Unplanned_Maintenance: "Total Cost of Unplanned Maintenance",
  Area_With_Most_Alerts: "Area with most Alerts",
  Least_Cost_Effective_Vehicle: "Least Cost Effective Vehicle",
};

export default function InsightsTable() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const initInsightList = async () => {
    try {      
      const result = await insightList();
      setData(result);
    } catch (error) {
      console.error('falied to load the insigths', error.message);
    }
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
            {Object.keys(tdata) &&
              Object.keys(tdata).map((key) => (
                <TableRow key={Math.random()}>
                  <TableCell className={classes.tableCell}>
                    {tdata[key]}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {data && data.hasOwnProperty(key) ? data[key] : "-"}
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
