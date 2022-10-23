import React, { useState, useEffect } from "react";
import styles from "./CoverPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";

import { stateStore } from "../../stores";

const CoverPage = () => {
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
          <CustomButton
            buttonText="Get Started"
            positionStyle={styles.button}
            buttonOnclick={nextPage}
            colorIndex={0}
            largeFont={true}
          />
        </div>
      </div>
    </>
  );
};

export default CoverPage;
