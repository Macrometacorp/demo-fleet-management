import React from "react";

import { makeStyles, Button, Grid, Typography } from "@material-ui/core";
import { colors } from "../styles/colors"
import logo from "../../logomark.svg";

const useStyles = makeStyles({
  container: {
    backgroundColor: "#fff",
    borderBottom: "1px solid rgba(197, 200, 209, .5)",
    padding: "0.5rem 1rem",
  },
  logo: {
    margin: "0 1rem 0 0",
    padding: "0 0 0.25rem",
  },
  heading: {
    color: colors.gray[700],
    fontSize: "1rem",
    fontWeight: "700 !important",
    lineHeight: "32px",
    margin: "0 0.5rem 0 0",
    whiteSpace: "nowrap",
  },
  subheading: {
    color: colors.gray[600],
    fontSize: "1rem",
    fontWeight: "400 !important",
    lineHeight: "32px",
    margin: "0",
    whiteSpace: "nowrap",
  },
  aboutButton: {
    textTransform: "none",
    whiteSpace: "nowrap",
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <Grid
      alignItems="center"
      className={classes.container}
      container={true}
      direction="row"
      justify="space-between"
      wrap="nowrap"
    >
      <Grid container justify="flex-start" alignItems="center" wrap="nowrap">
        <img alt="Macrometa" className={classes.logo} src={logo} />
        <Typography variant="h1" className={classes.heading}>
          Realtime Fleet Management
        </Typography>
        <Typography className={classes.subheading}>
          Simple, secure and scalable realtime fleet management.
        </Typography>
      </Grid>
      <Grid container justify="flex-end" alignItems="center" wrap="nowrap">
        <Button
          className={classes.aboutButton}
          onClick={() => {
            window.open(
              "https://github.com/Macrometacorp/demo-fleet-management",
              "_blank"
            );
          }}
          variant="contained"
        >
          Source on GitHub
        </Button>
      </Grid>
    </Grid>
  );
};

export default Header;
