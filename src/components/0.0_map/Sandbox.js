import React, { useState, useEffect } from "react";
import CityMap from "./CityMap";

import styles from "./Sandbox.module.css";

import TitleCard from "./TitleCard";
import PanelCard from "./PanelCard";
import IndicatorCard from "./IndicatorCard";

import BarChart from "../0.4_charts/BarCharts";
import RadarChart from "../0.4_charts/RadarChart";
import _BAR_DATA from "../../data/charts/bar_chart.json";
import _RADAR_DATA from "../../data/charts/radar_chart.json";

const Sandbox = () => {
  return (
    <div>
      <CityMap className={styles.visualization} />
      <div
        className={`${styles.containerFluid} ${styles.h100} ${styles.w100} ${styles.flexRow}`}
      >
        <div className={`${styles.panelCol} ${styles.col3} ${styles.flexCol}`}>
          <TitleCard />
          <PanelCard title="Indicators" subTitle="Urban Performance" />
        </div>
        <div className={`${styles.col}`}></div>
        <div className={`${styles.outputCol} ${styles.col3} ${styles.flexCol}`}>
          <IndicatorCard
            title="Indicators"
            subTitle="Community Endowment"
            content={
              <div className={styles.bar}>
                <BarChart data={_BAR_DATA} horizontal="true" />
              </div>
            }
          />
          <IndicatorCard
            title="Indicators"
            subTitle="Urban Performance"
            content={
              <div className={styles.radar}>
                <RadarChart data={_RADAR_DATA} />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Sandbox;
