import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@material-ui/core";
import DatePicker from "../DatePicker";

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
});

export default function ModalTable({handleSelect}) {
  const classes = useStyles();
  const [selectedDate, ] = useState("06/15/2021");

  const tdata = {
      maintenanceCenter: "Audi Service Center",
      rating: "4.5/5.0",
      location: "Liverpool",
      estimatedTime: "1Day",
      estimatedCost: "$100",
    }
  const data = Array.from({ length: 4 }, (i, j) =>
       ({ ...tdata, id: j + 1 })
  );

  return (
    <>
      <Typography component={"div"} className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Maintenance Center</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Estimated Time</TableCell>
                <TableCell align="center">Estimated Cost</TableCell>
                <TableCell align="center">Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, i) => (
                  <TableRow
                    key={Math.random()}
                    style={i % 2 ? { background: "rgb(208 225 243)" } : {}}
                  >
                    <TableCell align="center">
                      {row.maintenanceCenter}
                    </TableCell>
                    <TableCell align="center">{row.rating}</TableCell>
                    <TableCell align="center">{row.location}</TableCell>
                    <TableCell align="center">{row.estimatedTime}</TableCell>
                    <TableCell align="center">{row.estimatedCost}</TableCell>
                    <TableCell align="center">
                      <DatePicker
                        key={Math.random()}
                        onDateChange={(date) => {
                          handleSelect({date, mantenanceCenterID: row.id})
                        }}
                        initialDate={selectedDate}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Typography>
    </>
  );
}
