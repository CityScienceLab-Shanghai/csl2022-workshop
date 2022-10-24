import React, { useState, useEffect } from "react";
import styles from "./EndowmentVotingPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";
import IndicatorCard from "./IndicatorCard";

import _AMENITIES_DATA from "../../data/amenities.json";

import { stateStore } from "../../stores";

const IncentiveVotingPage = () => {
  const { page, nextPage } = stateStore;

  const [index, setIndex] = useState(0);

  let button_set = [];
  for (var i = 0; i < 24; i++) {
    button_set.push(
      <CustomButton
        key={_AMENITIES_DATA[i].id}
        buttonText={_AMENITIES_DATA[i].name}
        positionStyle={styles.amen_button}
        buttonOnclick={nextPage}
        colorIndex={_AMENITIES_DATA[i].id + 1}
        largeFont={false}
      />
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.rowGroup} style={{ marginTop: "0px" }}>
          <div className={styles.title}>Community Endowment Usage</div>
        </div>
        <div className={styles.rowGroup} style={{ marginTop: "30px" }}>
          <div className={styles.description}>
            Please drag in/out the amenities to the rectangle area to propose
            your amenity composition.
          </div>
        </div>
        <div style={{ marginTop: "62px", marginBottom: "92px" }}></div>
        <IndicatorCard index={index} />
      </div>
      {button_set}
      <div className={styles.hint}>
        {"Test around. Hit the button once you decide ->"}
      </div>
      <CustomButton
        buttonText="Submit"
        positionStyle={styles.button}
        buttonOnclick={nextPage}
        colorIndex={0}
        largeFont={true}
      />
    </>
  );
};

export default IncentiveVotingPage;
