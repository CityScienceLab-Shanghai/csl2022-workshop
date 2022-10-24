import React, { useState, useEffect } from "react";
import styles from "./ResPage.module.css";

const ResPage = () => {
  return (
    <>
      <div className={styles.text}>
        Please visit this page using a higher resolution screen
      </div>
      <img className={styles.logo} src={`/lablogo.png`} alt={""} />
    </>
  );
};

export default ResPage;
