import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ChartFilters from "./ChartFilters";

// LineChart

const useStyles = makeStyles({
  root: {
    flexDirection: "column",
    display: "flex",
  },
  securitiesSelect: {
    width: "12rem",
  },
  selectGrid: {
    paddingBottom: "1rem",
  },
  selectLabel: {
    paddingRight: "1rem",
    fontSize: "1.5rem",
  },
  chartCanvas: {
    height: "19.5rem",
  },
  heading: {
    margin: "10px",
    fontSize: "28px",
    fontWeight: 400,
  },
});

const LineChart = () => {
  const canvasRef = useRef(null);
  const classes = useStyles();

  let chartData;
  let myChart;

  const updateChart = () => {
    myChart.data.labels = chartData.data.map((d) => d.time);
    myChart.data.datasets[0].data = chartData.data.map((d) => d.value);
    myChart.update();
  };

  useEffect(() => {
    if (canvasRef.current && myChart && myChart.data.length) {
      updateChart();
    }
  }, [canvasRef.current]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    myChart = new Chart(canvasRef.current, {
      type: "line",
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            data: [5, 10, 20, 10, 20, 30],
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
          },
          {
            data: [-5, -10, -20, -10, -20, -30],
            backgroundColor: "yellow",
            borderColor: "yellow",
            borderWidth: 1,
          },
        ],
      },
    });
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Grid container alignItems="center">
          <Grid item>
            <div style={{ display: "flex" }}>
              <LocalShippingIcon style={{ fontSize: 50 }} />
              <h3 className={classes.heading}> Fleet Status</h3>
            </div>
          </Grid>
        </Grid>
        <div className={classes.chartCanvas}>
          <canvas ref={canvasRef} />
        </div>
        <ChartFilters />
      </div>
    </>
  );
};

export default LineChart;
