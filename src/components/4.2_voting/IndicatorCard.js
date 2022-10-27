import React, { useState, useEffect } from "react";
import styles from "./IndicatorCard.module.css";

import BarChart from "../0.4_charts/BarCharts";
import RadarChart from "../0.4_charts/RadarChart";
import _BAR_DATA from "../../data/charts/bar_chart.json";
import _RADAR_DATA from "../../data/charts/radar_chart.json";

const DecoLine = () => (
  <svg
    width="438"
    height="2"
    viewBox="0 0 438 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.DecoLine}
  >
    <path d="M0 1H438" stroke="#2F2F2F" />
  </svg>
);

const IndicatorCard = ({}) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Indicators</div>
      <div className={styles.hint}>
        simulation that helps your decision to be more informative
      </div>
      <DecoLine />
      <div className={styles.legend_1}></div>
      <div className={styles.legend_2}></div>
      <div className={styles.legend_1_text}>proposal</div>
      <div className={styles.legend_2_text}>baseline</div>

      <div className={styles.radar}>
        <div className={styles.h80}>
          <RadarChart dataKey={"t42"} />
        </div>
        <div className={styles.chartName}>urban performance</div>
      </div>
      <div className={styles.bar}>
        <div className={styles.h80}>
          <BarChart dataKey={"t42"} />
        </div>
        <div className={styles.chartName}>community endowment</div>
      </div>
    </div>
  );
};

export default IndicatorCard;
