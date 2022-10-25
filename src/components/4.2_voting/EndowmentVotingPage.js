import React, { useState, useEffect } from "react";
import styles from "./EndowmentVotingPage.module.css";

import CustomButton from "../0.1_buttons/CustomButton";
import IndicatorCard from "./IndicatorCard";

import _AMENITIES_DATA from "../../data/amenities.json";
import _COLOR from "../../data/color/categorical_color_palette.json";

import { stateStore } from "../../stores";

const IncentiveVotingPage = () => {
  const { page, nextPage } = stateStore;

  let button_set = [];
  let selected_status = {};
  for (var i = 0; i < 24; i++) selected_status[_AMENITIES_DATA[i].id] = false;

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(selected_status);

  if (_AMENITIES_DATA)
    for (var i = 0; i < 24; i++) {
      button_set.push(
        <CustomButton
          key={_AMENITIES_DATA[i]["id"]}
          index={_AMENITIES_DATA[i]["id"]}
          buttonText={_AMENITIES_DATA[i].name}
          positionStyle={styles.amen_button}
          buttonOnclick={() => {}}
          colorIndex={parseInt(_AMENITIES_DATA[i].id) + 1}
          largeFont={false}
          selectedColor={_COLOR[parseInt(_AMENITIES_DATA[i].id) + 1]}
          selected={selected}
          setSelected={setSelected}
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
