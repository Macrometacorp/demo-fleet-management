import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
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
  const [chartFilter, setChartFilter] = useState("week");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const data = {
      week: {
        dataset1: [5, 10, 20, 10, 20, 30],
        dataset2: [-5, -10, -20, -10, -20, -30],
      },
      month: {
        dataset1: [15, 15, 25, 15, 25, 35],
        dataset2: [-15, -15, -25, -15, -25, -35],
      },
      year: {
        dataset1: [50, 100, 200, 100, 200, 300],
        dataset2: [-50, -100, -200, -100, -200, -300],
      },
      all: {
        dataset1: [15, 15, 25, 15, 25, 35],
        dataset2: [-15, -15, -25, -15, -25, -35],
      },
    };
    const dataset = data[chartFilter] || data['week']
    setChartData(dataset);
  }, [chartFilter]);

  useEffect(() => {
    const ch = initChart(chartData);
    return () => {
      ch.destroy();
    };
  }, [canvasRef.current, chartData]);

  const initChart = (data) => {
    const myChart = new Chart(canvasRef.current, {
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
        scales: {
          x: {
              grid: {
                  display: false,
              },
              ticks: {
                  autoSkip: false,
              },
          },
          y: {
              grid: {
                  display: false,
              },
              ticks: {
                  autoSkip: false,
              },
          },
      },
      },
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            data: data.dataset1,
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
          },
          {
            data: data.dataset2,
            backgroundColor: "yellow",
            borderColor: "yellow",
            borderWidth: 1,
          },
        ],
      },
    });
    return myChart;
  };

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
        <ChartFilters setChartFilter={setChartFilter} />
      </div>
    </>
  );
};

export default LineChart;
