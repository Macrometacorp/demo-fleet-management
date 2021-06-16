import React, { useState } from "react";
import { Container, makeStyles, Grid } from "@material-ui/core";
import Header from "./Header";
import ButtonBar from "./ButtonBar";
import LineChart from "./LineChart";
import FleetStatusTable from "./tables/FleetStatusTable";
import InsightsTable from "./tables/InsightsTable";
import AlertsTable from "./tables/AlertsTable";
// import jsC8 from "jsc8";
// import config from "../services/config";

// const jsc8Client = new jsC8({
//     url: config.gdnURL,
//     apiKey: `${config.apiKey}`,
// });

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
  // const [isClearLoading, setIsClearLoading] = useState(false);

  //button callback for all the rest
  const handleOnStart = () => {
    // setIsLoading(true);
    // startStreamAndWebSocket();
  };
  const handleOnStop = () => {
    // setIsStopLoading(true);
    // closeStreamAndWebSocket();
  };

  return (
    <>
      <Container className={classes.root} maxWidth={false}>
        <Header />
        <ButtonBar
          handleOnStart={handleOnStart}
          handleOnStop={handleOnStop}
          isStartButtonDisabled={isLoading}
          isStopButtonDisabled={isStopLoading}
          isStreamStarted={isStreamStarted}
        />
        <Grid
          container
          direction="row"
          style={{ paddingTop: "16px" }}
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
            <AlertsTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;