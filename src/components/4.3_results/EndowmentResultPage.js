import React, { useState, useEffect } from "react";
import styles from "./EndowmentResultPage.module.css";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import CustomButton from "../0.1_buttons/CustomButton";
import TreeMap from "../0.4_charts/TreeMap";

// import _TREE_DATA from "../../data/tutorial/deprecated_voting_json/votes_endowment.json";
import _DATA from "../../data/tutorial/endowment_vote_result.json";

import { stateStore } from "../../stores";

const EndowmentResultPage = () => {
  const { page, nextPage, tutorial_selected } = stateStore;
  const [weighted, setWeighted] = useState(false);
  const [isUsed, setIsUsed] = useState(false);

  useEffect(() => {
    if (weighted) setIsUsed(true);
  }, [weighted]);

  let data = _DATA;

  return (
    <>
      <div className={styles.container} id="protected_c">
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
          <div className={styles.title}>Community Endowment Usage</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
            Here are the choices every participant has made.
          </div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "15px" }}>
          <div className={styles.description}>
            However, this is not the final result. DAO voting is normally a
            weighted voting, which means each participant may have different
            voting power. Click on the toggle to see how that will affect the
            result.
          </div>
        </div>
        <div
          style={{ marginTop: "12px", marginBottom: "92px" }}
          className={styles.tree}
        >
          <TreeMap
            className={styles.tree}
            agent_id={_DATA["id"]}
            agent_value={_DATA["data"]}
            agent_weight={_DATA["weight"]}
            isWeighted={weighted}
            userValue={tutorial_selected}
            userWeight={1}
          />
        </div>
      </div>

      <div className={styles.hint}>
        {
          "Compare the results before and after weighting, then hit the button ->"
        }
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

export default EndowmentResultPage;
