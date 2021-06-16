import React, { useState, useEffect } from "react";
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
import { maintenanceCenterList } from '../../services/streams'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    // paddingTop: "1rem",
  },
  pagination: {
    borderRadius: "none",
  },
});

export default function ModalTable({handleSelect, alertData}) {
  const classes = useStyles();
  const [selectedDate, ] = useState("06/15/2021");
  const [data, setData] = useState([]);

  const initMaintenanceCenterList = async(city) => {
    try {      
      const results = await maintenanceCenterList(city);
      setData(results)
    } catch (error) {
      console.error('falied to load maintenace centers', error.message)
    }
  }

  useEffect(()=>{
    const { City } = alertData;
    initMaintenanceCenterList(City);
  },[])

  return (
    <>
      <Typography component={"div"} className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Maintenance Center</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">City</TableCell>
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
                      {row.Name}
                    </TableCell>
                    <TableCell align="center">{row.Rating}/5.0</TableCell>
                    <TableCell align="center">{row.City}</TableCell>
                    <TableCell align="center">{row.Estimated_Time}  {row.Estimated_Time === 1? 'Day': 'Days'}</TableCell>
                    <TableCell align="center">${row.Estimated_Cost}</TableCell>
                    <TableCell align="center">
                      <DatePicker
                        key={Math.random()}
                        onDateChange={(date) => {
                          handleSelect({date, maintenaceData:row})
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
