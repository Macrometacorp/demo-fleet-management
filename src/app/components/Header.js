import {
  Button,
  Grid,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
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

const Header = ({ handleOnIntialize, isIntializeButtonDisabled }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Typography variant="h4" align="center" className={classes.header}>
          Macrometa - Realtime Fleet Management
        </Typography>
        <Typography variant="subtitle1" align="center" className={classes.header}>
                    Simple, secure and scalable realtime fleet management.
          </Typography>
      </Grid>
      <Button
        variant="contained"
        className={classes.intializeButton}
        onClick={() => {
          handleOnIntialize();
        }}
      >
        {isIntializeButtonDisabled ? (
          <CircularProgress size={24} />
        ) : (
          "Intialize"
        )}
      </Button>
      <Button
        variant="contained"
        className={classes.aboutButton}
        onClick={() => {
          window.open(
            "https://github.com/Macrometacorp/demo-fleet-management",
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
