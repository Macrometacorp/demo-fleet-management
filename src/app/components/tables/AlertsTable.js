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
// import ModalComponent from "../ModalComponent";
import {
  activeButtonClass,
  slicer,
  formatDate,
  printDate,
  // getRand,
} from "../../services/util";
// import { telematicList, assetDetails, processBooking } from "../../services/streams";

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

export default function AlertsTable({alertsData, setOpenModal}) {
  const classes = useStyles();
  // const [openModal, setOpenModal] = useState({ status: false, data: {} });
  const [alertStats, setAlertStats] = useState({
    all: 0,
    critical: 0,
    attention: 0,
    booked: 0,
  });
  const [alertFilter, setAlterFilter] = useState("all");
  const [fdata, setFData] = useState([]);
  const [odata, setOData] = useState([]);
  const [tdata, setTData] = useState([]);
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  // const initTelematicList = async () => {
  //   try {
  //     const results = await telematicList();
  //     setOData(results);
  //   } catch (error) {
  //     console.error("falied to load maintenace centers", error.message);
  //   }
  // };

  // const initAssetDetails = async (data) => {
  //   try {
  //     const { Asset, Fault } = data.data;
  //     const { date, maintenaceData } = data;
  //     const [asetDetail] = await assetDetails(Asset);
  //     const { Driver, Vehicle_Model } = asetDetail;
  //     const { Estimated_Cost: Work_Cost } = maintenaceData;
  //     const tdate = new Date(date);
  //     const payload = {
  //       Asset,
  //       Booked_In: tdate.toISOString(),
  //       Invoice_Number: getRand(),
  //       Cost_Center: getRand(),
  //       Vehicle_Model,
  //       Driver,
  //       Work_Description: Fault,
  //       Work_Cost,
  //     };
  //     await processBooking(payload);
  //     console.log("successfully booking processed!");
  //   } catch (error) {
  //     console.error('Failed to book maintenance', error.message);
  //   }
  // };

  // const handleBooking = (data) => {
  //   let tdata = odata.map((item) => {
  //     if (item._key === data._key) {
  //       item.Maintenance_Planned = "Yes";
  //       const date = new Date(data.date);
  //       item.Booked_In = date.toISOString();
  //     }
  //     return item;
  //   });
  //   setOData(tdata);
  //   initAssetDetails(data);
  // };

  // useEffect(() => {
  //   initTelematicList();
  //   setInterval(()=>{ 
  //     console.log('intialist telematics ....')
  //     initTelematicList();
  //   },10000)
  // }, []);

  useEffect(() => {
    let data = odata.filter((item) => {
      let filter = alertFilter.toLowerCase();
      if (filter === "all") return true;
      if (filter === "booked") {
        return item.Maintenance_Planned.toLowerCase() === "yes";
      } else {
        return item.Status_Level.toLowerCase() === filter;
      }
    });
    const tempData = slicer(data, 8);
    setFData(tempData);
    setTData(tempData[(page - 1) | 0]);
    setPage(1);
  }, [alertFilter, odata]);

  useEffect(() => {
    setTData(fdata[page - 1]);
  }, [page]);

  useEffect(()=>{
    // const [ data = {} ] = alertsData;
    // if(data && Object.keys(data).length > 0){
      // data._key = getRand();
      // if(odata.length === 0) {
      //   initTelematicList();
      // }
      // setOData([data, ...odata]);
    // }
    setOData(alertsData);
  },[alertsData])

  useEffect(() => {
    let stats = { all: odata.length, critical: 0, attention: 0, booked: 0 };
    odata.forEach((item) => {
      if (item.Maintenance_Planned.toLowerCase() === "yes") stats.booked += 1;
      if (item.Status_Level.toLowerCase() === "critical") stats.critical += 1;
      if (item.Status_Level.toLowerCase() === "attention") stats.attention += 1;
    });
    setAlertStats(stats);
  }, [odata]);

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
                    <TableCell align="center">{row.Asset}</TableCell>
                    <TableCell align="center">{row.Fault}</TableCell>
                    <TableCell align="center">
                      {formatDate(row.Timestamp)}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        color: `${
                          row.Status_Level === "Critical" ? "red" : ""
                        }`,
                      }}
                    >
                      {row.Status_Level}
                    </TableCell>
                    <TableCell align="center">
                      {row.Maintenance_Planned}
                    </TableCell>
                    <TableCell align="center">
                      {row.Maintenance_Planned.toLowerCase() === "yes" ? (
                        <>
                        Booked
                        <br/>
                        {printDate(row.Booked_In)}
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.activeActionButton}
                          style={{ padding: "0px" }}
                          onClick={() =>
                            setOpenModal({ status: true, data: row })
                          }
                        >
                          Book
                        </Button>
                      )}
                    </TableCell>
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
        {/* <ModalComponent
          openModal={openModal}
          closeModal={() => setOpenModal({ status: false, data: { id: 0 } })}
          handleSelect={(data) => handleBooking(data)}
        /> */}
      </div>
    </>
  );
}
