import React, { useState, useEffect } from "react";
import styles from "./IncentiveResultPage.module.css";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import CustomButton from "../0.1_buttons/CustomButton";
import TreeMap from "../0.4_charts/TreeMap";

import _TREE_DATA from "../../data/sim/votes_incentive.json";
import SEQ_COLOR from "../../data/color/sequential_color_palette.json";

import { stateStore } from "../../stores";

const IncentiveVotingPage = () => {
  const { page, nextPage } = stateStore;
  const [weighted, setWeighted] = useState(false);

  let data = _TREE_DATA;

  return (
    <>
      <div className={styles.container}>
        <label className={styles.toggle}>
          <Toggle
            defaultChecked={weighted}
            onChange={() => {
              setWeighted(!weighted);
            }}
          />
          <span className={styles.toggle_text}>Weighted Voting</span>
        </label>
        <div className={styles.rowGroup} style={{ marginTop: "0px" }}>
          <div className={styles.title}>Incentive for Developers</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
            Here is the final result with every participant’s weight considered.
          </div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "15px" }}>
          <div className={styles.description}>
            In a DAO voting, the voting power is normally correlated to the
            number of governance token one have. As the core value of SoCity
            Community DAO is about a prosocial community development process,
            the distribution of governance token is related to duration of
            residency, participation in the community, professional knowledge,
            etc.
          </div>
        </div>
        <div
          style={{ marginTop: "62px", marginBottom: "92px" }}
          className={styles.tree}
        >
          <TreeMap
            className={styles.tree}
            data={data}
            colors={Object.values(SEQ_COLOR)}
            weighted={weighted}
          />
        </div>
      </div>

      <CustomButton
        buttonText="Performance"
        positionStyle={styles.button}
        buttonOnclick={nextPage}
        colorIndex={0}
        largeFont={true}
      />
    </>
  );
};

export default IncentiveVotingPage;
