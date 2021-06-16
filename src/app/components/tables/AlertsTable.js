import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Button,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AlertFilters from "./AlertFilters";
import ModalComponent from "../ModalComponent";
import { activeButtonClass, slicer } from "../../services/util";

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
  const [alertStats, setAlertStats] = useState({ all: 0, critical: 0, attention: 0, booked:0 });
  const [ alertFilter, setAlterFilter ] = useState('all');
  const [fdata, setFData] = useState([]);
  const [odata, setOData] = useState([]);
  const [tdata, setTData] = useState([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

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
      statusLevel: "Attention",
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

  useEffect(()=>{
    const arr = Array.from({length:60}, (i, j)=>(j % 2 === 0 ? data[0] : data[1]));
    setOData(arr)
  },[])

  useEffect(() => {
    let data = odata.filter((item) => {
      let filter = alertFilter.toLowerCase();
      if (filter === "all") return true;
      if(filter === 'booked') return item.maintenancePlanned.toLowerCase() === 'yes';
      return item.statusLevel.toLowerCase() === filter;
    });
    // setFData(data)
    const tempData = slicer(data, 8);
    setFData(tempData);
    setTData(tempData[page-1 | 0]);
    setPage(1);
  }, [alertFilter, odata]);

  useEffect(()=>{
    setTData(fdata[page-1])
  },[page])

  useEffect(()=>{
    let stats = {all:odata.length,critical:0,attention:0,booked:0}
    odata.forEach((item) => {
      if(item.maintenancePlanned.toLowerCase() === 'yes')  stats.booked += 1;
      if(item.statusLevel.toLowerCase() === 'critical')  stats.critical += 1;
      if(item.statusLevel.toLowerCase() === 'attention')  stats.attention += 1;
    });
    setAlertStats(stats);
  },[odata])

  return (
    <>
      <div style={{ display: "flex" }}>
        <NotificationsActiveIcon style={{ fontSize: 50 }} />
        <h3 className={classes.heading}>Alerts</h3>
      </div>
      <AlertFilters stats={alertStats} setAlterFilter={setAlterFilter} />
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
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tdata &&
                tdata.map((row, i) => (
                  <TableRow
                    key={Math.random()}
                    style={i % 2 ? { background: "rgb(208 225 243)" } : {}}
                  >
                    <TableCell align="center">{row.vehicleID}</TableCell>
                    <TableCell align="center">{row.alertDescription}</TableCell>
                    <TableCell align="center">{row.dateLogged}</TableCell>
                    <TableCell align="center" style={{color: `${row.statusLevel === 'Critical' ? 'red' : ''}`}}>{row.statusLevel}</TableCell>
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
            count={fdata.length}
            showFirstButton
            showLastButton
            page={page} 
            onChange={handleChange}
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
