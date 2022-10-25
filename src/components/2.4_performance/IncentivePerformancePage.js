import React, { useState, useEffect } from "react";
import styles from "./IncentivePerformancePage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";
import IndicatorCard from "./IndicatorCard";

import { stateStore } from "../../stores";

const IncentivePerformancePage = () => {
  const { page, nextPage } = stateStore;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.rowGroup} style={{ marginTop: "0px" }}>
          <div className={styles.title}>Incentive for Developers</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
          This is the comparison between the current practice and community DAO paradigm.
          </div>
        </div>
        <div style={{ marginTop: "62px", marginBottom: "92px" }}></div>
        <IndicatorCard />
      </div>
      <CustomButton
        buttonText="Next"
        positionStyle={styles.button}
        buttonOnclick={nextPage}
        colorIndex={0}
        largeFont={true}
      />
    </>
  );
};

export default IncentivePerformancePage;
