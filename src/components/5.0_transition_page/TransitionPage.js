import React, { useState, useEffect } from "react";
import styles from "./TransitionPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";

import { stateStore } from "../../stores";

const TransitionPage = () => {
  const { page, nextPage } = stateStore;

  return (
    <>
      <img className={styles.background} src={`/bg.gif`} alt={""} />
      <img className={styles.logo} src={`/lablogo.png`} alt={""} />
      <div className={styles.vcenter}>
        <div className={`${styles.rowGroup} ${styles.titleGroup}`}>
          <img className={styles.socitylogo} src={`/socity.png`} alt={""} />
          <div className={styles.title}>Community DAO</div>
        </div>
        <div className={styles.rowGroup}>
          <div className={styles.description}>
            Congratulations! You have finished all the tutorial games.
          </div>
        </div>
        <div className={styles.rowGroup}>
          <div className={styles.description}>
            Now please play around with the sandbox, to see how Community DAO
            will work in Kendall Square.
          </div>
        </div>

        <div className={styles.rowGroup}>
          <CustomButton
            buttonText="Sandbox"
            positionStyle={styles.button_left}
            buttonOnclick={nextPage}
            colorIndex={0}
            largeFont={true}
          />
          <CustomButton
            buttonText="Learn More"
            positionStyle={styles.button_right}
            buttonOnclick={nextPage}
            colorIndex={0}
            largeFont={true}
          />
        </div>
      </div>
    </>
  );
};

export default TransitionPage;
