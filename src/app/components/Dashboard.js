import React, { useState, useEffect } from "react";
import {Container, Grid, Paper, makeStyles} from "@material-ui/core";
import Header from "./Header";
import ButtonBar from "./ButtonBar";
import Footer from "./Footer";
import LineChart from "./LineChart";
import FleetStatusTable from "./tables/FleetStatusTable";
import InsightsTable from "./tables/InsightsTable";
import AlertsTable from "./tables/AlertsTable";
import { intialize, isDemoReady } from "../services/restql";
import {
  startStopStream,
  createStreamReader,
  telematicList,
  assetDetails,
  processBooking,
} from "../services/streams";
import { parseMessage, getRand } from "../services/util";
import { ENRICHTED_TELEMATICS } from "../util/constants";
import ModalComponent from "./ModalComponent";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#F1F2F4",
    minHeight: "100vh",
    padding: "0",
  },
  aboutButton: {
    top: "1.1rem",
    right: "2rem",
    position: "absolute",
    backgroundColor: "rgb(208 225 243)",
    boxShadow: "none",
    border: "1px solid rgb(169,169,169)",
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const [isStreamStarted, setIsStreamStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStopLoading, setIsStopLoading] = useState(false);
  const [isIntializeLoading, setIsIntializeLoading] = useState(false);
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [streamConnections, setStreamConnections] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [openModal, setOpenModal] = useState({ status: false, data: {} });

  const handleClose = (event) => {
    event.preventDefault();
    handleOnStop();
    // This is opening alert message
    event.returnValue = "";
    return "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleClose);
    return () => {
      window.removeEventListener("beforeunload", handleClose);
    };
  }, []);
  
  const initDemoReady = async () => {
    const isReady = await isDemoReady();
    if (!isReady) setAlertsData([]);
    setIsStartButtonDisabled(!isReady);
  };

  const handleBooking = (data) => {
    let tdata = alertsData.map((item) => {
      if (item._key === data._key) {
        item.Maintenance_Planned = "Yes";
        const date = new Date(data.date);
        item.Booked_In = date.toISOString();
      }
      return item;
    });
    setAlertsData(tdata);
    initAssetDetails(data);
  };

  const initAssetDetails = async (data) => {
    try {
      const { Asset, Fault } = data.data;
      const { date, maintenaceData } = data;
      const [asetDetail] = await assetDetails(Asset);
      const { Driver, Vehicle_Model } = asetDetail;
      const { Estimated_Cost: Work_Cost } = maintenaceData;
      const tdate = new Date(date);
      const payload = {
        Asset,
        Booked_In: tdate.toISOString(),
        Invoice_Number: getRand(),
        Cost_Center: getRand(),
        Vehicle_Model,
        Driver,
        Work_Description: Fault,
        Work_Cost,
      };
      await processBooking(payload);
    } catch (error) {
      console.error("Failed to book maintenance", error.message);
    }
  };

  useEffect(() => {
    initDemoReady();
  }, [isLoading, isStopLoading, isIntializeLoading]);

  //button callback for all the rest
  const handleOnStart = () => {
    setIsLoading(true);
    startStreamAndWebSocket();
  };
  const handleOnStop = () => {
    setIsStopLoading(true);
    closeStreamAndWebSocket();
  };
  const handleOnIntialize = async () => {
    setIsIntializeLoading(true);
    await intialize(setIsIntializeLoading);
  };

  const initTelematicList = async () => {
    try {
      const results = await telematicList();
      let data = [...results];
      data = data
        .filter((item) => item)
        .filter((item) => Object.keys(item).length > 0);
      data = [...new Map(data.map((item) => [item._key, item])).values()];
      setAlertsData(data);
    } catch (error) {
      console.error("falied to load maintenace centers", error.message);
    }
  };

  useEffect(() => {
    if (!isIntializeLoading) {
      initTelematicList();
    }
  }, [isIntializeLoading]);

  // useEffect(() => {
  //   setInterval(() => {
  //     initTelematicList();
  //   }, 5000);
  // }, []);

  const closeStreamAndWebSocket = async () => {
    try {
      for (const elements of streamConnections) {
        await elements.terminate();
      }
      const response = await startStopStream();
      if (response) {
        setIsStreamStarted(false);
      }
      setIsStopLoading(false);
    } catch (error) {
      console.error("Failed to close steam and webscoker", error.message);
    }
  };

  const startStreamAndWebSocket = async () => {
    try {
      const response = await startStopStream(true);
      if (response) {
        const alertsStreamConnection = await establishConnectionForFree(
          ENRICHTED_TELEMATICS
        );
        setStreamConnections((prev) => [
          ...streamConnections,
          alertsStreamConnection,
        ]);
        setIsStreamStarted(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to close steam and webscoket", error.message);
    }
  };

  const establishConnectionForFree = async (streamName) => {
    try {
      const _consumer = await createStreamReader(streamName);
      _consumer.on("open", () =>
        console.info(`Connection open for ${streamName}`)
      );
      _consumer.on("error", (error) =>
        console.error(`Connection error for ${streamName}`, error)
      );
      _consumer.on("close", () =>
        console.info(`Connection close for ${streamName}`)
      );

      _consumer.on("message", (message) => {
        _consumer.send(
          JSON.stringify({ messageId: JSON.parse(message).messageId })
        );

        messageManipulation(message, ENRICHTED_TELEMATICS);
      });
      return _consumer;
    } catch (error) {
      console.error("error", error);
    }
  };

  const messageManipulation = (message, streamName) => {
    let tempArr = [];
    const { newData = {} } = parseMessage(message);
    if (!newData || Object.keys(newData).length === 0) {
      return;
    }
    newData["_key"] = getRand();
    tempArr.push(newData);
    setAlertsData((prev) => [...tempArr, ...prev]);
  };

  return (
    <>
      <Container className={classes.root} maxWidth={false}>
        <Header />
        <ButtonBar
          handleOnClear={handleOnIntialize}
          handleOnStart={handleOnStart}
          handleOnStop={handleOnStop}
          isStartButtonDisabled={isLoading}
          isStopButtonDisabled={isStopLoading}
          isClearButtonDisabled={isIntializeLoading}
          isStreamStarted={isStreamStarted}
        />

        <Grid container alignItems="flex-start">
          {/* Fleet Stats & Insights */}
          <Grid item xs={6}>
            <Paper style={{margin:"0.75rem", padding:"0.75rem 2rem 2rem 2rem"}}>
              <Grid container alignItems="flex-start">
                <Grid item xs={6} style={{paddingRight: "2rem"}}>
                  <LineChart />
                </Grid>
                <Grid item xs={6} style={{marginTop: "4rem"}}>
                  <FleetStatusTable />
                </Grid>
                <Grid item xs={12} style={{marginTop: "1rem"}}>
                  <InsightsTable />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Alerts table */}
          <Grid item xs={6}>
            <Paper style={{margin:"0.75rem", padding:"0.75rem 2rem 2rem 2rem"}}>
              <AlertsTable alertsData={alertsData} setOpenModal={setOpenModal}/>
            </Paper>
          </Grid>
        </Grid>

        <ModalComponent
          openModal={openModal}
          closeModal={() => setOpenModal({ status: false, data: { id: 0 } })}
          handleSelect={(data) => handleBooking(data)}
        />
        <Footer />
      </Container>
    </>
  );
};

export default Dashboard;
