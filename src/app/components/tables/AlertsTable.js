import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import { Button } from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AlertFilters from "./AlertFilters";
import ModalComponent from "../ModalComponent";
import { activeButtonClass } from "../../services/util";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    paddingTop: "1rem",
  },
  pagination: {
    borderRadius: "none",
  },
  activeActionButton: { ...activeButtonClass, width: "4rem" },
  heading: {
    margin: "10px",
    fontSize: "28px",
    fontWeight: 400,
  },
});

export default function AlertsTable() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState({ status: false, data: 1 });

  let data = [
    {
      vehicleID: "PF16VBD",
      alertDescription: "No Start",
      dateLogged: "Just Now",
      statusLevel: "Critical",
      maintenancePlanned: "Yes",
      suggestedAction: (
        <>
          Booked <br />
          <span>25 Aug 2021</span>
        </>
      ),
    },
    {
      vehicleID: "PF16VBD",
      alertDescription: "No Start",
      dateLogged: "Just Now",
      statusLevel: "Critical",
      maintenancePlanned: "No",
      suggestedAction: (
        <Button
          variant="contained"
          color="primary"
          className={classes.activeActionButton}
          onClick={() => setOpenModal({ status: true, data: { id: 3 } })}
        >
          Book
        </Button>
      ),
    },
  ];

  data = [...data, ...data, ...data, ...data];

  return (
    <>
      <div style={{ display: "flex" }}>
        <NotificationsActiveIcon style={{ fontSize: 50 }} />
        <h3 className={classes.heading}>Alerts</h3>
      </div>
      <AlertFilters />
      <div className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "5rem" }}>Vechicle ID</TableCell>
                <TableCell align="center">Alert &nbsp; Description</TableCell>
                <TableCell align="center">Date &nbsp; Logged</TableCell>
                <TableCell align="center">Status level</TableCell>
                <TableCell align="center">Maintenance &nbsp; Planned</TableCell>
                <TableCell align="center" style={{ width: "5rem" }}>
                  {" "}
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, i) => (
                  <TableRow
                    key={Math.random()}
                    style={i % 2 ? { background: "rgb(208 225 243)" } : {}}
                  >
                    <TableCell align="center">{row.vehicleID}</TableCell>
                    <TableCell align="center">{row.alertDescription}</TableCell>
                    <TableCell align="center">{row.dateLogged}</TableCell>
                    <TableCell align="center">{row.statusLevel}</TableCell>
                    <TableCell align="center">
                      {row.maintenancePlanned}
                    </TableCell>
                    <TableCell align="center">{row.suggestedAction}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Pagination
            className={classes.pagination}
            count={5}
            showFirstButton
            showLastButton
          />
        </TableContainer>
        <ModalComponent
          openModal={openModal}
          closeModal={() => setOpenModal({ status: false, data: { id: 0 } })}
        />
      </div>
    </>
  );
}
