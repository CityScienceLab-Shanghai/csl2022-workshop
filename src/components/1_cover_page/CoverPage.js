import React, { useState, useEffect } from "react";
import styles from "./CoverPage.module.css";

import { stateStore } from "../../stores";

const CoverPage = () => {
  const { page, nextPage } = stateStore;
  useEffect(() => {}, []);

  return (
    <>
      <img className={styles.background} src={`/bg.gif`} alt={""} />
      <img className={styles.logo} src={`/lablogo.png`} alt={""} />
      <div className={styles.vcenter}>
        <img className={styles.socitylogo} src={`/socity.png`} alt={""} />
        <div className={styles.title}>Community DAO</div>
        <button className={styles.button} onClick={nextPage}>
          <div className={styles.buttontext}>Get Started</div>
        </button>
      </div>
    </>
  );
};

export default CoverPage;
