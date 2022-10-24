import React, { useState, useEffect } from "react";
import styles from "./IndicatorCard.module.css";

import BarChart from "../0.4_charts/BarCharts";
import _BAR_DATA from "../../data/charts/bar_chart.json";
const IndicatorCard = ({ index }) => {
  return (
    <div className={styles.card}>
      <div className={styles.shading}>
        <img
          className={styles.img}
          src={`/building_rendered/${index}.png`}
          alt={""}
        />
      </div>
      <div className={styles.radar}>
        <BarChart data={_BAR_DATA} />
      </div>
      <div className={styles.bar}>
        <BarChart data={_BAR_DATA} />
      </div>
    </div>
  );
};

export default IndicatorCard;
