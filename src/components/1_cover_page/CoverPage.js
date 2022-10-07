import React, { useState, useEffect } from "react";
import styles from "./CoverPage.module.css";

import { stateStore } from "../../stores";

const CoverPage = () => {
  const { page, nextPage } = stateStore;
  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleGroup}>
        <div className={styles.title}>Community DAO</div>
        <div className={styles.subtitle}>by SoCity</div>
        <div className={styles.description}>
          A new parcel in your neighbourhood is going to be developed into a
          mixed-use building. As a member of Community DAO, it’s the time for
          you to voice out for its....
        </div>
      </div>

      <button className={styles.button} onClick={nextPage}>
        <div className={styles.buttontext}>Get Started</div>
      </button>
      <div className={styles.pagination}>{page}</div>
    </div>
  );
};

export default CoverPage;
