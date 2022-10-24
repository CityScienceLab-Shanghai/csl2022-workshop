import React, { useState, useEffect } from "react";
import styles from "./EndowmentIntroPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";

import { stateStore } from "../../stores";

const EndowmentIntroPage = () => {
  const { page, nextPage } = stateStore;

  return (
    <>
      <img className={styles.content} src={`/content/4.1.png`} alt={""} />

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

export default EndowmentIntroPage;
