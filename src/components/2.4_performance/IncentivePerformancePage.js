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
            This is the comparison between the current practice and community
            DAO paradigm.
          </div>
        </div>

        <div className={styles.rowGroup} style={{ marginTop: "50px" }}>
          <div className={styles.colGroup}>
            <div className={styles.title_current}>Current Practice</div>
            <div className={styles.resultContent}>
              Development based on the right zoning with 20% affordable housing
              required by the Inclusionary Housing Program.
            </div>
            <div className={styles.resultContent}>- 5 floors</div>
          </div>
          <img
            className={styles.img}
            src={`/building_rendered/result_1.png`}
            alt={""}
          />
        </div>

        <div className={styles.rowGroup} style={{ marginTop: "50px" }}>
          <div className={styles.colGroup}>
            <div className={styles.title_DAO}>Current Practice</div>
            <div className={styles.resultContent}>
              Five extra floors adding on to the right zoning, with 70% of the
              profit donated to the community encdowment.
            </div>
            <div className={styles.resultContent}>- 5+5=10 floors</div>
            <div className={styles.resultContent}>- 70% projected profit for community endowment</div>
          </div>
          <img
            className={styles.img}
            src={`/building_rendered/result_2.png`}
            alt={""}
          />
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
