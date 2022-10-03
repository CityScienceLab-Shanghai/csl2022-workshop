import React, { useState, useEffect } from "react";
import styles from "./IntroPgae.module.css";
import Button from "@mui/material/Button";

import { stateStore } from "../../stores";

const IntroPage = () => {
  const { page, nextPage } = stateStore;
  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div>Community DAO</div>
      <div>by SoCity</div>
      <div>
        A new parcel in your neighbourhood is going to be developed into a
        mixed-use building. As a member of Community DAO, it’s the time for you
        to voice out for its....
      </div>
      <Button variant="outlined" onClick={nextPage}>
        Get Started
      </Button>
      <div>{page}</div>
    </div>
  );
};

export default IntroPage;
