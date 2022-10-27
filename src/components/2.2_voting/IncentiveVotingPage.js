import React, { useState, useEffect } from "react";
import styles from "./IncentiveVotingPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";
import IndicatorCard from "./IndicatorCard";

import TutorialSlider from "../0.5_slider/TutorialSlider";

import { stateStore } from "../../stores";

const IncentiveVotingPage = () => {
  const {
    page,
    nextPage,
    tutorial_sandbox_slider_value,
    set_tutorial_sandbox_slider_value
  } = stateStore;


  return (
    <>
      <div className={styles.container}>
        <div className={styles.rowGroup} style={{ marginTop: "0px" }}>
          <div className={styles.title}>Incentive for Developers</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
            Please use the slider to decide how many extra floors you think is
            appropriate as an incentive for the developer.
          </div>
          <div className={styles.slider}>
            <TutorialSlider
              min={0}
              max={10}
              onChange={(value) => {
                // console.log(value);
                set_tutorial_sandbox_slider_value(value);
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: "62px", marginBottom: "92px" }}>
          <IndicatorCard index={tutorial_sandbox_slider_value} />
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
