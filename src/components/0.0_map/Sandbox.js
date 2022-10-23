import React, { useState, useEffect } from "react";
import CityMap from "./CityMap";

import styles from "./Sandbox.module.css";

import TitleCard from "./TitleCard"
import SiteCard from "./SiteCard"

const Sandbox = () => {
  return (
    <div>
      <CityMap className={styles.visualization} />
      <div className={`${styles.containerFluid} ${styles.h100} ${styles.w100} ${styles.flexRow}`}>
        <div className={`${styles.panelCol} ${styles.col3} ${styles.flexCol}`}>
          <TitleCard />
          <SiteCard />
        </div>
        <div className={`${styles.col}`}></div>
        <div className={`${styles.outputCol} ${styles.col3}`}></div>
      </div>
    </div>
  );
};

export default Sandbox;
