import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  header: {
    fontWeight: "500 !important",
  },
  aboutButton: {
    top: "1.1rem",
    right: "2rem",
    position: "absolute",
    backgroundColor: "rgb(208 225 243)",
    boxShadow: "none",
    border: "1px solid rgb(169,169,169)",
  },
  intializeButton: {
    top: "1.1rem",
    right: "8rem",
    position: "absolute",
    backgroundColor: "rgb(208 225 243)",
    boxShadow: "none",
    border: "1px solid rgb(169,169,169)",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Typography variant="h4" align="center" className={classes.header}>
          Macrometa - Realtime Fleet Management
        </Typography>
      </Grid>
      <Button
        variant="contained"
        className={classes.intializeButton}
        onClick={() => {
          window.open(
            "https://github.com/Macrometacorp/demo-event-hub",
            "_blank"
          );
        }}
      >
        Intialize
      </Button>
      <Button
        variant="contained"
        className={classes.aboutButton}
        onClick={() => {
          window.open(
            "https://github.com/Macrometacorp/demo-event-hub",
            "_blank"
          );
        }}
      >
        About
      </Button>
    </>
  );
};

export default Header;
