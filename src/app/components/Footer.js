import React from "react";
import { AppBar, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    top: "auto !important",
    backgroundColor: "white",
    bottom: 0,
    alignItems: "end",
  },
  poweredByBtn: {
    color: "rgba(33, 33, 33, 0.6) !important",
    marginRight: "8px",
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Button variant="text" className={classes.poweredByBtn}>
        Powered By Macrometa
      </Button>
    </AppBar>
  );
};

export default Footer;
