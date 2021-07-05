import React, { useState, useEffect } from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  actionButton: {
    backgroundColor: "#fff",
    width: "9rem",
    boxShadow: "none",
    border: "1px solid rgb(169,169,169)",
  },
});

export default function ChartFilters({ setChartFilter }) {
  const [selected, setSelected] = useState("week");
  const classes = useStyles();

  useEffect(() => {
    setChartFilter(selected);
  }, [selected]);

  return (
    <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={(e, value) => setSelected(value)}
      aria-label="text alignment"
      style={{ margin: "15px 0px" }}
    >
      <ToggleButton value="week" className={classes.actionButton}>
        Week
      </ToggleButton>
      <ToggleButton value="month" className={classes.actionButton}>
        Month
      </ToggleButton>
      <ToggleButton value="year" className={classes.actionButton}>
        Year
      </ToggleButton>
      {/* <ToggleButton value="all" className={classes.actionButton}>
        All
      </ToggleButton> */}
    </ToggleButtonGroup>
  );
}
