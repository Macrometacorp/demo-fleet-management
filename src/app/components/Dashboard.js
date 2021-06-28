import React, { useState, useEffect } from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import Header from "./Header";
import ButtonBar from "./ButtonBar";
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
    padding: "0.5rem",
  },
  section: {
    paddingRight: "2rem",
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
        <Header
          handleOnIntialize={handleOnIntialize}
          isIntializeButtonDisabled={isIntializeLoading}
        />
        <ButtonBar
          handleOnStart={handleOnStart}
          handleOnStop={handleOnStop}
          isLoading={isLoading}
          isStartButtonDisabled={isStartButtonDisabled}
          isStopButtonDisabled={isStopLoading}
          isStreamStarted={isStreamStarted}
        />
        <Grid
          container
          direction="row"
          style={{ paddingTop: "32px" }}
          alignItems="flex-start"
        >
          <Grid item xs={6} className={classes.section}>
            <Grid container direction="row" alignItems="flex-start">
              <Grid item xs={6} className={classes.section}>
                <LineChart />
              </Grid>
              <Grid
                item
                xs={6}
                className={classes.section}
                style={{ marginTop: "4rem" }}
              >
                <FleetStatusTable />
              </Grid>
              <Grid item xs={12} className={classes.section}>
                <InsightsTable />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.section}>
            <AlertsTable alertsData={alertsData} setOpenModal={setOpenModal}/>
          </Grid>
        </Grid>
        <ModalComponent
          openModal={openModal}
          closeModal={() => setOpenModal({ status: false, data: { id: 0 } })}
          handleSelect={(data) => handleBooking(data)}
        />
      </Container>
    </>
  );
};

export default Dashboard;
