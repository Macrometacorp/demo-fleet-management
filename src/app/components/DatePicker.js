import React, { useEffect, useRef } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { activeButtonClass } from "../services/util";

const useStyles = makeStyles((theme) => ({
  activeActionButton: { ...activeButtonClass, width: "5rem" },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const DatePicker = (props) => {
  const datepickerContainer = useRef();
  const classes = useStyles();

  useEffect(() => {
    window.$(datepickerContainer.current).datepicker({
      onSelect: function (date) {
        props.onDateChange(date);
      },
      defaultDate: props.initialDate,
    });
    return () => {
      window.$(datepickerContainer.current).datepicker("destroy");
    };
  }, []);

  return (
    <>
      <input
        ref={datepickerContainer}
        style={{ visibility: "hidden", width: 0 }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{padding:'0px'}}
        className={classes.activeActionButton}
        onClick={() => window.$(datepickerContainer.current).datepicker("show")}
      >
        Select
      </Button>
      {/* {props.initialDate} */}
    </>
  );
};

export default DatePicker;
