import React, { useState, useEffect, useRef } from "react";
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
  Button
} from "@material-ui/core";
// import DatePicker from "../DatePicker";
import { maintenanceCenterList } from '../../services/streams'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { activeButtonClass } from "../../services/util";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  activeActionButton: { ...activeButtonClass, width: "5rem" },
  pagination: {
    borderRadius: "none",
  },
});

export default function ModalTable({handleSelect, alertData}) {
  const classes = useStyles();
  // const [selectedDate, ] = useState("06/15/2021");
  const [selectedCenter, setSelectedCenter] = useState({});
  const [data, setData] = useState([]);
  const [focus, setFocus] = useState(false);

  const initMaintenanceCenterList = async(city) => {
    try {      
      const results = await maintenanceCenterList(city);
      setData(results)
    } catch (error) {
      console.error('falied to load maintenace centers', error.message)
    }
  }

  const component = useRef(null)

  const toggle = (data) => {
    setSelectedCenter(data);
    component.current.setOpen(true);
    setFocus(!focus)
  }

  const handleChange = (date) => {
    handleSelect({date, maintenaceData:selectedCenter})
  }

  useEffect(()=>{
    const { City } = alertData;
    initMaintenanceCenterList(City);
    document.querySelector(".react-datepicker-wrapper").style.visibility = "hidden";
    document.querySelector(".react-datepicker-wrapper").style.width = "64px";
  },[])
  
  return (
    <>
      <Typography component={"div"} className={classes.root}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Maintenance Center</TableCell>
                <TableCell align="center">Rating</TableCell>
                <TableCell align="center">City</TableCell>
                <TableCell align="center">Estimated Time</TableCell>
                <TableCell align="center">Estimated Cost</TableCell>
                <TableCell align="center">Select
                  <DatePicker
                    minDate={new Date()}
                    ref={(r) => {
                      component.current = r;
                    }}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row, i) => (
                  <TableRow
                    key={Math.random()}
                  >
                    <TableCell align="center">
                      {row.Name}
                    </TableCell>
                    <TableCell align="center">{row.Rating}/5.0</TableCell>
                    <TableCell align="center">{row.City}</TableCell>
                    <TableCell align="center">{row.Estimated_Time}  {row.Estimated_Time === 1? 'Day': 'Days'}</TableCell>
                    <TableCell align="center">${row.Estimated_Cost}</TableCell>
                    <TableCell align="center">
                      {/* <DatePicker
                        key={Math.random()}
                        onDateChange={(date) => {
                          handleSelect({date, maintenaceData:row})
                        }}
                        initialDate={selectedDate}
                      /> */} 
                      <Button
                       variant="contained"
                       color="primary"
                       style={{padding:'0px'}}
                       className={classes.activeActionButton} 
                      onClick={() => toggle(row)}>Select</Button>
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
