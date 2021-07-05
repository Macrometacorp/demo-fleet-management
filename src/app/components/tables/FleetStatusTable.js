import React, { useState, useEffect } from "react";
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
import { fleetStats } from "../../services/streams";
import useInterval from "../../hooks/useInterval";

const useStyles = makeStyles({
  tableCell: {
    padding: "1.9px 10px",
    border: "1px solid",
  },
});

export default function FleetStatusTable() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const initFleetStats = async () => {
    try {
      const result = await fleetStats();
      setData(result);
    } catch (error) {
      console.error("falied to load the insigths", error.message);
    }
  };
  useEffect(() => {
    initFleetStats();
  }, []);

  useInterval(initFleetStats, 3000);

  const tdata = {
    Attention_Required: (
      <>
        Attention required <br /> (Last 7 days)
      </>
    ),
    Critical_Status: (
      <>
        Critical Status <br /> (Last 7 days)
      </>
    ),
    Fleet_Health: (
      <>
        Fleet Health <br /> (Last 7 days)
      </>
    ),
    Unplanned_Maintenance: (
      <>
        Unplanned Maintenance <br /> (Last 7 days)
      </>
    ),
    Planned_Maintenance: (
      <>
        Planned Maintenance <br /> (Next 7 days)
      </>
    ),
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {Object.keys(tdata) &&
            Object.keys(tdata).map((key, i) => (
              <TableRow key={Math.random()}>
                <TableCell className={classes.tableCell}>
                  {tdata[key]}
                </TableCell>
                <TableCell
                  className={classes.tableCell}
                  style={{ width: "50px" }}
                >
                  {data && data[key] && data[key].arrow === "Up" ? (
                    <ArrowDropUpIcon style={{ fontSize: 50 }} />
                  ) : (
                    <ArrowDropDownIcon style={{ fontSize: 50 }} />
                  )}
                </TableCell>
                <TableCell className={classes.tableCell}>  
                  <b
                    style={{
                      color: `${
                        data && data[key] && data[key].arrow === "Up"
                          ? "green"
                          : "red"
                      }`,
                    }}
                  >
                    {data && data[key] && data[key][key]}
                  </b>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
