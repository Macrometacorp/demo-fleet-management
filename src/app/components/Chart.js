import { Grid, makeStyles } from "@material-ui/core";
import Chart from "chart.js/auto";
import React, { useRef, useEffect, useState } from "react";
import ChartFilters from "./ChartFilters";
// import useInterval from "../../hooks/useInterval";
// import { listTopNSecurities } from "../services/restqlService";

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

const ChartComponent = ({ clearData }) => {
  const sentiments = ["Positive", "Negative", "Neutral"];
  const classes = useStyles();

  const [selectedSentiment, setSelectedSentiment] = useState("Positive");
  const [topSecuritiesVerifiedSentiment, setTopSecuritiesVerifiedSentiment] =
    useState({
      positive: [],
      negative: [],
      neutral: [],
    });

  const chartRef = useRef(null);
  const sentimentChartDomRef = useRef(null);

  const updateChart = () => {
    if (selectedSentiment) {
      chartRef.current.data.labels = [];
      chartRef.current.data.datasets[0].data =
        topSecuritiesVerifiedSentiment[selectedSentiment.toLowerCase()];
      chartRef.current.update();
    }
  };

  // const getTopSecuritiesVerifiedSentiment = () => {
  //     sentiments.forEach(async (sentiment) => {
  //         const topSecuritiesSentiment = await listTopNSecurities(sentiment, {});
  //         if (topSecuritiesSentiment && topSecuritiesSentiment.result && topSecuritiesSentiment.result.length) {
  //             setTopSecuritiesVerifiedSentiment((prev) => {
  //                 prev[sentiment.toLowerCase()] = topSecuritiesSentiment.result;
  //                 return { ...prev };
  //             });
  //         }
  //     });
  //     updateChart();
  // };

  // useInterval(getTopSecuritiesVerifiedSentiment, 1000);

  useEffect(() => {
    if (clearData) {
      setTopSecuritiesVerifiedSentiment((prev) => {
        return {
          positive: [],
          negative: [],
          neutral: [],
        };
      });
      updateChart();
    }
  }, [clearData]);

  useEffect(() => {
    if (!chartRef.current && sentimentChartDomRef.current) {
      chartRef.current = new Chart(sentimentChartDomRef.current, {
        type: "bar",
        data: {
          datasets: [
            {
              data: [],
              backgroundColor: ["rgba(93, 108, 192, 1)"],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          // indexAxis: "y",
          // parsing: {
          //     xAxisKey: "verifiedSentiment",
          //     yAxisKey: "securityName",
          // },
          plugins: {
            legend: false,
          },
          interaction: {
            mode: "index",
            intersect: false,
          },
          stacked: false,
          scales: {
            y: {
              type: "linear",
              display: true,
              position: "left",
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",

              // grid line settings
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      // getTopSecuritiesVerifiedSentiment();
      updateChart();
    }
  }, [chartRef.current]);

  useEffect(() => {
    if (selectedSentiment) {
      updateChart();
    }
  }, [selectedSentiment]);

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" className={classes.selectGrid}>
        <Grid item>
          <h3> Fleet Status</h3>
        </Grid>
      </Grid>
      <div className={classes.chartCanvas}>
        <canvas ref={sentimentChartDomRef} />
      </div>
      <ChartFilters />
    </div>
  );
};

export default ChartComponent;
