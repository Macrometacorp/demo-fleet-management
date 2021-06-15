import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import ChartFilters from "./ChartFilters";

// LineChart

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date("2018-05-01T00:00:00").getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for (var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random()),
    });
  }
  return data;
}

let data = [];

data.push({
  // title: 'Visits',
  data: getRandomDateArray(20),
});

const useStyles = makeStyles({
  root: {
    // paddingTop: "3rem",
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
});

const LineChart = () => {
  const canvasRef = useRef(null);
  const classes = useStyles();
  const chartData = { data: data[0].data, color: "#3E517A" };
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
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "week",
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: 0,
              },
            },
          ],
        },
      },
      data: {
        labels: chartData.data.map((d, i) => i),
        datasets: [
          {
            label: "",
            data: chartData.data.map((d) => d.value),
            fill: "none",
            backgroundColor: chartData.color,
            pointRadius: 2,
            borderColor: chartData.color,
            borderWidth: 1,
            lineTension: 0,
          },
        ],
      },
    });
  }, []);

  return (
    <>
    <div className={classes.root}>
      <Grid container alignItems="center" className={classes.selectGrid}>
        <Grid item>
          <h3> Fleet Status</h3>
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
