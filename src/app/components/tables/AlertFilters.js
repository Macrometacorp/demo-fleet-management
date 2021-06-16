import React, { useState, useEffect } from "react";
import { makeStyles, Button } from "@material-ui/core";
import { activeButtonClass } from "../../services/util";

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
      marginRight: theme.spacing(2),
      marginTop: "0.6rem",
    },
  },
}));

export default function AlertFilters({stats, setAlterFilter}) {
  const classes = useStyles();
  const [selected, setSelected] = useState("all");
  const { all, critical, attention, booked } = stats;
  const computeClass = (val) =>
    `${selected === val ? classes.activeActionButton : classes.actionButton}`;

  useEffect(()=>{
    setAlterFilter(selected);
  },[selected])

  return (
    <>
      <div className={classes.root}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSelected("all")}
          className={computeClass("all")}
        >
          All ({all})
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSelected("critical")}
          className={computeClass("critical")}
        >
          Critical ({critical})
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSelected("attention")}
          className={computeClass("attention")}
        >
          Attention ({attention})
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setSelected("booked")}
          className={computeClass("booked")}
        >
          Booked ({booked})
        </Button>
      </div>
    </>
  );
}
