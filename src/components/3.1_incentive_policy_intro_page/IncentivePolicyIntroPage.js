import React, { useState, useEffect } from "react";
import styles from "./IncentivePolicyIntroPage.module.css";
import Button from "@mui/material/Button";

import { stateStore } from "../../stores";

const IncentivePolicyIntroPage = () => {
  const { page, nextPage } = stateStore;
  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.textGroup}>
        <div className={styles.title}>How to Incentivize the Developer</div>
        <div className={styles.description}>
          The masterplan height limitation for the new building is set out to be
          24 storeys. However, as the consensus made between community DAO and
          the government, the upper limit can reach 30 storeys. <br />
          The community DAO has reached a consensus with the developer where
          more floors are acceptable, but some of them need to be given to the
          community DAO as a compensation. The Community DAO has the right to
          use these floors for business, amenities, and so on.
        </div>
        <img
          className={styles.image}
          src={`/incentive_policy_example.png`}
          alt={""}
        />
        <div className={styles.description}>
          So, it’s time for your decision.
        </div>
      </div>

      <button className={styles.button} onClick={nextPage}>
        <div className={styles.buttontext}>I am Ready!</div>
      </button>
      <div className={styles.pagination}>{page}</div>
    </div>
  );
};

export default IncentivePolicyIntroPage;
