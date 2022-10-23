import React, { useState, useEffect } from "react";
import styles from "./StructurePage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";

import { stateStore } from "../../stores";

const StructurePage = () => {
  const { page, nextPage } = stateStore;

  return (
    <>
      <img className={styles.content} src={`/content/1.2.png`} alt={""} />

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

export default StructurePage;
