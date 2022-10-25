import React, { useState, useEffect } from "react";
import styles from "./EndowmentResultPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";

import { stateStore } from "../../stores";

const EndowmentResultPage = () => {
  const { page, nextPage } = stateStore;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.rowGroup} style={{ marginTop: "0px" }}>
          <div className={styles.title}>Community Endowment Usage</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
            Here are the choices every participant has made.
          </div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "15px" }}>
          <div className={styles.description}>
            However, this is not the final result. DAO voting is normally a
            weighted voting, which means each participant may have different
            voting power. Click on the toggle to see how that will affect the
            result.
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

export default EndowmentResultPage;
