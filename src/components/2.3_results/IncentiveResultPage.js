import React, { useState, useEffect } from "react";
import styles from "./IncentiveResultPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";
// import IndicatorCard from "./IndicatorCard";

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
          <div className={styles.title}>Incentive for Developers</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
            Here is the final result with every participant’s weight considered.
          </div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "15px" }}>
          <div className={styles.description}>
            In a DAO voting, the voting power is normally correlated to the
            number of governance token one have. As the core value of SoCity
            Community DAO is about a prosocial community development process,
            the distribution of governance token is related to duration of
            residency, participation in the community, professional knowledge,
            etc.
          </div>
        </div>
        <div style={{ marginTop: "62px", marginBottom: "92px" }}>
          {/* <IndicatorCard index={index} /> */}
        </div>
      </div>
      <CustomButton
        buttonText="Performance"
        positionStyle={styles.button}
        buttonOnclick={nextPage}
        colorIndex={0}
        largeFont={true}
      />
    </>
  );
};

export default IncentiveVotingPage;
