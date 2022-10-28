import React, { useState, useEffect } from "react";
import styles from "./EndowmentResultPage.module.css";

import Toggle from "react-toggle";
import "react-toggle/style.css";

import CustomButton from "../0.1_buttons/CustomButton";
import TreeMap from "../0.4_charts/TreeMap";

import _TREE_DATA from "../../data/sim/votes_endowment.json";
import CAT_COLOR from "../../data/color/categorical_color_palette.json";

import { stateStore } from "../../stores";

const EndowmentResultPage = () => {
  const { page, nextPage } = stateStore;
  const [weighted, setWeighted] = useState(false);

  let data = _TREE_DATA;

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
          style={{ marginTop: "62px", marginBottom: "92px" }}
          className={styles.tree}
        >
          <TreeMap
            className={styles.tree}
            data={data}
            colors={Object.values(CAT_COLOR)}
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

export default EndowmentResultPage;
