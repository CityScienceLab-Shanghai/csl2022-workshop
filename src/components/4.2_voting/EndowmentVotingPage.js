import React, { useState, useEffect } from "react";
import styles from "./EndowmentVotingPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";
import IndicatorCard from "./IndicatorCard";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { stateStore } from "../../stores";

const IncentiveVotingPage = () => {
  const { page, nextPage } = stateStore;

  const [index, setIndex] = useState(0);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.rowGroup} style={{ marginTop: "0px" }}>
          <div className={styles.title}>Community Endowment Usage</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
            Please use the slider to decide how many extra floors you think is
            appropriate as an incentive for the developer.
          </div>
        </div>
        <div style={{ marginTop: "62px", marginBottom: "92px" }}>
          <IndicatorCard index={index} />
        </div>
      </div>
      <div className={styles.hint}>
        {"Test around. Hit the button once you decide ->"}
      </div>
      <CustomButton
        buttonText="Submit"
        positionStyle={styles.button}
        buttonOnclick={nextPage}
        colorIndex={0}
        largeFont={true}
      />
    </>
  );
};

export default IncentiveVotingPage;
