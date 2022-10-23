import React, { useState, useEffect } from "react";
import styles from "./Navigation.module.css";

import { stateStore } from "../../stores";

const COLOR_STYLE = {
  0: styles.button_0,
};

const Navigation = () => {
  const { page, maxPage } = stateStore;
  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.title_active}>{maxPage}</div>
    </div>
  );
};

export default Navigation;
