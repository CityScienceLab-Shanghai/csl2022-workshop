import React, { useState, useEffect } from "react";
import styles from "./IncentivePolicyProposalPage.module.css";
import Button from "@mui/material/Button";

import { stateStore } from "../../stores";

const IncentivePolicyProposalPage = () => {
  const { page, nextPage } = stateStore;
  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <div>
        <div>You will be part of the decision for:</div>
        <div>1. How the building will be built</div>
        <div>2. How will the community endowment be used</div>
      </div>
      <div>
        <div>In every voting page, there are three steps you can do:</div>
        <div>1. Enter a proposal</div>
        <div>2. carry out simulation to see predictions</div>
        <div>3. Submit your final decision</div>
      </div>

      <Button variant="outlined" onClick={nextPage}>
        I am Ready!
      </Button>
      <div>{page}</div>
    </div>
  );
};

export default IncentivePolicyProposalPage;
