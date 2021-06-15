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

export default function ModalTable() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState("06/15/2021");
  const data = [
    {
      maintenanceCenter: "Audi Service Center",
      rating: "4.5/5.0",
      location: "Liverpool",
      estimatedTime: "1Day",
      estimatedCost: "$100",
    },
    {
      maintenanceCenter: "Audi Service Center",
      rating: "4.5/5.0",
      location: "Liverpool",
      estimatedTime: "1Day",
      estimatedCost: "$100",
    },
    {
      maintenanceCenter: "Audi Service Center",
      rating: "4.5/5.0",
      location: "Liverpool",
      estimatedTime: "1Day",
      estimatedCost: "$100",
    },
    {
      maintenanceCenter: "Audi Service Center",
      rating: "4.5/5.0",
      location: "Liverpool",
      estimatedTime: "1Day",
      estimatedCost: "$100",
    },
  ];

  return (
    <>
      <Typography component={"div"} className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Vechicle ID</TableCell>
                <TableCell align="center">Alert &nbsp; Description</TableCell>
                <TableCell align="center">Date &nbsp; Logged</TableCell>
                <TableCell align="center">Status level</TableCell>
                <TableCell align="center">Maintenance &nbsp; Planned</TableCell>
                <TableCell align="center">Suggested &nbsp; Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row,i) => (
                  <TableRow key={Math.random()} style ={ i % 2? { background : 'rgb(208 225 243)' }:{  }}>
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
                          setSelectedDate(date);
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
