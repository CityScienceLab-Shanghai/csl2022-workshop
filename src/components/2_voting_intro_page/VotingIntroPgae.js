import React, { useState, useEffect } from "react";
import styles from "./VotingIntroPgae.module.css";

import { stateStore } from "../../stores";

const VotingIntroPgae = () => {
  const { page, nextPage } = stateStore;
  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div className={styles.textGroup}>
        <div className={styles.description}>
          You will be part of the decision for: <br />
          1. How the building will be built <br />
          2. How will the community endowment be used <br />
          <br />
          In every voting page, there are three steps you can do: <br />
          1. Enter a IncentivePolicyProposalPage <br />
          2. carry out simulation to see predictions <br />
          3. Submit your final decision <br />
          <br />
          Feel free to play around (1) and (2) before making your final
          decision.
        </div>
      </div>

      <button className={styles.button} onClick={nextPage}>
        <div className={styles.buttontext}>I am Ready!</div>
      </button>
      <div className={styles.pagination}>{page}</div>
    </div>
  );
};

export default VotingIntroPgae;
