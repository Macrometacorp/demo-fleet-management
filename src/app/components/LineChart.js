import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ChartFilters from "./ChartFilters";
import { fleetChartData } from "../services/streams";
import useInterval from "../hooks/useInterval";

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
    fontWeight: 600,
  },
});

const LineChart = () => {
  const canvasRef = useRef(null);
  const classes = useStyles();
  const [chartFilter, setChartFilter] = useState("week");
  const [chartData, setChartData] = useState({});

  const initFleetChartData = async(filter) => {
    const result = await fleetChartData(filter);
    setChartData(result);
  }

  useEffect(() => {
    initFleetChartData(chartFilter)
  }, [chartFilter]);

  useInterval(()=>{
    initFleetChartData(chartFilter);
  }, 10000);

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
            radius: 1,
          },
        },
        scales: {
          x: {
              grid: {
                  display: false,
              },
              // ticks: {
              //     autoSkip: false,
              // },
          },
          y: {
              grid: {
                  display: false,
              },
              // ticks: {
              //     autoSkip: false,
              // },
          },
      },
      },
      data: {
        labels: data.label,
        datasets: [
          {
            label: " Critical",
            data: data.dataset1,
            borderColor: "red",
            borderWidth: 2,
          },
          {
            label: " Attention",
            data: data.dataset2,
            borderColor: "#d8d800",
            borderWidth: 2,
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
              {/* <LocalShippingIcon style={{ fontSize: 50 }} /> */}
              <span style={{fontSize: 40}}>🚚</span>
              <h3 className={classes.heading}>Fleet Status</h3>
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
