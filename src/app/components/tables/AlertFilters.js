import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { activeButtonClass } from '../../services/util';

const useStyles = makeStyles((theme) => ({
  actionButton: {
    backgroundColor: "#ffffff",
    width: "9rem",
    boxShadow: "none",
    border: "1px solid rgb(169,169,169)",
    borderRadius: 0,
  },
  activeActionButton: activeButtonClass,
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function AlertFilters() {
  const classes = useStyles();
  const [selected, setSelected] = useState("all");
  const computeClass = (val) =>
    `${selected === val ? classes.activeActionButton : classes.actionButton}`;

  return (
    <>
      <div className={classes.root}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSelected("all")}
          className={computeClass("all")}
        >
          All
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSelected("critical")}
          className={computeClass("critical")}
        >
          Critical
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSelected("attention")}
          className={computeClass("attention")}
        >
          Attention
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSelected("booked")}
          className={computeClass("booked")}
        >
          Booked
        </Button>
      </div>
    </>
  );
}
