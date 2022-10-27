import React, { useState, useEffect } from "react";
import styles from "./InfoBox.module.css";

import { stateStore } from "../../stores";

const InfoBox = () => {
  const { warning, setWarning } = stateStore;

  useEffect(() => {
    let timer;

    if (warning) {
      timer = setTimeout(() => {
        setWarning(false);
      }, "1500");
    }

    return () => clearTimeout(timer);
  }, [warning]);

  return (
    <div className={`${styles.box} ${warning ? styles.box_active : ""}`}>
      You have exceeded the endowment limit
    </div>
  );
};

export default InfoBox;
