import React, { useState, useEffect } from "react";
import styles from "./StakeholderPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";

import { stateStore } from "../../stores";

const StakeholderPage = () => {
  const { page, nextPage } = stateStore;

  return (
    <>
      <img className={styles.content} src={`/content/1.3.png`} alt={""} />

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

export default StakeholderPage;
