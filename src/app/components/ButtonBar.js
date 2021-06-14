import { Button, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  actionButton: {
    marginRight: "3rem",
    backgroundColor: "rgb(208 225 243)",
    width: "9rem",
    boxShadow: "none",
    border: "1px solid rgb(169,169,169)",
  },
});

const ButtonBar = ({
  handleOnStart,
  handleOnStop,
  isStartButtonDisabled,
  isStopButtonDisabled,
  isStreamStarted,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        className={classes.actionButton}
        onClick={handleOnStart}
        disabled={isStartButtonDisabled || isStreamStarted}
      >
        {isStartButtonDisabled ? <CircularProgress size={24} /> : "Start"}
      </Button>
      <Button
        variant="contained"
        className={classes.actionButton}
        onClick={handleOnStop}
        disabled={isStopButtonDisabled || !isStreamStarted}
      >
        {isStopButtonDisabled ? <CircularProgress size={24} /> : "Stop"}
      </Button>
    </div>
  );
};

export default ButtonBar;
