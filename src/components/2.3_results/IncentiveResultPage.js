import React, { useState, useEffect } from "react";
import styles from "./IncentiveResultPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";

import { stateStore } from "../../stores";

const IncentiveResultPage = () => {
  const { page, nextPage } = stateStore;

  return (
    <>
      <img className={styles.content} src={`/content/2.1.png`} alt={""} />

      <CustomButton
        buttonText="Play"
        positionStyle={styles.button}
        buttonOnclick={nextPage}
        colorIndex={0}
        largeFont={true}
      />
    </>
  );
};

export default IncentiveResultPage;