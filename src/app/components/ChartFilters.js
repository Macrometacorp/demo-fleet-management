import React from "react";
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

export default function ChartFilters() {
  const [alignment, setAlignment] = React.useState("week");
  const classes = useStyles();
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
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
      <ToggleButton value="all" className={classes.actionButton}>
        All
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
